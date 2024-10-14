import { User } from "next-auth"
import { VariantProps, cva } from "class-variance-authority";
import { UserAvatar } from "./user-avatar";
import { cn } from "@/lib/utils";

type BadgeUser = Pick<User, "name" | "image" > & {
    role: string
}

interface UserBadgeProps {
    user: BadgeUser,
    size?: "lg"
}



export const UserBadge = ({ user, size }: UserBadgeProps) => {
    return (
        <div className="flex items-center gap-3">
            <UserBadgeAvatar user={user} size={size} />
            <div className="flex flex-col gap-1">
                <UserBadgeName user={user} />
                <UserBadgeRole user={user} />
            </div>

        </div>
    )
}



const userBadgeAvatarVariants = cva("", {
    variants: {
        size: {
            default: "h-[35px] w-[35px]",
            lg: "h-[48px] w-[48px]"
        }
    },
    defaultVariants: {
        size: "default"
    }
})
interface UserBadgeAvatarProps extends React.ComponentProps<typeof UserAvatar>,
    VariantProps<typeof userBadgeAvatarVariants> {
}

const UserBadgeAvatar = ({ user, className, ...props }: UserBadgeAvatarProps) => {
    return (
        <UserAvatar user={user} className={cn(userBadgeAvatarVariants({ size: "default" }), className)} {...props} />
    )
}

interface UserBadgeNameProps {
    user: BadgeUser,
}

const userBadgeNameVariants = cva("text-primary", {
    variants: {
        size: {
            default: "text-xs font-bold",
        }
    }, defaultVariants: {
        size: "default"
    }
})

const UserBadgeName = ({ user, ...props }: UserBadgeNameProps) => {
    return (
        <span className={cn(userBadgeNameVariants({ size: "default" }))} {...props}>{user.name}</span>
    )
}

interface UserBadgeRoleProps {
    user: BadgeUser,
}

const userBadgeRoleVariants = cva("text-[#6BACA1]", {
    variants: {
        size: {
            default: "text-xs font-bold",
        }
    },
    defaultVariants: {
        size: "default"
    }
})

const UserBadgeRole = ({ user, ...props }: UserBadgeRoleProps) => {
    return (
        <span className={cn(userBadgeRoleVariants({ size: "default" }))} {...props}>{user.role}</span>
    )
}