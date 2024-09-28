export type FormStatus = "in-review" | "in-progress" | "rejected"
export type FormVisitType = "field-visit" | "secret-visit"
export type FormCardEntries = {
    id: string
    user: {
        name: string;
        image: string
        role: string
    }
    resumeNumber: string
    resumeTitle: string
    resumeArea: string
    resumeTime: Date
    formStatus: FormStatus
    formVisitType: FormVisitType
    items: number
    progress: number
}