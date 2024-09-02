"use client";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { themes } from "@/config/thems";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardSelect from "../../dasboard-year-select";
import {
  getGridConfig,
  getXAxisConfig,
  getYAxisConfig,
} from "@/lib/appex-chart-options";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SalesAnalyticsChartProps {
  series: ApexAxisChartSeries;
  chartColor: string;
  height?: number;
}

const allUsersSeries = [
  {
    data: [90, 70, 85, 60, 80, 70, 90, 75, 60, 80],
  },
];
const conversationSeries = [
  {
    data: [80, 70, 65, 40, 40, 100, 100, 75, 60, 80],
  },
];
const eventCountSeries = [
  {
    data: [20, 70, 65, 60, 40, 60, 90, 75, 60, 40],
  },
];
const newUserSeries = [
  {
    data: [20, 70, 65, 40, 100, 60, 100, 75, 60, 80],
  },
];

const RenderSalesAnalyticsChart = ({
  series,
  chartColor,
  height = 300,
}: SalesAnalyticsChartProps) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: [chartColor],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    fill: {
      type: "gradient",
      colors: chartColor,
      gradient: {
        shadeIntensity: 0.1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [50, 100, 0],
      },
    },
    yaxis: getYAxisConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
    ),
    xaxis: getXAxisConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
    ),
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height={height}
      width={"100%"}
    />
  );
};

const SalesAnalytics = () => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const primary = `hsl(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
  })`;
  const warning = `hsl(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].warning
  })`;
  const success = `hsl(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].success
  })`;
  const info = `hsl(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].info
  })`;

  const tabsTrigger = [
    {
      value: "all",
      text: "all user",
      total: "10,234",
      color: "primary",
    },
    {
      value: "event",
      text: "Event Count",
      total: "536",
      color: "warning",
    },
    {
      value: "conversation",
      text: "conversations",
      total: "21",
      color: "success",
    },
    {
      value: "newuser",
      text: "New User",
      total: "3321",
      color: "info",
    },
  ];

  const tabsContentData = [
    {
      value: "all",
      series: allUsersSeries,
      color: primary,
    },
    {
      value: "event",
      series: eventCountSeries,
      color: warning,
    },
    {
      value: "conversation",
      series: conversationSeries,
      color: success,
    },
    {
      value: "newuser",
      series: newUserSeries,
      color: info,
    },
  ];

  return (
    <Card>
      <CardHeader className="border-none pb-0">
        <div className="flex items-center gap-2 flex-wrap ">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900 whitespace-nowrap">
              Sales Analytics
            </div>
            <span className="text-xs text-default-600 flex items-center gap-2">
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
                    d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <span className="text-[16px] font-bold text-primary">
                2,00,000
              </span>
              <span>Since Last Week</span>
            </span>
          </div>
          <div className="flex-none">
            <DashboardSelect />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-1 md:p-5">
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 justify-start w-full bg-transparent h-full">
            {tabsTrigger.map((item, index) => (
              <TabsTrigger
                key={`report-trigger-${index}`}
                value={item.value}
                className={cn(
                  "flex flex-col gap-1.5 p-4 overflow-hidden   items-start  relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden data-[state=active]:shadow-none data-[state=active]:before:block",
                  {
                    "bg-primary/30 data-[state=active]:bg-primary/30 dark:bg-primary/70":
                      item.color === "primary",
                    "bg-orange-50 data-[state=active]:bg-orange-50 dark:bg-orange-500":
                      item.color === "warning",
                    "bg-green-50 data-[state=active]:bg-green-50 dark:bg-green-500":
                      item.color === "success",
                    "bg-cyan-50 data-[state=active]:bg-cyan-50 dark:bg-cyan-500 ":
                      item.color === "info",
                  }
                )}
              >
                <span
                  className={cn(
                    "h-10 w-10 rounded-full bg-primary/40 absolute -top-3 -right-3 ring-8 ring-primary/30",
                    {
                      "bg-primary/50  ring-primary/20 dark:bg-primary dark:ring-primary/40":
                        item.color === "primary",
                      "bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400":
                        item.color === "warning",
                      "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400":
                        item.color === "success",
                      "bg-cyan-200 ring-cyan-100 dark:bg-cyan-300 dark:ring-cyan-400":
                        item.color === "info",
                    }
                  )}
                ></span>
                <span className="text-sm text-default-800 dark:text-primary-foreground font-semibold capitalize relative z-10">
                  {" "}
                  {item.text}
                </span>
                <span
                  className={`text-lg font-semibold text-${item.color}/80 dark:text-primary-foreground`}
                >
                  {item.total}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {/* charts data */}
          {tabsContentData.map((item, index) => (
            <TabsContent key={`report-tab-${index}`} value={item.value}>
              <RenderSalesAnalyticsChart series={item.series} chartColor={item.color} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SalesAnalytics;
