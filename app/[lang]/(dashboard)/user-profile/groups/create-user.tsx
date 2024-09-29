"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import Saudi from "@/lib/cities-saudi";
const CreateUserDialog = () => {
    const [picker, setPicker] = useState<Date>(new Date());
    const roles = [
        // مدير ، مفتش ، مراجع ، مراقب جودة ، مشرف عام
        { value: "admin", label: "مدير" },
        { value: "inspector", label: "مفتش" },
        { value: "auditor", label: "مراجع" },
        { value: "quality", label: "مراقب جودة" },
        { value: "supervisor", label: "مشرف عام" },
    ];
    const [selectedRole, setSelectedRole] = useState(null);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    إضافة مستخدم جديد
                </Button>
            </DialogTrigger>
            <DialogContent size="2xl">
                <DialogHeader className="p-0">
                    <DialogTitle className="text-base font-medium text-default-700 ">
                        إنشاء حساب جديد
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <div className="h-96 p-2">
                        <ScrollArea className="h-full">
                            <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                                <div className="flex flex-col gap-2">
                                    <Label>
                                        الاسم الأول
                                    </Label>
                                    <Input type="text" placeholder="ادخل الاسم الأول"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>
                                        الاسم الأخير
                                    </Label>
                                    <Input type="text" placeholder="ادخل الاسم الأخير"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>
                                        الوظيفة
                                    </Label>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="select"
                                        placeholder={"اختر الوظيفة"}
                                        onChange={(value: any) => {
                                            setSelectedRole(
                                                value
                                            )
                                        }}
                                        options={roles}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>
                                        البريد الإلكتروني
                                    </Label>
                                    <Input type="email" placeholder="ادخل البريد الإلكتروني"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>
                                        رقم الهاتف
                                    </Label>
                                    <Input type="number" placeholder="ادخل رقم الهاتف"/>
                                </div>



                                <div className="flex flex-col gap-2">
                                    <Label>
                                        كلمة المرور
                                    </Label>
                                    <Input type="number" placeholder="ادخل كلمة المرور"/>
                                </div>
                                <div className="flex flex-col gap-2 col-span-2">
                                    <Label>
                                        رقم الهوية

                                    </Label>
                                    <Input type="number" placeholder="xxxxxxx"/>
                                </div>
                                {/*      <div className="flex flex-col gap-2">
                                    <Label>
                                        تاريخ الميلاد
                                    </Label>
                                    <Flatpickr
                                        className="w-full bg-background border border-default-200 focus:border-primary focus:outline-none h-10 rounded-md px-2 placeholder:text-default-600"
                                        placeholder="Date of birth"
                                        value={picker}
                                        onChange={(dates: Date[]) => {
                                            setPicker(dates[0] || null);
                                        }}
                                        id="default-picker"
                                    />
                                </div>*/}
                                <div className="col-span-2 flex  items-center gap-2">
                                    <Checkbox id="terms"/>
                                    <Label
                                        htmlFor="terms"
                                        className="text-xs text-default-700 cursor-pointer"
                                    >
                                        ارسال معلومات تسجيل الدخول إلى البريد الإلكتروني و رقم الهاتف
                                    </Label>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>

                    <div className=" flex justify-center gap-3 mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                إلغاء
                            </Button>
                        </DialogClose>
                        <Button type="button">
                            إنشاء حساب
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUserDialog;



