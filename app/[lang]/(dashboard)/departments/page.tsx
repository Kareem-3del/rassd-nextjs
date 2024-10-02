"use strict";
import GroupsTable from "../groups/groups-table";
import { Card } from "../../../../../../WebstormProjects/rassd-nextjs/components/ui/card";
import CreateDepartmentDialog from "./create-department";
import DepartmentsTable from "./departments-table";

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
