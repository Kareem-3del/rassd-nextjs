"use client";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import Image from "next/image";
import { Eye, X as RemoveIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Term } from "@/rassd/types";
import { useUser } from "@/components/user-provider";

interface TaskTermProps extends Term {
  onCheckedChange?: (value: boolean) => void; // Corrected
  disabled?: boolean;
}

export const TaskTerm = ({
  disabled,
  name,
  requiredFiles,
  onCheckedChange,
}: TaskTermProps) => {
  const { user } = useUser();
  

  const isInspector = user?.role === 'inspector';

  return (
    <div>
      <div className="bg-primary/5 py-2 px-6 rounded-2xl flex items-center justify-between gap-2">
        <p className="text-sm font-extrabold text-[#1C274C]">{name}</p>
        <div className="flex items-center gap-2">
          <Label className="text-sm font-extrabold text-[#1C274C]">نعم</Label>
          <Switch
            size="lg"
            disabled={!isInspector || disabled}
            checked={requiredFiles}
            onCheckedChange={onCheckedChange}
          />
          <Label className="text-sm font-extrabold text-[#1C274C]">لا</Label>
        </div>
       
      </div>
    </div>
  );
};

interface RenderFileProps {
  file: string;
  onRemove?: (file: RenderFileProps["file"]) => void;
}

export function RenderFileWithPreview({ file }: { file: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group">
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute w-full h-full top-0 left-0 bg-black/30 z-1 group-hover:bg-black/50 transition-all duration-75" />
            <Eye className="absolute w-4 h-4 text-white z-10  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <Image
              width={40}
              height={40}
              src={file}
              alt={file}
              className="w-10 h-10 object-cover"
            />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent size="lg">
        <div className="w-full aspect-video overflow-hidden rounded-md">
          <Image
            fill
            src={file}
            alt={file}
            className="w-full h-full rounded-xl object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function RenderEditableFile({ file, onRemove }: RenderFileProps) {
  return (
    <div className="relative">
      <Image
        width={40}
        height={40}
        src={file}
        alt={file}
        className="w-10 h-10 rounded-xl object-cover"
      />
      {
        <button
          className="p-1 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[5px]"
          onClick={() => onRemove?.(file)}
        >
          <RemoveIcon className="w-1.5 h-1.5 text-black" />
        </button>
      }
    </div>
  );
}
