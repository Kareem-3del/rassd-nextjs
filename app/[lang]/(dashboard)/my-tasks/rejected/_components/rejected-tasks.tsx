import { useEffect, useState } from "react";
import { RejectedFormCard } from "./rejected-form-card"
import { api } from "@/config/axios.config"; 

interface RejectedFormProps {
    id: string;
    resumeNumber: string;
    resumeTitle: string;
    resumeArea: string;
    resumeTime: Date;
    formStatus: string;
    formVisitType: string;
    items: number;
    facilityOwnerSignature: string;
    inspectorSignature: string;
    rejectReson: string;
    
}

export const RejectedTasks = () => {
    const [rejectedForms, setRejectedForms] = useState<RejectedFormProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRejectedForms = async () => {
            setLoading(true); 
            try {
                const response = await api.get("/tasks"); 
                const forms = response.data.elements
                    .filter((task: any) => task.status === "Rejected")
                    .map((task: any) => ({
                        id: task.id.toString(),
                        resumeNumber: task.resumeNumber || "N/A", 
                        resumeTitle: task.title || "N/A", 
                        resumeArea: task.establishmentDetail.city || "N/A",
                        resumeTime: new Date(task.created_at), 
                        formStatus: task.status,
                        formVisitType: task.formVisitType || "N/A", 
                        items: task.values.length, 
                        facilityOwnerSignature: "/images/signature.png", 
                        inspectorSignature: "/images/signature.png", 
                        rejectReson: "تم رفض الاستمارة بسبب عدم اكتمال جميع الحقول المطلوبة، بالإضافة إلى غياب التوقيع الرقمي للمفتش وصاحب المنشأة. يُرجى مراجعة البيانات المفقودة وإعادة تقديم الاستمارة بعد استكمال كافة المعلومات اللازمة." // Keep unchanged
                    }));

                setRejectedForms(forms); 
                setError(null);
            } catch (error) {
                setError('Error fetching rejected forms.');
                console.error('Error fetching rejected forms:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRejectedForms();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>; 

    return (
        <div className="space-y-[10px] rounded-[35px] p-5 bg-[#F5F5F5] mt-9">
            {rejectedForms.length > 0 ? (
                rejectedForms.map((form) => (
                    <RejectedFormCard key={form.id} {...form} />
                ))
            ) : (
                <div>لم يتم العثور على مهام مرفوضة</div>
            )}
        </div>
    );
};
