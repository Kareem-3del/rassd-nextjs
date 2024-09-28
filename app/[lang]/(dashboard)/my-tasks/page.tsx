import { Button } from "@/components/ui/button"
import SectionHeader, {
    SectionIcon,
    SectionTitle,
} from "./_components/section-header"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { AuditDepartmentSendedForms } from "./_components/audit-department-sended-forms"
import { QualityDepartmentSendedForms } from "./_components/quality-department-sended-forms"
import Link from "next/link"

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

const WarringIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<path d="M9 1.5C13.1423 1.5 16.5 4.8585 16.5 9C16.5 13.1415 13.1423 16.5 9 16.5C4.85775 16.5 1.5 13.1415 1.5 9C1.5 4.8585 4.85775 1.5 9 1.5ZM9.00135 11.2528C8.58769 11.2528 8.25235 11.5881 8.25235 12.0018C8.25235 12.4154 8.58769 12.7508 9.00135 12.7508C9.41501 12.7508 9.75035 12.4154 9.75035 12.0018C9.75035 11.5881 9.41501 11.2528 9.00135 11.2528ZM8.99973 5.25C8.6151 5.25014 8.2982 5.53978 8.25501 5.9128L8.25 6.00027L8.25135 9.75093L8.25643 9.83839C8.29989 10.2114 8.61699 10.5008 9.00162 10.5007C9.38625 10.5005 9.70315 10.2109 9.74634 9.83786L9.75135 9.75039L9.75 5.99973L9.74492 5.91227C9.70146 5.53928 9.38436 5.24986 8.99973 5.25Z" fill="white"/>
</svg>

)

const TaskPage = async () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <SectionHeader>
                    <SectionIcon Icon={IdCard} className="hidden md:block"/>
                    <SectionTitle>
                        "قائمة الاستمارات المرسلة من قسم المراجعة"
                    </SectionTitle>
                </SectionHeader>
                <Link href="#" className="text-black text-[10px] flex items-center gap-2 font-extrabold md:hidden">
                    شـــاهد الكل
                    <ArrowLeft className="h-3 w-3" />
                </Link>
                <Button color="dark" className="items-center gap-[10px] hidden md:flex">
                    تصفية الزيارات
                    <ChevronDown className="w-[18px] h-[18px]" />
                </Button>
            </div>
            <AuditDepartmentSendedForms />
            <div className="flex justify-between items-center mt-7">
                <SectionHeader>
                    <SectionIcon Icon={WarringIcon} className="hidden md:block"/>
                    <SectionTitle>
                    "قائمة الاستمارات المرسلة لقسم الجودة..."
                    </SectionTitle>
                </SectionHeader>
                <Link href="#" className="text-black text-[10px] flex items-center gap-2 font-extrabold md:hidden h-12 rounded-2xl">
                    شـــاهد الكل
                    <ArrowLeft className="h-3 w-3" />
                </Link>
            </div>
            <QualityDepartmentSendedForms />
        </div>
    )
}

export default TaskPage
