import { useAppSelector, useMediaQuery } from '@/hooks';
import { RootState } from '@/redux/store';
import { registerSchema } from '@/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';
import { Loader2, } from 'lucide-react';
import { Label } from '../ui/label';
import Link from 'next/link';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { InputGroup, InputGroupButton } from '../ui/input-group';
import toast from 'react-hot-toast';
import { registerSupplier, sendOtp, verifyOtp } from '@/service/auth.service';
import { fetchProfile } from '@/service/profile.service';
import { maskPhoneNumber } from '@/utils/otp';

interface IPasswordVisibility {
    password: boolean;
    confirmPassword: boolean;
}

const Register = () => {
    const navigation = useRouter();
    const { isLoading } = useAppSelector((state: RootState) => state.auth);
    const [isPending, startTransition] = React.useTransition();
    const [passwordType, setPasswordType] = React.useState("password");
    const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otpVerified, setOtpVerified] = useState<boolean>(false);
    const [numberDisabled, setNumberDisabled] = useState<boolean>(false);
    const [passwordVisibility, setPasswordVisibility] = React.useState<IPasswordVisibility>({
        password: false,
        confirmPassword: false,
    });
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            mobile_number: "",
            otp: "",
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
    //Function to handel form submit
    const onSubmit = (payload: any) => {
        startTransition(async () => {
            try {
                const response: any = await registerSupplier(payload);
                if (response?.status === true && response?.statusCode === 201) {
                    fetchProfile();
                    toast.success(response?.message);
                    navigation.replace("dashboard");
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            }
        });
    };

    const handleSentOtp = () => {
        const mobile_number = getValues('mobile_number');
        if (!mobile_number) {
            setError("mobile_number", {
                type: "manual",
                message: "Please enter a mobile number",
            });
            return;
        }
        const validMobileNumberRegex = /^\+?[0-9]+$/;
        if (!validMobileNumberRegex.test(mobile_number)) {
            setError("mobile_number", {
                type: "manual",
                message: "Please enter a valid mobile number.",
            });
            return;
        }
        startTransition(async () => {
            try {
                const response: any = await sendOtp({ mobile_number: mobile_number });
                if (response?.status === true && response?.statusCode === 200) {
                    setOtpSent(true);
                    setValue('otp', response?.data?.otp);
                    toast.success(response?.message);
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            }
        });
    }

    const handleVerifyOtp = () => {
        const mobile_number = getValues('mobile_number');
        const otp = getValues('otp');
        startTransition(async () => {
            try {
                const response: any = await verifyOtp({ mobile_number: mobile_number, otp: otp });
                if (response?.status === true && response?.statusCode === 200) {
                    setOtpVerified(true);
                    setNumberDisabled(true);
                    toast.success(response?.message);
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            }
        });
    }

    return (
        <div className="w-full">
            <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900 mb-6">
                <span className="text-[#ff5757]">👋 Supplier</span> Create New Account
            </div>
            <form
                className="mt-5 xl:mt-7"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete='off'
            >
                <div className="space-y-4">
                    <div className="flex justify-between gap-4">
                        <div>
                            <Label htmlFor="name" className="mb-2 font-medium text-default-600">
                                First Name <span className='text-destructive'>*</span>
                            </Label>
                            <Input
                                disabled={isPending}
                                {...register("first_name")}
                                type="text"
                                id="fname"
                                placeholder="Enter first name"
                                className={cn("", {
                                    "border-destructive": errors.first_name,
                                })}
                                size={!isDesktop2xl ? "xl" : "lg"}
                                autoComplete="name"
                            />
                            {errors.first_name && (
                                <div className=" text-destructive mt-1">
                                    {errors.first_name.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="name" className="mb-2 font-medium text-default-600">
                                Last Name <span className='text-destructive'>*</span>
                            </Label>
                            <Input
                                disabled={isPending}
                                {...register("last_name")}
                                type="text"
                                id="lname"
                                placeholder="Enter last name"
                                className={cn("", {
                                    "border-destructive": errors.last_name,
                                })}
                                size={!isDesktop2xl ? "xl" : "lg"}
                                autoComplete="family-name"
                            />
                            {errors.last_name && (
                                <div className=" text-destructive mt-1">
                                    {errors.last_name.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <Label
                            htmlFor="email"
                            className="mb-2 font-medium text-default-600"
                        >Email <span className='text-destructive'>*</span>
                        </Label>
                        <Input
                            disabled={isPending}
                            {...register("email")}
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            className={cn("", {
                                "border-destructive": errors.email,
                            })}
                            size={!isDesktop2xl ? "xl" : "lg"}
                            autoComplete="email"
                        />
                        {errors.email && (
                            <div className=" text-destructive mt-1">
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    {otpSent ? (
                        <div>
                            <Label
                                htmlFor="otp"
                                className="mb-2 font-medium text-default-600"
                            >Mobile <span className='text-destructive'>*</span>
                            </Label>
                            <InputGroup>
                                <Input
                                    disabled={isPending || numberDisabled}
                                    {...register("otp")}
                                    type="text"
                                    id="otp"
                                    placeholder="Enter OTP"
                                    className={cn("", {
                                        "border-destructive": errors.otp,
                                    })}
                                    size={!isDesktop2xl ? "xl" : "lg"}
                                    autoComplete='new-password'
                                />
                                {otpVerified ?
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                                    >
                                        <Icon
                                            icon="mdi:checkbox-marked-circle-outline"
                                            className="w-5 h-5 text-green-500"
                                        />
                                    </div> :
                                    <InputGroupButton>
                                        <Button
                                            type='button'
                                            size="xl"
                                            onClick={handleVerifyOtp}
                                            disabled={isPending}
                                        >
                                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {isPending ? "Verifying..." : " Verify OTP"}
                                        </Button>
                                    </InputGroupButton>
                                }
                            </InputGroup>
                            {otpVerified ? null : <div className="mt-2 text-xs text-default-500">OTP sent on  {maskPhoneNumber(getValues('mobile_number'))} mobile number.</div>}

                            {errors.otp && (
                                <div className=" text-destructive mt-1">
                                    {errors.otp.message}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <Label
                                htmlFor="mobile"
                                className="mb-2 font-medium text-default-600"
                            >Mobile <span className='text-destructive'>*</span>
                            </Label>
                            <div className='relative'>
                                <InputGroup>
                                    <Input
                                        disabled={isPending}
                                        {...register("mobile_number")}
                                        type="text"
                                        id="mobile"
                                        placeholder="+91 "
                                        className={cn("", {
                                            "border-destructive": errors.mobile_number,
                                        })}
                                        size={!isDesktop2xl ? "xl" : "lg"}
                                        autoComplete='new-password'
                                    />
                                    {!otpVerified && (
                                        <InputGroupButton>
                                            <Button
                                                type='button'
                                                size="xl"
                                                onClick={handleSentOtp}
                                                disabled={isPending}
                                            >
                                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                {isPending ? "Sending..." : "Send OTP"}
                                            </Button>
                                        </InputGroupButton>
                                    )}
                                </InputGroup>
                            </div>
                            {errors.mobile_number && (
                                <div className=" text-destructive mt-1">
                                    {errors.mobile_number.message}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex justify-between gap-4">
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
                </div>

                <Button
                    className="w-full mt-6"
                    disabled={isPending || !otpVerified}
                    size={!isDesktop2xl ? "lg" : "md"}
                >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? "Registering..." : "Create an Account"}
                </Button>
            </form>

            <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
                Already have an account? {" "}
                <Link href="/login" className="text-[#ff5757] font-bold">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Register;