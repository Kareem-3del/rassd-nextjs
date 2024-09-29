import { FormCardEntries } from "@/types";
import { Card, CardTitle } from "@/components/ui/card";
import { UserBadge } from "@/components/user-badge";
import { DotSperator } from "@/components/dot-sperator";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FormQuestions } from "@/components/form-questions";
import Link from "next/link";
import { FormVisitTypeBadge } from "@/components/form-visit-type-badge";
import { RedoFormButton } from "./redo-form-button";

export type RejectedFormProps = Omit<FormCardEntries, "user" | "progress"> &  {
    rejectReson: string
}

interface FormCardProps extends RejectedFormProps {
}

export const RejectedFormCard = ({
    id,
    resumeNumber,
    resumeTitle,
    resumeArea,
    resumeTime,
    formStatus,
    formVisitType,
    items,
    facilityOwnerSignature,
    inspectorSignature,
    rejectReson
}: FormCardProps) => {
    return (
        <Card className="px-10 py-[26px] rounded-[30px]">
            <FormVisitTypeBadge type={formVisitType} className="mx-auto md:hidden" />

            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 pt-5">

                {/* Right Side */}
                <div>
                    <Link href={`/my-tasks/${id}`} className="text-base text-black font-extrabold pb-5 text-center md:text-start hover:text-success max-w-max block">{resumeNumber} #</Link>
                    <Link href={`/my-tasks/${id}`} className="text-base text-black font-extrabold text-center md:text-start hover:text-success max-w-max block">{resumeTitle}</Link>
                    <div className="flex flex-wrap items-center gap-[10px] md:gap-4 pt-5 justify-center md:justify-start">
                        <div className="text-[#B1B1B1] text-xs font-extrabold">{
                            resumeArea
                        }</div>
                        <DotSperator className="bg-[#D9D9D9]" />
                        <div className="text-[#B1B1B1] text-xs font-extrabold">{
                            resumeTime.toLocaleString("ar-EG", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })
                        }</div>
                        <DotSperator className="bg-[#D9D9D9]" />
                        <div className="text-[#B1B1B1] text-xs font-extrabold">{
                            formStatus === "in-review" ? "قيد المراجعة" : "قيد التنفيذ"
                        }</div>
                        {
                            items > 0 ?
                                (<>
                                    <DotSperator className="bg-[#D9D9D9]" />
                                    <div className="text-[#B1B1B1] text-xs font-extrabold">
                                        {items} بندًا
                                    </div></>) : null

                        }
                    </div>
                </div>

                {/* Left Side */}
                <div className="w-full md:w-[initial]">
                    <FormVisitTypeBadge type={formVisitType} className="mr-auto hidden md:flex" />
                        <FormActions 
                            formStatus={formStatus} 
                            formVisitType={formVisitType} 
                            resumeNumber={resumeNumber} 
                            resumeTitle={resumeTitle} 
                            resumeArea={resumeArea} 
                            resumeTime={resumeTime} 
                            facilityOwnerSignature={facilityOwnerSignature}
                            inspectorSignature={inspectorSignature} 
                        />
                </div>

            </div>
            <Separator className="my-2" />
            <div className="text-xs text-primary font-extrabold">سبب الرفض :</div>
            <p className="mt-1 text-sm font-bold text-[#5C5C5C]">{rejectReson}</p>
        </Card>
    )
}

interface FormActionsProps extends Omit<FormCardEntries, "user" | "items" | "progress" | "items" | "id"> {
}

const quesiotns = [{
    id: "1",
    value: true,
    label: "هل انت متأكد من أن المستند موجود في المجلد الصحيح ؟",
    isAcceptFiles: true,
    files: ["/images/avatar/avatar-2.jpg", "/images/avatar/avatar-1.jpg"]
},
{
    id: "2",
    value: true,
    label: "هل جميع المعدات الطبية في حالة تشغيل جيدة؟",
    files: ["/images/avatar/avatar-2.jpg", "/images/avatar/avatar-1.jpg"],
    isAcceptFiles: true,
    diabled: true
},
{
    id: "2",
    value: false,
    label: "هل يتم فحص الأدوية وتخزينها بشكل صحيح؟",
},

{
    id: "2",
    value: false,
    label: "هل يوجد سجل محدث لجميع المرضى؟",
},
{
    id: "2",
    value: false,
    label: "هل يتم توثيق إجراءات الفحص الدوري بشكل مناسب؟",
},
{
    id: "2",
    value: false,
    label: "هل يتلقى الموظفون التدريبات اللازمة بانتظام؟",
},
{
    id: "2",
    value: false,
    label: "هل تتوفر وسائل الأمان والسلامة في جميع أنحاء المنشأة؟",
},
{
    id: "2",
    value: false,
    label: "هل يوجد نظام إدارة نفايات فعال؟",
},
]

const FormActions = ({
    formVisitType,
    resumeTime,
    resumeNumber,
    resumeTitle,
    resumeArea,
    facilityOwnerSignature,
    inspectorSignature,
}: FormActionsProps) => {
    return (<div className="mt-[10px] flex flex-wrap lg:flex-nowrap gap-[10px]">
        <div className="flex flex-1 items-center gap-[10px]">
            <FormQuestions formVisitType={formVisitType} resumeArea={resumeArea} resumeTime={resumeTime} resumeTitle={resumeTitle} resumeNumber={resumeNumber} questions={quesiotns} facilityOwnerSignature={facilityOwnerSignature}
                inspectorSignature={inspectorSignature} />
            <RedoFormButton resumeNumber={resumeNumber} />
        </div>
    </div>)
}



