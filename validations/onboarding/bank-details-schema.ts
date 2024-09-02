import { z } from "zod";

const bankDetailsSchema = z.object({
    account_holder_name: z.string().min(1, { message: "Please enter account holder name" }),
    account_number: z.string()
    .min(1, { message: "Please enter account number" })
    .regex(/^\d+$/, { message: "Account number should contain only numbers" }),
    ifsc_code: z.string().min(1, { message: "Please enter ifsc code" }),
    branch_name: z.string().min(1, { message: "Please enter branch name" }),
    account_type: z.string().min(1, { message: "Please select account type" }),
});

export default bankDetailsSchema;
