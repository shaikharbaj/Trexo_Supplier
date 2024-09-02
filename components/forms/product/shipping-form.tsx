"use client";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IBasicInformationProps {
  trans: any;
  isPending: boolean;
  register?: any;
  control?: any;
  errors?: any;
}

const ProductShippingForm: React.FC<IBasicInformationProps> = ({
  trans,
  isPending,
  register,
  control,
  errors,
}) => {
  return (
    <>
      <div className="space-y-3 mb-6">
        <h1 className="font-semibold flex justify-start items-center gap-3 border-b border-gray-200 py-2">
          <span className="text-primary">
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
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </span>
          Shipping
        </h1>
        <div className="flex gap-6 flex-wrap pt-4">
          <input type="checkbox" {...register("physical_product")} />{" "}
          <span className="">This is physical product</span>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <div>
            <Label className="mb-2" htmlFor="">
              Weight
              <span className="text-warning">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Input
                disabled={isPending}
                type="number"
                size="lg"
                placeholder="0.00"
                step="0.01"
                min="0"
                {...register("weight")}
                className={cn("", {
                  "border-destructive": errors?.title,
                })}
              />
              <div className="w-1/4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="KG" />
                  </SelectTrigger>
                </Select>
              </div>
            </div>
            {errors.weight && (
              <div className="text-destructive text-sm">
                {trans(errors.weight.message)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductShippingForm;
