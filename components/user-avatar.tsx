import { type AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "next-auth"

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "name" | "image">
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
    return (
        <Avatar {...props}>
            <AvatarImage
                src={user.image!}
                alt="profile picture"
                referrerPolicy="no-referrer"
            />
            <AvatarFallback>
                {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

