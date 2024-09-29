import { ArrowLeft, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
    text: string;
}
const AnimatedButton = ({
    className,
    text,
    ...props
}: AnimatedButtonProps) => {
    return (
        <Button
            className={cn("h-12 rounded-2xl block", className)}
            {...props}
        >
            <div className="flex items-center justify-between gap-[10px] h-full">

                <div className="flex items-center gap-[10px]">

                    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-xl">
                        <ArrowLeft className="w-[12px] h-[12px] text-primary" />
                    </div>
                    <span className="font-bold text-xs text-white">{text}</span>
                </div>
                <div className="grid grid-cols-[repeat(4,0.8rem)] flex-1 justify-end">
                    {[1, 2, 3, 4].map((index) => (
                        <ChevronLeft className={"w-[18px] h-[18px] text-white"} key={index} style={{
                            opacity: index * 0.25,
                        }} />
                    ))}
                </div>
            </div>
        </Button>
    );
};

export default AnimatedButton;