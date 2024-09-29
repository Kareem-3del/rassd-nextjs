"use client"
import { FormVisitType } from "@/types";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

const VISTI_TYPES = [{
    value: "field-visit",
    label: "زيارة ميدانية",
}, 
{
    value: "secret-visit",
    label: "زيارة سرية",
}
] as const 

interface VisitsFilterProps {
}

export const VisitsFilter = ({}: VisitsFilterProps) => {
   return  <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button color="dark" className="h-12 items-center gap-[10px] hidden md:flex rounded-2xl">
                تصفية الزيارات
                <ChevronDown className="w-[18px] h-[18px]" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent color="dark" className="bg-black rounded-2xl">
            {
                VISTI_TYPES.map((item, index) => (
                    <div key={item.value} className={cn("flex items-center gap-2 py-5 px-4", {
                        "border-b border-b-white": index !== VISTI_TYPES.length - 1, 
                    })}>
                        <Checkbox
                        size={"xs"} 
                            />
                            <Label className="text-xs font-bold text-white">{item.label}</Label>
                    </div>
                ))
            }
        </DropdownMenuContent>
    </DropdownMenu>
}