"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { OnboardingHeader, OnboardingStepper } from '../partials/onboarding';
import ThemeCustomize from '../partials/customizer/theme-customizer';

interface IOnBoardingLayoutProps {
    children: ReactNode;
}

const OnboardingLayout: React.FC<IOnBoardingLayoutProps> = ({ children }) => {
    return (
        <>
            <OnboardingHeader />
            <div className="min-h-screen bg-background flex overflow-hidden w-full pt-[74px] pb-10">
                <div className="basis-full flex flex-wrap w-full overflow-y-auto">
                    <div className=" basis-full w-full flex justify-left ">
                        <div className="w-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <ThemeCustomize />
        </>
    )
}

export default OnboardingLayout;