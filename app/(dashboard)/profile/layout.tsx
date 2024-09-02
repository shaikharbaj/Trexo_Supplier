import ProfileLayout from "@/components/layout/profile-layout";

const layout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <ProfileLayout>{children}</ProfileLayout>
    );
};

export default layout;
