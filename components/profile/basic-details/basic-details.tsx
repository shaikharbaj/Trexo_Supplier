"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import basicDetailsSchema from "@/validations/onboarding/basic-details-schema";
import {
    submitBasicDetails,
} from "@/service/onboarding.service";
import { getCookie, setCookie } from "@/utils/cookie";
import { Loader2 } from "lucide-react";
import { BasicDetailsForm } from "@/components/forms";

interface IBasicDetails { }

const BasicDetails: React.FC<IBasicDetails> = () => {
    const stepCompleted = getCookie("step_completed") || 0;
    const navigation = useRouter();
    const [isPending, startTransition] = React.useTransition();
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: zodResolver(basicDetailsSchema),
        defaultValues: {
            business_type: "",
            establishment: "",
            operation_locations: "",
            company_name: "",
            company_offerings: "",
            product_industry_id: "",
            product_category_id: "",
            gst_number: "",
            pan_card_number: "",
        },
    });

    const onSubmit = (payload: any) => {
        startTransition(async () => {
            try {
                const response = await submitBasicDetails(payload);
                if (response?.status === true && response?.statusCode === 200) {
                    toast.success(response?.message);
                    if (stepCompleted < "1") {
                        setCookie("step_completed", 1);
                    }
                } else {
                    toast.error(response?.message || "An error occurred");
                }
            } catch (error: any) {
                toast.error(error?.message || "An error occurred");
            }
        });
    };

    return (
        <>
            <div className="">
                <div className="container">
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <BasicDetailsForm
                            watch={watch}
                            setValue={setValue}
                            control={control}
                            isPending={isPending}
                            errors={errors}
                            register={register}
                            stepCompleted={stepCompleted}
                        />
                        <div className="flex pt-2">
                            <div className="flex-1 gap-4" />
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    size="lg"
                                    variant="outline"
                                    color="primary"
                                    className="cursor-pointer"
                                    disabled={isPending}
                                >
                                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isPending ? "Cacelling" + "..." : "Cancel"}
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="outline"
                                    color="primary"
                                    className="cursor-pointer"
                                    disabled={isPending}
                                >
                                    {isPending && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {isPending ? "Saving" + "..." : "Save"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
};

export default BasicDetails;
