import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(1, { message: 'Please enter password.' }),
});

export default loginSchema;
