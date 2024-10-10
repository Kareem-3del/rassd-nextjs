// interface SendedFormsPops { }
// import { FormCard } from "./form-card"
// import { FormCardEntries } from "@/types"
// const sendedForms: FormCardEntries[] = [
    
//     {
//     id: "1",
//     user: {
//         name: "علي جـــــواد",
//         image: "/images/avatar/avatar-5.jpg",
//         role: "002 001  / مفتش",
//     },
//     resumeNumber: "475 886",
//     resumeTitle: "مستشفى الرعاية المتقدمة",
//     resumeArea: "المنطة الشمالية , الرياض",
//     resumeTime: new Date(),
//     formStatus: "in-review",
//     formVisitType: "field-visit",
//     items: 14,
//     progress: 50,
//     facilityOwnerSignature : "/images/signature.png",
//     inspectorSignature : "/images/signature.png"
// },
// {
//     id: "1",
//     user: {
//         name: "علي جـــــواد",
//         image: "/images/avatar/avatar-8.jpg",
//         role: "002 001  / مفتش",
//     },
//     resumeNumber: "475 886",
//     resumeTitle: "مستشفى الرعاية المتقدمة",
//     resumeArea: "المنطة الشمالية , الرياض",
//     resumeTime: new Date(),
//     formStatus: "in-review",
//     formVisitType: "secret-visit",
//     items: 14,
//     progress: 50,
//     facilityOwnerSignature : "/images/signature.png",
//     inspectorSignature : "/images/signature.png"
// }

// ]

// export const AuditDepartmentSendedForms = () => {
//     return <div className="space-y-[10px] rounded-[35px] p-5 bg-[#F5F5F5] mt-9">
//          { sendedForms.map(form => (
//         <FormCard key={form.id}
//             {...form}
//             />
//     ))}
//     </div>
// }// Add this line at the very top of the file
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormCard } from "./form-card";
import { FormCardEntries } from "@/types";
import { api } from "@/config/axios.config";

export const AuditDepartmentSendedForms = () => {
    const [sendedForms, setSendedForms] = useState<FormCardEntries[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSendedForms = async () => {
            try {
                const response = await api.get("/tasks"); 
                const formsData = response.data.elements;

            
                const mappedForms = formsData
                    .filter((form: any) => form.status === "Pending")
                    .map((form: any) => ({
                        id: form.id.toString(),
                        user: {
                            name: form.inspector?.name || "Unknown", 
                            image: form.inspector?.image || "/images/default-avatar.jpg", 
                            role: form.inspector?.role || "Unknown Role",
                        },
                        resumeNumber: form.resumeNumber || "N/A",
                        resumeTitle: form.resumeTitle || "N/A",
                        resumeArea: form.establishmentDetail?.district || "N/A", 
                        resumeTime: new Date(form.created_at), 
                        formStatus: form.status || "Unknown",
                        formVisitType: form.formVisitType || "N/A",
                        items: form.items || 0,
                        progress: form.progress || 0, 
                        facilityOwnerSignature: "/images/signature.png", 
                        inspectorSignature: "/images/signature.png", 
                    }));

                setSendedForms(mappedForms);
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchSendedForms();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-[10px] rounded-[35px] p-5 bg-[#F5F5F5] mt-9">
            {sendedForms.map((form) => (
                <FormCard key={form.id} {...form} />
            ))}
        </div>
    );
};
