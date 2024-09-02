import { z } from "zod";

const seoSchema = z.object({
  page_title: z
    .string()
    .min(1, { message: "Please enter page title" })
    .max(250, { message: "Page title too long" }),
  meta_keywords: z
    .string()
    .min(1, { message: "Please enter meta keywords" })
    .max(250, { message: "Meta keyword too long" }),
  meta_description: z
    .string()
    .min(1, { message: "Please enter meta description" })
    .max(500, { message: "Meta description too long" }),
});

export default seoSchema;
