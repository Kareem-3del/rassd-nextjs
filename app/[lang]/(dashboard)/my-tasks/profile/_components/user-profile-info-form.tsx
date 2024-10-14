"use client"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomInput } from "./custom-input"


const formSchema = z.object({
    name: z.string().min(3).max(32),
    email: z.string().email(),
    password: z.string().min(6).max(32),
    userType: z.string(),
    id: z.string(),
})

type FormData = z.infer<typeof formSchema>

interface UserProfileInfoFormProps extends Partial<FormData>{
}
export const UserProfileInfoForm = ({
    id,
    name,
    userType,
    email,
    password
}: UserProfileInfoFormProps) => {
    const form = useForm<FormData>({
        defaultValues: {
            id,
            name,
            userType,
            email,
            password
        }
    })

    function onSubmit(data: FormData) {
        console.log(data)
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6">
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <CustomInput
                            label="اسم المستخدم"
                            {...field}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => (
                        <CustomInput
                            label="نوع المستخدم"
                            {...field}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <CustomInput
                            label="رقم معرف المستخدم"
                            {...field}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <CustomInput
                            label="البريد الاكتروني"
                            {...field}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <CustomInput
                            label="كلمة المرور"
                            {...field}
                        />
                    )}
                />
            </div>
            <div className="grid justify-end">

            <Button className="h-12 rounded-2xl mr-auto mt-4 gap-[10px]">
            حـــفـظ
            </Button>
            </div>
        </form>
    </Form>
}