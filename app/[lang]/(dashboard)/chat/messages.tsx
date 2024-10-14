import React, {useEffect, useState} from "react";
import { formatTime } from "@/lib/utils";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Undo2 } from "lucide-react";
import { type ProfileUser as ProfileUser, type Contact as ContactType, type Chat as ChatType } from "@/app/api/chat/data";
import img from "next/image";
import {User} from "@/rassd/types";
const chatAction = [
  {
    label: "Remove",
    link: "#",
  },
  {
    label: "Forward",
    link: "#",
  },
];
import { useUser } from "@/components/user-provider"

interface MessagesProps {
  message: any;
  contact: User;
  profile: User;
  onDelete: (selectedChatId: any, index: number) => void;
  index: number;
  selectedChatId: string;
  handleReply: (data: any, contact: ContactType) => void;
  replayData: any;
  handleForward: (data: any) => void;
  handlePinMessage: (data: any) => void;
  pinnedMessages: ChatType[];

}
const Messages = ({
  message,
  contact,
  profile,
  onDelete,
  index,
  selectedChatId,
  replayData,
  handleForward,

  handlePinMessage,
  pinnedMessages,
}: MessagesProps) => {
  const { sender , content: chatMessage, time, replayMetadata , receiver } = message;
  // State to manage pin status
  const isMessagePinned = pinnedMessages.some(
    (pinnedMessage: any) => pinnedMessage.index === index
  );
const { avatar, firstName } = contact || {
  avatar : null,
    firstName : ""
};
  const handlePinMessageLocal = (note: any) => {
    const obj = {
      note,
      index,
    };
    handlePinMessage(obj);
  };
  const { user } = useUser();

  return (
    <>
      <div className="block md:px-6 px-0 ">
        {sender?.id === user?.id ? (
          <>
            {replayMetadata === true && (
              <div className="w-max ml-auto -mb-2 mr-10">
                <div className="flex items-center gap-1 mb-1">
                  <Undo2 className="w-4 h-4 text-default-600" />{" "}
                  <span className="text-xs text-default-700">
                    You replied to
                    <span className="ml-1 text-default-800">
                      {replayData?.contact?.firstName + " " + replayData?.contact?.lastName}
                    </span>
                  </span>
                </div>
                <p className="truncate text-sm bg-default-200 rounded-2xl px-3 py-2.5">
                  {replayData?.message}
                </p>
              </div>
            )}
            <div className="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse mb-4">
              <div className=" flex flex-col  gap-1">
                <div className="flex items-center gap-1">
                  <div className="whitespace-pre-wrap break-all">
                    <div className="bg-primary/70 text-primary-foreground  text-sm  py-2 px-3 rounded-2xl  flex-1  ">
                      {chatMessage}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-end text-default-500">
                  {formatTime(time)}
                </span>
              </div>
              <div className="flex-none self-end -translate-y-5">
                <div className="h-8 w-8 rounded-full ">
                  <img
                    src={sender?.avatar || `https://ui-avatars.com/api/?background=random&name=${sender?.firstName}`}
                    alt=""
                    className="block w-full h-full object-cover rounded-full"
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex space-x-2 items-start group rtl:space-x-reverse mb-4">
            <div className="flex-none self-end -translate-y-5">
              <div className="h-8 w-8 rounded-full">
                <img
                  src={receiver.avatar ? receiver.avatar : ` https://ui-avatars.com/api/?background=random&name=${receiver.firstName}`}
                  alt=""
                  className="block w-full h-full object-cover rounded-full"
                  width={150}
                    height={150}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col   gap-1">
                <div className="flex items-center gap-1">
                  <div className="whitespace-pre-wrap break-all relative z-[1]">
                    {isMessagePinned && (
                      <Icon
                        icon="ion:pin-sharp"
                        className=" w-5 h-5 text-destructive  absolute left-0 -top-3 z-[-1]  transform -rotate-[30deg]"
                      />
                    )}

                    <div className="bg-default-200  text-sm  py-2 px-3 rounded-2xl  flex-1  ">
                      {chatMessage}
                    </div>
                  </div>
                </div>
                <span className="text-xs   text-default-500">
                  {formatTime(time)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
