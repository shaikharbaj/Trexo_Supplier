import { NextResponse } from "next/server";
import { menusConfig, onboardingMenu } from "./config/menus";

const restrictedPublicRoutes = ["/register", "/login", "/forgot-password"];
const onBoardingRoutes = [
  "/onboarding/basic-details",
  "/onboarding/bank-details",
  "/onboarding/verification",
  "/onboarding/documents",
];

// Function to recursively find all href values
function findHrefs(navArray: any) {
  let hrefs: string[] = [];

  navArray.forEach((item: any) => {
    if (item.href) {
      hrefs.push(item.href);
    }
    if (item.child) {
      hrefs = hrefs.concat(findHrefs(item.child));
    }
  });
  return hrefs;
}

function getOnboardingStatus(request: any) {
  const onboardingCompleted =
    request.cookies.get("onboarding_completed")?.value === "true";
  const stepCompleted =
    parseInt(request.cookies.get("step_completed")?.value) || 0;
  return { onboardingCompleted, stepCompleted };
}

const onboardingNavigation = (step_completed: number) => {
  switch (step_completed) {
    case 0:
      return "/onboarding/basic-details";
    case 1:
      return "/onboarding/bank-details";
    case 2:
      return "/onboarding/verification";
    case 3:
      return "/onboarding/documents";
    default:
      return "/dashboard";
  }
};

export function middleware(request: any) {
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const route_arr = [...menusConfig.mainNav, ...onboardingMenu];
  const hrefs = findHrefs(route_arr);

  //If token not available
  if (!token) {
    if (hrefs.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  //If token available
  if (token) {
    // If token is availabe and trying to access restricted routes
    if (restrictedPublicRoutes.includes(pathname)) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    // Checking onboarding stastus
    const { onboardingCompleted, stepCompleted } = getOnboardingStatus(request);
    if (onboardingCompleted === false) {
      if (!onBoardingRoutes.includes(pathname)) {
        url.pathname = onboardingNavigation(stepCompleted);
        return NextResponse.redirect(url);
      }
    } else {
      if(onBoardingRoutes.includes(pathname)) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|assets|docs|.*\\..*|_next).*)"],
};
