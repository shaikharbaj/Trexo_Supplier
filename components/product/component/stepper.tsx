"use client";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Step, StepLabel, Stepper } from "@/components/ui/steps";

interface IProductStepperProps {
  currentStep: number;
}

const steps: string[] = [
  "Basic Information",
  "Locations",
  "Media",
  "Variants",
  "Shipping",
  "SEO",
];

const ProductStepper = ({ currentStep }: IProductStepperProps) => {
  const t = useTranslations("DashboardPage");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      <Card>
        <CardContent className="p-1 md:p-5">
          <div className="">
            <div className="">
              <Stepper
                current={currentStep}
                direction={isTablet ? "vertical" : "vertical"}
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
        </CardContent>
      </Card>
    </>
  );
};

export default ProductStepper;
