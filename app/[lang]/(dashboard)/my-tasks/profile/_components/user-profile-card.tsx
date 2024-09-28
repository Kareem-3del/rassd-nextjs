import { Card, CardTitle } from "@/components/ui/card"
import { ChangeUserAvatar } from "./change-user-avatar"
import { UserProfileInfoForm } from "./user-profile-info-form"

interface UserProfileCardProps {
    name: string
    avatar: string
} 


export const UserProfileCard = ({name, avatar}: UserProfileCardProps) => {
    return <Card className="p-10 rounded-[10px]">
        <CardTitle className="text-primary text-xs font-bold">الصورة الشخصية</CardTitle>
        <ChangeUserAvatar name={name} avatar={avatar}/>
        <UserProfileInfoForm />
    </Card>
}