"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const MessageHeader = ({
  showInfo,
  handleShowInfo,
  profile,
  mblChatHandler,
}: {
  showInfo: boolean;
  handleShowInfo: () => void;
  profile: any;
  mblChatHandler: () => void;
}) => {
  let active = true;
  const isLg = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="flex  items-center">
      <div className="flex flex-1 gap-3 items-center">
        {isLg && (
          <Menu
            className=" h-5 w-5 cursor-pointer text-default-600"
            onClick={mblChatHandler}
          />
        )}
        <div className="relative inline-block">
          <Avatar>
            <AvatarImage src={profile?.avatar?.src} alt="" />
            <AvatarFallback>{profile?.fullName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <Badge
            className=" h-3 w-3  p-0 ring-1 ring-border ring-offset-[1px]   items-center justify-center absolute left-[calc(100%-12px)] top-[calc(100%-12px)]"
            color={active ? "success" : "secondary"}
          ></Badge>
        </div>
        <div className="hidden lg:block">
          <div className="text-sm font-medium text-default-900 ">
            <span className="relative">{profile?.fullName}</span>
          </div>
          <span className="text-xs text-default-500">
            {active ? "متصل الان" : "غير متصل"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
