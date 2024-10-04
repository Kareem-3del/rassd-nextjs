"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Annoyed, SendHorizontal } from "lucide-react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MessageFooter = ({ handleSendMessage, replay, setReply, replayData }: {
  handleSendMessage: (message: string) => void;
  replay: boolean;
  setReply: React.Dispatch<React.SetStateAction<boolean>>;
  replayData: any
}) => {
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "auto"; // Reset the height to auto to adjust
    e.target.style.height = `${e.target.scrollHeight - 15}px`;
  };

  const handleSelectEmoji = (emoji: any) => {
    setMessage(message + emoji.native);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(message);
    setReply(false);
    setMessage("");

    console.log(replay, message, "ami k");
  };
  return (
    <>
      {replay && (
        <div className=" w-full px-6 py-4 flex justify-between gap-4 items-center">
          <div>
            <div className="font-semibold text-base text-default-700 mb-1">
              Replying to {replayData?.contact?.fullName}
            </div>
            <div className="truncate">
              <span className="text-sm text-muted-foreground">
                {replayData?.message}
              </span>
            </div>
          </div>
          <span className="cursor-pointer " onClick={() => setReply(false)}>
            <Icon
              icon="heroicons:x-mark-20-solid"
              className="text-2xl text-default-900"
            />
          </span>
        </div>
      )}

      <div
        className="w-full flex items-end gap-1 lg:gap-4 lg:px-4 relative px-2 "
        style={{
          boxSizing: "border-box",
        }}
      >
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="flex  gap-1 relative">
              <textarea
                value={message}
                onChange={handleChange}
                placeholder="اكتب رسالتك هنا..."
                className="bg-[#F6F6F6] outline-none rounded-xl break-words px-5 pt-[10px] md:pl-3 flex-1 h-10 text-[#1C274C] placeholder:text-[#B6B6B6]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
                style={{
                  minHeight: "40px",
                  maxHeight: "120px",
                  overflowY: "auto",
                  resize: "none",
                }}
              />
              <Button
                type="submit"
                className="rounded-full bg-[#6BACA1] hover:bg-[#6BACA1]/90 h-10 w-10 p-0 self-end"
              >

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.89519 1.21777L11.6677 3.46777C16.2202 4.99027 16.2202 7.4728 11.6677 8.9878L9.65766 9.6553L8.99019 11.6653C7.47519 16.2178 4.98518 16.2178 3.47018 11.6653L1.21268 4.90027C0.207685 1.86277 1.85769 0.205274 4.89519 1.21777ZM4.65518 5.25277L7.50519 8.1178C7.61769 8.2303 7.76019 8.2828 7.90269 8.2828C8.04519 8.2828 8.18769 8.2303 8.30019 8.1178C8.51769 7.9003 8.51769 7.5403 8.30019 7.3228L5.45018 4.45777C5.23269 4.24027 4.87268 4.24027 4.65518 4.45777C4.43769 4.67527 4.43769 5.03527 4.65518 5.25277Z" fill="white" />
                </svg>

              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageFooter;
