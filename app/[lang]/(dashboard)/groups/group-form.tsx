"use client";
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
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { GroupType } from "@/types";

interface GroupFormDialogProps {
    title?: string;
    groupType?: "secret" | "field";
    isPending?: boolean
    open:boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    children: ReactNode
    onSubmit?: ({
        name,
        groupType,
    }: {
        name: string;
        groupType: "secret" | "field";
    }) => void
}

const GroupFormDialog = ({title, groupType = "secret",isPending, open,children, setOpen,onSubmit}: GroupFormDialogProps) => {
    console.log(title, groupType)
    const inputRef = React.useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            // inputRef.current.value = title || "";
            inputRef.current.focus();
        }
    }, []);
    const [selected, setSelected] = useState<"field" | "secret">(groupType);
    const handleValueChange = (value: "field" | "secret") => setSelected(value)
    
    function handleSubmit() {
        if (!inputRef.current || !inputRef.current.value) return;
        const name = inputRef.current.value;
        onSubmit?.({
            name,
            groupType: selected,
        })
    }
    console.log(selected)
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
              {children}
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
                                    <Input type="text" placeholder="ادخل الاسم المجموعة" ref={inputRef} defaultValue={title}  />
                                </div>
                                <h3 className=" col-span-2">
                                    اختر نوع المجموعة
                                </h3>
                                <RadioGroup
                                    className="grid grid-cols-2 col-span-2"
                                    defaultValue={selected}
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
                        </ScrollArea>
                    </div>

                    <div className=" flex justify-center gap-3 mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                إلغاء
                            </Button>
                        </DialogClose>
                        <Button type="button" onClick={handleSubmit} disabled={isPending}>
                            إنشاء مجموعة
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default GroupFormDialog;



