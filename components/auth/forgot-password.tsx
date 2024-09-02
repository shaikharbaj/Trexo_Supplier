"use client";
import React from "react";
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
import { forgotPasswordSchema } from "@/validations";
import Image from "next/image";
import FavIcon from "@/public/images/all-img/fav-icon.png"
import { forgotPassword } from "@/service/auth.service";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const navigation = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  //Function to handel form submit
  const onSubmit = (data: { email: string }) => {
    startTransition(async () => {
      try {

        const response: any = await forgotPassword(data);
        if (response?.status === true && response?.statusCode === 200) {
          toast.success(response?.message);
          navigation.replace("login");
        } else {
          toast.error(response?.message);
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
        Forget Your Password?
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Enter your email & instructions will be sent to you!
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
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
          {errors.email && (
            <div className=" text-destructive mt-2">
              {errors.email.message as string}
            </div>
          )}
        </div>

        <Button className="w-full mt-6" size={!isDesktop2xl ? "lg" : "md"} disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "sending..." : "Send Recovery Email"}
        </Button>
      </form>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Forget it. Send me back to{" "}
        <Link href="/login" className="text-primary">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
