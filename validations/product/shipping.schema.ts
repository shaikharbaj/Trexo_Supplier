import { z } from "zod";

const shippingSchema = z
  .object({
    physical_product: z.boolean(),
    weight: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.physical_product === true && Number(data.weight) === 0) {
        return false;
      }
      return true;
    },
    {
      message: "Weight is required for physical product",
      path: ["weight"],
    }
  );

export default shippingSchema;
