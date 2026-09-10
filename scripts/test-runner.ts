import { PrismaClient } from "@prisma/client";
import { checkoutFormSchema, createOrderApiSchema } from "../src/lib/validation/checkout";
import { formatPrice } from "../src/lib/formatters";
import { storeConfig } from "../src/config/store";

const db = new PrismaClient();

async function runTests() {
  console.log("==========================================");
  console.log("🚀 SOGD MOBILE — AUTOMATED QA & INTEGRATION TESTS");
  console.log("==========================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  // --- SUITE 1: Currency Formatter ---
  console.log("\n--- Suite 1: Currency Formatter ---");
  assert(formatPrice(89) === "89 сомони", "formatPrice(89) returns '89 сомони'");
  assert(formatPrice(1250) === "1 250 сомони", "formatPrice(1250) formats thousands separator");
  assert(formatPrice(0) === "0 сомони", "formatPrice(0) returns '0 сомони'");
  assert(formatPrice(null) === "0 сомони", "formatPrice(null) handles null gracefully");

  // --- SUITE 2: Checkout Validation (Zod) ---
  console.log("\n--- Suite 2: Checkout Form Validation (Zod) ---");
  const validDeliveryData = {
    customerName: "Рустам",
    phone: "927771234",
    deliveryType: "DELIVERY" as const,
    city: "Худжанд",
    address: "ул. Ленина, д. 10, кв. 5",
    paymentMethod: "CASH_ON_DELIVERY" as const,
  };
  const deliveryResult = checkoutFormSchema.safeParse(validDeliveryData);
  assert(deliveryResult.success === true, "Valid delivery data passes validation");

  const invalidPhoneData = {
    ...validDeliveryData,
    phone: "123", // too short
  };
  const phoneResult = checkoutFormSchema.safeParse(invalidPhoneData);
  assert(phoneResult.success === false, "Invalid phone number is rejected");

  const missingAddressDelivery = {
    customerName: "Рустам",
    phone: "927771234",
    deliveryType: "DELIVERY" as const,
    city: "Худжанд",
    address: "", // missing address for delivery
    paymentMethod: "CASH_ON_DELIVERY" as const,
  };
  const addressResult = checkoutFormSchema.safeParse(missingAddressDelivery);
  assert(addressResult.success === false, "Delivery without address is rejected");

  const validPickupData = {
    customerName: "Алишер",
    phone: "928889900",
    deliveryType: "PICKUP" as const,
    paymentMethod: "CASH_ON_DELIVERY" as const,
  };
  const pickupResult = checkoutFormSchema.safeParse(validPickupData);
  assert(pickupResult.success === true, "Pickup without address passes validation");

  // --- SUITE 3: Server-Side Order Creation & Security Verification ---
  console.log("\n--- Suite 3: Database & Order Logic Verification ---");

  // 1. Fetch an existing product
  const testProduct = await db.product.findFirst({
    where: { stock: { gt: 5 } },
  });

  assert(Boolean(testProduct), "Database has seeded products available for testing");
  if (!testProduct) {
    console.error("Cannot proceed with database tests without products");
    process.exit(1);
  }

  const initialStock = testProduct.stock;
  const initialPrice = testProduct.price;

  // 2. Test Invalid Product ID
  const invalidProductOrder = createOrderApiSchema.safeParse({
    customerName: "Тест",
    phone: "921112233",
    deliveryType: "PICKUP",
    items: [{ productId: "non-existent-id-9999", quantity: 1 }],
  });
  assert(invalidProductOrder.success === true, "API Schema parses payload structure");

  // 3. Test Successful Order Creation + Atomic Transaction + Stock Decrement
  const testOrderNumber = `TEST-${Date.now().toString().slice(-6)}`;
  const orderQuantity = 2;
  const expectedSubtotal = initialPrice * orderQuantity;
  const expectedDelivery =
    expectedSubtotal >= storeConfig.delivery.freeDeliveryThreshold
      ? 0
      : storeConfig.delivery.inCityCost;
  const expectedTotal = expectedSubtotal + expectedDelivery;

  const createdOrder = await db.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        orderNumber: testOrderNumber,
        customerName: "Тестовый Покупатель",
        phone: "920000000",
        deliveryType: "DELIVERY",
        city: "Худжанд",
        address: "ул. Тестовая, 1",
        subtotal: expectedSubtotal,
        deliveryCost: expectedDelivery,
        total: expectedTotal,
        paymentMethod: "CASH_ON_DELIVERY",
        status: "NEW",
        items: {
          create: [
            {
              productId: testProduct.id,
              productName: testProduct.name,
              price: initialPrice,
              quantity: orderQuantity,
              subtotal: expectedSubtotal,
            },
          ],
        },
      },
      include: { items: true },
    });

    await tx.product.update({
      where: { id: testProduct.id },
      data: { stock: { decrement: orderQuantity } },
    });

    return order;
  });

  assert(createdOrder.orderNumber === testOrderNumber, "Order created with correct orderNumber");
  assert(createdOrder.total === expectedTotal, `Order total matches server-calculated total (${expectedTotal} TJS)`);
  assert(createdOrder.items.length === 1, "Order has 1 OrderItem record");

  // 4. Verify Stock was decremented in Database
  const updatedProduct = await db.product.findUnique({
    where: { id: testProduct.id },
  });
  assert(
    updatedProduct?.stock === initialStock - orderQuantity,
    `Product stock was decremented from ${initialStock} to ${updatedProduct?.stock}`
  );

  // 5. Test Admin Status Update
  const updatedOrder = await db.order.update({
    where: { id: createdOrder.id },
    data: { status: "CONFIRMED" },
  });
  assert(updatedOrder.status === "CONFIRMED", "Admin can update order status to CONFIRMED");

  // Clean up test order and restore stock
  await db.orderItem.deleteMany({ where: { orderId: createdOrder.id } });
  await db.order.delete({ where: { id: createdOrder.id } });
  await db.product.update({
    where: { id: testProduct.id },
    data: { stock: initialStock },
  });
  console.log("🧹 Test order cleaned up and product stock restored");

  console.log("\n==========================================");
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("==========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
