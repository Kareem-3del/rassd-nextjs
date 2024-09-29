import SectionHeader, {
    SectionIcon,
    SectionTitle,
} from "../_components/section-header"
import { ArrowDownToLine, ArrowLeft, ChevronLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EditFormsQesutions } from "./_components/edit-form-questions"

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.635 6.0295L13.9826 5.68192C14.5585 5.10603 15.4922 5.10603 16.0681 5.68192C16.644 6.2578 16.644 7.19151 16.0681 7.76737L15.7205 8.115M13.635 6.0295C13.635 6.0295 13.6785 6.7681 14.3302 7.41982C14.9819 8.0715 15.7205 8.115 15.7205 8.115M13.635 6.0295L10.4396 9.22492C10.2231 9.44137 10.1149 9.5496 10.0218 9.66892C9.91209 9.8097 9.81796 9.96202 9.74116 10.1231C9.67606 10.2598 9.62761 10.4049 9.53086 10.6953L9.22096 11.625L9.12069 11.9257M15.7205 8.115L12.5251 11.3104C12.3086 11.5269 12.2004 11.6351 12.0811 11.7282C11.9403 11.8379 11.788 11.932 11.6269 12.0088C11.4902 12.0739 11.3451 12.1224 11.0547 12.2191L10.125 12.529L9.82426 12.6293M9.12069 11.9257L9.02041 12.2266C8.97279 12.3694 9.00999 12.527 9.11649 12.6335C9.22299 12.74 9.38056 12.7772 9.52344 12.7296L9.82426 12.6293M9.12069 11.9257L9.82426 12.6293" stroke="white" stroke-width="1.5" />
        <path d="M6 9.75H7.875" stroke="white" stroke-width="1.5" stroke-linecap="round" />
        <path d="M6 6.75H10.875" stroke="white" stroke-width="1.5" stroke-linecap="round" />
        <path d="M6 12.75H7.125" stroke="white" stroke-width="1.5" stroke-linecap="round" />
        <path d="M14.8713 2.37868C13.9927 1.5 12.5784 1.5 9.75 1.5H8.25C5.42157 1.5 4.00736 1.5 3.12868 2.37868C2.25 3.25736 2.25 4.67157 2.25 7.5V10.5C2.25 13.3284 2.25 14.7427 3.12868 15.6213C4.00736 16.5 5.42157 16.5 8.25 16.5H9.75C12.5784 16.5 13.9927 16.5 14.8713 15.6213C15.5786 14.914 15.7166 13.8597 15.7435 12" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    </svg>
)

const quesiotns = [{
    id: "1",
    value: true,
    label: "هل انت متأكد من أن المستند موجود في المجلد الصحيح ؟",
    files: ["/images/avatar/avatar-2.jpg", "/images/avatar/avatar-1.jpg"]
},
{
    id: "2",
    value: true,
    label: "هل جميع المعدات الطبية في حالة تشغيل جيدة؟",
    files: ["/images/avatar/avatar-2.jpg", "/images/avatar/avatar-1.jpg"],
},
{
    id: "3",
    value: false,
    label: "هل يتم فحص الأدوية وتخزينها بشكل صحيح؟",
},

{
    id: "4",
    value: false,
    label: "هل يوجد سجل محدث لجميع المرضى؟",
},
{
    id: "5",
    value: false,
    label: "هل يتم توثيق إجراءات الفحص الدوري بشكل مناسب؟",
},
{
    id: "6",
    value: false,
    label: "هل يتلقى الموظفون التدريبات اللازمة بانتظام؟",
},
{
    id: "7",
    value: false,
    label: "هل تتوفر وسائل الأمان والسلامة في جميع أنحاء المنشأة؟",
},
{
    id: "8",
    value: false,
    label: "هل يوجد نظام إدارة نفايات فعال؟",
},
]

const task = {
    id: "1",
    resumeNumber: "475 886",
    resumeTitle: "مستشفى الرعاية المتقدمة",
    resumeArea: "المنطة الشمالية , الرياض",
    resumeTime: new Date(),
    formStatus: "in-progress",
    formVisitType: "field-visit",
    items: 14,
    progress: 50,
    facilityOwnerSignature : "/images/signature.png",
    inspectorSignature : "/images/signature.png",
    questions: quesiotns
} 

const TaskPage = async () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <SectionHeader>
                    <SectionIcon Icon={EditIcon} className="hidden md:block" />
                    <SectionTitle>
                        "استمارة الفحص الميداني"
                    </SectionTitle>
                </SectionHeader>
                <div className="hidden items-center gap-[10px] md:flex">
                    <Button className="rounded-2xl gap-2" color="dark" variant={"outline"} >
                        مشاركة التقرير
                        <Share2 className="w-[18px] h-[18px]" />
                    </Button>
                    <Button className="rounded-2xl gap-2" color="dark" >
                        تحميل التقرير - Pdf
                        <ArrowDownToLine className="w-[18px] h-[18px]" />
                    </Button>
                    <Button className="rounded-2xl aspect-square">
                        <ChevronLeft className="w-[18px] h-[18px]" />
                    </Button>
                </div>
            </div>
            <EditFormsQesutions
                questions={task.questions}
                // @ts-ignore
                formVisitType={task.formVisitType}
                resumeTime={task.resumeTime}
                resumeNumber={task.resumeNumber}
                resumeTitle={task.resumeTitle}
                resumeArea={task.resumeArea}
                facilityOwnerSignature={task.facilityOwnerSignature}
                inspectorSignature={task.inspectorSignature}
            />
        </div>
    )
}

export default TaskPage
