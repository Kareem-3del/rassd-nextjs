"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Form from "@/app/[lang]/(dashboard)/my-tasks/[taskId]/_components/form";

const TaskPage = () => {
    const { taskId } = useParams() as { taskId: string };
    const [taskIdNum, setTaskIdNum] = useState<number | null>(null);

    useEffect(() => {
        if (taskId) {
            setTaskIdNum(Number(taskId));
        }
    }, [taskId]);

    return (
        <div>
            {taskIdNum ? <Form taskId={taskIdNum} /> : 'Loading...'}
        </div>
    );
};

export default TaskPage;
