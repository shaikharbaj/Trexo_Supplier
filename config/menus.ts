import {
  DashBoard,
  Application,
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const onboardingMenu = [
  {
    title: "Basic Details",
    href: "/onboarding/basic-details"
  },
  {
    title: "Bank Details",
    href: "/onboarding/bank-details"
  },
  {
    title: "Verification",
    href: "/onboarding/verification"
  },
  {
    title: "Documents",
    href: "/onboarding/documents"
  }
]

export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      href: "/dashboard",
    },
    {
      title: "Product",
      icon: Application,
      href: "/product",
    },
    {
      title: "Order",
      icon: Application,
      href: "/order",
    }
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Product",
        icon: Application,
        href: "/product",
      },
      {
        title: "Order",
        icon: Application,
        href: "/order",
      }
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Product",
        icon: Application,
        href: "/product",
      },
      {
        title: "Order",
        icon: Application,
        href: "/order",
      }
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
