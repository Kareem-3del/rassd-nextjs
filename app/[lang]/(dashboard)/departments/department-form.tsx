"use client";
// @ts-ignore
import { Button } from "@/components/ui/button";
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
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";

import { Icon } from "@iconify/react";
import { GroupSelector } from "@/components/group-selector";
import { Checkbox } from "@/components/ui/checkbox";
const DepartmentFormDialog = () => {
    const [selected, setSelected] = useState<string>("field");
    const [groupType, setGroupType] = useState<string>();
    const departmentNameRef = useRef<HTMLInputElement>(null);
    const [items, setItems] = useState<{
        id: string;
        name: string;
        isAcceptFile: boolean;
    }[]>([]);

    const handleValueChange = (value: string) => setSelected(value)

    const handleSubmit = () => {
        console.log({
            selected,
            name: departmentNameRef.current?.value,
            groupType,
            items,
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    إنشاء قسم جديد
                </Button>
            </DialogTrigger>
            <DialogContent size="2xl" className="max-h-[80vh] overflow-y-auto">
                <DialogHeader className="p-0">
                    <DialogTitle className="text-base font-medium text-default-700 ">
                        إنشاء قسم جديد
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <div className=" p-4">
                            <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0 ">
                                <div className="flex flex-col gap-4 col-span-2">
                                    <Label>
                                        اسم/عنوان القسم
                                    </Label>
                                    <Input type="text" placeholder="ادخل الاسم المجموعة" ref={departmentNameRef} />
                                </div>
                                <div className="flex flex-col gap-4 col-span-2">

                                    <h3 className="col-span-2">
                                        اختر المجموعة
                                    </h3>
                                    <GroupSelector value={groupType} onChange={(value) => setGroupType(value)} />
                                </div>
                                <div className="flex flex-col gap-4 col-span-2">

                                    <h3 className="col-span-2">
                                        البنود
                                    </h3>

                                    <div className="grid gap-2">
                                        {
                                            items.map(item => (
                                                <div className="flex gap-2 items-center flex-wrap" key={item.id}>
                                                    <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        size="sm"
                                                        className="border-default-300 mt-[1px]"
                                                        id={item.id}
                                                        checked={item.isAcceptFile}
                                                        onCheckedChange={(value) => {
                                                            const newItems = [...items];
                                                            newItems[items.findIndex(i => i.id === item.id)].isAcceptFile = !!value;
                                                            setItems(newItems);
                                                        }}
                                                    />
                                                        <Label htmlFor={item.id}>
                                                            قبول الملفات
                                                        </Label>

                                                    </div>
                                                    <Input type="text" placeholder="بند" value={item.name} onChange={(e) => {
                                                        const newItems = [...items];
                                                        newItems[items.findIndex(i => i.id === item.id)].name = e.target.value;
                                                        setItems(newItems);
                                                    }} />
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <Button onClick={() => {
                                        setItems([...items, {
                                            id: Math.random().toString(36).substring(2, 15),
                                            name: "",
                                            isAcceptFile: false
                                        }])
                                    }}>اضافة بند</Button>
                                </div>

                                <h3 className="col-span-2">
                                    اختر نوع المجموعة
                                </h3>
                                <RadioGroup
                                    className="grid grid-cols-2 col-span-2"
                                    defaultValue="field"
                                    onValueChange={handleValueChange}
                                >

                                    <Label htmlFor="field">
                                        <div
                                            className={cn("min-w-[156px] min-h-[145px] bg-default-100 dark:bg-default-200 flex flex-col justify-center items-center rounded-md relative border border-none", {
                                                "border-solid border-primary": selected === "field"
                                            })}>
                                            <RadioGroupItem value="field" id="field"
                                                className={cn("absolute top-3 left-3 opacity-0 invisible", {
                                                    "visible opacity-100": selected === "field"
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
                                    <Label htmlFor="secret">
                                        <div
                                            className={cn("min-w-[156px] min-h-[145px] bg-default-100 dark:bg-default-200 flex flex-col justify-center items-center rounded-md relative border border-none", {
                                                "border-solid border-primary": selected === "secret"
                                            })}>
                                            <RadioGroupItem value="secret" id="secret"
                                                className={cn("absolute top-3 left-3 opacity-0 invisible", {
                                                    "visible opacity-100": selected === "secret"
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
                       
                    </div>

                    <div className=" flex justify-center gap-3 mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                إلغاء
                            </Button>
                        </DialogClose>
                        <Button type="button" onClick={handleSubmit}>
                            إنشاء مجموعة
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DepartmentFormDialog;



