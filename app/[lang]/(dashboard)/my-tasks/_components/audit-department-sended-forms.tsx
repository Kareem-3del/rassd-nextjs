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
import {useUser} from "@/components/user-provider";

export const AuditDepartmentSendedForms = ({completed , done , rejected}:{
    completed?: boolean,
    done? : boolean
    rejected?: boolean
}) => {
    const [sendedForms, setSendedForms] = useState<FormCardEntries[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {user} = useUser();
    const IsInstructor = user?.role === "instructor";
    const isReviewer = user?.role === "reviewer";
    const isInspector = user?.role === "inspector";
    const isQuality = user?.role === "quality";
    useEffect(() => {
        const fetchSendedForms = async () => {
            try {
                const response = await api.get("/tasks"); 
                const formsData = response.data.elements;

            
                const mappedForms = formsData
                     .filter((form: any) => {

                        if(completed){
                            return form.status === "Completed";
                        }
                        if(done){
                            return form.status === "Completed" || form.status === "Pending";
                        }
                        if(rejected){
                            return form.status === "Rejected";
                        }
                        return form.status !== "Completed";
                     })
                    .map((form: any) => ({
                        id: form.id.toString(),
                        user: {
                            name: form.inspector?.name || user?.firstName + " " + user?.lastName || "Unknown Name",
                            image: form.inspector?.image || user?.avatar,
                            role: form.inspector?.role || user?.role || "Unknown Role",
                        },
                        resumeNumber: form.id || "N/A",
                        resumeTitle: form.title || "N/A",
                        resumeArea: form.establishmentDetail?.district || "N/A",
                        resumeTime: new Date(form.created_at), 
                        formStatus: form.status || "Unknown",
                        formVisitType: form.department.group.type || "N/A",
                        items: form.department.terms.length || 0,
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

    if (loading) return <div>Loadinffffg...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-[10px] rounded-[35px] p-5 bg-[#F5F5F5] mt-9">
            {sendedForms?.length ? sendedForms.map((form) => (
                <FormCard key={form.id} {...form} />
            )) :
            <div>
                لا يوجد استمارات لعرضها
            </div>
            }
        </div>
    );
};
