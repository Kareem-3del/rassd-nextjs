"use client";
import SectionHeader, { SectionTitle } from "../_components/section-header";
import { VisitsFilter } from "@/components/visits-filter";
import { CompletedForms } from "./_components/completed-tasks";
import { useEffect, useState } from "react";
import useTasks from "@/hooks/useTasks";
import { TaskStatusEnum } from "@/interfaces";
import { GroupType } from "@/rassd/types";

const CompletedFormsPage = () => {
  const [filter, setFilter] = useState({
    "field-visit": false,
    "secret-visit": false,
  });

  const { tasks, fetchComplitedTasks } = useTasks();

  useEffect(() => {
    fetchComplitedTasks();
  }, []);

  console.log(tasks);
  const completedTasks = tasks?.filter((task) => {
    return (
      task.status === TaskStatusEnum.Completed &&
      (filter["field-visit"]
        ? task.department.group.type === GroupType.FIELD_VISIT
        : true) &&
      (filter["secret-visit"]
        ? task.department.group.type === GroupType.SECRET_VISIT
        : true)
    );
  });
console.log(tasks)
  return (
    <div>
      <div className="flex justify-between items-center">
        <SectionHeader>
          <SectionTitle>"قائمة الاستمارات المكتملة"</SectionTitle>
        </SectionHeader>
        <VisitsFilter onFilterChanged={setFilter} />
      </div>
      {tasks?.length && tasks?.length > 0 ? (
        <CompletedForms tasks={completedTasks} />
      ) : (
        <div className="text-center">لا توجد استمارات مكتملة</div>
      )}
    </div>
  );
};

export default CompletedFormsPage;
