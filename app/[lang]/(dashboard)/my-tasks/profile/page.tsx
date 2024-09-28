import { Button } from "@/components/ui/button"
import SectionHeader, {
    SectionIcon,
    SectionTitle,
} from "../_components/section-header"
import { ArrowLeft, ChevronDown, Plus } from "lucide-react"
import Link from "next/link"
import { UserProfileCard } from "./_components/user-profile-card"
import { TimelineCard, UserEvent } from "./_components/timeline-card"

const IdCard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
        <path
            d="M6.75 8.25C7.57843 8.25 8.25 7.57843 8.25 6.75C8.25 5.92157 7.57843 5.25 6.75 5.25C5.92157 5.25 5.25 5.92157 5.25 6.75C5.25 7.57843 5.92157 8.25 6.75 8.25Z"
            stroke="white"
        />
        <path
            d="M9.75 11.25C9.75 12.0784 9.75 12.75 6.75 12.75C3.75 12.75 3.75 12.0784 3.75 11.25C3.75 10.4216 5.09314 9.75 6.75 9.75C8.40683 9.75 9.75 10.4216 9.75 11.25Z"
            stroke="white"
        />
        <path
            d="M1.5 9C1.5 6.17157 1.5 4.75736 2.37868 3.87868C3.25736 3 4.67157 3 7.5 3H10.5C13.3284 3 14.7427 3 15.6213 3.87868C16.5 4.75736 16.5 6.17157 16.5 9C16.5 11.8284 16.5 13.2427 15.6213 14.1213C14.7427 15 13.3284 15 10.5 15H7.5C4.67157 15 3.25736 15 2.37868 14.1213C1.5 13.2427 1.5 11.8284 1.5 9Z"
            stroke="white"
        />
        <path d="M14.25 9H11.25" stroke="white" stroke-linecap="round" />
        <path d="M14.25 6.75H10.5" stroke="white" stroke-linecap="round" />
        <path d="M14.25 11.25H12" stroke="white" stroke-linecap="round" />
    </svg>
)

const events: UserEvent[] = [{
    type: "time",
    label: "تاريخ الانضمام.",
    value: new Date()
},
{
    type: "cureent-missions",
    label: "عدد المهمات الحالية",
    value: "248 مهمة"
},
{
    type: "ended-missions",
    label: "عدد المهمات المنتهية",
    value: "12 مهمة"
},
{
    type: "rejected-missions",
    label: "عدد المهمات المرفوضة",
    value: "12 مهمة"
}
]

const TaskPage = async () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <SectionHeader>
                    <SectionIcon Icon={IdCard} className="hidden md:block" />
                    <SectionTitle>
                        "الملف الشخصي"
                    </SectionTitle>
                </SectionHeader>
                <Button className="items-center gap-[10px] bg-[#6BACA1] hover:bg-[#6BACA1]/80 h-12 rounded-2xl">
                    <Plus className="w-[18px] h-[18px]" />
                    اضــافة مهمة
                </Button>
            </div>
            <div className="space-y-[10px] rounded-[35px] p-5 bg-[#F5F5F5] mt-9 grid md:grid-cols-2 gap-[10px]">
                <UserProfileCard name="محمد السادس" avatar="/images/avatar/avatar-5.jpg" />
                <TimelineCard events={events}/>
            </div>
        </div>
    )
}

export default TaskPage
