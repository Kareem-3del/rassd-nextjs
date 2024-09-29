interface SendedFormsPops { }
import { FormCardEntries } from "@/types"
import { FormCard } from "../../_components/form-card"
const completedForms: FormCardEntries[] = [
    
    {
    id: "1",
    user: {
        name: "علي جـــــواد",
        image: "/images/avatar/avatar-5.jpg",
        role: "002 001  / مفتش",
    },
    resumeNumber: "475 886",
    resumeTitle: "مستشفى الرعاية المتقدمة",
    resumeArea: "المنطة الشمالية , الرياض",
    resumeTime: new Date(),
    formStatus: "in-review",
    formVisitType: "field-visit",
    items: 14,
    progress: 50,
    facilityOwnerSignature : "/images/signature.png",
    inspectorSignature : "/images/signature.png"
},
{
    id: "1",
    user: {
        name: "علي جـــــواد",
        image: "/images/avatar/avatar-8.jpg",
        role: "002 001  / مفتش",
    },
    resumeNumber: "475 886",
    resumeTitle: "مستشفى الرعاية المتقدمة",
    resumeArea: "المنطة الشمالية , الرياض",
    resumeTime: new Date(),
    formStatus: "in-review",
    formVisitType: "secret-visit",
    items: 14,
    progress: 50,
    facilityOwnerSignature : "/images/signature.png",
    inspectorSignature : "/images/signature.png"
}

]

export const CompletedForms = () => {
    return <div className="space-y-[10px] rounded-[35px] p-5 bg-[#F5F5F5] mt-9">
         { completedForms.map(form => (
        <FormCard key={form.id}
            {...form}
            />
    ))}
    </div>
}