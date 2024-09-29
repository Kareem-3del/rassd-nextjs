"use strict";
import GroupsTable from "@/app/[lang]/(dashboard)/groups/groups-table";
import { Card } from "@/components/ui/card";
import CreateGroupDialog from "@/app/[lang]/(dashboard)/groups/create-group";

const TaskPage = async () => {
    return (
      <div className="flex flex-col gap-4">
          <Card className="p-4 flex justify-between items-center">
              <CreateGroupDialog/>
              <p className="w-full text-center">
                    هذه الصفحة تستخدم لإدارة المجموعات
              </p>
          </Card>
          <Card title="المجموعات">

          <GroupsTable/>
          </Card>
      </div>
  );
};

export default TaskPage;
