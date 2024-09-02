"use client";
import { useTranslations } from "next-intl";
import { BreadcrumbItem, Breadcrumbs } from "../ui/breadcrumbs";
import { Card, CardContent } from "../ui/card";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import OrderTable from "../tables/order/order-table";

interface IListProps { }

const OrderList = () => {
    const t = useTranslations("OrderPage");
    const { refresh } = useAppSelector((state: RootState) => state.datatable);

    return (
        <div className="space-y-6">
            <div className="flex items-center flex-wrap justify-between gap-4">
                <Breadcrumbs>
                    <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                    <BreadcrumbItem>Orders</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="space-y-6">
                <div className="flex items-center flex-wrap justify-between gap-4">
                    <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
                        Order
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <OrderTable key={String(refresh)} trans={t} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrderList;
