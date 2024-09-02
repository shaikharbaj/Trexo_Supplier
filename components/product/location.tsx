"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { produce } from "immer";
import { Card, CardContent } from "../ui/card";
import ProductBreadcrumb from "./component/product-breadcrumd";
import ProductStepper from "./component/stepper";
import { Button } from "../ui/button";
import {
  fetchProductLocations,
  submitProductLocations,
} from "@/service/product.service";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface IProductLocationProps {}

const ProductLocation = () => {
  const CURRENT_STEP = 2;
  const t = useTranslations("ProductLocationPage");
  const [product, setProduct] = useState<any>({});
  const [locations, setLocations] = useState<any>([]);
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const productToken = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const columns: any = [
    {
      label: "Warehouse Name",
    },
    {
      label: "Available Qty",
    },
  ];

  useEffect(() => {
    handelFetchProductLocationInformation();
  }, [productToken]);

  //Function to fetch product location information
  const handelFetchProductLocationInformation = async () => {
    try {
      if (productToken) {
        const response = await fetchProductLocations(productToken);
        if (response?.status === false) {
          toast.error(response?.message);
          return;
        }
        setProduct(response?.data?.product);
        setLocations(response?.data?.product_locations);
      }
    } catch (error: any) {
      toast.error(error?.message || t("An error occurred"));
    }
  };

  //Function to handel qty change
  const handelQtyChange = (index: number, qty: number) => {
    setLocations(
      produce((draft: any[]) => {
        if (draft[index]) {
          draft[index].available_qty = qty;
        }
      })
    );
  };

  //Function to handel back
  const handelPrevious = () => {
    navigation.push(`/product/basic-information?token=${productToken}`);
  };

  //Function to handel submit
  const handelSubmit = async () => {
    try {
      let stringifyLocations = JSON.stringify(locations);
      const response = await submitProductLocations(
        product?.uuid,
        stringifyLocations
      );
      if (response?.status === false) {
        toast.error(response?.message);
      }
      toast.success(response?.message);
      navigation.push(`/product/media?token=${productToken}`);
    } catch (error: any) {
      toast.error(error?.message || t("An error occurred"));
    }
  };

  //Function to navigate to next screen
  const handelNext = () => {
    if (product?.step_completed > CURRENT_STEP) {
      navigation.push(`/product/media?token=${productToken}`);
    }
  };

  return (
    <div className="space-y-6">
      <ProductBreadcrumb />
      <div className="grid gap-6">
        <div className="w-full grid md:grid-cols-12 gap-6">
          <div className=" md:col-span-2">
            <ProductStepper currentStep={1} />
          </div>
          <div className=" md:col-span-10">
            <Card>
              <CardContent className="p-1 md:p-5">
                <div className="mb-1 text-default-900 font-semibold text-base">
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
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      </span>
                      Locations
                    </h1>
                    <Table className="border border-default-300">
                      <TableHeader>
                        <TableRow>
                          {columns.map((column: any, columnIndex: number) => (
                            <TableHead
                              key={columnIndex}
                              className="border border-default-300"
                            >
                              {column.label}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {locations.map(
                          (location: any, locationIndex: number) => {
                            return (
                              <TableRow key={locationIndex}>
                                <TableCell className="border border-default-300">
                                  <span className="text-default-900 font-semibold text-base">
                                    {location?.address_line_1},{" "}
                                  </span>
                                  <span className="text-default-900 font-semibold text-base">
                                    {location?.address_line_2},{" "}
                                  </span>
                                  <span className="text-default-900 font-semibold text-base">
                                    {location?.city_id},{" "}
                                  </span>
                                  <span className="text-default-900 font-semibold text-base">
                                    {location?.state_id},{" "}
                                  </span>
                                  <span className="text-default-900 font-semibold text-base">
                                    {location?.zip_code}
                                  </span>
                                </TableCell>
                                <TableCell className="border border-default-200">
                                  <Input
                                    type="number"
                                    size="lg"
                                    value={location?.available_qty}
                                    onChange={(e: any) =>
                                      handelQtyChange(
                                        locationIndex,
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  </div>
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
                      type="button"
                      size="lg"
                      variant="outline"
                      color="primary"
                      className="cursor-pointer"
                      onClick={handelSubmit}
                    >
                      {t("Submit")}
                    </Button>
                    {product?.step_completed > CURRENT_STEP && (
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLocation;
