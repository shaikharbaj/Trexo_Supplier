import { z } from "zod";

const resetPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string()
        .min(1, { message: "Please enter a password" })
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be at most 100 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\#])[A-Za-z\d@$!%*?&#]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confirmPassword: z.string()
        .min(1, { message: "Please re-enter the password" }),
    token: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"],
});

export default resetPasswordSchema;
