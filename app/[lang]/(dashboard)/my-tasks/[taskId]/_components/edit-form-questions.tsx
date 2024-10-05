"use client"
import { DotSperator } from "@/components/dot-sperator";
import { TaskTerm, RenderEditableFile } from "@/components/task-form/task-term";
import { Separator } from "@/components/ui/separator";
import { FormCardEntries, Question } from "@/types";
import { FormVisitTypeBadge } from "@/components/form-visit-type-badge";
import AddSignatureDialog from "@/components/add-signature-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {  MinusCircle } from "lucide-react"
import { UploadFileButton } from "@/components/upload-file-button";

interface EditFormsQesutionsProps extends Pick<FormCardEntries, "formVisitType" | "resumeTime" | "resumeNumber" | "resumeTitle" | "resumeArea" | "resumeArea"> {
    questions: Pick<Question, "id" | "value" | "label" | "files">[]
    facilityOwnerSignature: string
    inspectorSignature: string
}

const SignatureIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.6875 15.1875C3.375 10.8748 7.59375 2.8125 10.4062 2.8125C12.9375 2.8125 5.625 14.625 8.4375 14.625C10.4062 14.625 11.8125 8.71875 13.2188 8.71875C14.625 8.71875 12.6562 13.7812 13.7812 13.7812C15.1875 13.7812 16.0312 11.5312 16.0312 11.5312" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)
const ImageUp = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" width="38" height="38" rx="18" fill="black" />
        <g clip-path="url(#clip0_312_6851)">
            <path d="M16.1673 18.282C16.9037 18.282 17.5007 17.6391 17.5007 16.8461C17.5007 16.053 16.9037 15.4102 16.1673 15.4102C15.4309 15.4102 14.834 16.053 14.834 16.8461C14.834 17.6391 15.4309 18.282 16.1673 18.282Z" stroke="white" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.207 25.4615C18.9203 18.3538 22.007 17.1045 25.5003 21.7209" stroke="white" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.3537 12.5386H14.8337C14.1264 12.5386 13.4481 12.8411 12.948 13.3797C12.4479 13.9182 12.167 14.6487 12.167 15.4104V22.5899C12.167 23.3515 12.4479 24.0819 12.948 24.6205C13.4481 25.159 14.1264 25.4617 14.8337 25.4617H22.8337C23.5409 25.4617 24.2192 25.159 24.7193 24.6205C25.2194 24.0819 25.5003 23.3515 25.5003 22.5899V18.2822" stroke="white" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 10.9805V16.7241" stroke="white" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M26.1339 14.4268L24.0005 16.7242L21.8672 14.4268" stroke="white" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_312_6851">
                <rect width="16" height="17.2308" fill="white" transform="translate(11.5 10.3848)" />
            </clipPath>
        </defs>
    </svg>

)

const FileUp = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.6875 2.12567C9.3422 2.06699 8.8715 2.06254 8.02235 2.06254C6.58483 2.06254 5.56306 2.06373 4.78839 2.16741C4.02947 2.26898 3.5934 2.4595 3.27643 2.77647C2.95902 3.09387 2.76877 3.52861 2.66732 4.28318C2.56369 5.05392 2.5625 6.06993 2.5625 7.50008V10.5001C2.5625 11.9302 2.56369 12.9461 2.66732 13.7169C2.76877 14.4715 2.95902 14.9062 3.27643 15.2236C3.59383 15.5411 4.02857 15.7313 4.78314 15.8327C5.55388 15.9364 6.56989 15.9376 8 15.9376H11C12.4301 15.9376 13.4461 15.9364 14.2169 15.8327C14.9714 15.7313 15.4062 15.5411 15.7236 15.2236C16.041 14.9062 16.2313 14.4715 16.3327 13.7169C16.4363 12.9461 16.4375 11.9302 16.4375 10.5001V10.1722C16.4375 9.02018 16.4294 8.4741 16.3072 8.06258H13.9597C13.1101 8.06258 12.4158 8.06258 11.8677 7.98885C11.2947 7.91183 10.798 7.7451 10.4014 7.34862C10.0049 6.95209 9.83818 6.45534 9.76115 5.88238C9.6875 5.33423 9.6875 4.63993 9.6875 3.79031V2.12567ZM10.8125 2.70713V3.75004C10.8125 4.64982 10.8137 5.26808 10.8761 5.73247C10.9364 6.18069 11.0443 6.40047 11.197 6.55312C11.3496 6.70578 11.5693 6.81365 12.0176 6.87391C12.482 6.93635 13.1002 6.93754 14 6.93754H15.5146C15.2923 6.72188 15.0074 6.46348 14.6375 6.13056L11.6684 3.45838C11.3044 3.13075 11.0335 2.88891 10.8125 2.70713ZM8.13163 0.937519C9.17008 0.937241 9.84095 0.937069 10.4584 1.17402C11.0759 1.41097 11.5724 1.85802 12.3405 2.54967C12.367 2.57355 12.3938 2.59771 12.421 2.62218L15.3901 5.29434C15.4217 5.32279 15.4529 5.35088 15.4837 5.37862C16.3715 6.17711 16.9456 6.69344 17.2543 7.38677C17.5631 8.08005 17.5629 8.85218 17.5625 10.0462C17.5625 10.0877 17.5625 10.1297 17.5625 10.1722V10.5424C17.5625 11.9207 17.5625 13.0124 17.4477 13.8668C17.3294 14.7461 17.0803 15.4578 16.5191 16.0191C15.9578 16.5804 15.2461 16.8295 14.3668 16.9477C13.5124 17.0626 12.4207 17.0626 11.0423 17.0626H7.95769C6.57937 17.0626 5.48764 17.0626 4.63324 16.9477C3.75392 16.8295 3.04221 16.5804 2.48093 16.0191C1.91966 15.4578 1.67057 14.7461 1.55236 13.8668C1.43748 13.0124 1.43749 11.9207 1.4375 10.5424V7.45773C1.43749 6.07941 1.43748 4.98768 1.55236 4.13328C1.67057 3.25396 1.91966 2.54225 2.48093 1.98097C3.04264 1.41927 3.75674 1.17045 4.63915 1.05235C5.49712 0.937519 6.59428 0.937526 7.98014 0.937541H8.02235C8.05918 0.937541 8.09563 0.937534 8.13163 0.937519Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25972 9.71466C7.04335 9.51178 6.70666 9.51178 6.49028 9.71466L4.99028 11.1209C4.76365 11.3334 4.75216 11.6893 4.96464 11.916C5.17711 12.1426 5.53308 12.1541 5.75972 11.9416L6.3125 11.4234V13.8751C6.3125 14.1857 6.56434 14.4376 6.875 14.4376C7.18566 14.4376 7.4375 14.1857 7.4375 13.8751V11.4234L7.99028 11.9416C8.2169 12.1541 8.57293 12.1426 8.7854 11.916C8.99788 11.6893 8.98633 11.3334 8.75975 11.1209L7.25972 9.71466Z" fill="white" />
    </svg>


)

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.42774 8.99988H10.459M15.7507 11.9999H13.8757M15.0007 8.99988H13.8757M14.6257 5.99988H13.8757M10.5295 8.63268L11.1981 6.41345C11.4513 5.57331 11.5779 5.15324 11.4702 4.9024C11.3767 4.68461 11.1858 4.52383 10.9552 4.46877C10.6897 4.40535 10.2973 4.60155 9.51251 4.99396L3.64731 7.92655C2.9564 8.272 2.61095 8.44473 2.50009 8.6785C2.40362 8.8819 2.40362 9.11785 2.50009 9.32125C2.61095 9.55503 2.9564 9.72775 3.64731 10.0732L9.52061 13.0098C10.3032 13.4011 10.6945 13.5968 10.9598 13.5336C11.1901 13.4788 11.381 13.3184 11.4747 13.101C11.5827 12.8506 11.4575 12.4314 11.2071 11.5931L10.5287 9.3223C10.4904 9.19405 10.4712 9.12993 10.4637 9.06468C10.457 9.0067 10.4571 8.94813 10.4639 8.89015C10.4716 8.8249 10.491 8.76078 10.5295 8.63268Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

)

export const EditFormsQesutions = ({
    questions: formQuestion,
    formVisitType,
    resumeTime,
    resumeNumber,
    resumeTitle,
    resumeArea,
    facilityOwnerSignature,
    inspectorSignature
}: EditFormsQesutionsProps) => {
    const [signatures, setSignatures] = useState({
        facilityOwnerSignature,
        inspectorSignature,
    })
    const [questions, setQuesitions] = useState(formQuestion)
    return <div className="rounded-[35px] p-5 bg-white md:bg-[#F5F5F5] mt-9">
        <div className="bg-white md:p-4 md:rounded-[30px]">
            <div>
                {/* <FormVisitTypeBadge type={formVisitType} className="mx-auto" /> */}
                <p className="text-base font-extrabold text-primary text-center mt-5">
                    {resumeTitle} - {resumeNumber}
                </p>
                <div className="flex flex-wrap items-center gap-[10px] md:gap-4 pt-5 justify-center text-[#B1B1B1] text-xs font-extrabold mx-auto">
                    <div className="">{
                        resumeArea
                    }</div>
                    <DotSperator className="bg-[#D9D9D9]" />
                    <div className="">{
                        resumeTime.toLocaleString("ar-EG", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })
                    }</div>
                </div>
            </div>
            <Separator className="my-7" />
            <p className="text-base font-extrabold text-black text-center pb-5">قائمة الفحص (الأسئلة):</p>
            <div className="space-y-2">

            {
                questions?.map(question => (
                    <EditFormQuestion question={question} onQuestionChanged={(changedQuestion) => {
                        const newQuestions = questions.map(q => {
                            if (q.id === changedQuestion.id) {
                                return changedQuestion
                            }
                            return q
                        })
                        setQuesitions(newQuestions)
                    }} />
                ))
            }
            </div>
            <div className="flex items-center justify-between flex-wrap gap-6 mt-4">
                <Button className="h-10 rounded-[10px] gap-[10px] bg-[#6BACA1]">
                    اضافة ملاحظات
                    <MinusCircle className="w-[18px] h-[18px]" />
                </Button>
                <div className="flex gap-2 flex-wrap">
                    <AddSignatureDialog setSignature={(signature) => setSignatures({ ...signatures, inspectorSignature: signature || "" })} title="توقيع صاحب المنشاة">
                        <Button className="h-10 rounded-[10px] gap-[10px] bg-[#6BACA1] flex-1">
                            توقيع المفتش
                            <SignatureIcon />
                        </Button>
                    </AddSignatureDialog>
                    <AddSignatureDialog setSignature={(signature) => setSignatures({ ...signatures, facilityOwnerSignature: signature || "" })} title="توقيع صاحب المنشاة">
                        <Button className="h-10 rounded-[10px] gap-[10px] bg-[#6BACA1] flex-1">
                            توقيع صاحب المنشأة
                            <SignatureIcon />
                        </Button>
                    </AddSignatureDialog>
                    <Button className="h-10 rounded-[10px] gap-[10px] flex-1">
                        إرسال التقرير
                        <ArrowLeftIcon />
                    </Button>
                </div>
            </div>
        </div>
    </div>
}

interface EditFormQuestionProps {
    question: Pick<Question, "id" | "value" | "label" | "files">
    onQuestionChanged: (question: EditFormQuestionProps["question"]) => void
}

function EditFormQuestion({ question, onQuestionChanged }: EditFormQuestionProps) {
    return <div className="flex gap-2">

        <div className="flex-1">
            {/*   @ts-ignore */}
            <TaskTerm {...question} onChekedChange={(value) => onQuestionChanged({
                ...question,
                value   
            })} />
            <div className="flex items-center gap-2 mt-1 flex-wrap">
                {
                    question?.files?.map(file => <RenderEditableFile file={file} onRemove={() => onQuestionChanged({
                        ...question,
                        files: question.files?.filter(f => f !== file)
                    })} />)
                }
            </div>
        </div>
        <div className="flex gap-1 flex-col md:flex-row">
            <UploadFileButton size="icon" color="dark" className=" rounded-full" onFileChange={
                (file) =>
                    onQuestionChanged({
                        ...question,
                        files: [...(question.files || []), URL.createObjectURL(file)]
                    })
            }>
                <ImageUp className="text-white w-[18px] h-[18px]" />
            </UploadFileButton>
            <UploadFileButton size="icon" color="dark" className=" rounded-full" onFileChange={
                (file) =>
                    onQuestionChanged({
                        ...question,
                        files: [...(question.files || []), URL.createObjectURL(file)]
                    })
            }>
                <FileUp />
            </UploadFileButton>
        </div>
    </div>
}