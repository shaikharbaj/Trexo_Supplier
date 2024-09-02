import { z } from "zod";

const registerSchema = z.object({
    first_name: z.string()
        .min(1, { message: "Please enter first name" })
        .regex(/^[a-zA-Z\s]+$/, "First name must not contain special characters"),

    last_name: z.string()
        .min(1, { message: "Please enter last name" })
        .regex(/^[a-zA-Z\s]+$/, "Last name must not contain special characters"),

    email: z.string()
        .min(1, { message: 'Please enter email.' })
        .email({ message: "Please enter valid email." }),

    mobile_number: z.string()
        .min(1, { message: "Please enter mobile number" })
        .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid mobile number"),

    password: z.string()
        .min(1, { message: "Please enter password" })
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be at most 100 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\#])[A-Za-z\d@$!%*?&#]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confirmPassword: z.string()
        .min(1, { message: "Please re-enter password" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"],
});

export default registerSchema;
