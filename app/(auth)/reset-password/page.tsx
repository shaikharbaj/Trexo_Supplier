"use client";
import { AuthLayout } from "@/components/layout";
import ResetPassword from "@/components/auth/reset-password";

const ResetPasswordPage = () => {
    return (
        <AuthLayout>
            <ResetPassword />
        </AuthLayout>
    );
};

export default ResetPasswordPage;
