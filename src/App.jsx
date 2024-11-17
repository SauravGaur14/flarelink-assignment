import { useEffect, useState } from "react";
import { useTasks } from "./context/TaskContext";
import TaskList from "./components/TaskList";
import SortIcon from "./assets/sort.svg";
import AddIcon from "./assets/add.svg";
import FormModal from "./components/FormModal";
import Count from "./components/Count";
import updateLocalStorage from "./util/persistData";

function App() {
  const [search, setSearch] = useState("");
  const [searchTaskList, setSearchTaskList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");

  const [taskList, setTaskList] = useTasks();

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
    setTaskList(savedTask);
  }, []);

  // Update counts whenever the task list changes
  useEffect(() => {
    setTotalCount(taskList.length);
    setPendingCount(taskList.filter((task) => !task.completed).length);
    setCompletedCount(taskList.filter((task) => task.completed).length);
  }, [taskList]);

  // Update search results whenever the search term or task list changes
  useEffect(() => {
    searchTaskHandler();
  }, [search, taskList]);

  function searchTaskHandler() {
    const filteredTasks = taskList.filter(
      (t) =>
        t.task.toLowerCase().includes(search.toLowerCase()) ||
        t.title.toLowerCase().includes(search.toLowerCase()),
    );
    setSearchTaskList(filteredTasks);
  }

  function sortTaskHandler() {
    const sortedTask = [...taskList].sort((t1, t2) =>
      sortOrder === "desc"
        ? t2.priority - t1.priority
        : t1.priority - t2.priority,
    );
    setTaskList(sortedTask);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    updateLocalStorage("tasks", sortedTask);
  }

  return (
    <div className="roboto-slab flex min-h-screen w-full flex-col items-center bg-amber-300 p-5">
      <div className="my-5 w-full text-center text-5xl font-semibold text-black">
        Task Manager
      </div>
      <p className="w-full pl-14 text-left text-3xl font-semibold text-black">
        Welcome Back!
      </p>
      <div className="mt-2 flex w-11/12 flex-col rounded-xl bg-fuchsia-200 p-10 shadow-2xl">
        <div className="mb-20 flex w-full flex-wrap items-center justify-center gap-3 sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Count label="Total" count={totalCount} />
            <Count label="Completed" count={completedCount} />
            <Count label="Pending" count={pendingCount} />
          </div>
          <div
            className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#EDEBFB] px-4 py-2 text-xl font-medium text-[#402CD2] transition-shadow hover:shadow-2xl"
            onClick={() => setOpenModal(!openModal)}
          >
            <img src={AddIcon} height={35} width={35} alt="" />
            <span>Add Task</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between rounded-lg border border-gray-400 p-3">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <label className="text-xl font-medium" htmlFor="Search">
              Search
            </label>
            <input
              className="min-w-64 rounded-xl bg-gray-100 p-1 py-2 pl-3 font-medium outline-none"
              type="text"
              value={search}
              label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            className="cursor-pointer transition-transform hover:scale-95 hover:shadow-2xl"
            onClick={sortTaskHandler}
          >
            <img src={SortIcon} height={32} width={32} alt="Sort" />
          </div>
        </div>
        {openModal && <FormModal setOpenModal={setOpenModal} />}
        {search?.length > 0 ? (
          searchTaskList?.length > 0 ? (
            <TaskList tasks={searchTaskList} />
          ) : (
            <p className="mt-3 font-medium text-gray-700">
              No tasks found for the search query.
            </p>
          )
        ) : taskList?.length > 0 ? (
          <TaskList tasks={taskList} />
        ) : (
          <p className="mt-10 text-xl font-medium text-gray-900">
            No tasks available. Add a new task to get started!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
