import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import TaskContextProvider, { useTasks } from "./context/TaskContext";
import TaskList from "./components/TaskList";

function App() {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  const [taskList, setTaskList] = useTasks();

  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("saved tasks in the localstorage", savedTask);
    setTaskList(savedTask);
  }, []);

  function addTaskHandler(e) {
    e.preventDefault();
    if (task.length <= 0 || title.length < 1) alert("Fill out both fields");
    console.log("new task", title, task);
    const newTask = {
      task,
      title,
      createdAt: Date.now(),
    };
    setTaskList([...taskList, newTask]);
    setTask("");
    setTitle("");
  }
  useEffect(() => {
    if (taskList?.length <= 0) return;
    console.log("setting the localstorage", taskList);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className="min-h-screen w-full bg-[#123] p-4">
      <h1>Task Magager</h1>

      <form className="my-28 flex w-full flex-wrap items-center justify-between border">
        <Input
          value={title}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          value={task}
          label="Task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTaskHandler}>Add</button>
      </form>

      {taskList?.length > 0 && <TaskList />}
    </div>
  );
}

export default App;
