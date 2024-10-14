import { useDepartments } from "@/rassd/hooks/useDepartments";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import DepartmentForm from "./department-form";

interface CreateDepartmentDialog extends ReturnType<typeof useDepartments> {}

export const CreateDepartmentDialog = ({
  createDepartment,
}: CreateDepartmentDialog) => {
  const { mutate, isPending } = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      toast.success("تم إنشاء قسم جديد");
      setOpen(false)
    },
  });
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>إنشاء قسم جديد</Button>
      </DialogTrigger>
      <DialogContent size="2xl" className="max-h-[80vh] overflow-y-auto">
        <DialogHeader className="p-0">
          <DialogTitle className="text-base font-medium text-default-700 ">
            إنشاء قسم جديد
          </DialogTitle>
        </DialogHeader>
        <DepartmentForm
          onSubmit={(data) => {
            mutate({
              name: data.title,
              groupId: data.groupId,
              terms: data.terms.map((term) => ({
                name: term.name,
                requiredFiles: term.requiredFiles,
              })),
            });
          }}
        >
          <div className=" flex justify-center gap-3 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                إلغاء
              </Button>
            </DialogClose>
            <Button disabled={isPending}>إنشاء مجموعة</Button>
          </div>
        </DepartmentForm>
      </DialogContent>
    </Dialog>
  );
};
