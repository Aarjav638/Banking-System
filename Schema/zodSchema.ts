import * as z from "zod";

const contactUsSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(50),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string()
        .min(10, { message: "Phone number must be 10 digits" })
        .max(10, { message: "Phone number must be 10 digits" })
        .regex(/^[0-9]+$/, { message: "Phone number should be a number" }),
    message: z.string().min(1, { message: "Message is required" }),
});

// Profile Update Schema no field is required user can update any field or all fields

const profileUpdate = z.object({
    email: z.string()
      .email({ message: "Invalid email address" })
      .optional()
      .or(z.literal('')), // Allow empty strings without validation
    phone: z.string()
      .min(10, { message: "Phone number must be 10 digits" })
      .max(10, { message: "Phone number must be 10 digits" })
      .regex(/^[0-9]+$/, { message: "Phone number should be a number" })
      .optional()
      .or(z.literal('')), // Allow empty strings without validation
    password: z.string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .optional()
      .or(z.literal('')), // Allow empty strings without validation
  });

type formValues = z.infer<typeof contactUsSchema>;

type profileUpdateValues = z.infer<typeof profileUpdate>;

const postQuoteSchema = z.object({
    author_name: z.string().min(1, { message: "Name is required" }).max(50),
    quote: z.string().min(1, { message: "Quote is required" }),
});

type postQuoteValues = z.infer<typeof postQuoteSchema>;

export { contactUsSchema,postQuoteSchema,profileUpdate };
export type { formValues, postQuoteValues,profileUpdateValues };
