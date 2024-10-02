"use client";
import { Button } from "../../../../../../WebstormProjects/rassd-nextjs/components/ui/button";
import { Checkbox } from "../../../../../../WebstormProjects/rassd-nextjs/components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../../../WebstormProjects/rassd-nextjs/components/ui/dialog";
import { Input } from "../../../../../../WebstormProjects/rassd-nextjs/components/ui/input";
import { Label } from "../../../../../../WebstormProjects/rassd-nextjs/components/ui/label";
import { ScrollArea } from "../../../../../../WebstormProjects/rassd-nextjs/components/ui/scroll-area";
import Link from "next/link";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import Saudi from "../../../../../../WebstormProjects/rassd-nextjs/lib/cities-saudi";
import {cn} from "../../../../../../WebstormProjects/rassd-nextjs/lib/utils";
import {RadioGroup, RadioGroupItem} from "../../../../../../WebstormProjects/rassd-nextjs/components/ui/radio-group";
import Image from "next/image";
import book1 from "../../../../../../WebstormProjects/rassd-nextjs/public/images/all-img/book-1.png";
import book2 from "../../../../../../WebstormProjects/rassd-nextjs/public/images/all-img/book-2.png";
import {Icon} from "@iconify/react";
const CreateGroupDialog = () => {
    const types = [
        //  ميدانية ،  سرية
        { value: "field", label: "ميدانية" },
        { value: "secret", label: "سرية" },

    ];
    const [selected, setSelected] = useState<string>("rtg_1");
    const handleValueChange = (value: string) => setSelected(value)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    إنشاء مجموعة جديدة
                </Button>
            </DialogTrigger>
            <DialogContent size="2xl">
                <DialogHeader className="p-0">
                    <DialogTitle className="text-base font-medium text-default-700 ">
                        إنشاء مجموعة جديدة
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <div className=" p-4">
                        <ScrollArea className="h-full">
                            <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0 ">
                                <div className="flex flex-col gap-2 col-span-2">
                                    <Label>
                                        الاسم
                                    </Label>
                                    <Input type="text" placeholder="ادخل الاسم المجموعة"/>
                                </div>
                                <div className="flex flex-col gap-2">
                               {/*     <Label>
                                        الوظيفة
                                    </Label>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="select"
                                        placeholder={"اختر الوظيفة"}
                                        onChange={(value: any) => {
                                            setSelectedType(
                                                value
                                            )
                                        }}
                                        options={types}
                                    />*/}
                                </div>
                                <h3 className=" col-span-2">
                                    اختر نوع المجموعة
                                </h3>
                                <RadioGroup
                                    className="grid grid-cols-2 col-span-2"
                                    defaultValue="rtg_1"
                                    onValueChange={handleValueChange}
                                >

                                    <Label htmlFor="rtg_1">
                                        <div
                                            className={cn("min-w-[156px] min-h-[145px] bg-default-100 dark:bg-default-200 flex flex-col justify-center items-center rounded-md relative border border-none", {
                                                "border-solid border-primary": selected === "rtg_1"
                                            })}>
                                            <RadioGroupItem value="rtg_1" id="rtg_1"
                                                            className={cn("absolute top-3 left-3 opacity-0 invisible", {
                                                                "visible opacity-100": selected === "rtg_1"
                                                            })}> </RadioGroupItem>
                                            <div className="h-16 w-16">
                                                <Icon icon="mdi:briefcase-eye-outline"
                                                       className="h-full w-full object-cover dark:invert"
                                                      />
                                            </div>
                                            <span
                                                className="text-base font-medium text-default-800 capitalize mt-1.5 inline-block">
                                                ميدانية
                                            </span>
                                        </div>
                                    </Label>
                                    <Label htmlFor="rtg_2">
                                        <div
                                            className={cn("min-w-[156px] min-h-[145px] bg-default-100 dark:bg-default-200 flex flex-col justify-center items-center rounded-md relative border border-none", {
                                                "border-solid border-primary": selected === "rtg_2"
                                            })}>
                                            <RadioGroupItem value="rtg_2" id="rtg_2"
                                                            className={cn("absolute top-3 left-3 opacity-0 invisible", {
                                                                "visible opacity-100": selected === "rtg_2"
                                                            })}> </RadioGroupItem>
                                            <div className="h-16 w-16">
                                                <Icon icon="dashicons:hidden"
                                                      className="h-full w-full object-cover dark:invert"
                                                />
                                            </div>
                                            <span
                                                className="text-base font-medium text-default-800 capitalize mt-1.5 inline-block">
                                                سرية
                                            </span>
                                        </div>
                                    </Label>
                                </RadioGroup>
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
                            إنشاء مجموعة
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
);
};

export default CreateGroupDialog;



