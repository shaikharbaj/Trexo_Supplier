"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { BreadcrumbItem, Breadcrumbs } from "../ui/breadcrumbs";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ProductTable } from "../tables";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";

interface IListProps {}

const ProductList = () => {
  const t = useTranslations("ProductListingPage");
  const { refresh } = useAppSelector((state: RootState) => state.datatable);
  const navigation = useRouter();

  //Function to navigate to add product
  const navigateToAddProduct = () => {
    navigation.push('/product/basic-information');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Products</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            Product
          </div>
          <div className="flex-none flex items-center justify-end gap-4">
            <Button onClick={navigateToAddProduct}>
              <Icon
                icon="heroicons:plus"
                className="w-5 h-5 ltr:mr-2 rtl:ml-2"
              />{" "}
              Add New
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="pt-6">
            <ProductTable key={String(refresh)} trans={t} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductList;
