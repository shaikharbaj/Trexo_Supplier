"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "../ui/card";
import ProductBreadcrumb from "./component/product-breadcrumd";
import ProductStepper from "./component/stepper";
import { Button } from "../ui/button";
import { ProductShippingForm } from "../forms";
import { fetchProductShippingInformation, submitProductShippingInformation } from "@/service/product.service";
import { shippingSchema } from "@/validations";

interface IProductShippingProps {}

const ProductShipping = () => {
  const CURRENT_STEP = 5;
  const t = useTranslations("ProductShippingPage");
  const [product, setProduct] = useState<any>({});
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const productToken = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "all",
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      physical_product: true,
      weight: "0.00",
    },
  });

  useEffect(() => {
    handelFetchProductShippingInformation();
  }, [productToken]);

  useEffect(() => {
    if(Object.keys(product).length > 0) {
      setValue('physical_product',product?.physical_product);
      setValue('weight', product?.weight);
    }
  }, [product]);

  //Function to fetch product shipping information
  const handelFetchProductShippingInformation = async () => {
    try {
      if(productToken) {
        const response = await fetchProductShippingInformation(productToken);
        if(response?.status === false) {
          toast.error(response?.message);
          return;
        }
        setProduct(response?.data);
      }
    } catch (error: any) {
      toast.error(error?.message || t("An error occurred"));
    }
  };

  //Function to handel back
  const handelPrevious = () => {
    navigation.push(`/product/variant?token=${productToken}`);
  };

  //Function to handel submit
  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        payload['weight'] = parseFloat(payload['weight']);
        const response = await submitProductShippingInformation(productToken, payload);
        if (response?.status === false) {
          toast.error(response?.message);
          return;
        }
        toast.success(response?.message);
        navigation.push(`/product/seo?token=${productToken}`);
      } catch (error: any) {
        toast.error(error?.message || t("An error occurred"));
      }
    });
  };

  //Function to navigate to next screen
  const handelNext = () => {
    if (product?.step_completed >= CURRENT_STEP) {
      navigation.push(`/product/seo?token=${productToken}`);
    }
  };
  
  return (
    <div className="space-y-6">
      <ProductBreadcrumb />
      <div className="grid gap-6">
        <div className="w-full grid md:grid-cols-12 gap-6">
          <div className=" md:col-span-2">
            <ProductStepper currentStep={4} />
          </div>
          <div className=" md:col-span-10">
            <Card>
              <CardContent className="p-1 md:p-5">
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <div className="mb-1 text-default-900 font-semibold text-base">
                    {/* Form */}
                    <ProductShippingForm
                      trans={t}
                      isPending={isPending}
                      register={register}
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="flex pt-2 ">
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      color="secondary"
                      className="cursor-pointer"
                      onClick={handelPrevious}
                    >
                      {t("Previous")}
                    </Button>
                    <div className="flex-1	gap-4 " />
                    <div className="flex	gap-2 ">
                      <Button
                        type="submit"
                        size="lg"
                        variant="outline"
                        color="primary"
                        className="cursor-pointer"
                      >
                        {isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isPending ? `${t('Loading')}...` : t('Submit')}
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

export default ProductShipping;
