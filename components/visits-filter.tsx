"use client";

import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";

const VISIT_TYPES = [
  {
    value: "field-visit",
    label: "زيارة ميدانية",
    checked: false,
  },
  {
    value: "secret-visit",
    label: "زيارة سرية",
    checked: false,
  },
] as const;

interface VisitsFilterProps {
  onFilterChanged?: (value: {
    "field-visit": boolean;
    "secret-visit": boolean;
  }) => void;
}

export const VisitsFilter = ({ onFilterChanged }: VisitsFilterProps) => {
  const [filter, setFilter] = useState(VISIT_TYPES);

  const handleCheckboxChange = (
    value: (typeof VISIT_TYPES)[number]["value"],
    checked: boolean
  ) => {
    // @ts-ignore
    setFilter((prev) => {
      const newFilters = prev.map((item) =>
        item.value === value ? { ...item, checked } : item
      );
      // @ts-ignore
      onFilterChanged?.({
        "field-visit": newFilters[0].checked,
        "secret-visit": newFilters[1].checked,
      });
      return newFilters;
    });
  };

  console.log(filter);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          color="dark"
          className="h-12 items-center gap-[10px] hidden md:flex rounded-2xl"
        >
          تصفية الزيارات
          <ChevronDown className="w-[18px] h-[18px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black rounded-2xl">
        {filter.map((item, index) => (
          <div
            key={item.value}
            className={cn("flex items-center gap-2 py-5 px-4", {
              "border-b border-b-white": index !== filter.length - 1,
            })}
          >
            <Checkbox
            size={"sm"}
              id={item.value}
              checked={item.checked}
              onCheckedChange={(checked) =>
                handleCheckboxChange(item.value, checked as boolean)
              }
            />
            <Label
              htmlFor={item.value}
              className="text-xs font-bold text-white cursor-pointer"
            >
              {item.label}
            </Label>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
