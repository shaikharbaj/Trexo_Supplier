import React, { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { columns } from "./components/columns";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { fetchTableData } from "@/service/datatable.service";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { Toolbar } from "./components/toolbar";
import { DataTable } from "@/components/data-table";

interface ITableProps {
    trans: any;
}

const transformData = (data: any[]): any[] => {
    return data?.flatMap((order: any) =>
        order?.order_item?.map((item: any) => ({
            ...order,
            ...item,
            product_title: item?.product?.title,
            product_category: item?.product?.category?.category_name,
        }))
    );
};

const OrderTable: React.FC<ITableProps> = ({ trans }) => {
    const { isLoading, data, isFilterEnable, filters, pagination } =
        useAppSelector((state: RootState) => state.datatable);

    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [transformedData, setTransformedData] = React.useState<any[]>([]);
    useEffect(() => {
        setTransformedData(transformData(data));
    }, [data]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        data: transformedData,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        manualFiltering: true,
        manualSorting: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    useEffect(() => {
        handleFetchOrders();
    }, [
        filters.searchText,
        filters.is_active,
        filters.status,
        filters.sortColumn,
        filters.sortBy,
        pagination.currentPage,
        pagination.perPage,
    ]);

    // Function to fetch order data
    const handleFetchOrders = async () => {
        try {
            const datatablePayload = {
                url: "/order",
                page_size: pagination.perPage,
                page: pagination.currentPage,
                searchText: filters.searchText,
                is_active: filters.is_active,
                status: filters.status,
                sortBy: filters.sortBy,
                sortColumn: filters.sortColumn,
            };
            const response = await fetchTableData(datatablePayload);
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <Fragment>
            <div className="space-y-4">
                <Toolbar trans={trans} table={table} isFilterEnable={isFilterEnable} />
                <DataTable trans={trans} isLoading={isLoading} tableObj={table} />
            </div>
        </Fragment>
    );
};

export default OrderTable;
