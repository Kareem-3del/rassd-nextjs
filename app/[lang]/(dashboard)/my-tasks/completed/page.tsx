"use client"
import SectionHeader, {
    SectionTitle,
} from "../_components/section-header"
import { VisitsFilter } from "@/components/visits-filter"
import { CompletedForms } from "./_components/completed-tasks"

const CompletedFormsPage = () => {
    
    return (
        <div>
            <div className="flex justify-between items-center">
                <SectionHeader>
                    <SectionTitle>
                        "قائمة الاستمارات المكتملة"
                    </SectionTitle>
                </SectionHeader>
                <VisitsFilter/>
            </div>
            <CompletedForms />
        </div>
    )
}

export default CompletedFormsPage
