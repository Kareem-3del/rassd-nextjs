"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataRows, users } from "./data";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useDepartments } from "@/rassd/hooks/useDepartments";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import DepartmentFormDialog from "./department-form";
import DepartmentForm from "./department-form";
import { Term } from "@/types";
const DepartmentsTable = ({
  deleteDepartment,
  updateDepartment,
  updateTerm,
  departments,
  deleteTerm
}: ReturnType<typeof useDepartments>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">اسم القسم</TableHead>
          <TableHead>البنود</TableHead>
          <TableHead>الاجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departments.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.terms.length}</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <EditingDialog
                  name={item.name}
                  groupId={item.groupId}
                  id={item.id}
                  terms={item.terms}
                  groupType={item.groupType}
                  updateDepartment={updateDepartment}
                  updateTerm={updateTerm}
                  deleteTerm={deleteTerm}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className=" h-7 w-7"
                      color="secondary"
                    >
                      <Icon icon="heroicons:trash" className=" h-4 w-4  " />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent dir="ltr">
                    <AlertDialogHeader>
                      <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                      <AlertDialogDescription>
                        هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الحساب نهائيًا
                        وإزالة بياناته من خوادمنا.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className=" bg-secondary">
                        إلغاء
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/80"
                        onClick={() => deleteDepartment(item.id)}
                      >
                        تأكيد الحذف
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DepartmentsTable;

interface EditingDialogProps {
  id: number;
  name: string;
  groupId: number;
  groupType: string;
  terms: Term[];
  updateDepartment: ReturnType<typeof useDepartments>["updateDepartment"];
  updateTerm: ReturnType<typeof useDepartments>["updateTerm"];
  deleteTerm: ReturnType<typeof useDepartments>["deleteTerm"];
}
const EditingDialog = ({
  id,
  updateDepartment,
  groupId,
  name,
  terms,
  groupType,
  deleteTerm,
  updateTerm,
}: EditingDialogProps) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      await updateDepartment({
        id,
        departmentData: {
          name: data.departmentData.name,
          groupId: data.departmentData.groupId,
        },
      });
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("تم تعديل القسم");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          color="secondary"
          className=" h-7 w-7"
        >
          <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
        </Button>
      </DialogTrigger>
      <DialogContent size="2xl" className="max-h-[80vh] overflow-y-auto">
        <DialogHeader className="p-0">
          <DialogTitle className="text-base font-medium text-default-700 ">
            تعديل القسم
          </DialogTitle>
        </DialogHeader>
        <DepartmentForm
          groupId={groupId}
          title={name}
          terms={terms}
          groupType={groupType}
          type="edit"
          updateTerm={updateTerm}
          deleteTerm={deleteTerm}
          onSubmit={(data) => {
            console.log(data);
            mutate({
              departmentData: {
                name: data.title,
                group: data.groupId,
                terms: data.terms.map((term) => ({
                  name: term.name,
                  requiredFiles: term.requiredFiles,
                })),
              },
              id,
            });
          }}
        >
          <div className=" flex justify-center gap-3 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                إلغاء
              </Button>
            </DialogClose>
            <Button disabled={isPending}>تعديل القسم</Button>
          </div>
        </DepartmentForm>
      </DialogContent>
    </Dialog>
  );
};
