"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@//components/ui/table";
import { DataRows, users } from "./data";
import { Icon } from "@iconify/react";
import { Button } from "@//components/ui/button";
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
import GroupFormDialog from "./group-form";
import { useEffect, useState } from "react";
import { useGroups } from "@/rassd/hooks/useGroups";
import { Group, GroupType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const GroupsTable = ({fetchGroups,deleteGroup, updateGroup , createGroup ,groups}: ReturnType<typeof useGroups>) => {

  useEffect(() => {
    fetchGroups()
  }, [])

  console.log(groups)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">
            اسم المجموعة
          </TableHead>
          <TableHead>
            نوع المجموعة
          </TableHead>
          <TableHead>
            الاجراءات
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              {item.type}
            </TableCell>
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <EditingDialog id={item.id} name={item.name} type={item.type} updateGroup={updateGroup}/>
                <AlertDialog >
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
                      <AlertDialogAction className="bg-destructive hover:bg-destructive/80" onClick={() => deleteGroup(item.id)}>
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

export default GroupsTable;

interface EditingDialogProps extends Group {
  updateGroup: ReturnType<typeof useGroups>["updateGroup"]

}
const EditingDialog = ({ id, name, type, updateGroup }: EditingDialogProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: updateGroup,
    onSuccess: () => {
      toast.success("تم إنشاء مجموعة جديدة")
      setOpen(false)
      router.refresh()
    }
  })
  return (
    <GroupFormDialog isPending={isPending} open={open} setOpen={setOpen} groupType={type === "سرية" ? "secret" : "field"} title={name} onSubmit={({ name, groupType }) => {
      mutate({ id: id, groupData: {
        name,
        type: groupType == "field" ? GroupType.FIELD_VISIT : GroupType.SECRET_VISIT
      } })
    }}>
      <Button
        size="icon"
        variant="outline"
        color="secondary"
        className=" h-7 w-7"
      >
        <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
      </Button>
    </GroupFormDialog>
  );
};
