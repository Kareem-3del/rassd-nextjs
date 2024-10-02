"use client"
import { useGroups } from "@/rassd/hooks/useGroups";
import CreateGroupDialog from "./create-group";
import GroupsTable from "./groups-table";
import { Card } from "@/components/ui/card";

const TaskPage =  () => {
    const groupHook= useGroups()
    return (
      <div className="flex flex-col gap-4">
          <Card className="p-4 flex justify-between items-center">
              <CreateGroupDialog createGroup={groupHook.createGroup}/>
              <p className="w-full text-center">
                    هذه الصفحة تستخدم لإدارة المجموعات
              </p>
          </Card>
          <Card title="المجموعات">

          <GroupsTable {...groupHook}/>
          </Card>
      </div>
  );
};

export default TaskPage;
