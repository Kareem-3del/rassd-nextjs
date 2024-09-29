"use strict";
import GroupsTable from "@/app/[lang]/(dashboard)/groups/groups-table";
import { Card } from "@/components/ui/card";
import CreateDepartmentDialog from "@/app/[lang]/(dashboard)/departments/create-department";
import DepartmentsTable from "@/app/[lang]/(dashboard)/departments/departments-table";

const TaskPage = async () => {
    return (
      <div className="flex flex-col gap-4">
          <Card className="p-4 flex justify-between items-center">
              <CreateDepartmentDialog/>
              <p className="w-full text-center">
                    هذه الصفحة تستخدم لإدارة الاقسام و البنود
              </p>
          </Card>
          <Card title="الاقسام">

          <DepartmentsTable/>
          </Card>
      </div>
  );
};

export default TaskPage;
