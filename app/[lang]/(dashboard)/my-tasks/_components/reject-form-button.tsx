"use client"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Eye } from "@/components/svg"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const RemoveIcon = () => {
    return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 1.625C6.70947 1.625 1.625 6.70947 1.625 13C1.625 19.2905 6.70947 24.375 13 24.375C19.2905 24.375 24.375 19.2905 24.375 13C24.375 6.70947 19.2905 1.625 13 1.625ZM6.5 11.375H19.5V14.625H6.5V11.375Z" fill="white" />
    </svg>

}

const ArrowLeftIcon = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 9C1.5 5.46446 1.5 3.6967 2.59835 2.59835C3.6967 1.5 5.46446 1.5 9 1.5C12.5355 1.5 14.3033 1.5 15.4016 2.59835C16.5 3.6967 16.5 5.46446 16.5 9C16.5 12.5355 16.5 14.3033 15.4016 15.4016C14.3033 16.5 12.5355 16.5 9 16.5C5.46446 16.5 3.6967 16.5 2.59835 15.4016C1.5 14.3033 1.5 12.5355 1.5 9ZM13.3125 9C13.3125 9.31065 13.0607 9.5625 12.75 9.5625H8.85803L10.1477 10.8523C10.3674 11.072 10.3674 11.4281 10.1477 11.6477C9.92805 11.8674 9.57195 11.8674 9.35228 11.6477L7.10225 9.39773C6.99677 9.29228 6.9375 9.14918 6.9375 9C6.9375 8.85083 6.99677 8.70773 7.10225 8.60228L9.35228 6.35225C9.57195 6.13259 9.92805 6.13259 10.1477 6.35225C10.3674 6.57192 10.3674 6.92808 10.1477 7.14775L8.85803 8.4375H12.75C13.0607 8.4375 13.3125 8.68935 13.3125 9ZM5.8125 6C5.8125 5.68934 5.56066 5.4375 5.25 5.4375C4.93934 5.4375 4.6875 5.68934 4.6875 6V12C4.6875 12.3107 4.93934 12.5625 5.25 12.5625C5.56066 12.5625 5.8125 12.3107 5.8125 12V6Z" fill="white"/>
    </svg>
    
}

const rejectFormSchema = z.object({
    reson: z.string().min(10).optional()
})

type FormData = z.infer<typeof rejectFormSchema>


interface RejectFormButtonProps { id: number }

export const RejectFormButton = ({ id }: RejectFormButtonProps) => {
    const [open, setOpen] = useState(false)

    const form = useForm<FormData>({
        defaultValues: {
            reson: ""
        }
    })

    function onSubmit(data: FormData) {
        console.log(data)
        setOpen(false)
    }


    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button color="dark" className="rounded-2xl h-12 w-full text-xs">رفــض الاستمارة</Button>
        </DialogTrigger>
        <DialogContent size="lg">
            <div className="w-12 h-12 rounded-[13px] bg-primary flex items-center justify-center mx-auto">
                <RemoveIcon />
            </div>
            <p className="text-base text-primary font-bold text-center mt-4">اضافة ملاحظة - # {id}</p>
            <p className="text-[#737373] font-bold text-xs text-center">تم ارسال قبول الاستمارة رقم {id} لقسم الجودة</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="reson"
                        render={({ field }) => (
                            <Textarea
                                placeholder="تم رفض الاستمارة بسبب..."
                                className="w-full h-40 rounded-2xl border-none bg-[#F5F5F5] text-xs text-[#7B7B7B] font-bold p-7"
                                {...field}
                            />
                        )}
                    />
                    <div className="grid justify-center">

                    <Button className="h-12 rounded-2xl mx-auto mt-4 gap-[10px]">
                        إرسال الملاحظة
                        <ArrowLeftIcon/>
                    </Button>
                    </div>
                </form>
            </Form>

        </DialogContent>
    </Dialog>
}