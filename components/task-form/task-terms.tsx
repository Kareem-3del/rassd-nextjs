import { DotSperator } from "@/components/dot-sperator";
import { Eye } from "@/components/svg";
import {  RenderFileWithPreview, TaskTerm } from "@/components/task-form/task-term";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FormCardEntries, Question } from "@/types";
import { FormVisitTypeBadge } from "@/components/form-visit-type-badge";
import Image from "next/image";
import { Task } from "@/rassd/types";

interface TaskTermsProps extends Task {
    facilityOwnerSignature: string
    inspectorSignature: string
}

export const TaskTerms = ({
    id,
    title,
     department,
     establishmentDetail,
     startDate,
    facilityOwnerSignature,
    inspectorSignature
}: TaskTermsProps) => {
    return <Dialog>
        <DialogTrigger asChild>
            <Button color="dark" variant={"outline"} className="rounded-2xl h-12">
                <Eye className="w-4 h-4 text-black" />
            </Button>
        </DialogTrigger>
        <DialogContent size="4xl" className="max-h-[80vh] overflow-auto">

            <div>
                <FormVisitTypeBadge type={department.group.type} className="mx-auto" />
                <p className="text-base font-extrabold text-primary text-center mt-5">
                    {title} - {id}
                </p>
                <div className="flex flex-wrap items-center gap-[10px] md:gap-4 pt-5 justify-center text-[#B1B1B1] text-xs font-extrabold mx-auto">
                    <div className="">{
                        establishmentDetail.address
                    }</div>
                    <DotSperator className="bg-[#D9D9D9]" />
                    <div className="">{
                        startDate?.toLocaleString("ar-EG", {
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
                department.terms.map(term => (
                    <div key={term.id}>
                        <TaskTerm {...term} disabled />
                        {/* <div className="flex items-center gap-1 mt-1 flex-wrap">
                            {
                                term?.files?.map(file => <RenderFileWithPreview file={file} />)
                            }
                        </div> */}
                    </div>
                ))
            }

            <p className="py-[10px] px-4 rounded-[8px] bg-primary mt-[10px] text-white text-xs font-bold text-center">"خلال الفحص، لوحظ أن إجراءات التعقيم في قسم الطوارئ ليست متبعة بدقة. يُوصى بإجراء مراجعة شاملة وتدريب إضافي للفريق الطبي لضمان الالتزام الكامل بالبروتوكولات الصحية."</p>
            <div className="flex items-center gap-[10px] mt-8 justify-center">
                <div className="space-y-2">
                    <div className="text-xs text-black font-extrabold">
                        توقيع صاحب المنشاة
                    </div>

                    <div className="px-[50px] py-5 bg-[#F1F1F1] rounded-2xl">
                        <Image
                            src={facilityOwnerSignature}
                            alt="توقيع"
                            width={64}
                            height={47}
                            className="h-[47px] w-[64px] object-cover"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs text-black font-extrabold">
                        توقيع المفتش
                    </div>

                    <div className="px-[50px] py-5 bg-[#F1F1F1] rounded-2xl">
                        <Image
                            src={inspectorSignature}
                            alt="توقيع"
                            width={64}
                            height={47}
                            className="h-[47px] w-[64px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
}