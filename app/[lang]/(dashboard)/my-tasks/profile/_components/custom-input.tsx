"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"


// @ts-ignore
interface CustomInputProps extends React.ComponentProps<typeof Input> {
    label: string
}


export const CustomInput = ({ className, label, ...props }: CustomInputProps) => {
    const [isFoucs, setIsFoucs] = useState(false)

    return <div className="relative">
        {
            isFoucs || props.value ? null :
                (<Label className="absolute top-1/2 -translate-y-1/2 right-5 font-bold text-xs text-black pointer-events-none">{label}</Label>)
        }
        <Input radius="lg" className={cn("p-5", className)}{...props} onFocus={() => setIsFoucs(true)} onBlur={() => setIsFoucs(false)} placeholder="" />
    </div>

}



