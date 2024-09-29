"use client"
import { Eye, Note } from "@/components/svg"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { FormCardEntries } from "@/types"
import { FormVisitTypeBadge } from "./form-visit-type-badge"
import { DotSperator } from "@/components/dot-sperator"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useRef, useState } from "react"
import Image from "next/image"
import { FileIcon, FilePlus } from "lucide-react"
import { isImageFileUrl } from "@/lib/utils"
import AddSignatureDialog from "@/components/add-signature-dialog"

type Question = {
    id: string
    value: boolean
    label: string
    isAcceptFiles?: boolean
    files?: string[]
}

interface QuestionsCheckistProps extends Pick<FormCardEntries, "formVisitType" | "resumeTime" | "resumeNumber" | "resumeTitle" | "resumeArea" | "resumeArea"> {
    questions: Question[]
}

export const QuestionsChecklist = ({ questions, formVisitType,
    resumeTime,
    resumeNumber,
    resumeTitle,
    resumeArea
}: QuestionsCheckistProps) => {
    const [facilitySignature, setFacilitySignature] = useState<string | undefined>(undefined)
    const [inspectorSignature, setInspectorSignature] = useState<string | undefined>(undefined)
    return <Dialog>
        <DialogTrigger asChild>
            <Button color="dark" variant={"outline"} className="rounded-2xl h-12">
                <Eye className="w-4 h-4 text-black" />
            </Button>
        </DialogTrigger>
        <DialogContent size="4xl" className="max-h-[80vh] overflow-auto">

            <div>
                <FormVisitTypeBadge type={formVisitType} className="mx-auto" />
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
            <p className="text-base font-extrabold text-black text-center">قائمة الفحص (الأسئلة):</p>
            {
                questions.map(question => <ChecklistQuestion {...question} />)
            }
            <p className="py-[10px] px-4 rounded-[8px] bg-primary mt-[10px] text-white text-xs font-bold text-center">"خلال الفحص، لوحظ أن إجراءات التعقيم في قسم الطوارئ ليست متبعة بدقة. يُوصى بإجراء مراجعة شاملة وتدريب إضافي للفريق الطبي لضمان الالتزام الكامل بالبروتوكولات الصحية."</p>
            <div className="flex items-center gap-[10px] mt-8 justify-center">
                <div className="space-y-2">
                    <div className="text-xs text-black font-extrabold">
                        توقيع المنشأة
                    </div>

                    <div className="px-[50px] py-5 bg-[#F1F1F1] rounded-2xl">
                        <AddSignatureDialog setSignature={(signature) => setFacilitySignature(signature)} signature={facilitySignature} title="توقيع المنشأة" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs text-black font-extrabold">
                        توقيع المفتش
                    </div>

                    <div className="px-[50px] py-5 bg-[#F1F1F1] rounded-2xl">
                        <AddSignatureDialog setSignature={(signature) => setInspectorSignature(signature)} signature={inspectorSignature} title="توقيع المفتش" />
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
}


interface ChecklistQuestionProps extends Question {
    onChekedChange?: (value: boolean) => void
    onFilesChanged?: (files: File[]) => void
}

export const ChecklistQuestion = ({ label, value, onChekedChange, isAcceptFiles = false, files: defualtFiles, onFilesChanged }: ChecklistQuestionProps) => {
    const [files, setFiles] = useState<File[]>([])
    return <div >
        <div className="bg-primary/5 py-2 px-6 rounded-2xl flex items-center justify-between">
            <p className="text-sm font-extrabold text-[#1C274C]">
                {label}
            </p>
            <div className="flex items-center gap-4">
                <Label className="text-sm font-extrabold text-[#1C274C]">نعم</Label>
                <Switch
                    size="lg"
                // checked={value}
                // onCheckedChange={onChekedChange}
                />
                <Label className="text-sm font-extrabold text-[#1C274C]">لا</Label>
            </div>
        </div>
        {isAcceptFiles ?
            <div className="flex items-center gap-1 mt-1">
                {
                    [...defualtFiles!, ...files.map(file => URL.createObjectURL(file) as string)].map(file => <RenderFile file={file} />)
                }
                <AddFileButton onFileChange={(file) => {
                    if (!files) {
                        setFiles([file])
                        onFilesChanged?.([file])
                        return
                    }
                    setFiles([...files, file])
                    onFilesChanged?.([...files, file])
                }} />
            </div>
            : null
        }
    </div>
}


const RenderFile = ({ file }: { file: string }) => {
    if (isImageFileUrl(file)) {

        return <Image width={40} height={40} src={file} alt={file} className="w-10 h-10 rounded-xl object-cover" />
    }

    return <div className="w-10 h-10  bg-primary p-0 flex items-center justify-center rounded-xl" >
        <FileIcon className="w-4 h-4 text-white" />

    </div>
}

interface AddFileButtonProps {
    onFileChange: (file: File) => void
}
const AddFileButton = ({ onFileChange }: AddFileButtonProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <Button color="dark" className="w-10 h-10  p-0 flex items-center justify-center rounded-xl" onClick={() => {
            inputRef.current?.click()
        }}>
            <FilePlus className="w-4 h-4 text-white" />

            <input type="file" className="hidden" ref={inputRef} onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                    onFileChange(file)
                }
            }} />
        </Button>
    )
}