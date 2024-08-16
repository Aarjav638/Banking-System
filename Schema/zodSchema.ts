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

type formValues = z.infer<typeof contactUsSchema>;



const postQuoteSchema = z.object({
    author_name: z.string().min(1, { message: "Name is required" }).max(50),
    quote: z.string().min(1, { message: "Quote is required" }),
});

type postQuoteValues = z.infer<typeof postQuoteSchema>;

export { contactUsSchema,postQuoteSchema };
export type { formValues, postQuoteValues };
