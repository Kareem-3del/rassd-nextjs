"use client";
import { Card } from "@/components/ui/card";
import DepartmentsTable from "./departments-table";
import { useDepartments } from "@/rassd/hooks/useDepartments";
import { CreateDepartmentDialog } from "./create-deparment-dialog";

const TaskPage = () => {
  const departmentHook = useDepartments();
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4 flex justify-between items-center">
        <CreateDepartmentDialog {...departmentHook} />
        <p className="w-full text-center">
          هذه الصفحة تستخدم لإدارة الاقسام و البنود
        </p>
      </Card>
      <Card title="الاقسام">
        <DepartmentsTable {...departmentHook} />
      </Card>
    </div>
  );
};

export default TaskPage;
