"use client";
import { useTranslations } from "next-intl";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";

interface IProductBreadcrumbProps {}

const ProductBreadcrumb = () => {
  const t = useTranslations("DashboardPage");
  return (
    <>
      <div className="flex items-center flex-wrap justify-between gap-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/product">Products</BreadcrumbItem>
          <BreadcrumbItem>Add New Product</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            Add New Product
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBreadcrumb;
