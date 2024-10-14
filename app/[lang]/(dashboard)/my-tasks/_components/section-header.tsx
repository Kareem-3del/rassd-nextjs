import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SectionHeader({
    children,
    className,
    ...props
}: SectionHeaderProps) {
    return (
        <div className={cn("flex items-center gap-4", className)}>
            {children}
        </div>
    )
}

interface SectionTitle extends React.HTMLAttributes<HTMLHeadingElement> {}

export function SectionTitle({ children, className, ...props }: SectionTitle) {
    return (
        <span
            className={cn("text-sm md:text-base font-extrabold text-primary", className)}
            {...props}
        >
            {children}
        </span>
    )
}

interface SectionIcon extends React.HTMLAttributes<HTMLHeadingElement> {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export function SectionIcon({ Icon, className, ...props }: SectionIcon) {
    return (
        <div
            className={cn(
                "rounded-full p-1.5 bg-primary flex items-center justify-center",
                className
            )}
            {...props}
        >
            <Icon className="w-[18px] h-[18px] text-white" />
        </div>
    )
}
