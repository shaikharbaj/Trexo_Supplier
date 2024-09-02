import { z } from "zod";

const basicInformationSchema = z.object({
  title: z.string().min(1, { message: "Please enter product title" }),
  category_id: z.string().min(1, { message: "Please select category" }),
  brand_id: z.string().min(1, { message: "Please select brand" }),
  uom_id: z.string().min(1, { message: "Please select uom" }),
  tags: z.string().min(1, { message: "Please enter tags" }),
  description: z
    .string()
    .min(1, { message: "Please enter description" })
    .max(1000, { message: "Description too long" }),
  price: z.string().min(1, { message: "Please enter product price" }),
  compare_at_price: z.string().min(1, { message: "Please enter product compare at price" }),
  cost_per_item: z.string().min(1, { message: "Please enter cost per item" }),
  profit: z.string().optional(),
  margin: z.string().optional(),
});

export default basicInformationSchema;
