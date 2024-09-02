import { OnboardingLayout } from "@/components/layout";


const layout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <OnboardingLayout>{children}</OnboardingLayout>
  );
};

export default layout;
