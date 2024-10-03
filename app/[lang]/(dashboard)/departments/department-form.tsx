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
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";

import { Icon } from "@iconify/react";
import { GroupSelector } from "@/components/group-selector";
import { Checkbox } from "@/components/ui/checkbox";
import { Term } from "@/types";

type DepartmentFormData = {
  groupType: "secret" | "field";
  title: string;
  terms: Term[];
  group: number;
};
interface DepartmentFormProps extends Partial<DepartmentFormData> {
  children: ReactNode;
  onSubmit: (data: DepartmentFormData) => void;
}
const DepartmentForm = ({
  onSubmit,
  groupType: defaultGroupType = "field",
  title,
  terms: defaultTerms = [],
  group,
  children,
}: DepartmentFormProps) => {
  const [selected, setSelected] = useState<number | undefined>(group);
  const [groupType, setGroupType] = useState<"secret" | "field">(
    defaultGroupType
  );
  const departmentNameRef = useRef<HTMLInputElement>(null);
  const [terms, setTerms] = useState<Term[]>(defaultTerms);

  useEffect(() => {
    if (departmentNameRef.current) {
      departmentNameRef.current.focus();
    }
  }, []);

  const handleValueChange = (value: "secret" | "field") => setGroupType(value);

  const handleSubmit = () => {
    if (
      !departmentNameRef.current ||
      !departmentNameRef.current.value ||
      !selected || 
      terms.length === 0 || 
      terms.every((term) => !term.name)
    ) {
      return;
    }
    console.log({
      selected,
      groupType,
      terms,
    });
    onSubmit({
      groupType,
      group: selected,
      title: departmentNameRef.current?.value,
      terms,
    });
  };

  return (
    <form
      className="p-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0 ">
        <div className="flex flex-col gap-4 col-span-2">
          <Label>اسم/عنوان القسم</Label>
          <Input
            type="text"
            placeholder="ادخل الاسم المجموعة"
            ref={departmentNameRef}
            defaultValue={title}
          />
        </div>{" "}
        <h3 className="col-span-2">اختر نوع المجموعة</h3>
        <RadioGroup
          className="grid grid-cols-2 col-span-2"
          defaultValue="field"
          onValueChange={handleValueChange}
        >
          <Label htmlFor="field">
            <div
              className={cn(
                "min-w-[156px] min-h-[145px] bg-default-100 dark:bg-default-200 flex flex-col justify-center items-center rounded-md relative border border-none",
                {
                  "border-solid border-primary": groupType === "field",
                }
              )}
            >
              <RadioGroupItem
                value="field"
                id="field"
                className={cn("absolute top-3 left-3 opacity-0 invisible", {
                  "visible opacity-100": groupType === "field",
                })}
              >
                {" "}
              </RadioGroupItem>
              <div className="h-16 w-16">
                <Icon
                  icon="mdi:briefcase-eye-outline"
                  className="h-full w-full object-cover dark:invert"
                />
              </div>
              <span className="text-base font-medium text-default-800 capitalize mt-1.5 inline-block">
                ميدانية
              </span>
            </div>
          </Label>
          <Label htmlFor="secret">
            <div
              className={cn(
                "min-w-[156px] min-h-[145px] bg-default-100 dark:bg-default-200 flex flex-col justify-center items-center rounded-md relative border border-none",
                {
                  "border-solid border-primary": groupType === "secret",
                }
              )}
            >
              <RadioGroupItem
                value="secret"
                id="secret"
                className={cn("absolute top-3 left-3 opacity-0 invisible", {
                  "visible opacity-100": groupType === "secret",
                })}
              >
                {" "}
              </RadioGroupItem>
              <div className="h-16 w-16">
                <Icon
                  icon="dashicons:hidden"
                  className="h-full w-full object-cover dark:invert"
                />
              </div>
              <span className="text-base font-medium text-default-800 capitalize mt-1.5 inline-block">
                سرية
              </span>
            </div>
          </Label>
        </RadioGroup>
        <div className="flex flex-col gap-4 col-span-2">
          <h3 className="col-span-2">اختر المجموعة</h3>
          <GroupSelector
            value={selected}
            onChange={(value) => setSelected(value)}
            type={groupType}
          />
        </div>
        <div className="flex flex-col gap-4 col-span-2">
          <h3 className="col-span-2">البنود</h3>

          <div className="grid gap-2">
            {terms.map((item) => (
              <div className="flex gap-2 items-center flex-wrap" key={item.id}>
                <Input
                  type="text"
                  placeholder="بند"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...terms];
                    newItems[terms.findIndex((i) => i.id === item.id)].name =
                      e.target.value;
                    setTerms(newItems);
                  }}
                />
                <div className="flex items-center gap-2">
                  <Checkbox
                    size="sm"
                    className="border-default-300 mt-[1px]"
                    id={item.id}
                    checked={item.requiredFiles}
                    onCheckedChange={(value) => {
                      const newItems = [...terms];
                      newItems[
                        terms.findIndex((i) => i.id === item.id)
                      ].requiredFiles = !!value;
                      setTerms(newItems);
                    }}
                  />
                  <Label htmlFor={item.id}>قبول الملفات</Label>
                </div>
              </div>
            ))}
          </div>

          <Button
          type="button"
            onClick={() => {
              setTerms([
                ...terms,
                {
                  id: Math.random().toString(36).substring(2, 15),
                  name: "",
                  requiredFiles: false,
                },
              ]);
            }}
          >
            اضافة بند
          </Button>
        </div>
      </div>
      {children}
    </form>
  );
};

export default DepartmentForm;
