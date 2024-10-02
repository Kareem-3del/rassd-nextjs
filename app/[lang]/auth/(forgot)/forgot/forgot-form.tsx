"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SiteLogo } from "@/components/svg";
import { api } from "@/config/axios.config";
const schema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
});
const ForgotForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data: any) => {
    startTransition(async () => {
      try {
        const response = await api.post("auth/forgot/", {
          email: data.email,
        });

        if (!(response.status === 201 || response.status === 200)) {
          toast.error("حدث خطأ ما");
          return 
        }
        toast.success("تم ارسال رسالة الاسترداد بنجاح!");
        reset();

      } catch (error) {
        toast.error("حدث خطأ ما");
      }
    });
  };
  return (
    <div className="w-full">
      <Link href="/dashboard" className="inline-block">
        <SiteLogo className="h-10 w-10 2xl:w-14 2xl:h-14 text-primary" />
      </Link>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        هل نسيت كلمة السر؟
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        أدخل عنوان البريد الإلكتروني وسوف تتلقى رسالة إلكترونية لإعادة تعيين كلمة المرور الخاصة بك.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div>
          <Label htmlFor="email" className="mb-2 font-medium text-default-600">
            البريد الإلكتروني{" "}
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
            <div className=" text-destructive mt-2">{errors.email.message as string}</div>
          )}
        </div>

        <Button className="w-full mt-6" size={!isDesktop2xl ? "lg" : "md"}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "جاري الإرسال ..." : "إرسال رسالة الاسترداد"}
        </Button>
      </form>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        انسى ذلك. أرسلني إلى{" "}
        <Link href="/auth/login" className="text-primary">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
};

export default ForgotForm;
