"use client";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchProductCategoryDropdownforSeller } from "@/service/category.service";
import { fetchBrandDropdown } from "@/service/brand.service";
import { fetchUomDropdown } from "@/service/uom.service";

interface IBasicInformationProps {
  trans: any;
  setFormInit: any;
  isPending: boolean;
  register?: any;
  control?: any;
  errors?: any;
}

interface Category {
  id: number;
  category_name: string;
}

interface Brand {
  id: number;
  brand_name: string;
}

interface Uom {
  id: number;
  uom_code: string;
}

const ProductBasicInformationForm: React.FC<IBasicInformationProps> = ({
  trans,
  setFormInit,
  isPending,
  register,
  control,
  errors,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [uoms, setUoms] = useState<Uom[]>([]);

  useEffect(() => {
    if (categories.length === 0) {
      fetchProductCategories();
    }
    if (brands.length === 0) {
      fetchBrands();
    }
    if (uoms.length === 0) {
      fetchUoms();
    }
  }, []);

  useEffect(() => {
    if (categories.length > 0 && brands.length > 0 && uoms.length > 0) {
      setFormInit(true);
    }
  }, [categories, brands, uoms]);

  //Function to fetch product categorties
  const fetchProductCategories = async () => {
    try {
      const response = await fetchProductCategoryDropdownforSeller();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setCategories(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  //Function to fetch brands
  const fetchBrands = async () => {
    try {
      const response = await fetchBrandDropdown();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setBrands(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  //Function to fetch uoms
  const fetchUoms = async () => {
    try {
      const response = await fetchUomDropdown();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setUoms(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleKeyDown = (event: any) => {
    if (
      event.key === "-" ||
      event.key === "+" ||
      event.key === "e" ||
      event.key === "E"
    ) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className=" space-y-4 mb-6">
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
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
              />
            </svg>
          </span>
          Basic Information
        </h1>
        <div className="space-y-3">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="">
              <Label className="mb-2" htmlFor="">
                {trans("Product Title")}
                <span className="text-warning">*</span>
              </Label>
              <Input
                disabled={isPending}
                type="text"
                size="lg"
                placeholder={trans("Enter product title")}
                {...register("title")}
                className={cn("", {
                  "border-destructive": errors?.title,
                })}
              />
              {errors.title && (
                <div className="text-destructive text-sm">
                  {trans(errors.title.message)}
                </div>
              )}
            </div>
            <div>
              <Label className="mb-2" htmlFor="">
                {trans("Category")}
                <span className="text-warning">*</span>
              </Label>
              <Controller
                control={control}
                name="category_id"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value ? value : undefined}
                    disabled={isPending}
                  >
                    <SelectTrigger color={errors?.category_id && "destructive"}>
                      <SelectValue
                        placeholder={trans("Select Category")}
                        className="whitespace-nowrap"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(
                        (category: any, categoryIndex: number) => {
                          return (
                            <SelectItem
                              key={categoryIndex}
                              value={String(category.id)}
                            >
                              {category.category_name}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category_id && (
                <div className="text-destructive text-sm">
                  {trans(errors.category_id.message)}
                </div>
              )}
            </div>
            <div>
              <Label className="mb-2" htmlFor="">
                {trans("Brand")}
                <span className="text-warning">*</span>
              </Label>
              <Controller
                control={control}
                name="brand_id"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value ? value : undefined}
                    disabled={isPending}
                  >
                    <SelectTrigger color={errors?.brand_id && "destructive"}>
                      <SelectValue
                        placeholder={trans("Select Brand")}
                        className="whitespace-nowrap"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand: any, brandIndex: number) => {
                        return (
                          <SelectItem key={brandIndex} value={String(brand.id)}>
                            {brand.brand_name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.brand_id && (
                <div className="text-destructive text-sm">
                  {trans(errors.brand_id.message)}
                </div>
              )}
            </div>
            <div>
              <Label className="mb-2" htmlFor="">
                {trans("Unit")}
                <span className="text-warning">*</span>
              </Label>
              <Controller
                control={control}
                name="uom_id"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value ? value : undefined}
                    disabled={isPending}
                  >
                    <SelectTrigger color={errors?.uom_id && "destructive"}>
                      <SelectValue
                        placeholder={trans("Select Uom")}
                        className="whitespace-nowrap"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {uoms.map((uom: any, uomIndex: number) => {
                        return (
                          <SelectItem key={uomIndex} value={String(uom.id)}>
                            {uom.uom_code}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.uom_id && (
                <div className="text-destructive text-sm">
                  {trans(errors.uom_id.message)}
                </div>
              )}
            </div>
            <div>
              <Label className="mb-2" htmlFor="">
                {trans("Tags")}
                <span className="text-warning">*</span>
              </Label>
              <Input
                disabled={isPending}
                type="text"
                size="lg"
                placeholder={trans("Enter product tags")}
                {...register("tags")}
                className={cn("", {
                  "border-destructive": errors?.tags,
                })}
              />
              {errors.tags && (
                <div className="text-destructive text-sm">
                  {trans(errors.tags.message)}
                </div>
              )}
            </div>
          </div>
          <div>
            <Label className="mb-2" htmlFor="">
              {trans("Descrption")}
              <span className="text-warning">*</span>
            </Label>
            <Textarea
              rows={3}
              disabled={isPending}
              placeholder={trans("Enter product description")}
              {...register("description")}
              className={cn("", {
                "border-destructive": errors?.description,
              })}
            />
            {errors.description && (
              <div className="text-destructive text-sm">
                {trans(errors.description.message)}
              </div>
            )}
          </div>
          <div>
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
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                  />
                </svg>
              </span>
              Pricing
            </h1>
            <div className="space-y-3 mt-4">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="">
                  <Label className="mb-2" htmlFor="">
                    {trans("Price")}
                    <span className="text-warning">*</span>
                  </Label>
                  <Input
                    disabled={isPending}
                    type="number"
                    size="lg"
                    placeholder={trans("Enter product price")}
                    step="0.01"
                    min="0"
                    onKeyDown={handleKeyDown}
                    {...register("price")}
                    className={cn("", {
                      "border-destructive": errors?.title,
                    })}
                  />
                  {errors.price && (
                    <div className="text-destructive text-sm">
                      {trans(errors.price.message)}
                    </div>
                  )}
                </div>
                <div className="">
                  <Label className="mb-2" htmlFor="">
                    {trans("Compare At Price")}
                    <span className="text-warning">*</span>
                  </Label>
                  <Input
                    disabled={isPending}
                    type="number"
                    size="lg"
                    placeholder={trans("Enter product compare at price")}
                    step="0.01"
                    min="0"
                    onKeyDown={handleKeyDown}
                    {...register("compare_at_price")}
                    className={cn("", {
                      "border-destructive": errors?.title,
                    })}
                  />
                  {errors.compare_at_price && (
                    <div className="text-destructive text-sm">
                      {trans(errors.compare_at_price.message)}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <div className="">
                  <Label className="mb-2" htmlFor="">
                    {trans("Cost Per Item")}
                    <span className="text-warning">*</span>
                  </Label>
                  <Input
                    disabled={isPending}
                    type="number"
                    size="lg"
                    placeholder={trans("Enter cost per item")}
                    step="0.01"
                    min="0"
                    onKeyDown={handleKeyDown}
                    {...register("cost_per_item")}
                    className={cn("", {
                      "border-destructive": errors?.title,
                    })}
                  />
                  {errors.cost_per_item && (
                    <div className="text-destructive text-sm">
                      {trans(errors.cost_per_item.message)}
                    </div>
                  )}
                </div>
                <div className="">
                  <Label className="mb-2" htmlFor="">
                    {trans("Profit")}
                  </Label>
                  <Input
                    disabled={true}
                    type="text"
                    size="lg"
                    {...register("profit")}
                  />
                </div>
                <div className="">
                  <Label className="mb-2" htmlFor="">
                    {trans("Margin")}
                  </Label>
                  <Input
                    disabled={true}
                    type="text"
                    size="lg"
                    {...register("margin")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBasicInformationForm;
