"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useMediaQuery, useAppSelector } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema } from "@/validations";
import { loginSupplier } from "@/service/auth.service";
import { fetchProfile } from "@/service/profile.service";
import Image from "next/image";
import FavIcon from "@/public/images/all-img/fav-icon.png"
import { signIn } from "next-auth/react";
import googleIcon from "@/public/images/auth/google.png";
import facebook from "@/public/images/auth/facebook.png";
import twitter from "@/public/images/auth/twitter.png";
import GithubIcon from "@/public/images/auth/github.png";

const Login = () => {
  const navigation = useRouter();
  const { isLoading } = useAppSelector((state: RootState) => state.auth);
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Function to toggle paswword input
  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };

  //Function to handel form submit
  const onSubmit = (data: { email: string; password: string }) => {
    startTransition(async () => {
      try {
        const loginPayload = {
          email: data.email,
          password: data.password,
        };
        const response: any = await loginSupplier(loginPayload);
        if (response?.status === true && response?.statusCode === 200) {
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

  return (
    <div className="w-full py-10">
      <Link href="/" className="flex gap-2 items-center">
        <Image src={FavIcon} alt="Company Fav icon" className="w-[50px] object-cover" priority={true} />
        <div className="flex-1  text-2xl">
          <span className="text-primary font-extrabold">Trexo</span> <span className="text-gray-700 font-light">Pro</span>
        </div>
      </Link>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 2xl:mt-2 leading-6">
        Enter the information you entered while registering.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
        <div>
          <Label htmlFor="email" className="mb-2 font-medium text-default-600">
            Email{" "}
          </Label>
          <Input
            disabled={isPending}
            {...register("email")}
            type="email"
            id="email"
            className={cn("", {
              "border-destructive": errors.email,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </div>
        {errors.email && (
          <div className=" text-destructive mt-2">{errors.email.message}</div>
        )}

        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-2 font-medium text-default-600"
          >
            Password{" "}
          </Label>
          <div className="relative">
            <Input
              disabled={isPending}
              {...register("password")}
              type={passwordType}
              id="password"
              className="peer "
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=" "
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "password" ? (
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
        </div>
        {errors.password && (
          <div className=" text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="mt-5  mb-8 flex flex-wrap gap-2">
          <div className="flex-1 flex  items-center gap-1.5 ">
            <Checkbox
              size="sm"
              className="border-default-300 mt-[1px]"
              id="isRemebered"
            />
            <Label
              htmlFor="isRemebered"
              className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
          <Link href="/forgot" className="flex-none text-sm text-primary">
            Forget Password?
          </Link>
        </div>
        <Button
          className="w-full"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
      <div className="mt-6 xl:mt-8 flex flex-wrap justify-center gap-4">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
          disabled={isPending}
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
        >
          <Image src={googleIcon} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
          disabled={isPending}
          onClick={() =>
            signIn("github", {
              callbackUrl: "/dashboard",
              redirect: false,
            })
          }
        >
          <Image src={GithubIcon} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full border-default-300 hover:bg-transparent"
        >
          <Image src={facebook} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
        >
          <Image src={twitter} alt="google" className="w-5 h-5" />
        </Button>
      </div>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary">
          {" "}
          Sign Up{" "}
        </Link>
      </div>
    </div>
  );
};

export default Login;
