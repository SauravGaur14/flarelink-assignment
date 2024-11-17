import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  return (
    <div>
      {tasks.length > 0 &&
        tasks.map((task) => <TaskItem key={task.createdAt} task={task} />)}
    </div>
  );
}
