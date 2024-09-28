import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"



interface ChangeUserAvatarProps {
    avatar?: string
    name: string
}


export const ChangeUserAvatar = ({avatar, name }:ChangeUserAvatarProps) => {
    return <div className="flex items-center gap-4 mt-4 flex-wrap">
        <UserAvatar user={{
             image: avatar,
             name
        }} className="w-[55px] h-[55px]"/>
        <div className="flex items-center gap-2 flex-wrap">
        <Button className=" text-xs h-8 rounded-[10px] flex-1">
        تغيير الصورة
            </Button>
            <Button color="dark" className=" text-xs h-8 rounded-[10px] flex-1">
            حذف الصورة
            </Button>
        </div>
    </div>
}
