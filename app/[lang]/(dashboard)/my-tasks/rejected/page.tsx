"use client"
import SectionHeader, {
    SectionIcon,
    SectionTitle,
} from "../_components/section-header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VisitsFilter } from "@/components/visits-filter"
import { RejectedTasks } from "./_components/rejected-tasks"
import { useEffect, useState } from "react"
import useTasks from "@/hooks/useTasks"

const WarringIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9 1.5C13.1423 1.5 16.5 4.8585 16.5 9C16.5 13.1415 13.1423 16.5 9 16.5C4.85775 16.5 1.5 13.1415 1.5 9C1.5 4.8585 4.85775 1.5 9 1.5ZM9.00135 11.2528C8.58769 11.2528 8.25235 11.5881 8.25235 12.0018C8.25235 12.4154 8.58769 12.7508 9.00135 12.7508C9.41501 12.7508 9.75035 12.4154 9.75035 12.0018C9.75035 11.5881 9.41501 11.2528 9.00135 11.2528ZM8.99973 5.25C8.6151 5.25014 8.2982 5.53978 8.25501 5.9128L8.25 6.00027L8.25135 9.75093L8.25643 9.83839C8.29989 10.2114 8.61699 10.5008 9.00162 10.5007C9.38625 10.5005 9.70315 10.2109 9.74634 9.83786L9.75135 9.75039L9.75 5.99973L9.74492 5.91227C9.70146 5.53928 9.38436 5.24986 8.99973 5.25Z" fill="white" />
    </svg>

)

const RejectededFormsPage = () => {
    const [filter, setFilter] = useState({
    "field-visit": false,
    "secret-visit": false,
  });
  const {fetchRejectedTasks, tasks} = useTasks()
  console.log(tasks);
useEffect(() => {
    fetchRejectedTasks();
}, []);
    return (
        <div>
            <div className="flex justify-between items-center">
                <SectionHeader>
                <SectionIcon Icon={WarringIcon} className="hidden md:block" />
                    <SectionTitle>
                    "الاستمارات المرفوضة من قسم المراجعة"
                    </SectionTitle>
                </SectionHeader>
                <Link href="#" className="text-black text-[10px] flex items-center gap-2 font-extrabold md:hidden">
                    شـــاهد الكل
                    <ArrowLeft className="h-3 w-3" />
                </Link>
                
                 <VisitsFilter onFilterChanged={setFilter} />
            </div>
            <RejectedTasks />
        </div>
    )
}

export default RejectededFormsPage
