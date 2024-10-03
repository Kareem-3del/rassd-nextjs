import SectionHeader, {
    SectionTitle,
} from "../_components/section-header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VisitsFilter } from "@/components/visits-filter"
import { CompletedForms } from "./_components/completed-tasks"

const CompletedFormsPage = async () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <SectionHeader>
                    <SectionTitle>
                        "قائمة الاستمارات المكتملة"
                    </SectionTitle>
                </SectionHeader>
                <Link href="#" className="text-black text-[10px] flex items-center gap-2 font-extrabold md:hidden">
                    شـــاهد الكل
                    <ArrowLeft className="h-3 w-3" />
                </Link>
                <VisitsFilter/>
            </div>
            <CompletedForms />
        </div>
    )
}

export default CompletedFormsPage
