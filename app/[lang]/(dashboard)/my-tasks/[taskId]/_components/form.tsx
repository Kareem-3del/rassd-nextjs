// Form.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ChevronLeft, EditIcon, Share2 } from "lucide-react";
import { EditFormsQesutions } from "@/app/[lang]/(dashboard)/my-tasks/[taskId]/_components/edit-form-questions";
import { Task, TermsValues } from "@/rassd/types";
import { Question } from "@/types";
import useTasks from "@/hooks/useTasks";
import { CustomComponent } from "@/app/[lang]/(dashboard)/my-tasks/custom-component";
import SectionHeader, { SectionIcon, SectionTitle } from "@/app/[lang]/(dashboard)/my-tasks/_components/section-header";
import html2pdf from 'html2pdf.js'; 

function tasksToQuestions(task: Task, termsValues: TermsValues[], edit: boolean = false): Question[] {
    return task?.department?.terms?.map((term) => {
        const termValue = termsValues?.find((tv) => tv.termId === term.id);
        return {
            id: term.id.toString(),
            value: termValue?.value === "true",
            label: term?.name,
            isAcceptFiles: term?.requiredFiles,
            files: termValue?.files || [],
            disabled: edit,
        };
    });
}

function Form({ taskId }: { taskId: number }) {
    const { task, fetchTask, loading, error,fetchPendigTasks } = useTasks(); // Ensure useTasks returns loading and error states
    const [answers, setAnswers] = useState<{ [key: string]: boolean | string }>({});
    const pdfRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTask(taskId);
    }, [taskId]);

    const handleInputChange = (id: string, value: boolean | string) => {
        setAnswers((prev) => {
            const newAnswers = { ...prev, [id]: value };
            console.log('Updated Answers:', newAnswers);
            return newAnswers;
        });
    };

    const generatePdf = () => {
        if (pdfRef.current) {
            const element = pdfRef.current;
            html2pdf()
                .set({
                    margin: 1,
                    filename: `task-${taskId}.pdf`,
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                })
                .from(element)
                .save();
        } else {
            console.error('pdfRef is null');
        }
    };

    // Handle loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading task: {error}</div>;
    if (!task) return <div>No task found.</div>; // Handle case where task is not found

    return (
        <div>
            <div className="flex justify-between items-center">
                <SectionHeader>
                    <SectionIcon Icon={EditIcon} className="hidden md:block" />
                    <CustomComponent
                        messages={[ /* Your message data */ ]}
                        noteBy={task.title} // Now safe to access task.title
                        noteDate={new Date(task.created_at)}
                        sendBy={{
                            name: "د. أحمد الكعبي",
                            date: new Date(),
                            image: "/images/avatar/avatar-2.jpg",
                        }}
                    />
                    <SectionTitle>
                        {"استمارة فحص " + task?.department?.group?.type}
                    </SectionTitle>
                </SectionHeader>
                <div className="hidden items-center gap-[10px] md:flex">
                    <Button className="rounded-2xl gap-2" color="dark" variant={"outline"}>
                        مشاركة التقرير
                        <Share2 className="w-[18px] h-[18px]" />
                    </Button>

                    {/* PDF Button */}
                    <Button className="rounded-2xl gap-2" color="dark" onClick={generatePdf}>
                        تحميل التقرير - Pdf
                        <ArrowDownToLine className="w-[18px] h-[18px]" />
                    </Button>

                    <Button className="rounded-2xl aspect-square">
                        <ChevronLeft className="w-[18px] h-[18px]" />
                    </Button>
                </div>
            </div>

            <div>
                <EditFormsQesutions
                    pdfRef={pdfRef}
                    questions={tasksToQuestions(task, task.termsValues).map(question => ({
                        ...question,
                        onChange: (value: boolean | string) => handleInputChange(question.id, value),
                        answer: answers[question.id] !== undefined ? answers[question.id] : question.value,
                    }))}
                    notes={task.notes}
                    taskId={task.id}
                    formVisitType={task?.department?.group?.type === "سرية" ? "field-visit" : "secret-visit"}
                    resumeTime={new Date(task.created_at)}
                    resumeNumber={String(task.id) || ""}
                    resumeTitle={task.title}
                    resumeArea={task.establishmentDetail.region + " - " + task.establishmentDetail.city + " - " + task.establishmentDetail.district}
                    facilityOwnerSignature={""}
                    inspectorSignature={""}
                />
            </div>
        </div>
    );
}

export default Form;