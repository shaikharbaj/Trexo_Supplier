"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import ProductBreadcrumb from "./component/product-breadcrumd";
import ProductStepper from "./component/stepper";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import FileUploaderSingle from "../ui/file-uploader-single";

interface IProductMediaProps {}

const ProductMedia = () => {
  const CURRENT_STEP = 3;
  const t = useTranslations("ProductBasicInformation");
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const productToken = searchParams.get("token");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    handelFetchProductMedia();
  }, [productToken]);

  //Function to fetch product location information
  const handelFetchProductMedia = async () => {};

  //Function to handel back
  const handelPrevoius = () => {
    navigation.push(`/product/location?token=${productToken}`);
  };

  //Function to handel next
  const handelNext = () => {
    navigation.push(`/product/variant?token=${productToken}`);
  };

  return (
    <div className="space-y-6">
      <ProductBreadcrumb />
      <div className="grid gap-6">
        <div className="w-full grid md:grid-cols-12 gap-6">
          <div className=" md:col-span-2">
            <ProductStepper currentStep={2} />
          </div>
          <div className=" md:col-span-10">
            <Card>
              <CardContent className="p-1 md:p-5">
                <div className="mb-1 text-default-900 font-semibold text-base">
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
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      Media
                    </h1>
                    <div className="grid gap-8 grid-cols-1">
                      <div className="">
                        <Label className="mb-2" htmlFor="">
                          Upload File
                        </Label>
                        {/* <FileUploaderSingle /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex pt-2 ">
                  <Button
                    size="lg"
                    variant="outline"
                    color="secondary"
                    className="cursor-pointer"
                    onClick={handelPrevoius}
                  >
                    Previous
                  </Button>
                  <div className="flex-1	gap-4 " />
                  <div className="flex	gap-2 ">
                    <Button
                      size="lg"
                      variant="outline"
                      color="primary"
                      className="cursor-pointer"
                      onClick={handelNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMedia;
