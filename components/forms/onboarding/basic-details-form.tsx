import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { fetchCategoryById } from '@/service/category.service';
import { fetchIndustryDropdown } from '@/service/industry.service';
import { getBasicDetails } from '@/service/onboarding.service';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { default as MultiSelect } from "react-select";

interface IBasicDetailsProps {
    watch: any;
    setValue: any;
    control: any;
    isPending: boolean;
    errors: any;
    register: any;
    stepCompleted: any;
}

interface Industry {
    id: string;
    industry_name: string;
}

interface Category {
    id: string;
    category_name: string;
}

const BasicDetailsForm: React.FC<IBasicDetailsProps> = ({
    watch,
    setValue,
    control,
    isPending,
    errors,
    register,
    stepCompleted
}) => {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const product_industry_id: any = watch("product_industry_id");

    useEffect(() => {
        if (product_industry_id !== "") {
            fetchCategory();
        }
    }, [product_industry_id]);

    useEffect(() => {
        if (stepCompleted >= "1") {
            fetchBasicDetails();
        }
        fetchIndustry();
    }, []);

    const fetchBasicDetails = async () => {
        try {
            const response = await getBasicDetails();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setValue("business_type", response?.data?.business_type);
            setValue("establishment", response?.data?.establishment);
            setValue("operation_locations", response?.data?.operation_locations);
            setValue("company_name", response?.data?.company_name);
            setValue("company_offerings", response?.data?.company_offerings);
            setValue("product_industry_id", response?.data?.product_industry_id);
            setValue("product_category_id", response?.data?.product_category_id);
            setValue("gst_number", response?.data?.gst_number);
            setValue("pan_card_number", response?.data?.pan_card_number);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    //Function to fetch industries
    const fetchIndustry = async () => {
        try {
            const response = await fetchIndustryDropdown();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setIndustries(response?.data);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    //Function to fetch category
    const fetchCategory = async () => {
        try {
            const response = await fetchCategoryById(product_industry_id);
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setCategories([]);
            setRefresh((prev) => !prev);
            setCategories(response?.data);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <React.Fragment>
            <div className="mt-2 mb-1 text-default-900 font-semibold text-base">

                <div className="space-y-4 mb-6">
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
                        Know your customer
                    </h1>
                    <div className="space-y-2">
                        <h2 className="font-semibold text-[14px] text-[#192537]">
                            1. Are you a manufacturer / trader / retailer?{" "}
                            <span className="text-warning">*</span>
                        </h2>
                        <div className="flex justify-start items-center py-1">
                            <Controller
                                control={control}
                                name="business_type"
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <RadioGroup
                                        value={value}
                                        onValueChange={onChange}
                                        disabled={isPending}
                                    >
                                        <RadioGroupItem value="MANUFACTURER" id="r_1">
                                            Manufacturer
                                        </RadioGroupItem>
                                        <RadioGroupItem value="TRADER" id="r_2">
                                            Trader
                                        </RadioGroupItem>
                                        <RadioGroupItem value="RETAILER" id="r_3">
                                            Retailer
                                        </RadioGroupItem>
                                        <RadioGroupItem value="ALL" id="r_4">
                                            All
                                        </RadioGroupItem>
                                    </RadioGroup>
                                )}
                            />
                        </div>
                        {errors?.business_type && (
                            <div className="text-destructive text-xs">
                                {errors?.business_type?.message}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-semibold text-[14px] text-[#192537]">
                            2. What is your firm establishment year?{" "}
                            <span className="text-warning">*</span>
                        </h2>
                        <div className="flex justify-start items-center py-1">
                            <Controller
                                control={control}
                                name="establishment"
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <RadioGroup
                                        value={value}
                                        onValueChange={onChange}
                                        disabled={isPending}
                                    >
                                        <RadioGroupItem value="Before 2000" id="d_1">
                                            Before 2000
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                            value="Between 2001 to 2010"
                                            id="d_2"
                                        >
                                            Between 2001 to 2010
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                            value="Between 2011 to 2020"
                                            id="d_3"
                                        >
                                            Between 2011 to 2020
                                        </RadioGroupItem>
                                        <RadioGroupItem value="After 2020" id="d_4">
                                            After 2020
                                        </RadioGroupItem>
                                    </RadioGroup>
                                )}
                            />
                        </div>
                        {errors?.establishment && (
                            <div className="text-destructive text-xs">
                                {errors?.establishment?.message}
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <h2 className="font-semibold text-[14px] text-[#192537]">
                            3. How many locations your product is operated in India?{" "}
                            <span className="text-warning">*</span>
                        </h2>
                        <div className="flex justify-start items-center py-1">
                            <Controller
                                control={control}
                                name="operation_locations"
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <RadioGroup
                                        value={value}
                                        onValueChange={onChange}
                                        disabled={isPending}
                                    >
                                        <RadioGroupItem value="Less than 5" id="a_1">
                                            Less than 5
                                        </RadioGroupItem>
                                        <RadioGroupItem value="In Between 5 to 10" id="a_2">
                                            In Between 5 to 10
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                            value="In Between 11 to 15"
                                            id="a_3"
                                        >
                                            In Between 11 to 15
                                        </RadioGroupItem>
                                        <RadioGroupItem value="More than 15" id="a_4">
                                            More than 15
                                        </RadioGroupItem>
                                    </RadioGroup>
                                )}
                            />
                        </div>
                        {errors?.operation_locations && (
                            <div className="text-destructive text-xs">
                                {errors?.operation_locations?.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-4 mb-6">
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
                        Business Details
                    </h1>
                    <div className="space-y-3">
                        <div className="grid gap-8 grid-cols-5">
                            <div className="col-span-2">
                                <Label className="mb-2" htmlFor="company_name">
                                    Business Name <span className="text-warning">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    placeholder="Enter Business Name"
                                    id="company_name"
                                    {...register("company_name")}
                                    disabled={isPending}
                                    className={cn("", {
                                        "border-destructive": errors?.company_name,
                                    })}
                                />
                                {errors?.company_name && (
                                    <div className="text-destructive text-xs">
                                        {errors?.company_name?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-8 grid-cols-5">
                            <div>
                                <Label className="mb-2" htmlFor="product_or_services">
                                    Product / Services{" "}
                                    <span className="text-warning">*</span>
                                </Label>
                                <Controller
                                    control={control}
                                    name="company_offerings"
                                    render={({
                                        field: { onChange, onBlur, value, ref },
                                    }) => (
                                        <Select
                                            onValueChange={onChange}
                                            value={value ? value : undefined}
                                            disabled={isPending}
                                        >
                                            <SelectTrigger
                                                color={
                                                    errors?.company_offerings && "destructive"
                                                }
                                            >
                                                <SelectValue
                                                    placeholder="Select"
                                                    className="whitespace-nowrap"
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="PRODUCT">Product</SelectItem>
                                                <SelectItem value="SERVICES">
                                                    Services
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors?.company_offerings && (
                                    <div className="text-destructive text-xs">
                                        {errors?.company_offerings?.message}
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label className="mb-2" htmlFor="product_industry_id">
                                    Product Industry{" "}
                                    <span className="text-warning">*</span>
                                </Label>
                                <Controller
                                    control={control}
                                    name="product_industry_id"
                                    render={({
                                        field: { onChange, onBlur, value, ref },
                                    }) => (
                                        <Select
                                            onValueChange={onChange}
                                            value={value ? value : undefined}
                                            disabled={isPending}
                                        >
                                            <SelectTrigger
                                                color={
                                                    errors?.product_industry_id && "destructive"
                                                }
                                            >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {industries.map(
                                                    (industry: any, industryIndex: number) => {
                                                        return (
                                                            <SelectItem
                                                                key={industryIndex}
                                                                value={String(industry.id)}
                                                            >
                                                                {industry.industry_name}
                                                            </SelectItem>
                                                        );
                                                    }
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors?.product_industry_id && (
                                    <div className="text-destructive text-xs">
                                        {errors?.product_industry_id?.message}
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <Label className="mb-2" htmlFor="gst_number">
                                    GSTIN <span className="text-warning">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    placeholder="GSTIN"
                                    id="gst_number"
                                    {...register("gst_number")}
                                    disabled={isPending}
                                    className={cn("", {
                                        "border-destructive": errors?.gst_number,
                                    })}
                                />
                                {errors?.gst_number && (
                                    <div className="text-destructive text-xs">
                                        {errors?.gst_number?.message}
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label className="mb-2" htmlFor="pan_card_number">
                                    Business PAN <span className="text-warning">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    placeholder="Business PAN"
                                    id="pan_card_number"
                                    {...register("pan_card_number")}
                                    disabled={isPending}
                                    className={cn("", {
                                        "border-destructive": errors?.pan_card_number,
                                    })}
                                />
                                {errors?.pan_card_number && (
                                    <div className="text-destructive text-xs">
                                        {errors?.pan_card_number?.message}
                                    </div>
                                )}
                            </div>

                           
                        </div>
                        <div>
                                <Label className="mb-2" htmlFor="product_category_id">
                                    Product Category{" "}
                                    <span className="text-warning">*</span>
                                </Label>
                                <Controller
                                    control={control}
                                    name="product_category_id"
                                    disabled={isPending}
                                    render={({ field: { onChange, value } }) => (
                                        <MultiSelect
                                            key={String(refresh)}
                                            className={`${true ? "border-red-500" : "border-gray-300"
                                                }`}
                                            isMulti
                                            options={categories.map((category) => ({
                                                value: String(category.id),
                                                label: category.category_name,
                                            }))}
                                            value={categories
                                                .filter((category) =>
                                                    value?.includes(String(category.id))
                                                )
                                                .map((category) => ({
                                                    value: category.id,
                                                    label: category.category_name,
                                                }))}
                                            onChange={(selected: any) => {
                                                onChange(
                                                    selected
                                                        ? selected.map((item: any) => item.value)
                                                        : []
                                                );
                                            }}
                                            styles={{
                                                control: (baseStyles: any, state: any) => ({
                                                    ...baseStyles,
                                                    borderColor: errors?.product_category_id
                                                        ? "#EF4444"
                                                        : baseStyles.borderColor,
                                                    "&:hover": {
                                                        borderColor: errors?.product_category_id
                                                            ? "#EF4444"
                                                            : baseStyles.borderColor,
                                                    },
                                                }),
                                                placeholder: (baseStyles: any, state: any) => ({
                                                    ...baseStyles,
                                                    color: errors?.product_category_id
                                                        ? "#EF4444"
                                                        : baseStyles.color,
                                                }),
                                            }}
                                            placeholder="Select"
                                        />
                                    )}
                                />
                                {errors.product_category_id && (
                                    <div className="text-destructive text-xs">
                                        {errors.product_category_id.message}
                                    </div>
                                )}
                            </div>
                    </div>
                </div>


            </div>
        </React.Fragment>
    )
}

export default BasicDetailsForm
