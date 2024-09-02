import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React, { useEffect, } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { getBankDetails } from "@/service/onboarding.service";

interface IBankDetailsProps {
    watch: any;
    setValue: any;
    control: any;
    isPending: boolean;
    errors: any;
    register: any;
    stepCompleted: any;
    handleBack: any;
}

const BankDetailsForm: React.FC<IBankDetailsProps> = ({
    watch,
    setValue,
    control,
    isPending,
    errors,
    register,
    stepCompleted,
    handleBack,
}) => {
    useEffect(() => {
        if (stepCompleted >= "2") {
            fetchBankDetails();
        }
    }, []);

    const fetchBankDetails = async () => {
        try {
            const response = await getBankDetails();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setValue("account_holder_name", response?.data?.account_holder_name);
            setValue("account_number", response?.data?.account_number);
            setValue("ifsc_code", response?.data?.ifsc_code);
            setValue("branch_name", response?.data?.branch_name);
            setValue("account_type", response?.data?.account_type);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <React.Fragment>
            <div className=" mt-2 mb-1 text-default-900 font-semibold text-base">
                <div className=" space-y-4 mb-6">
                    <h1 className="font-semibold flex justify-start items-center gap-3 border-b border-gray-200 py-2">
                        <span className="text-[#ff5757]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                                />
                            </svg>
                        </span>
                        Bank Account Details
                    </h1>
                    <div className="space-y-3">
                        <div className="grid gap-8 grid-cols-3">
                            <div className="">
                                <Label className="mb-2" htmlFor="">
                                    Account Holder Name <span className="text-warning">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    placeholder="Enter account holder name"
                                    id="account_holder_name"
                                    {...register("account_holder_name")}
                                    disabled={isPending}
                                    className={cn("", {
                                        "border-destructive": errors.account_holder_name,
                                    })}
                                />
                                {errors.account_holder_name && (
                                    <div className=" text-destructive text-xs">
                                        {errors.account_holder_name.message}
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <Label className="mb-2" htmlFor="">
                                    Account Number <span className="text-warning">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    placeholder="Enter account number"
                                    id="account_number"
                                    {...register("account_number")}
                                    disabled={isPending}
                                    className={cn("", {
                                        "border-destructive": errors.account_number,
                                    })}
                                />
                                {errors.account_number && (
                                    <div className=" text-destructive text-xs">
                                        {errors.account_number.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-8 grid-cols-3">
                            <div className="">
                                <Label className="mb-2" htmlFor="businessname">
                                    IFSC Code <span className="text-warning">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    placeholder="Enter ifsc code"
                                    id="ifsc_code"
                                    {...register("ifsc_code")}
                                    disabled={isPending}
                                    className={cn("", {
                                        "border-destructive": errors.ifsc_code,
                                    })}
                                />
                                {errors.ifsc_code && (
                                    <div className=" text-destructive text-xs">
                                        {errors.ifsc_code.message}
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <Label className="mb-2" htmlFor="">
                                    Branch <span className="text-warning">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    placeholder="Enter branch name"
                                    id="branch_name"
                                    {...register("branch_name")}
                                    disabled={isPending}
                                    className={cn("", {
                                        "border-destructive": errors.branch_name,
                                    })}
                                />
                                {errors.branch_name && (
                                    <div className=" text-destructive text-xs">
                                        {errors.branch_name.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-8 grid-cols-3">
                            <div className="">
                                <Label className="mb-2" htmlFor="businessname">
                                    Account Type <span className="text-warning">*</span>
                                </Label>
                                <Controller
                                    control={control}
                                    name="account_type"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <Select
                                            onValueChange={onChange}
                                            value={value ? value : undefined}
                                            disabled={isPending}
                                        >
                                            <SelectTrigger
                                                color={errors?.account_type && "destructive"}
                                            >
                                                <SelectValue
                                                    placeholder="Select"
                                                    className="whitespace-nowrap"
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="CURRENT">
                                                    Current Account
                                                </SelectItem>
                                                <SelectItem value="SAVING">Saving Account</SelectItem>
                                                <SelectItem value="LOAN">Loan Account</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.account_type && (
                                    <div className=" text-destructive text-xs">
                                        {errors.account_type.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
};

export default BankDetailsForm;