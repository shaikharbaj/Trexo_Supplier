import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter valid email." }),
});

export default forgotPasswordSchema;
