"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Form from "@/app/[lang]/(dashboard)/my-tasks/[taskId]/_components/form";
import useTasks from "@/hooks/useTasks";

const TaskPage = () => {
    const { taskId } = useParams() as { taskId: string };
    const [taskIdNum, setTaskIdNum] = useState<number | null>(null);
    const { fetchTask } = useTasks();

    useEffect(() => {
        console.log('Extracted taskId:', taskId); // Debug log for taskId
        if (taskId) {
            const taskIdNum = Number(taskId);
            setTaskIdNum(taskIdNum);
            fetchTask(taskIdNum);
        }
    }, [taskId]);

    return (
        <div>
         <Form taskId={taskIdNum} /> 
        </div>
    );
};

export default TaskPage;
