import DashboardUserSelect from '@/components/dashboard/dasboard-user-select';
import DashboardYearSelect from '@/components/dashboard/dasboard-year-select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import SellerSalesChart from './charts/sales-chart';

const SellerSalesReport = () => {
    return (
        <Card>
            <CardHeader className="border-none p-6 pt-5 mb-0">
                <CardTitle className=" p-0 flex justify-between">
                    <div className="text-lg font-semibold text-default-900">Seller Sales Report</div>
                    <div className="flex items-center gap-2">
                    <DashboardUserSelect />
                    <DashboardYearSelect />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
            <SellerSalesChart />
            </CardContent>
        </Card>
    )
}

export default SellerSalesReport;