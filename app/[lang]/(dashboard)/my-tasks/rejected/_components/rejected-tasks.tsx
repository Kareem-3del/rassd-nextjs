interface SendedFormsPops { }
import { RejectedFormCard, RejectedFormProps } from "./rejected-form-card"


export const RejectedTasks = () => {
    return <div className="space-y-[10px] rounded-[35px] p-5 bg-[#F5F5F5] mt-9">
         { rejectedForms.map(form => (
        <RejectedFormCard key={form.id}
            {...form}
            />
    ))}
    </div>
}