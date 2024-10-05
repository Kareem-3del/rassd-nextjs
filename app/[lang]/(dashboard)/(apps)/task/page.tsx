"use strict";
import { getTasks } from "@/config/project-config";
import ViewTask from "./view-task";

const TaskPage = async () => {
  const tasks = await getTasks();
  const contacts : any = [];

  return (
      <ViewTask contacts={contacts} tasks={tasks} />
  );
};

export default TaskPage;
