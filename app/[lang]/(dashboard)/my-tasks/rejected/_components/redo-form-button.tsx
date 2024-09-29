import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Success } from "@/components/svg"
import AnimatedButton from "@/components/ainmated-button"

interface RedoFormButtonProps
 {resumeNumber: string }

export const RedoFormButton = ({resumeNumber }: RedoFormButtonProps) => {

    return <Dialog >
        <DialogTrigger asChild>
        <AnimatedButton text="اعادة تنفيذ المهمة" className="flex-1"/>
        </DialogTrigger>
        <DialogContent size="lg">
            <div className="flex justify-center">
            <Success/>
            </div>
            <div className="text-center mt-10">
                <p className="text-primary font-extrabold text-xl">تهانينا , تم ارسال قبول الاستمارة بنجاح</p>
                <p className="text-[#737373] font-bold text-base mt-5">تم ارسال قبول الاستمارة رقم {resumeNumber} لقسم الجودة</p>
            </div>
        </DialogContent>
    </Dialog>
}