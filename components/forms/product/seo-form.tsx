"use client";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface IBasicInformationProps {
  trans: any;
  isPending: boolean;
  register?: any;
  errors?: any;
}

const ProductSeoForm: React.FC<IBasicInformationProps> = ({
  trans,
  isPending,
  register,
  errors,
}) => {
  return (
    <>
      <div className="space-y-4 mb-6">
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
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>
          </span>
          SEO
        </h1>
        <div className="space-y-3">
          <div className="grid gap-8 grid-cols-2">
            <div>
              <Label className="mb-2" htmlFor="">
                {trans("Page Title")}
                <span className="text-warning">*</span>
              </Label>
              <Input
                disabled={isPending}
                type="text"
                size="lg"
                placeholder={trans("Enter Page Title")}
                {...register("page_title")}
                className={cn("", {
                  "border-destructive": errors?.title,
                })}
              />
              {errors.page_title && (
                <div className="text-destructive text-sm">
                  {trans(errors.page_title.message)}
                </div>
              )}
            </div>
            <div>
              <Label className="mb-2" htmlFor="">
                {trans("Meta Keywords")}
                <span className="text-warning">*</span>
              </Label>
              <Input
                disabled={isPending}
                type="text"
                size="lg"
                placeholder={trans("Enter Meta Keywords")}
                {...register("meta_keywords")}
                className={cn("", {
                  "border-destructive": errors?.title,
                })}
              />
              {errors.meta_keywords && (
                <div className="text-destructive text-sm">
                  {trans(errors.meta_keywords.message)}
                </div>
              )}
            </div>
          </div>
          <div>
            <Label className="mb-2" htmlFor="">
              {trans("Meta Description")}
              <span className="text-warning">*</span>
            </Label>
            <Textarea
              disabled={isPending}
              placeholder={trans("Enter Meta Description")}
              rows={5}
              {...register("meta_description")}
              className={cn("", {
                "border-destructive": errors?.title,
              })}
            />
            {errors.meta_description && (
              <div className="text-destructive text-sm">
                {trans(errors.meta_description.message)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSeoForm;
