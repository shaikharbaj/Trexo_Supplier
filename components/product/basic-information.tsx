"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import ProductBreadcrumb from "./component/product-breadcrumd";
import ProductStepper from "./component/stepper";
import { Button } from "../ui/button";
import { ProductBasicInformationForm } from "../forms";
import { basicInformationSchema } from "@/validations";
import {
  fetchProductBasicInformation,
  submitProductBasicInformation,
} from "@/service/product.service";

interface IProductBasicInformationProps {}

const ProductBasicInformation = () => {
  const CURRENT_STEP = 1;
  const t = useTranslations("ProductBasicInformation");
  const [formInit, setFormInit] = useState<Boolean>(false);
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const productToken = searchParams.get("token");
  const [product, setProduct] = useState<any>({});
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    mode: "all",
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      title: "",
      category_id: "",
      brand_id: "",
      uom_id: "",
      tags: "",
      description: "",
      price: "",
      compare_at_price: "",
      cost_per_item: "",
      profit: "",
      margin: "",
    },
  });
  const priceWatch = watch("price");
  const costPerItemWatch = watch("cost_per_item");

  useEffect(() => {
    handelFetchProductBasicInformation();
  }, [formInit]);

  useEffect(() => {
    if (priceWatch && costPerItemWatch) {
      const profit = parseFloat(priceWatch) - parseFloat(costPerItemWatch);
      const margin = (profit / parseFloat(priceWatch)) * 100;
      const roundedMargin = Math.ceil(margin * 100) / 100;
      setValue("profit", profit.toString());
      setValue("margin", `${roundedMargin.toString()}%`);
      return;
    }
    setValue("profit", "");
    setValue("margin", "");
  }, [priceWatch, costPerItemWatch]);

  //Function to fetch product basic information
  const handelFetchProductBasicInformation = async () => {
    try {
      if (productToken) {
        const response = await fetchProductBasicInformation(productToken);
        if (response?.status === false) {
          toast.error(response?.message);
          return;
        }
        const data = response?.data;
        setValue("title", data?.title);
        setValue("category_id", data?.category_id);
        setValue("brand_id", data?.brand_id);
        setValue("uom_id", data?.uom_id);
        setValue("description", data?.description);
        setValue("price", data?.price);
        setValue("compare_at_price", data?.compare_at_price);
        setValue("cost_per_item", data?.price_per_item);
        setValue("profit", data?.profit);
        setValue("margin", `${data?.margin}%`);
        if (Array.isArray(data?.tags)) {
          const tagsString = data?.tags.join(",");
          setValue("tags", tagsString);
        } else {
          setValue("tags", data?.tags);
        }
        setProduct(data);
      }
    } catch (error: any) {
      toast.error(error?.message || t("An error occurred"));
    }
  };

  //Function to handel submit
  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        const newPayload = {
          ...payload,
          uuid: productToken,
        };
        const response = await submitProductBasicInformation(newPayload);
        if (response?.status !== true && response?.statusCode !== 200) {
          toast.error(response?.message);
          return;
        }
        toast.success(response?.message);
        navigation.push(`/product/location?token=${response?.data?.uuid}`);
      } catch (error: any) {
        toast.error(error?.message || t("An error occurred"));
      }
    });
  };

  //Function to navigate to next screen
  const handelNext = () => {
    if (product?.step_completed >= CURRENT_STEP) {
      navigation.push(`/product/location?token=${productToken}`);
    }
  };

  return (
    <div className="space-y-6">
      <ProductBreadcrumb />
      <div className="grid gap-6">
        <div className="w-full grid md:grid-cols-12 gap-6">
          <div className=" md:col-span-2">
            <ProductStepper currentStep={0} />
          </div>
          <div className=" md:col-span-10">
            <Card>
              <CardContent className="p-1 md:p-5">
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <div className="mb-1 text-default-900 font-semibold text-base">
                    {/* Form */}
                    <ProductBasicInformationForm
                      trans={t}
                      setFormInit={setFormInit}
                      isPending={isPending}
                      register={register}
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="flex pt-2 ">
                    <div className="flex-1	gap-4 " />
                    <div className="flex	gap-2 ">
                      <Button
                        type="submit"
                        disabled={isPending}
                        size="lg"
                        variant="outline"
                        color="primary"
                        className="cursor-pointer"
                      >
                        {isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isPending ? `${t("Loading")}...` : t("Submit")}
                      </Button>
                      {product?.step_completed >= CURRENT_STEP && (
                        <Button
                          type="button"
                          size="lg"
                          variant="outline"
                          color="primary"
                          className="cursor-pointer"
                          onClick={handelNext}
                        >
                          {t("Next")}
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInformation;
