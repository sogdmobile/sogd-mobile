import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createOrderApiSchema } from "@/lib/validation/checkout";
import { storeConfig } from "@/config/store";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parseResult = createOrderApiSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Некорректные данные заказа",
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      customerName,
      phone,
      messenger,
      deliveryType,
      city,
      address,
      comment,
      items,
    } = parseResult.data;

    // Server-Side Verification: Fetch all products from Database
    const productIds = items.map((i) => i.productId);
    const dbProducts = await db.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    const productMap = new Map(dbProducts.map((p) => [p.id, p]));

    // Validate existence and stock
    let subtotal = 0;
    const validatedItems: Array<{
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      subtotal: number;
    }> = [];

    for (const item of items) {
      const dbProduct = productMap.get(item.productId);

      if (!dbProduct) {
        return NextResponse.json(
          {
            success: false,
            message: `Товар с ID ${item.productId} больше недоступен или удален`,
          },
          { status: 400 }
        );
      }

      if (dbProduct.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `Недостаточно товара «${dbProduct.name}» на складе. Доступно: ${dbProduct.stock} шт.`,
          },
          { status: 400 }
        );
      }

      const itemSubtotal = dbProduct.price * item.quantity;
      subtotal += itemSubtotal;

      validatedItems.push({
        productId: dbProduct.id,
        productName: dbProduct.name,
        price: dbProduct.price,
        quantity: item.quantity,
        subtotal: itemSubtotal,
      });
    }

    // Delivery calculation
    let deliveryCost = 0;
    if (deliveryType === "DELIVERY") {
      deliveryCost =
        subtotal >= storeConfig.delivery.freeDeliveryThreshold
          ? 0
          : storeConfig.delivery.inCityCost;
    }

    const total = subtotal + deliveryCost;

    // Unique readable Order Number
    const timestampCode = Date.now().toString().slice(-5);
    const randomCode = Math.floor(100 + Math.random() * 900);
    const orderNumber = `SOGD-${timestampCode}-${randomCode}`;

    // Execute atomic transaction: Create Order + OrderItems + Decrement Stock
    const order = await db.$transaction(async (tx) => {
      // 1. Create order record
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName,
          phone,
          messenger: messenger || null,
          deliveryType,
          city: deliveryType === "DELIVERY" ? city || storeConfig.city : null,
          address: deliveryType === "DELIVERY" ? address || null : null,
          comment: comment || null,
          paymentMethod: "CASH_ON_DELIVERY",
          status: "NEW",
          subtotal,
          deliveryCost,
          total,
          items: {
            create: validatedItems.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              price: item.price,
              quantity: item.quantity,
              subtotal: item.subtotal,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // 2. Decrement stock for purchased items
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      total: order.total,
      deliveryType: order.deliveryType,
      message: "Заказ успешно создан",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Внутренняя ошибка сервера при создании заказа. Попробуйте еще раз.",
      },
      { status: 500 }
    );
  }
}
