import { cn } from "@/lib/utils"

interface DotSperatorProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const DotSperator = ({ className, ...props }: DotSperatorProps) => {
    return (
        <div className={cn("h-1.5 w-1.5 rounded-full",className)} {...props}>
        </div>
    )
}