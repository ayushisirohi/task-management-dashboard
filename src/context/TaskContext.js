import { createContext, useEffect, useReducer } from "react";

const loadTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const loadLastTaskId = () => {
  const lastId = localStorage.getItem("lastTaskId");
  return lastId ? parseInt(lastId, 10) : 0;
};

const taskReducer = (state, action) => {
  let updatedTasks;
  let newTaskId;

  switch (action.type) {
    case "ADD_TASK":
      newTaskId = loadLastTaskId() + 1;
      localStorage.setItem("lastTaskId", newTaskId);

      updatedTasks = [...state, { ...action.payload, id: newTaskId }];
      break;

    case "EDIT_TASK":
      updatedTasks = state.map((task) => (task.id === action.payload.id ? action.payload : task));
      break;

    case "DELETE_TASK":
      updatedTasks = state.filter((task) => task.id !== action.payload);
      break;

    case "REORDER_TASKS":
      updatedTasks = action.payload;
      break;

    default:
      return state;
  }
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  return updatedTasks;
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], loadTasks);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
