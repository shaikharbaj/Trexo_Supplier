"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";
import FavIcon from "@/public/images/all-img/fav-icon.png"
import { fetchUserByResetToken, resetPassword } from "@/service/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from '@iconify/react';
import resetPasswordSchema from "@/validations/auth/reset-password.schema";


interface IPasswordVisibility {
    password: boolean;
    confirmPassword: boolean;
}
interface UserData {
    uuid: string;
    email: string;
}
const ResetPassword = () => {
    const navigation = useRouter();
    let searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isPending, startTransition] = React.useTransition();
    const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
    const [passwordVisibility, setPasswordVisibility] = React.useState<IPasswordVisibility>({
        password: false,
        confirmPassword: false,
    });
    const [userData, setUserData] = useState<UserData>()
    const [loading, setLoading] = useState<boolean>(true)
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onSubmit",
        defaultValues: {
            email: "",
            token: token,
            password: "",
            confirmPassword: "",
        },
    });

    //Function to toggle paswword input
    const togglePasswordType = (field: 'password' | 'confirmPassword') => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    //Function to fetch user details
    const fetchUserDataByResetToken = async (token: string) => {
        setLoading(true);
        try {
            const response = await fetchUserByResetToken(token);
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
                navigation.replace('/forgot')
            }
            setUserData(response?.data);
        } catch (error: any) {
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUserDataByResetToken(token as string)
    }, [])

    if (userData) {
        setValue('email', userData?.email)
    }

    //Function to handel form submit
    const onSubmit = (data: { email: string }) => {
        startTransition(async () => {
            try {

                const response: any = await resetPassword(data);
                if (response?.status === true && response?.statusCode === 200) {
                    toast.success(response?.message);
                    navigation.replace("login");
                } else {
                    setError('password', { type: 'manual', message: response?.message });
                    // toast.error(response?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            }
        });
    };

    return (
        <div className="w-full">
            <Link href="/" className="flex gap-2 items-center">
                <Image src={FavIcon} alt="Company Fav icon" className="w-[50px] object-cover" priority={true} />
                <div className="flex-1  text-2xl">
                    <span className="text-primary font-extrabold">Trexo</span> <span className="text-gray-700 font-light">Pro</span>
                </div>
            </Link>
            <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
                Reset Your Password
            </div>
            <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
                Enter your new password to reset your account.
            </div>
            {!loading ?
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
                    <div>
                        <Label htmlFor="email" className="mb-2 font-medium text-default-600">
                            Email{" "}
                        </Label>
                        <Input
                            disabled={true}
                            {...register("email")}
                            type="email"
                            id="email"
                            className={cn("", {
                                "border-destructive": errors.email,
                            })}
                            size={!isDesktop2xl ? "xl" : "lg"}
                        />
                        {errors.email && (
                            <div className=" text-destructive mt-2">
                                {errors.email.message as string}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between gap-4 mt-2">
                        <div >
                            <Label
                                htmlFor="password"
                                className="mb-2 font-medium text-default-600"
                            >
                                Create Password <span className='text-destructive'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    type={passwordVisibility.password ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter password"
                                    size={!isDesktop2xl ? "xl" : "lg"}
                                    disabled={isPending}
                                    {...register("password")}
                                    className={cn("", {
                                        "border-destructive": errors.password,
                                    })}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                                    onClick={() => togglePasswordType("password")}
                                >
                                    {passwordVisibility.password ? (
                                        <Icon
                                            icon="heroicons:eye"
                                            className="w-5 h-5 text-default-400"
                                        />
                                    ) : (
                                        <Icon
                                            icon="heroicons:eye-slash"
                                            className="w-5 h-5 text-default-400"
                                        />
                                    )}
                                </div>
                            </div>
                            {errors.password && (
                                <div className=" text-destructive mt-2">
                                    {errors.password.message as string}
                                </div>
                            )}
                        </div>
                        <div >
                            <Label
                                htmlFor="password"
                                className="mb-2 font-medium text-default-600"
                            >
                                Re-enter Password <span className='text-destructive'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    type={passwordVisibility.confirmPassword ? "text" : "password"} id="confirmPassword"
                                    placeholder="Enter password"
                                    size={!isDesktop2xl ? "xl" : "lg"}
                                    disabled={isPending}
                                    {...register("confirmPassword")}
                                    className={cn("", {
                                        "border-destructive": errors.confirmPassword,
                                    })}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                                    onClick={() => togglePasswordType("confirmPassword")}
                                >
                                    {passwordVisibility.confirmPassword ? (
                                        <Icon
                                            icon="heroicons:eye"
                                            className="w-5 h-5 text-default-400"
                                        />
                                    ) : (
                                        <Icon
                                            icon="heroicons:eye-slash"
                                            className="w-5 h-5 text-default-400"
                                        />
                                    )}
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <div className=" text-destructive mt-2">
                                    {errors.confirmPassword.message as string}
                                </div>
                            )}
                        </div>
                    </div>
                    <Button className="w-full mt-6" size={!isDesktop2xl ? "lg" : "md"} disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPending ? "updating..." : "Reset Password"}
                    </Button>
                </form> : <Loader2 className="text-center mt-4 mr-2 h-10 w-10 animate-spin" />}

        </div>
    );
};

export default ResetPassword;
