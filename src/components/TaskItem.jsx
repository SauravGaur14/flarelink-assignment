import { useTasks } from "../context/TaskContext";
import DeleteIcon from "../assets/delete.svg";
import persistData from "../util/persistData";

export default function TaskItem({ task }) {
  const [taskList, setTaskList] = useTasks();

  function taskStatusChangeHandler() {
    let updatedTaskList = taskList.map((t) =>
      task.createdAt === t.createdAt ? { ...t, completed: !t.completed } : t,
    );
    setTaskList(updatedTaskList);
    persistData("tasks", updatedTaskList);
  }

  function deleteTaskHandler() {
    const updatedTaskList = taskList.filter(
      (t) => task.createdAt !== t.createdAt,
    );
    setTaskList(updatedTaskList);
    persistData("tasks", updatedTaskList);
  }

  return (
    <div
      className={`my-5 flex w-full flex-col items-center justify-between rounded-lg border border-b border-l-4 border-gray-200 bg-white p-3 shadow-xl sm:flex-row ${
        task.completed ? "border-l-green-600" : "border-l-red-600"
      }`}
    >
      <div className="flex w-full flex-col sm:w-2/3 sm:items-start">
        <div className="text-lg font-medium text-black">{task.title}</div>
        <p className="mt-2 text-gray-700">{task.task}</p>
      </div>

      <div className="mt-4 flex w-full gap-6 sm:mt-0 sm:w-1/3 items-center sm:justify-end">
        <input
          className="h-5 w-5"
          type="checkbox"
          checked={task.completed}
          onChange={taskStatusChangeHandler}
        />
        <div
          className={`w-16 rounded px-2 py-1 text-center text-xs font-semibold text-white ${
            task.priority === 3
              ? "bg-red-500"
              : task.priority === 2
                ? "bg-yellow-400"
                : "bg-green-500"
          }`}
        >
          {task.priority === 3
            ? "High"
            : task.priority === 2
              ? "Medium"
              : "Low"}
        </div>
        <div className="cursor-pointer hover:scale-95 transition-transform hover:shadow-2xl" onClick={deleteTaskHandler}>
          <img src={DeleteIcon} alt="Delete" />
        </div>
      </div>
    </div>
  );
}
