import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SectionHeader, { SectionIcon, SectionTitle } from "@/app/[lang]/(dashboard)/my-tasks/_components/section-header";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ChevronLeft, EditIcon, Share2 } from "lucide-react";
import { EditFormsQesutions } from "@/app/[lang]/(dashboard)/my-tasks/[taskId]/_components/edit-form-questions";
import { Task, TermsValues } from "@/rassd/types";
import { Question } from "@/types";
import useTasks from "@/hooks/useTasks";
import { CustomComponent } from "@/app/[lang]/(dashboard)/my-tasks/custom-component";
import autoTable from 'jspdf-autotable';

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


    const { task, fetchTask } = useTasks();
    const [answers, setAnswers] = useState<{ [key: string]: boolean | string }>({}); // State to track answers

    useEffect(() => {
        fetchTask(taskId);
    }, [taskId]);

    // Update answer state
    const handleInputChange = (id: string, value: boolean | string) => {
        setAnswers(prev => {
            const newAnswers = { ...prev, [id]: value };
            console.log('Updated Answers:', newAnswers); // Debugging line
            return newAnswers;
        });
    };

    const downloadPdf = async () => {
        const doc = new jsPDF();
        doc.text(`استمارة فحص ${task?.department?.group?.type}`, 10, 10);
    
        const updatedQuestions = tasksToQuestions(task, task.termsValues).map((question:any) => {
            const answer = answers[question.id] !== undefined ? answers[question.id] : question.value;
            return {
                label: question.label,
                value: answer === true ? "Yes" : answer === false ? "No" : answer || "No Answer",
                files: question.files.length > 0 ? question.files.join(', ') : "No Files"
            };
        });
    
        autoTable(doc, {
            head: [['Question', 'Answer', 'Attached Files']],
            body: updatedQuestions.map(({ label, value, files }) => [label, value, files]),
        });
    
        // Save PDF to a Blob
        const pdfBlob = doc.output('blob');
    
        // Create a FormData object to send the PDF
        const formData = new FormData();
        formData.append('pdf', pdfBlob, `task-${taskId}.pdf`);
        formData.append('email', 'recipient@example.com'); // You might want to get this dynamically
    
        // Send the PDF to the server
        const response = await fetch('/send-report', {
            method: 'POST',
            body: formData
        });
    
        if (response.ok) {
            alert('Report shared successfully!');
        } else {
            alert('Failed to share report.');
        }
    };
    
    const shareReport = () => {
        const subject = `Report for Task ${taskId}`;
        const body = `Please find the attached report for task ${taskId}.`;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        window.location.href = mailtoLink; // Opens the email client
    };

    return (
        task ? (
            <div>
                <div className="flex justify-between items-center">
                    <SectionHeader>
                        <SectionIcon Icon={EditIcon} className="hidden md:block" />
                        <CustomComponent
                            messages={[ /* Your message data */ ]}
                            noteBy={task.title}
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
                        <Button className="rounded-2xl gap-2" color="dark" variant={"outline"} onClick={shareReport}>
                            مشاركة التقرير
                            <Share2 className="w-[18px] h-[18px]" />
                        </Button>
                        <Button className="rounded-2xl gap-2" color="dark" onClick={downloadPdf}>
                            تحميل التقرير - Pdf
                            <ArrowDownToLine className="w-[18px] h-[18px]" />
                        </Button>
                        <Button className="rounded-2xl aspect-square">
                            <ChevronLeft className="w-[18px] h-[18px]" />
                        </Button>
                    </div>
                </div>
                <EditFormsQesutions
                    questions={tasksToQuestions(task, task.termsValues).map(question => ({
                        ...question,
                        onChange: (value: boolean | string) => handleInputChange(question.id, value), 
                        answer: answers[question.id] !== undefined ? answers[question.id] : question.value 
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
        ) : (
            <div>Loading...</div>
        )
    );
}

export default Form;
