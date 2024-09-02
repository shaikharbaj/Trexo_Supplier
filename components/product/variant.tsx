"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { produce } from "immer";
import toast from "react-hot-toast";
import { default as MultiSelect } from "react-select";
import { z } from "zod";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import ProductBreadcrumb from "./component/product-breadcrumd";
import ProductStepper from "./component/stepper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import VariantTable from "./component/variant-table";
import {
  fetchProductVariants,
  submitProductVariants,
} from "@/service/product.service";
import { fetchAttributeDropdownByCategory } from "@/service/attribute.service";

const attributeSchema = z.array(
  z.object({
    value: z.number().min(1, { message: "Please select option." }),
    options: z
      .array(
        z.object({
          value: z.number(),
          label: z.string(),
        })
      )
      .nonempty("Please select option value."),
  })
);

const variantSchema = z.array(
  z.object({
    //id: z.number().int("ID must be an integer").positive("ID must be positive"),
    title: z.string().min(1, { message: "Variant name is required." }),
    slug: z.string().min(1, { message: "Variant slug is required." }),
    price: z.number().positive("Price must be positive"),
    available_qty: z
      .number()
      .int("Available quantity must be an integer")
      .nonnegative("Available quantity must be non-negative"),
  })
);

interface IProductVariantProps {}

const utilizedAttribute: any = [];

const ProductVartiant = () => {
  const CURRENT_STEP = 4;
  const t = useTranslations("ProductVariantPage");
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const productToken = searchParams.get("token");
  const [product, setProduct] = useState<any>({});
  const [attributeArr, setAttributeArr] = useState<any>([]);
  const [attributes, setAttributes] = useState<any>([
    {
      value: "",
      options: [],
    },
  ]);
  const [attributeErrors, setAttributeErrors] = useState<any>({}); // store validation errors
  const [variants, setVariants] = useState<any>([]);
  const [variantErrors, setVariantErrors] = useState<any>({}); // store validation errors

  useEffect(() => {
    handelFetchProductVariants();
  }, [productToken]);

  useEffect(() => {
    validateAttribute(attributes);
  }, [attributes]);

  //Function to fetch product basic information
  const handelFetchProductVariants = async () => {
    try {
      if (productToken) {
        const response: any = await fetchProductVariants(productToken);
        if (response?.status === false) {
          toast.error(response?.message);
          return;
        }
        const data = response?.data;
        handelFetchAttributes(data?.product?.category_id);
        setProduct(data?.product);
        if (data?.attributes.length > 0) {
          initUtilizedAttribute(data.attributes);
          setAttributes(data.attributes);
        }
        if (data?.variants.length > 0) {
          const transformedVariants = data.variants.map((variant: any) => {
            return { ...variant, price: parseFloat(variant.price) };
          });
          setVariants(transformedVariants);
        }
      }
    } catch (error: any) {
      toast.error(error?.message || t("An error occurred"));
    }
  };

  //Function to fetch attributes
  const handelFetchAttributes = async (categoryId: number) => {
    try {
      const response = await fetchAttributeDropdownByCategory(categoryId);
      if (response?.status === false) {
        toast.error(response?.message);
        return;
      }
      setAttributeArr(response?.data);
    } catch (error: any) {
      toast.error(error?.message || t("An error occurred"));
    }
  };

  //Function to handel add new options
  const handelAddNewOption = () => {
    if (attributes.length === attributeArr.length) {
      toast.error("No more option available.");
      return;
    }
    setAttributes(
      produce((draft: any[]) => {
        draft.push({ value: "", options: [] });
      })
    );
  };

  //Function to mark attribute as utilized
  const initUtilizedAttribute = async (attributes: any) => {
    attributes.forEach((attribute: any) => {
      utilizedAttribute.push(attribute.value);
    });
  };

  //Function to mark attribute as utilized
  const markAttributeAsUtilized = (attributeId: number) => {
    if (!utilizedAttribute.includes(attributeId)) {
      utilizedAttribute.push(attributeId);
    }
    return;
  };

  //Function to remove attribute from utilized list
  const removeAttributeFromUtilized = (attributeName: string) => {
    const index = utilizedAttribute.indexOf(attributeName);
    if (index !== -1) {
      utilizedAttribute.splice(index, 1);
    }
    return;
  };

  //Function to handel attribute selection
  const handelAttributeSelection = (
    selectedAttribute: any,
    attributeIndex: number
  ) => {
    let previousSelectedValue = undefined;
    setAttributes(
      produce((draft: any[]) => {
        if (draft[attributeIndex]) {
          if (draft[attributeIndex].value) {
            previousSelectedValue = draft[attributeIndex].value;
          }
          draft[attributeIndex].value = selectedAttribute;
        }
      })
    );
    if (previousSelectedValue) {
      removeAttributeFromUtilized(previousSelectedValue);
    }
    markAttributeAsUtilized(selectedAttribute);
  };

  //Function to handel attribute value selection
  const handelAttributeValueSelection = (
    index: number,
    selectedAttributeValues: any
  ) => {
    setAttributes(
      produce((draft: any[]) => {
        if (draft[index]) {
          draft[index].options = selectedAttributeValues;
        }
      })
    );
  };

  //Function to validate attribute
  const validateAttribute = (attributes: any) => {
    try {
      attributeSchema.parse(attributes);
      setAttributeErrors({});
      return true;
    } catch (error: any) {
      const errorObject: any = {};
      error.issues.forEach((issue: any) => {
        const path = issue.path.join(".");
        errorObject[path] = issue.message;
      });
      setAttributeErrors(errorObject);
      return false;
    }
  };

  //Function to validate variant
  const validateVariant = () => {
    try {
      variantSchema.parse(variants);
      setVariantErrors({});
      return true;
    } catch (error: any) {
      const errorObject: any = {};
      error.issues.forEach((issue: any) => {
        const path = issue.path.join(".");
        errorObject[path] = issue.message;
      });
      setVariantErrors(errorObject);
      return false;
    }
  };

  //Function to generate variants
  const handelVaraintGeneration = () => {
    let validate = validateAttribute(attributes);
    if (validate === true) {
      const variants = generateVariants(product?.title, attributes);
      if (variants.length > 0) {
        setVariants(variants);
      }
    }
  };

  //Function to generate variants using recursion
  const generateVariantsOld = (
    attributes: any,
    currentVariant = "invertor",
    index = 0
  ) => {
    if (index === attributes.length) {
      return [currentVariant];
    }
    const attribute = attributes[index];
    const options = attribute.options.map((option: any) => option.value);
    const variants: any = [];
    options.forEach((option: any) => {
      variants.push(
        ...generateVariantsOld(
          attributes,
          `${currentVariant}-${option}`,
          index + 1
        )
      );
    });
    return variants;
  };

  //Function to generate variants using recursion
  function generateVariants(
    slug: string,
    data: any,
    index = 0,
    path: any = [],
    result: any = []
  ) {
    if (index === data.length) {
      const variantTitle = path.map((p: any) => p.label).join(" ");
      const combination = path.map((p: any) => p.label).join("-");
      let variantSlug = `${slug}-${combination}`;
      const variantObject: any = {
        image: undefined,
        title: `${slug} ${variantTitle}`,
        slug: variantSlug.toLowerCase(),
        available_qty: 0,
        price: product?.price ? parseFloat(product.price) : 0,
      };

      // Add each option as "option_1", "option_2", etc.
      path.forEach((p: any, i: number) => {
        variantObject[`option_${i + 1}`] = p.value;
      });

      result.push(variantObject);
      return;
    }

    const currentOptions = data[index].options;
    for (let option of currentOptions) {
      generateVariants(slug, data, index + 1, [...path, option], result);
    }
    return result;
  }

  //Function to handel variant price change
  const handelVariantPriceChange = (index: number, value: string | number) => {
    if (Number(value) >= 0) {
      setVariants(
        produce((draft: any[]) => {
          if (draft[index]) {
            draft[index].price = value || value === 0 ? Number(value) : "";
          }
        })
      );
      validateVariant();
    }
  };

  //Function to handel variant price change
  const handelVariantQtyChange = (index: number, value: string | number) => {
    if (Number(value) >= 0) {
      setVariants(
        produce((draft: any[]) => {
          if (draft[index]) {
            draft[index].available_qty =
              value || value === 0 ? Number(value) : "";
          }
        })
      );
      validateVariant();
    }
  };

  //Function to handel back
  const handelBack = () => {
    navigation.push(`/product/media?token=${productToken}`);
  };

  //Function to handel submit
  const handelSubmit = async () => {
    try {
      let validate = validateVariant();
      if (validate === true) {
        const response = await submitProductVariants(product?.uuid, {
          attributes: JSON.stringify(attributes),
          variants: JSON.stringify(variants),
        });
        if (response?.status === false) {
          toast.error(response?.message);
          return;
        }
        toast.success(response?.message);
        navigation.push(`/product/shipping?token=${productToken}`);
      }
    } catch (error: any) {
      toast.error(error?.message || t("An error occurred"));
    }
  };

  //Function to navigate to next screen
  const handelNext = () => {
    if (product?.step_completed >= CURRENT_STEP) {
      navigation.push(`/product/shipping?token=${productToken}`);
    }
  };

  //Function to render attribute section
  const renderAttributeSection = (
    attributeObj: any,
    attributeObjIndex: number
  ) => {
    return (
      <div key={attributeObjIndex}>
        <Card className="p-4 bg-primary">
          <Label className="mb-2 text-white" htmlFor="">
            Option Name
            <span className="text-warning">*</span>
          </Label>
          <Select
            onValueChange={(value) =>
              handelAttributeSelection(value, attributeObjIndex)
            }
            value={attributeObj?.value ? attributeObj.value : undefined}
            disabled={false}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select option"
                className="whitespace-nowrap"
              />
            </SelectTrigger>
            {renderAttributeSelectContent(attributeArr, attributeObj?.value)}
          </Select>
          {attributeErrors[`${attributeObjIndex}.value`] && (
            <div className="text-destructive text-sm">
              {attributeErrors[`${attributeObjIndex}.value`]}
            </div>
          )}
        </Card>
        {renderAttributeValueSection(
          attributeArr,
          attributeObjIndex,
          attributeObj
        )}
      </div>
    );
  };

  //Function to render attribute select  content
  const renderAttributeSelectContent = (
    attributes: any,
    selectedAttribute: string
  ) => {
    const filteredAttribute = attributes.filter((attribute: any) => {
      if (
        !utilizedAttribute.includes(attribute.value) ||
        attribute.value === selectedAttribute
      ) {
        return attribute;
      }
    });
    return (
      <SelectContent>
        {filteredAttribute.map((attribute: any, attributeIndex: number) => {
          return (
            <SelectItem key={attributeIndex} value={attribute.value}>
              {attribute.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    );
  };

  //Function to render attribute value multiselect
  const renderAttributeValueSection = (
    attributes: any,
    selectedAttributeIndex: number,
    selectedAttribute: any
  ) => {
    if (selectedAttribute.value === "") {
      return <></>;
    }
    const attributeObj = attributes.find((attribute: any) => {
      if (attribute.value === selectedAttribute.value) {
        return attribute;
      }
    });
    return (
      <Card className="p-4">
        <Label className="mb-2" htmlFor="">
          Option Value
        </Label>
        <div className="space-y-1">
          <MultiSelect
            className={`${true ? "border-red-500" : "border-gray-300"}`}
            isMulti
            options={attributeObj?.options ? attributeObj.options : []}
            value={selectedAttribute.options}
            onChange={(selected: any) => {
              handelAttributeValueSelection(selectedAttributeIndex, selected);
            }}
            styles={{
              control: (baseStyles: any, state: any) => ({
                ...baseStyles,
                borderColor: baseStyles.borderColor,
                "&:hover": {
                  borderColor: baseStyles.borderColor,
                },
              }),
              placeholder: (baseStyles: any, state: any) => ({
                ...baseStyles,
                color: baseStyles.color,
              }),
            }}
            placeholder="Select"
          />
          {attributeErrors[`${selectedAttributeIndex}.options`] && (
            <div className="text-destructive text-sm">
              {attributeErrors[`${selectedAttributeIndex}.options`]}
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <ProductBreadcrumb />
      <div className="grid gap-6">
        <div className="w-full grid md:grid-cols-12 gap-6">
          <div className=" md:col-span-2">
            <ProductStepper currentStep={3} />
          </div>
          <div className=" md:col-span-10">
            <Card>
              <CardContent className="p-1 md:p-5">
                <div className="mb-1 text-default-900 font-semibold text-base">
                  {/* Variant Form */}
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
                            d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
                          />
                        </svg>
                      </span>
                      Variants
                    </h1>
                    <div className="space-y-3">
                      {attributes.length < 3 && (
                        <div className="flex justify-end">
                          <Button type="button" onClick={handelAddNewOption}>
                            Add Option
                          </Button>
                        </div>
                      )}
                      {/* <div className="space-y-2">
                        <Card className="p-4 bg-primary flex items-center justify-between text-white">
                          <div className="flex items-center justify-start">
                            <div className="flex items-center justify-start gap-2">
                              <h1 className="font-semibold ">Engin Type</h1>
                              <a
                                href=""
                                className="bg-white/20 h-10 w-10 flex items-center justify-center rounded-full text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-4"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                  />
                                </svg>
                              </a>
                              <a
                                href=""
                                className="bg-white/20 h-10 w-10 flex items-center justify-center rounded-full text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-4"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </a>
                            </div>
                            <div className="flex items-center text-sm gap-4 pl-6 ml-6 border-l border-white/10">
                              <span className="text-white/50 font-light">
                                Option Value
                              </span>
                              <span className=" font-semibold">
                                Diesel, Petrol
                              </span>
                            </div>
                          </div>
                          <a
                            href=""
                            className="bg-white/20 h-10 w-10 flex items-center justify-center rounded-full text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </a>
                        </Card>
                        <Card className="p-4 bg-primary flex items-center justify-between text-white">
                          <div className="flex items-center justify-start">
                            <div className="flex items-center justify-start gap-2">
                              <h1 className="font-semibold ">Engin Type</h1>
                              <a
                                href=""
                                className="bg-white/20 h-10 w-10 flex items-center justify-center rounded-full text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-4"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                  />
                                </svg>
                              </a>
                              <a
                                href=""
                                className="bg-white/20 h-10 w-10 flex items-center justify-center rounded-full text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-4"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </a>
                            </div>
                            <div className="flex items-center text-sm gap-4 pl-6 ml-6 border-l border-white/10">
                              <span className="text-white/50 font-light">
                                Option Value
                              </span>
                              <span className=" font-semibold">
                                Diesel, Petrol
                              </span>
                            </div>
                          </div>
                          <a
                            href=""
                            className="bg-white/20 h-10 w-10 flex items-center justify-center rounded-full text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </a>
                        </Card>
                      </div> */}
                      <div className="space-y-4">
                        {attributes.map(
                          (attributeObj: any, attributeObjIndex: number) => {
                            return renderAttributeSection(
                              attributeObj,
                              attributeObjIndex
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-end mb-4">
                    <Button type="button" onClick={handelVaraintGeneration}>
                      Generate
                    </Button>
                  </div>
                  {variants.length > 0 && (
                    <VariantTable
                      variants={variants}
                      variantErrors={variantErrors}
                      handelVariantPriceChange={handelVariantPriceChange}
                      handelVariantQtyChange={handelVariantQtyChange}
                    />
                  )}
                </div>
                <div className="flex pt-2 ">
                  <Button
                    size="lg"
                    variant="outline"
                    color="secondary"
                    className="cursor-pointer"
                    onClick={handelBack}
                  >
                    {t("Previous")}
                  </Button>
                  <div className="flex-1	gap-4 " />
                  <div className="flex	gap-2 ">
                    <Button
                      size="lg"
                      variant="outline"
                      color="primary"
                      className="cursor-pointer"
                      onClick={handelSubmit}
                    >
                      {t("Submit")}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVartiant;
