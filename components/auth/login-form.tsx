"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

// import Image from "next/image";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/ui/checkbox";

// import googleIcon from "@/public/images/auth/google.png";
// import facebook from "@/public/images/auth/facebook.png";
// import twitter from "@/public/images/auth/twitter.png";
// import GithubIcon from "@/public/images/auth/github.png";

const schema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z.string().min(4,{
    message: "قم يكتابة كلمة مرور صالحة",
  }),
});
import { useMediaQuery } from "@/hooks/use-media-query";
import axios from "axios";
import {useRouter} from "next/navigation";
import SiteLogo from "@/components/logo/SiteLogo";
import { api } from "@/config/axios.config";

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`; 
  const router = useRouter();
  const locale = "ar";
  // Function to handle login form submission
  const onSubmit = async (data: { email: string; password: string }) => {
    startTransition(async ()=> {
      try {
        const response = await api.post("auth/sign-in/",{
          email: data.email,
          password: data.password,
        });

        if (response.status === 201 || response.status === 200 || response.status === undefined) {
          const { accessToken } = response.data.data;
          dispatchEvent(new CustomEvent("login", { detail: { token: accessToken } }));
          // Store the JWT token in localStorage or cookies
          // localStorage.setItem("token", accessToken);
          document.cookie = `token=${accessToken}; path=/; max-age=3600; SameSite=Lax`;

          // Optionally navigate to dashboard or home after login
          router.push("/dashboard");

          toast.success("تم تسجيل الدخول بنجاح");
        } else {
          toast.error("فشل تسجيل الدخول");
        }
      } catch (error:any) {
        if((error?.response || {}).status! === 401) {
          toast.error("كلمة المرور او اسم المستخدم غير صحيح");
        }else {
          toast.error("حدث خطأ ما");
        }
      }
    });

  };
  return (
    <div className="w-full py-10 ">
<div className="w-full flex items-center justify-center">
  <div className="rounded-[18px] border-[2px] border-[#E6E6E6] px-[24px]  py-0">
    <Link href="/dashboard">
      <SiteLogo width={120} className="h-[48px] w-[48px] 2xl:w-34 2xl:h-24 text-primary" />
    </Link>
  </div>
</div>

    
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-[#624098] text-center ">

        {
            locale === "ar" ? "مرحبًا بك مرة أخرى!" : "Welcome back!"
        }
      </div>
      <div className="2xl:text-lg text-base  2xl:mt-2 leading-6 text-center text-[#624098]">
        {
            locale === "ar" ? "مرحبًا بك مرة أخرى! يرجى تسجيل الدخول إلى حسابك." : "Welcome back! Please sign in to your account."
        }
      </div>
      <div className="2xl:text-lg text-base  2xl:mt-6 leading-6 text-center text-default-900">
        {
            locale === "ar" ? "من خلال التسجيل، ستتمكن من الوصول إلى لوحة التحكم لبدأ في عملية الفحص  ورصد المخالفات وتطوير الأداء..." : "Welcome back! Please sign in to your account."
        }
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
      <div>
    <Label htmlFor="email" className="mb-2 font-bold text-[#624098]">
      {locale === "ar" ? (
        <>
          البريد الإلكتروني <span className="text-red-500">*</span>
        </>
      ) : (
        <>
          Email <span className="text-red-500">*</span>
        </>
      )}
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
    <div className="text-destructive mt-2">{errors.email.message}</div>
  )}

  <div className="mt-3.5">
    <Label htmlFor="password" className="mb-2 font-bold text-[#624098]">
      {locale === "ar" ? (
        <>
          كلمة المرور <span className="text-red-500">*</span>
        </>
      ) : (
        <>
          Password <span className="text-red-500">*</span>
        </>
      )}
    </Label>
    <div className="relative">
      <Input
        disabled={isPending}
        {...register("password")}
        type={passwordType}
        id="password"
        className="peer"
        size={!isDesktop2xl ? "xl" : "lg"}
        placeholder=" "
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 rtl:left-4 cursor-pointer"
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
    <div className="text-destructive mt-2">
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
              {
                locale === "ar" ? "تذكرني" : "Remember me"
              }
            </Label>
          </div>
          <Link href="/auth/forgot" className="flex-none text-sm text-primary">
            {
                locale === "ar" ? "نسيت كلمة المرور؟" : "Forgot Password?"
            }
          </Link>
        </div>
        <Button
          className="w-full"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {locale === "ar"
                ? (isPending ? "جاري التحميل..." : "تسجيل الدخول")
                : (isPending ? "Loading..." : "Log in")}

        </Button>
      </form>
      <div className="mt-6 xl:mt-8 flex flex-wrap justify-center gap-4">
{/*        <Button
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
          <Image src={googleIcon} alt="google" className="w-5 h-5" priority={true} />
        </Button>*/}
     {/*   <Button
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
          <Image src={GithubIcon} alt="google" className="w-5 h-5" priority={true} />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full border-default-300 hover:bg-transparent"
        >
          <Image src={facebook} alt="google" className="w-5 h-5" priority={true} />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
        >
          <Image src={twitter} alt="google" className="w-5 h-5" priority={true} />
        </Button>*/}
      </div>
{/*      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Don't have an account?{" "}
        <Link href="/auth/register" className="text-primary">
          {" "}
          Sign Up{" "}
        </Link>
      </div>*/}
    </div>
  );
};

export default LogInForm;
