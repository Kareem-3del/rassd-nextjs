import { cn } from "@/lib/utils";
import { Group, GroupType } from "@/rassd/types";
import { FormVisitType } from "@/types";

interface FormTypVisiteBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: GroupType;
}

export const FormVisitTypeBadge = ({
  type,
  className,
  ...props
}: FormTypVisiteBadgeProps) => {
  return (
    <div
      className={cn(
        "w-max py-3 px-[14px] rounded-md flex items-center gap-[10px] justify-center text-xs font-bold",
        {
          "text-primary bg-primary/5": type === GroupType.SECRET_VISIT,
          "text-[#6BACA1] bg-[#6BACA1]/5": type === GroupType.FIELD_VISIT,
        },
        className
      )}
      {...props}
    >
      <span className="bg-current w-1.5 h-1.5 rounded-full"></span>
      <span>{type === GroupType.FIELD_VISIT ? "زيارة ميدانية" : "زيارة سرية"}</span>
    </div>
  );
};
