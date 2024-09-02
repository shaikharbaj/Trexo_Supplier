"use client";
import React from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearFilter, filterSearchText } from "@/service/datatable.service";
import { DataTableViewOptions } from "@/components/data-table/components/data-table-view-options";
import { OrderStatusFilter } from "./status.filter";

interface ToolbarProps {
  table: Table<any>;
  isFilterEnable: boolean;
  trans: any;
}

export function Toolbar({ table, isFilterEnable, trans }: ToolbarProps) {
  const orderStatusOptions = [
    {
      value: "PENDING",
      label: trans('Pending')
    },
    {
      value: "PROCESSING",
      label: trans('Processing')
    },
    {
      value: "SHIPPED",
      label: trans('Shipped')
    },
    {
      value: "DELIVERED",
      label: trans('Delivered')
    },
    {
      value: "RETURN",
      label: trans('Return')
    },
    {
      value: "REFUNDED",
      label: trans('Refunded')
    },
    {
      value: "CANCELLED",
      label: trans('Cancelled')
    },
  ];

  const viewOptionLabel = {
    order_number: trans("Order ID"),
    image: trans("Image"),
    product_title: trans("Name"),
    product_category: trans("Category"),
    type: trans("Type"),
    price: trans("Price (price per product)"),
    quantity: trans("Quantity"),
    seller: trans("Seller"),
    is_active: trans("Status"),
    status: trans("Status"),
    created_at: trans("Ordered Date"),
  };

  //Function to handel global filter
  const handleFilterChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      await filterSearchText(event.target.value);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  //Function to handel reset filter
  const handelResetFilter = async () => {
    try {
      await clearFilter();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <Input
        placeholder={trans("Search") + "..."}
        onChange={handleFilterChange}
        className="h-8 min-w-[200px] max-w-sm"
      />

      {orderStatusOptions.length && (
        <OrderStatusFilter
          title={trans('Status')}
          options={orderStatusOptions}
        />
      )}

      {isFilterEnable && (
        <Button
          variant="outline"
          onClick={handelResetFilter}
          className="h-8 px-2 lg:px-3"
        >
          {trans("Reset")}
          <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      )}
      <DataTableViewOptions
        trans={trans}
        table={table}
        optionLabel={viewOptionLabel}
      />
    </div>
  );
}
