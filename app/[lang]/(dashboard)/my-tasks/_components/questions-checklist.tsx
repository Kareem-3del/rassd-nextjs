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

const Signature = () => {
    return <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.35806 38.6993H15.6497C15.3695 39.7771 15.2185 40.8334 15.2185 41.8034C15.2185 45.2739 17.1586 47.7529 21.2327 47.7529C26.1906 47.7529 30.2 44.2608 32.7867 38.6993H62.6421C63.3965 38.6993 64 38.1174 64 37.3628C64 36.6084 63.3965 36.048 62.6421 36.048H33.8646C35.0717 32.5128 35.8046 28.374 35.9555 23.8903C37.3136 23.5886 38.7361 23.4376 40.2022 23.4376C40.9567 23.4376 41.3875 23.761 41.3875 24.3215C41.3875 26.1968 40.3744 27.6626 40.3744 29.538C40.3744 31.1763 41.5818 32.1679 43.1552 32.1679C47.531 32.1679 52.8123 24.6879 54.5583 24.6879C56.1534 24.6879 54.1703 31.4133 59.6025 31.4133C60.4864 31.4133 61.6289 31.1763 62.5127 30.6159C63.0301 30.2493 63.3965 29.732 63.3965 29.0638C63.3965 28.2447 62.8791 27.5764 62.0169 27.5764C61.2624 27.5764 60.6374 28.2015 59.9045 28.2015C57.5762 28.2015 59.7963 21.0449 55.5071 21.0449C51.7563 21.0449 45.8927 28.3308 44.4055 28.3308C44.2117 28.3308 44.0607 28.2231 44.0607 27.9644C44.0607 27.1884 45.0305 25.4424 45.0305 23.6963C45.0305 21.5408 43.2413 20.1611 40.4393 20.1611C38.9087 20.1611 37.3998 20.312 35.9555 20.5922C35.4813 9.23221 30.0922 0.286377 21.8578 0.286377C16.3179 0.286377 12.0498 5.00718 12.0498 11.0213C12.0498 18.0487 16.6198 24.0627 22.3105 28.0506C19.7885 30.5296 17.8269 33.3535 16.6198 36.048H1.35806C0.603543 36.048 0 36.6084 0 37.3628C0 38.1174 0.603543 38.6993 1.35806 38.6993ZM15.3264 11.0213C15.3264 6.81792 18.1718 3.56295 21.8578 3.56295C28.3247 3.56295 32.5065 11.6034 32.7006 21.4761C29.7258 22.5107 27.0097 24.0843 24.6601 25.9596C20.1765 22.8556 15.3264 17.7253 15.3264 11.0213ZM0.732914 31.4566C1.29337 32.017 2.13406 31.9954 2.716 31.4566L5.41051 28.762L8.10503 31.4566C8.66549 32.017 9.52777 32.017 10.0882 31.4566C10.6487 30.8961 10.6487 30.0338 10.0882 29.4734L7.39371 26.8004L10.0882 24.1059C10.6487 23.5455 10.6487 22.7048 10.0882 22.1442C9.52777 21.5623 8.66549 21.5839 8.10503 22.1442L5.41051 24.8172L2.716 22.1442C2.13406 21.5623 1.29337 21.5623 0.732914 22.1442C0.172457 22.7048 0.172457 23.5669 0.732914 24.1059L3.42743 26.8004L0.732914 29.4734C0.172457 30.0554 0.172457 30.8961 0.732914 31.4566ZM27.0097 30.7667C27.2899 30.8961 27.5487 30.9607 27.8073 30.9607C28.6911 30.9607 29.3162 30.2709 29.3162 29.538C29.3162 28.9991 29.0576 28.4818 28.4325 28.18C28.1306 28.0291 27.8289 27.8782 27.5056 27.7057C29.0576 26.6064 30.7821 25.6363 32.6359 24.9034C32.3771 29.0638 31.5797 32.9008 30.351 36.048H20.0903C21.2111 33.9354 22.8925 31.7152 25.0265 29.7536C25.6733 30.12 26.3415 30.4434 27.0097 30.7667ZM18.5813 41.1783C18.5813 40.4239 18.7106 39.5832 18.9909 38.6993H29.1223C27.1822 42.2777 24.5739 44.4763 21.5992 44.4763C19.5298 44.4763 18.5813 43.1184 18.5813 41.1783Z" fill="black" />
    </svg>

}

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
    const [signature, setSignature] = useState<string | undefined>(undefined)
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
                <div className="px-[50px] py-5 bg-[#F1F1F1] rounded-2xl">
                    <Signature />
                </div>

                <div className="px-[50px] py-5 bg-[#F1F1F1] rounded-2xl">
                    <AddSignatureDialog setSignature={(signature) => setSignature(signature)} signature={signature} />
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