import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks] = useTasks();
  return (
    <div>
      <div className="mb-4 flex w-full justify-between text-2xl">
        <div>Title</div>
        <div>Task</div>
      </div>
      {tasks.length > 0 &&
        tasks.map((task) => <TaskItem key={task.createdAt} task={task} />)}
    </div>
  );
}
