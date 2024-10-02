"use client";
import GroupsTable from "../groups/groups-table";
import { Card } from "@/components/ui/card";
import DepartmentFormDialog from "./department-form";
import DepartmentsTable from "./departments-table";
import { Button } from "@/components/ui/button";
import { useDepartments } from "@/rassd/hooks/useDepartments";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

const TaskPage = () => {
    const departmentHook = useDepartments()
    const {mutate , isPending} = useMutation({
        mutationFn: departmentHook.createDepartment,
        onSuccess: () => {
            toast.success("تم إنشاء قسم جديد")
        }
    })
    const [open,setOpen] = useState(false)
    return (
      <div className="flex flex-col gap-4">
          <Card className="p-4 flex justify-between items-center">
              <DepartmentFormDialog open={open} setOpen={setOpen} isPending={isPending} onSubmit={(data) => {
                mutate({
                    name: data.title,
                    groupId: data.group,
                    // terms: data.terms.map(term => ({name: term.name, files: term.files}))
                })
              }}>
                <Button >
                    إنشاء قسم جديد
                </Button>
              </DepartmentFormDialog>
              <p className="w-full text-center">
                    هذه الصفحة تستخدم لإدارة الاقسام و البنود
              </p>
          </Card>
          <Card title="الاقسام">

          <DepartmentsTable {...departmentHook}/>   
          </Card>
      </div>
  );
};

export default TaskPage;
