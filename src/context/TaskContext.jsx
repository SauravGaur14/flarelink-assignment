import { createContext, useContext, useState } from "react";

const TaskContext = createContext([]);

export default function TaskContextProvider({ children }) {
  const [taskList, setTaskList] = useState([]);
  return (
    <TaskContext.Provider value={[taskList, setTaskList]}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Context must be consumed within the scope");
  }
  return context;
}
