"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatTime } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { type Contact as ContactType, type Chat as ChatType } from "@/app/api/chat/data";

const ContactList = ({ contact, openChat, selectedChatId }: {
  contact: ContactType,
  openChat: (id: any) => void,
  selectedChatId: string
}) => {
  const { avatar, id, fullName, status, about, unreadmessage, date } =
    contact;

    console.log({
      contact 
    })
  return (
    <div className="border-y border-y-gray-100">
    <div
      className={cn(
        "group gap-4 py-2 lg:py-2.5 px-5 border-l-2 border-transparent  hover:bg-primary cursor-pointer flex rounded-md",
        {
          "bg-primary": id === selectedChatId as any,
        }
      )}
      onClick={() => openChat(id)}
    >
      <div className="flex-1 flex  gap-3 ">
        <div className="relative inline-block ">
          <Avatar>
            <AvatarImage src={avatar.src} />
            <AvatarFallback className="uppercase">
              {fullName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <Badge
            className=" h-2 w-2  p-0 ring-1 ring-border ring-offset-[1px]   items-center justify-center absolute
             left-[calc(100%-8px)] top-[calc(100%-10px)]"
            color={status === "online" ? "success" : "secondary"}
          ></Badge>
        </div>
        <div className="block">
          <div className="truncate max-w-[120px]">
            <span className={cn("text-sm text-default-900 font-medium group-hover:text-white", {
              "text-white": id === selectedChatId as any,
            })}>
              {" "}
              {fullName}
            </span>
          </div>
          <div className="truncate  max-w-[120px]">
            <span className={cn("text-xs text-default-600 group-hover:text-gray-200", {
              "text-gray-200": id === selectedChatId as any,
            })}>
              {about}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-none  flex-col items-end  gap-2 hidden lg:flex">
        <span className={cn("text-xs text-default-600 text-end uppercase group-hover:text-gray-200", {
          "text-gray-200": id === selectedChatId as any,
        })}>
          {date}
        </span>
        <span
          className={cn(
            "h-[14px] w-[14px] flex items-center justify-center bg-default-400 rounded-full text-primary-foreground text-[10px] font-medium group-hover:text-primary group-hover:bg-white",
            {
              "bg-primary/70": unreadmessage > 0,
              "text-primary bg-white": id === selectedChatId as any,
            }
          )}
        >
          {unreadmessage === 0 ? (
            <Icon icon="uil:check" className="text-sm" />
          ) : (
            unreadmessage
          )}
        </span>
      </div>
    </div>
    </div>
  );
};

export default ContactList;
