import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks';
import React, { ReactNode, useEffect, useState } from 'react';
import { Step, StepLabel, Stepper } from '@/components/ui/steps';

interface IStepper {
    activestep:string;
}

const OnboardingStepper: React.FC<IStepper> = ({activestep}) => {
    const steps: string[] = ["Basic Details", "Bank Details", "Verification", "Documents"];
    const isTablet = useMediaQuery("(max-width: 1024px)");
    const [scroll, setScroll] = useState<boolean>(false);

    // Function to handle scroll event
    const handleScroll = () => {
        setScroll(window.scrollY > 50);
    };

    useEffect(() => {
        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
   

    return (
        <div className="w-full">
            <div className="shadow-md py-5 bg-white">
                <div className="container">
                    <div className="w-[80%] m-auto">
                        <Stepper
                            current={Number(activestep)}
                            direction={isTablet ? "vertical" : "horizontal"}
                        >
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: { optional?: React.ReactNode } = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default OnboardingStepper;