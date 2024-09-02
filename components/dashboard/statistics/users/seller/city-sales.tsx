"use client";
import DashboardUserSelect from '@/components/dashboard/dasboard-user-select';
import DashboardStateSelect from '@/components/dashboard/dasboard-state-select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import React from 'react';
import CitySalesData from './data/city-sales-data';
import CitySalesChart from './charts/city-sales-chart';

const SellerCitySales = () => {
  return (
    <Card>
      <CardHeader className="border-none pb-0 mb-5">
        <div className="flex items-center gap-1">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900"> Top 5 Cities Sales By Sellers </div>
            <span className="text-xs text-default-600 ml-1">In Last 30 Minutes</span>
          </div>
          <div className="flex items-center gap-1">
            <DashboardUserSelect />
            <DashboardStateSelect />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-0">
        <p className="text-xs font-medium text-default-800">User Per Minutes</p>
        <CitySalesChart />
        <div className="flex-none flex items-end gap-1 mb-2 font-extrabold text-primary">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </span>
          <span className="text-2xl">
            9,00,000
          </span>
          <span className="text-2xl text-success flex">
            <Icon icon="heroicons:arrow-trending-up-16-solid" /> <span className="text-sm">12.9% </span>
          </span>
        </div>
        <CitySalesData />
      </CardContent>
    </Card>
  );

}

export default SellerCitySales;