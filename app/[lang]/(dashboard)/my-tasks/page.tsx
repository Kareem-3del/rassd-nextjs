"use strict";


import CreateTaskForm from "@/app/[lang]/(dashboard)/my-tasks/create-task.form";

const TaskPage = async () => {

  return (
      <div>
        <h1>My Tasks</h1>
        <CreateTaskForm/>
      </div>
  );
};

export default TaskPage;
