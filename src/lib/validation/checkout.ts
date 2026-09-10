import { z } from "zod";

export const checkoutFormSchema = z
  .object({
    customerName: z
      .string()
      .trim()
      .min(2, { message: "Пожалуйста, укажите ваше имя (минимум 2 символа)" })
      .max(100, { message: "Имя слишком длинное" }),
    phone: z
      .string()
      .trim()
      .min(9, { message: "Укажите корректный номер телефона (например: 920000000 или +992...)" })
      .regex(/^(\+?992)?[0-9]{9}$/, {
        message: "Номер должен содержать 9 цифр (например, 92 000 0000)",
      }),
    messenger: z.string().trim().optional(),
    deliveryType: z.enum(["DELIVERY", "PICKUP"]),
    city: z.string().trim().optional(),
    address: z.string().trim().optional(),
    comment: z.string().trim().max(500, { message: "Комментарий до 500 символов" }).optional(),
    paymentMethod: z.literal("CASH_ON_DELIVERY"),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryType === "DELIVERY") {
      if (!data.city || data.city.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["city"],
          message: "Укажите город доставки (например, Худжанд)",
        });
      }
      if (!data.address || data.address.trim().length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address"],
          message: "Укажите точный адрес доставки (улица, дом, кв./офис)",
        });
      }
    }
  });

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export const createOrderApiSchema = z.object({
  customerName: z.string().min(2).max(100),
  phone: z.string().min(9),
  messenger: z.string().optional(),
  deliveryType: z.enum(["DELIVERY", "PICKUP"]),
  city: z.string().optional(),
  address: z.string().optional(),
  comment: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive().max(50),
      })
    )
    .min(1, { message: "Корзина не должна быть пустой" }),
});

export type CreateOrderApiInput = z.infer<typeof createOrderApiSchema>;
