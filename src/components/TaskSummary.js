import { useContext } from "react";
import TaskContext from "../context/TaskContext";
import { ClockIcon, LightningBoltIcon, CheckCircleIcon } from "@heroicons/react/solid";

const TaskSummary = () => {
  const { tasks } = useContext(TaskContext);

  const pendingCount = tasks.filter(task => task.status === "Pending").length;
  const inProgressCount = tasks.filter(task => task.status === "In Progress").length;
  const completedCount = tasks.filter(task => task.status === "Completed").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 text-sm transition-all">
      <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-300 justify-center sm:justify-start">
        <ClockIcon className="w-5 h-5" />
        <span className="font-semibold">{pendingCount}</span>
        <span className="text-gray-500 dark:text-gray-400">Pending</span>
      </div>
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-300 justify-center sm:justify-start">
        <LightningBoltIcon className="w-5 h-5" />
        <span className="font-semibold">{inProgressCount}</span>
        <span className="text-gray-500 dark:text-gray-400">In Progress</span>
      </div>
      <div className="flex items-center gap-2 text-green-600 dark:text-green-300 justify-center sm:justify-start">
        <CheckCircleIcon className="w-5 h-5" />
        <span className="font-semibold">{completedCount}</span>
        <span className="text-gray-500 dark:text-gray-400">Completed</span>
      </div>
    </div>
  );
};

export default TaskSummary;
