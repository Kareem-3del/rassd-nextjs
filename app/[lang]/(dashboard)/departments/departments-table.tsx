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
const DepartmentsTable = ({fetchDepartments,deleteDepartment, updateDepartment, departments }: ReturnType<typeof useDepartments>) => {

  useEffect(()=> {
    fetchDepartments()
  }, [])

  console.log(departments)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">
            اسم القسم
          </TableHead>
          <TableHead>
            البنود
          </TableHead>
          <TableHead>
            الاجراءات
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departments.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              {item.terms.length}
            </TableCell>
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <EditingDialog name={item.name} groupId={item.groupId} id={item.id} terms={item.terms} updateDepartment={updateDepartment}/>
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
                      <AlertDialogTitle>
                        هل أنت متأكد تمامًا؟
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الحساب نهائيًا وإزالة بياناته من خوادمنا.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className=" bg-secondary">
                        إلغاء
                      </AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive hover:bg-destructive/80">
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
  id: number
  name: string
  groupId: string
  terms: {
    id: string;
    name: string
    files: boolean
  }[]
  updateDepartment: ReturnType<typeof useDepartments>["updateDepartment"]

}
const EditingDialog = ({updateDepartment, groupId,name, terms}: EditingDialogProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      toast.success("تم إنشاء مجموعة جديدة")
      setOpen(false)
      router.refresh()
    }
  })
  return (
    <DepartmentFormDialog group={groupId} groupType="field" terms={terms} title={name} isPending={isPending} open={open} setOpen={setOpen} onSubmit={(data) => {
      // mutate()
    }}>
      <Button
        size="icon"
        variant="outline"
        color="secondary"
        className=" h-7 w-7"
      >
        <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
      </Button>
    </DepartmentFormDialog>
  );
};
