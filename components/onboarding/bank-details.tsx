"use client";
import React, { } from "react";
import { useRouter } from "next/navigation";
import { OnboardingStepper } from "../partials/onboarding";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bankDetailsSchema from "@/validations/onboarding/bank-details-schema";
import toast from "react-hot-toast";
import { submitBankDetails } from "@/service/onboarding.service";
import { getCookie, setCookie } from "@/utils/cookie";
import { BankDetailsForm } from "../forms";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface IBankDetails { }

const BankDetails: React.FC<IBankDetails> = () => {
    const stepCompleted = getCookie("step_completed") || 0;
    const navigation = useRouter();
    const handleBack = () => {
        navigation.replace("/onboarding/basic-details");
    };
    const [isPending, startTransition] = React.useTransition();

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(bankDetailsSchema),
        defaultValues: {
            account_holder_name: "",
            account_number: "",
            ifsc_code: "",
            branch_name: "",
            account_type: "",
        },
    });

    const onSubmit = (payload: any) => {
        startTransition(async () => {
            try {
                const response = await submitBankDetails(payload);
                if (response?.status === true && response?.statusCode === 200) {
                    toast.success(response?.message);
                    if (stepCompleted < "2") {
                        setCookie("step_completed", 2);
                    }
                    navigation.replace("/onboarding/verification");
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
            <OnboardingStepper activestep="1" />
            <div className="container">
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <BankDetailsForm
                        watch={watch}
                        setValue={setValue}
                        control={control}
                        isPending={isPending}
                        errors={errors}
                        register={register}
                        stepCompleted={stepCompleted}
                        handleBack={handleBack}
                    />
                    <div className="flex pt-2 ">
                        <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            color="secondary"
                            className="cursor-pointer"
                            onClick={handleBack}
                            disabled={isPending}
                        >
                            Back
                        </Button>
                        <div className="flex-1 gap-4 " />
                        <div className="flex gap-2 ">
                            <Button
                                type="submit"
                                size="lg"
                                variant="outline"
                                color="primary"
                                className="cursor-pointer"
                                disabled={isPending}
                            >
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isPending ? "Loading" + "..." : "Next"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default BankDetails;