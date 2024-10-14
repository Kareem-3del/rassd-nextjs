"use client"
interface SendedFormsPops { }
import { FormCardEntries } from "@/types"
import { FormCard } from "../../_components/form-card"
import useTasks from "@/hooks/useTasks"
import { useEffect } from "react"
import { CompletedTaskCard } from "./task-card"
import { useUser } from "@/components/user-provider"
import { Task } from "@/rassd/types"

export const CompletedForms = ({tasks}: {tasks?: Task[]}) => {

    return <div className="space-y-[10px] rounded-[35px] p-5 bg-[#F5F5F5] mt-9">
         {
            tasks?.map((task) => <CompletedTaskCard key={task.id} {...task} />)
         }
    </div>
}