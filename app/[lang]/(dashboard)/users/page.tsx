"use client";

import CreateUserDialog from "@/app/[lang]/(dashboard)/users/create-user";
import UsersTable from "@/app/[lang]/(dashboard)/users/users-table";
import { Card } from "@/components/ui/card";
import { useUsers } from "@/hooks/useUsers";
import { useEffect } from "react";

const TaskPage = () => {
    const usersHook = useUsers()
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4 flex justify-between items-center">
        <CreateUserDialog {...usersHook}/>
        <p className="w-full text-center">
          هذه الصفحة تستخدم لإدارة المستخدمين والمهام
        </p>
      </Card>
      <Card title="المستخدمين">
        <UsersTable {...usersHook}/>
      </Card>
    </div>
  );
};

export default TaskPage;
