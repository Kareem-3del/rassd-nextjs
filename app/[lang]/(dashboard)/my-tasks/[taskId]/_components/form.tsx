
import React, {useEffect} from 'react';
import SectionHeader, {SectionIcon, SectionTitle} from "@/app/[lang]/(dashboard)/my-tasks/_components/section-header";
import {Button} from "@/components/ui/button";
import {ArrowDownToLine, ChevronLeft, EditIcon, Share2} from "lucide-react";
import {EditFormsQesutions} from "@/app/[lang]/(dashboard)/my-tasks/[taskId]/_components/edit-form-questions";
import {Task, TermsValues} from "@/rassd/types";
import {Question} from "@/types";
import useTasks from "@/hooks/useTasks";
import {CustomComponent} from "@/app/[lang]/(dashboard)/my-tasks/custom-component";

/**
 * export type Question = {
 *   id: string;
 *   value: boolean;
 *   label: string;
 *   isAcceptFiles?: boolean;
 *   files?: string[];
 *   disabled?: boolean;
 * };
 */

function tasksToQuestions(task: Task , termsValues : TermsValues[] , edit : boolean = false ) : Question[] {
    return task?.department?.terms?.map((term) => {
        const termValue = termsValues?.find((tv) => tv.termId === term.id);
        return {
            id: term.id.toString(),
            value: termValue?.value === "true",
            label: term?.name ,
            isAcceptFiles: term?.requiredFiles,
            files: termValue?.files || [],
            disabled: edit,
        };
    });
}

function Form({taskId } : {taskId : number}) {
    const {task , fetchTask} = useTasks();
    useEffect(() => {
        fetchTask(taskId);
    }, [taskId]);
    return (
        task ? <div>
            <div className="flex justify-between items-center">
                <SectionHeader>
                    <SectionIcon Icon={EditIcon} className="hidden md:block"/>
                    <CustomComponent
                        messages={[
                            {
                                sendBy: "د. أحمد الكعبي",
                                date: new Date(),
                                image: "/images/avatar/avatar-2.jpg",
                                role: "user",
                                text: "شكرًا د. أحمد، سأقوم بتوجيه الفريق للبدء في تنفيذ هذه التعديلات."
                            },
                            {
                                sendBy: "منصة رصد",
                                date: new Date(),
                                image: "/images/avatar/avatar-2.jpg",
                                role: "admin",
                                text: "على الرحب والسعة، لا تتردد في التواصل إذا كنت بحاجة إلى دعم إضافي."
                            }
                        ]}
                        noteBy={task.title}
                        noteDate={new Date(task.created_at)}
                        sendBy={
                            {
                                name: "د. أحمد الكعبي",
                                date: new Date(),
                                image: "/images/avatar/avatar-2.jpg",
                            }
                        }
                    />
                    <SectionTitle>
                        "استمارة فحص {
                        task?.department?.group?.type
                    }"
                    </SectionTitle>
                </SectionHeader>
                <div className="hidden items-center gap-[10px] md:flex">
                    <Button className="rounded-2xl gap-2" color="dark" variant={"outline"}>
                        مشاركة التقرير
                        <Share2 className="w-[18px] h-[18px]"/>
                    </Button>
                    <Button className="rounded-2xl gap-2" color="dark">
                        تحميل التقرير - Pdf
                        <ArrowDownToLine className="w-[18px] h-[18px]"/>
                    </Button>
                    <Button className="rounded-2xl aspect-square">
                        <ChevronLeft className="w-[18px] h-[18px]"/>
                    </Button>
                </div>
            </div>
            <EditFormsQesutions
                questions={tasksToQuestions(task, task.termsValues)}
                notes={task.notes}
                taskId={task.id}
                formVisitType={task?.department?.group?.type === "سرية" ? "field-visit" : "secret-visit"}
                resumeTime={new Date(task.created_at)}
                resumeNumber={String(task.id ) || ""}
                resumeTitle={task.title}

                resumeArea={task.establishmentDetail.region + " - " + task.establishmentDetail.city + " - " + task.establishmentDetail.district}
                facilityOwnerSignature={""}
                inspectorSignature={""}
            />
        </div> : <div>
            Loading...
        </div>
    );
}

export default Form;