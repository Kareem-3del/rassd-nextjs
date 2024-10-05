
import CreateTaskForm, {TasksTable} from "./create-task.form";

const TaskPage = async () => {
  return (
      <div>
        <CreateTaskForm
        />
        <TasksTable/>
      </div>
  );
};

export default TaskPage;
