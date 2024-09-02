"use client";
import { useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import ProductBreadcrumb from "./component/product-breadcrumd";
import ProductStepper from "./component/stepper";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSeoForm } from "../forms";
import { seoSchema } from "@/validations";
import { fetchProductSeoInformation, submitProductSeoInformation} from "@/service/product.service";

interface IProductSeoProps {}

const ProductSeo = () => {
  const t = useTranslations("ProductSeoPage");
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const productToken = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "all",
    resolver: zodResolver(seoSchema),
    defaultValues: {
      page_title: "",
      meta_keywords: "",
      meta_description: "",
    },
  });

  useEffect(() => {
    handelFetchProductSeoInformation();
  }, [productToken]);

  //Function to fetch product seo information
  const handelFetchProductSeoInformation = async () => {
    try {
      if(productToken) {
        const response = await fetchProductSeoInformation(productToken);
        if(response?.status === false) {
          toast.error(response?.message);
          return;
        }
        setValue('page_title',response?.data?.seo_page_title);
        setValue('meta_keywords',response?.data?.seo_meta_keyword);
        setValue('meta_description',response?.data?.seo_meta_description);
      }
    } catch (error: any) {
      toast.error(error?.message || t("An error occurred"));
    }
  };

  //Function to handel previous
  const handelPrevious = () => {
    navigation.push(`/product/shipping?token=${productToken}`);
  };

  //Function to handel submit
  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        const response = await submitProductSeoInformation(productToken, payload);
        if (response?.status === false) {
          toast.error(response?.message);
          return;
        }
        toast.success(response?.message);
        navigation.push(`/product`);
      } catch (error: any) {
        toast.error(error?.message || t("An error occurred"));
      }
    });
  };

  return (
    <div className="space-y-6">
      <ProductBreadcrumb />
      <div className="grid gap-6">
        <div className="w-full grid md:grid-cols-12 gap-6">
          <div className=" md:col-span-2">
            <ProductStepper currentStep={5} />
          </div>
          <div className=" md:col-span-10">
            <Card>
              <CardContent className="p-1 md:p-5">
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <div className="mb-1 text-default-900 font-semibold text-base">
                    <ProductSeoForm
                      trans={t}
                      isPending={isPending}
                      register={register}
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
                      {t('Previous')}
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

export default ProductSeo;
