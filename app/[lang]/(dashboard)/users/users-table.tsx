"use client";
import { Switch } from "@/components/ui/switch";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { useUsers } from "@/hooks/useUsers";
import { useEffect } from "react";
import { User } from "@/interfaces";
import UpdateUserDialog from "./update-user";
interface UsersTableProps extends ReturnType<typeof useUsers> {}
const UsersTable = ({ fetchUsers, users, updateUser,deleteUser }: UsersTableProps) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">المستخدم</TableHead>
          <TableHead>البريد الإلكتروني</TableHead>
          <TableHead>الوظيفة</TableHead>
          <TableHead>المهام المكتملة</TableHead>
          <TableHead>الاجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((item: User) => (
          <TableRow key={item.email}>
            <TableCell className=" font-medium  text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <Avatar className="rounded-full">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>
                    {item.firstName?.charAt(0)} {item.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className=" text-sm   text-card-foreground">
                  {item.firstName} {item.lastName}
                </span>
              </div>
            </TableCell>

            <TableCell>{item.email}</TableCell>
            <TableCell>
              <Badge
                variant="soft"
                color={
                  (item.role === "admin" && "default") ||
                  (item.role === "member" && "success") ||
                  (item.role === "owner" && "info") ||
                  (item.role === "editor" && "warning") ||
                  "default"
                }
                className=" capitalize"
              >
                {item.role}
              </Badge>
            </TableCell>
            <TableCell>{item.tasksCompleted}</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <EditingDialog updateUser={updateUser} user={item}/>
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
                        onClick={() => deleteUser(item.id)}
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

export default UsersTable;

interface EditingDialogProps {
  updateUser: ReturnType<typeof useUsers>["updateUser"];
  user: User;
}
const EditingDialog = ({ updateUser, user }: EditingDialogProps) => {
  return (
    <UpdateUserDialog updateUser={updateUser} {...user}/>
  );
};
