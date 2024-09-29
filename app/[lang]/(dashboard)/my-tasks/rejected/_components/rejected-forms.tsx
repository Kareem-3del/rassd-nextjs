interface SendedFormsPops { }
import { RejectedFormCard, RejectedFormProps } from "./rejected-form-card"
const rejectedForms: RejectedFormProps[] = [
    {
    id: "1",
    resumeNumber: "475 886",
    resumeTitle: "مستشفى الرعاية المتقدمة",
    resumeArea: "المنطة الشمالية , الرياض",
    resumeTime: new Date(),
    formStatus: "in-review",
    formVisitType: "field-visit",
    items: 14,
    facilityOwnerSignature : "/images/signature.png",
    inspectorSignature : "/images/signature.png",
    rejectReson: "تم رفض الاستمارة بسبب عدم اكتمال جميع الحقول المطلوبة، بالإضافة إلى غياب التوقيع الرقمي للمفتش وصاحب المنشأة. يُرجى مراجعة البيانات المفقودة وإعادة تقديم الاستمارة بعد استكمال كافة المعلومات اللازمة."
},
{
    id: "1",
    resumeNumber: "475 886",
    resumeTitle: "مستشفى الرعاية المتقدمة",
    resumeArea: "المنطة الشمالية , الرياض",
    resumeTime: new Date(),
    formStatus: "in-review",
    formVisitType: "secret-visit",
    items: 14,
    facilityOwnerSignature : "/images/signature.png",
    inspectorSignature : "/images/signature.png",
    rejectReson: "تم رفض الاستمارة بسبب عدم اكتمال جميع الحقول المطلوبة، بالإضافة إلى غياب التوقيع الرقمي للمفتش وصاحب المنشأة. يُرجى مراجعة البيانات المفقودة وإعادة تقديم الاستمارة بعد استكمال كافة المعلومات اللازمة."

}
]

export const RejectedForms = () => {
    return <div className="space-y-[10px] rounded-[35px] p-5 bg-[#F5F5F5] mt-9">
         { rejectedForms.map(form => (
        <RejectedFormCard key={form.id}
            {...form}
            />
    ))}
    </div>
}