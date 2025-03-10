import { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ArrowUpIcon, ArrowDownIcon, SwitchVerticalIcon } from "@heroicons/react/solid";

const CompletedTasks = () => {
  const { tasks } = useContext(TaskContext);
  const [sortOrder, setSortOrder] = useState("default");

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => 
      prevOrder === "default" ? "asc" : prevOrder === "asc" ? "desc" : "default"
    );
  };

  const getSortedTasks = () => {
    let completedTasks = tasks.filter(task => task.status === "Completed");

    if (sortOrder === "asc") {
      return completedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOrder === "desc") {
      return completedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }
    
    return completedTasks;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-700">Completed Tasks</h2>
          <button 
            onClick={toggleSortOrder} 
            className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Sort by Due Date
            {sortOrder === "asc" ? <ArrowUpIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : 
             sortOrder === "desc" ? <ArrowDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : 
             <SwitchVerticalIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          </button>
        </div>

        {getSortedTasks().length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {getSortedTasks().map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No completed tasks yet.</p>
        )}
      </div>
    </DndProvider>
  );
};

export default CompletedTasks;
