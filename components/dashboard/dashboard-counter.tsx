"use client";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Application, Cart, User, Users} from "@/components/svg";

const DashboardCounter = () => {
  const reports = [
    {
      id: 1,
      name: "Customers",
      count: "10,000",
      rate: "10.9",
      isUp: false,
      icon: <Cart className="h-6 w-6" />,
      color: "primary",
    },
    {
      id: 2,
      name: "Financiers",
      count: "50",
      rate: "2",
      isUp: true,
      icon: <User className="h-6 w-6" />,
      color: "info",
    },
    {
      id: 3,
      name: "Suppliers",
      count: "100",
      rate: "12.3",
      isUp: true,
      icon: <Users className="h-6 w-6" />,
      color: "warning",
    },
    {
      id: 4,
      name: "Total Sales",
      count: "80,00,000",
      rate: "70",
      isUp: true,
      icon: <Application className="h-6 w-6" />,
      color: "destructive",
    },
  ];
  return (
    <>
      {reports.map((item, index) => (
        <Card key={`report-card-${index}`}>
          <CardContent className="p-6 flex justify-start items-start gap-4 shadow-2xl rounded-2xl">
            <div>
              <span
                className={cn(
                  "flex-none h-12 w-12 flex justify-center items-center bg-default-100 rounded-md",
                  {
                    "bg-primary bg-opacity-10 text-primary":
                      item.color === "primary",
                    "bg-info bg-opacity-10 text-info": item.color === "info",
                    "bg-warning bg-opacity-10 text-warning":
                      item.color === "warning",
                    "bg-destructive bg-opacity-10 text-destructive":
                      item.color === "destructive",
                  }
                )}
              >
                {item.icon}
              </span>
            </div>
            <div className=" space-y-3">
              <div className="text-[16px] font-semibold text-default-900 flex-1">
                {item.name}
              </div>
              <div className="text-3xl font-extrabold text-primary mb-2.5">
                {item.count}
              </div>
              <div className="flex items-center font-semibold gap-1">
                {item.isUp ? (
                  <>
                    <span className="text-success">{item.rate}%</span>
                    <Icon
                      icon="heroicons:arrow-trending-up-16-solid"
                      className="text-success text-xl"
                    />
                  </>
                ) : (
                  <>
                    <span className="text-destructive">{item.rate}%</span>
                    <Icon
                      icon="heroicons:arrow-trending-down-16-solid"
                      className="text-destructive text-xl"
                    />
                  </>
                )}
                <div className="mt-1 text-xs text-default-600">
                  Since Last Week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default DashboardCounter;
