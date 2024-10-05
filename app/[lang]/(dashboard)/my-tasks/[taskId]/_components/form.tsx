
import React, {useEffect} from 'react';
import SectionHeader, {SectionIcon, SectionTitle} from "@/app/[lang]/(dashboard)/my-tasks/_components/section-header";
import {Button} from "@/components/ui/button";
import {ArrowDownToLine, ChevronLeft, EditIcon, Share2} from "lucide-react";
import {EditFormsQesutions} from "@/app/[lang]/(dashboard)/my-tasks/[taskId]/_components/edit-form-questions";
import {Task, TermsValues} from "@/rassd/types";
import {Question} from "@/types";
import useTasks from "@/hooks/useTasks";

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

function tasksToQuestions(task: Task , termsValues : TermsValues[] ) : Question[] {
    return task?.department?.terms?.map((term) => {
        const termValue = termsValues?.find((tv) => tv.termId === term.id);
        return {
            id: term.id.toString(),
            value: termValue?.value === "true",
            label: term?.name,
            isAcceptFiles: term?.requiredFiles,
            files: termValue?.files || [],
            disabled: false,
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
                    <SectionTitle>
                        "استمارة الفحص الميداني"
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