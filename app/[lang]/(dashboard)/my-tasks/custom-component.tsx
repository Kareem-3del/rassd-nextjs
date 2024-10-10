import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import projectLogo from "@/public/images/projects/project-placeholder.jpg";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";

type UserRole = "user" | "admin"
type Message = {
    sendBy: string
    date: Date
    image: string
    role: UserRole
    text: string
}

interface CustomComponentProps {
    noteBy: string
    noteDate: Date
    sendBy: {
        name: string
        date: Date
        image: string
    }
    messages: Message[]
}

export const CustomComponent = ({ sendBy,noteDate, noteBy, messages }: CustomComponentProps) => {
    return <Dialog>
        <DialogTrigger asChild>
            <Button>الملاحظات</Button>
        </DialogTrigger>
        <DialogContent size="2xl" className="max-h-[80vh] overflow-y-auto">
            <Button size="icon" className="rounded-xl mr-auto">
                <ChevronLeft className="w-4 h-4 text-white" />
            </Button>
            <div className="flex flex-col md:flex-row items-center justify-between mt-3">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <Image width={20} height={20} alt="شعار" src={projectLogo.src} />
                    </div>
                    <div className="text-sm text-primary font-extrabold">ملاحظات {noteBy}</div>
                </div>
                <div className="text-[#1C274C] text-xs font-bold">التاريخ: {formatDateToArabic(noteDate)}</div>
            </div>
            <Separator className="mt-5 mb-3" />
            <div className="flex items-center justify-between gap-row-10 gap-col-2 flex-wrap">
                <div className="flex gap-4">
                    <UserAvatar user={{
                        image: sendBy.image,
                        name: sendBy.name
                    }} />
                    <div className="space-y-1">
                        <div className="text-xs text-primary font-extrabold">المرسل: {sendBy.name}</div>
                        <div className="text-[10px] text-[#888888] font-bold">منذ 10 ساعات</div>
                    </div>
                </div>
                <div className="text-[#6BACA1] text-xs font-bold">التاريخ: {formatDateToArabic(sendBy.date)}</div>
            </div>
            <RenderMessages messages={messages} />
        </DialogContent>
    </Dialog >
}


function RenderItems({ items }: { items: string[] }) {
    return <div className="space-y-3 my-4">
        {items.map(item => (
            <div className="flex gap-2">
                <ArrowLeft className="w-4 h-4 text-[#1C274C]" />
                <div className="text-xs md:text-sm font-bold text-[#1C274C]">{item}</div>
            </div>
        ))}
    </div>
}

function RenderMessages({ messages }: { messages: Message[] }) {
    return <div>
        {messages.map((message, index) => (
            <div key={index} className="py-7 border-t border-gray-500">
                <div className="flex items-center justify-between gap-row-10 gap-col-2 flex-wrap">
                    <div className="flex gap-4">
                        <UserAvatar user={{
                            image: message.image,
                            name: message.sendBy
                        }} />
                        <div className="space-y-1">
                            <div className={cn("text-xs text-[#6BACA1] font-extrabold", {
                                "text-primary": message.role === "admin"
                            })}>{message.sendBy}</div>
                            <div className="text-[10px] text-[#888888] font-bold">منذ 10 ساعات</div>
                        </div>
                    </div>
                    <div className="text-primary text-xs font-bold">{formatDateToArabic(message.date)}</div>
                </div>
                <div className={cn("mt-4 text-xs font-extrabold text-[#6BACA1]", {
                    "text-primary": message.role === "admin"
                })}>
                    {message.text}
                </div>
            </div>
        ))}
    </div>
}


function formatDateToArabic(date: Date) {
    if (!(date instanceof Date)) {
        throw new Error('Invalid Date object');
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('ar-EG', options);

    return formattedDate;
}
