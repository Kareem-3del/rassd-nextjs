"use strict";


import CreateTaskForm from "./create-task.form";

const TaskPage = async () => {

  return (
      <div>
        <h1>My Tasks</h1>
        <CreateTaskForm/>
      </div>
  );
};

export default TaskPage;
