import { useState } from "react";

import Input from "./Input";
import { useTasks } from "../context/TaskContext";
import persistData from "../util/persistData";

export default function FormModal({ setOpenModal }) {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");

  const [taskList, setTaskList] = useTasks();

  function addTaskHandler(e) {
    e.preventDefault();
    if (task.length <= 0 || title.length < 1) {
      alert("Fill out both fields");
      return;
    }
    const newTask = {
      task,
      title,
      priority: +priority,
      completed: false,
      createdAt: Date.now(),
    };
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    persistData("tasks", updatedTaskList);
    setTask("");
    setTitle("");
    setOpenModal(false);
  }

  function closeModalHandler() {
    setOpenModal(false);
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-500 bg-opacity-50">
      <form className="flex w-[80%] flex-col flex-wrap items-center justify-between gap-5 rounded-lg bg-white p-10 shadow-lg lg:w-[35%]">
        <p className="text-3xl font-semibold text-black">Create Task</p>
        <Input
          value={title}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
          flexdirection="col"
        />
        <Input
          value={task}
          label="Task"
          onChange={(e) => setTask(e.target.value)}
          flexdirection="col"
        />
        <div className="flex w-full flex-col gap-3 text-black">
          <label className="text-xl font-medium" htmlFor="Priority">
            Priority
          </label>
          <select
            className="rounded-xl bg-gray-100 p-1 py-2 pl-3 font-medium outline-none"
            name="priority"
            id="priority"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 w-full justify-around">
          <div
            className="transform-none cursor-pointer rounded-lg bg-green-500 px-7 py-2 text-lg outline-none transition-transform hover:scale-105"
            onClick={addTaskHandler}
          >
            Add
          </div>
          <div
            onClick={closeModalHandler}
            className="transform-none cursor-pointer rounded-md bg-red-500 px-5 py-2 text-lg outline-none transition-transform hover:scale-105"
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
}
