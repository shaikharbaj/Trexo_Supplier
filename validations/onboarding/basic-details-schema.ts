import { z } from "zod";

const basicDetailsSchema = z.object({
    business_type: z.string().min(1, { message: "Please select business type" }),
    establishment: z.string().min(1, { message: "Please select establishment" }),
    operation_locations: z.string().min(1, { message: "Please select operation location" }),
    company_name: z.string().min(1, { message: "Please enter company name" }),
    company_offerings: z.string().min(1, { message: "Please select company offerings" }),
    product_industry_id: z.string().min(1, { message: "Please select industry" }),
    product_category_id: z.coerce.string().array().min(1, { message: "Please select category" }),
    gst_number: z.string().min(1, { message: "Please enter gst number" }),
    pan_card_number: z.string().min(1, { message: "Please enter pan card number" }),
});

export default basicDetailsSchema;
