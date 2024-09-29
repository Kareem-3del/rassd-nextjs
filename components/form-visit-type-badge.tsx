import { cn } from "@/lib/utils";
import { FormVisitType } from "@/types";

interface FormTypVisiteBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    type: FormVisitType
}

export const FormVisitTypeBadge = ({type,className, ...props}: FormTypVisiteBadgeProps) => {
    return (
        <div className={cn("w-max py-3 px-[14px] rounded-md flex items-center gap-[10px] justify-center text-xs font-bold", {
            "text-primary bg-primary/5": type ==="secret-visit",
            "text-[#6BACA1] bg-[#6BACA1]/5": type ==="field-visit",
        },className)} {...props}>
                <span className="bg-current w-1.5 h-1.5 rounded-full"></span>
            <span>{
                type === "field-visit" ? "زيارة ميدانية" : "زيارة سرية"
            }</span>
        </div>
    )
}