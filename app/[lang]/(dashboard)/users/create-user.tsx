"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUsers } from "@/hooks/useUsers";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import { SingleValue } from "react-select";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

interface CreateUserDialogProps extends ReturnType<typeof useUsers> {}

const formSchema = z.object({
  firstName: z.string().min(1, "الاسم الأول مطلوب"),
  lastName: z.string().min(1, "الاسم الأخير مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phoneNumber: z.string().min(1, "رقم الهاتف مطلوب"),
  password: z.string().min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل"),
  nationalId: z
    .string()
    .min(7, "يجب أن يتكون رقم الهوية من 7 أرقام")
    .max(7, "يجب أن يتكون رقم الهوية من 7 أرقام"),
  role: z.string().min(1, "الوظيفة مطلوبة"),
  sendLoginInfo: z.boolean().optional(),
});

const CreateUserDialog = ({ createUser }: CreateUserDialogProps) => {
  const roles = [
    { value: "admin", label: "مدير" },
    { value: "inspector", label: "مفتش" },
    { value: "auditor", label: "مراجع" },
    { value: "quality", label: "مراقب جودة" },
    { value: "supervisor", label: "مشرف عام" },
  ];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      nationalId: "",
      role: "",
      sendLoginInfo: false,
    },
  });

  function onSubmit(values: any) {
    createUser(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>إضافة مستخدم جديد</Button>
      </DialogTrigger>
      <DialogContent size="2xl">
        <DialogHeader>
          <DialogTitle>إنشاء حساب جديد</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-96 p-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الأول</FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل الاسم الأول" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الأخير</FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل الاسم الأخير" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الوظيفة</FormLabel>
                      <FormControl>
                        <Select
                          className="react-select"
                          classNamePrefix="select"
                          value={roles.find((r) => r.value === field.value)}
                          onChange={(
                            value: SingleValue<{ value: string; label: string }>
                          ) => {
                            field.onChange(value);
                          }}
                          options={roles}``
                          placeholder="اختر الوظيفة"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل البريد الإلكتروني"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل رقم الهاتف"
                          value={field.value}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل كلمة المرور"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* National ID */}
                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>رقم الهوية</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="xxxxxxx"
                          value={field.value}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Send login info */}
                <FormField
                  control={form.control}
                  name="sendLoginInfo"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        ارسال معلومات تسجيل الدخول إلى البريد الإلكتروني و رقم
                        الهاتف
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-center gap-3">
                <Button type="button" variant="outline">
                  إلغاء
                </Button>
                <Button type="submit">إنشاء حساب</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
