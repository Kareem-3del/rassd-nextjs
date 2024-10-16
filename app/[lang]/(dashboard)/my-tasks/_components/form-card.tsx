import { FormCardEntries } from "@/types";
import { Card, CardTitle } from "@/components/ui/card";
import { UserBadge } from "@/components/user-badge";
import { DotSperator } from "@/components/dot-sperator";
import {FormVisitTypeBadge} from "@/components/form-visit-type-badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AcceptFormButton } from "./accept-form-button";
import { RejectFormButton } from "./reject-form-button";
import { TaskTerms } from "@/components/task-form/task-terms";
import Link from "next/link";
import React from "react";

interface FormCardProps extends FormCardEntries {
}

export const FormCard = ({
    id,
    user,
    resumeNumber,
    resumeTitle,
    resumeArea,
    resumeTime,
    formStatus,
    formVisitType,
    items,
    progress,
    facilityOwnerSignature,
    inspectorSignature
}: FormCardProps) => {
    return (
        <Card className="px-10 py-[26px] rounded-[30px]">
            <UserBadge user={user} />
            <Separator className="md:hidden my-5" />
            <FormVisitTypeBadge type={formVisitType as any} className="mx-auto md:hidden" />

            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 pt-5">

                {/* Right Side */}
                <div>
                    <Link href={`/my-tasks/${id}`} className="text-base text-black font-extrabold pb-5 text-center md:text-start hover:text-success max-w-max block">{resumeNumber} #</Link>
                    <Link href={`/my-tasks/${id}`} className="text-base text-primary font-extrabold text-center md:text-start hover:text-success max-w-max block">{resumeTitle}</Link>
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
                            formStatus === "UnderReview" ? "قيد المراجعة" :
                            formStatus === "Completed" ? "مكتمل" : "قيد التنفيذ"
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
                    <FormVisitTypeBadge type={formVisitType as any} className="mr-auto hidden md:flex" />

                    {
                        formStatus === "UnderReview" &&
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
                    }
                    {
                        <FormProgress progress={
                            formStatus === "Completed" ? 100 :
                            formStatus === "UnderReview" ?  80 :
                                formStatus === "Pending" ? 10 : 0
                        } />
                    }
                </div>

            </div>
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
            {/*   @ts-ignore */}
            <TaskTerms formVisitType={formVisitType  as any } resumeArea={resumeArea} resumeTime={resumeTime} resumeTitle={resumeTitle} resumeNumber={resumeNumber} questions={quesiotns} facilityOwnerSignature={facilityOwnerSignature}
                inspectorSignature={inspectorSignature} />
            {/*   @ts-ignore */}
            <AcceptFormButton resumeNumber={resumeNumber  as any} />

        </div>
        {/*   @ts-ignore */}
        <RejectFormButton resumeNumber={resumeNumber  as any} />
    </div>)
}

interface FormProgressProps {
    progress: number;
}

const FormProgress = ({ progress }: FormProgressProps) => {
    return <div className="space-y-1.5 mt-3">
        <div className="flex items-center justify-between text-[10px] text-[#6BACA1] font-extrabold">
            <span>نسبة الإنجاز</span>
            <span>{progress}%</span>
        </div>
        <Progress value={progress} className=" [&>div]:bg-[#00866F] h-2 rounded-[20px]" />
    </div>
}

