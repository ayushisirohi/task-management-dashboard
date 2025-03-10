import { useContext, useState, useEffect } from "react";
import TaskContext from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskSummary from "../components/TaskSummary";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ArrowUpIcon, ArrowDownIcon, SwitchVerticalIcon } from "@heroicons/react/solid";

const AllTasks = () => {
  const { tasks, dispatch } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState({ Pending: "default", "In Progress": "default", Completed: "default" });

  useEffect(() => {
    setSortOrder({ Pending: "default", "In Progress": "default", Completed: "default" });
  }, [tasks.length]);

  const moveTask = (fromIndex, toIndex) => {
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(fromIndex, 1);
    newTasks.splice(toIndex, 0, movedTask);
    dispatch({ type: "REORDER_TASKS", payload: newTasks });
  };

  const toggleSortOrder = (status) => {
    setSortOrder((prevOrder) => ({
      ...prevOrder,
      [status]: prevOrder[status] === "default" ? "asc" : prevOrder[status] === "asc" ? "desc" : "default",
    }));
  };

  const getSortedTasks = (status) => {
    let sortedTasks = [...tasks].filter((task) => task.status === status);
    if (sortOrder[status] === "asc") {
      sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOrder[status] === "desc") {
      sortedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }
    return sortedTasks;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Task Management</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            + Add Task
          </button>
        </div>
        <TaskSummary />
        {showModal && <TaskForm onClose={() => setShowModal(false)} />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-xl shadow-lg border border-yellow-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">Pending</h3>
              <button onClick={() => toggleSortOrder("Pending")} className="text-yellow-600 dark:text-yellow-300">
                {sortOrder["Pending"] === "asc" ? <ArrowUpIcon className="w-5 h-5 inline" /> : 
                 sortOrder["Pending"] === "desc" ? <ArrowDownIcon className="w-5 h-5 inline" /> : 
                 <SwitchVerticalIcon className="w-5 h-5 inline" />}
              </button>
            </div>
            <div className="space-y-4">
              {getSortedTasks("Pending").length > 0 ? (
                getSortedTasks("Pending").map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} moveTask={moveTask} />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No pending tasks.</p>
              )}
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl shadow-lg border border-blue-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">In Progress</h3>
              <button onClick={() => toggleSortOrder("In Progress")} className="text-blue-600 dark:text-blue-300">
                {sortOrder["In Progress"] === "asc" ? <ArrowUpIcon className="w-5 h-5 inline" /> : 
                 sortOrder["In Progress"] === "desc" ? <ArrowDownIcon className="w-5 h-5 inline" /> : 
                 <SwitchVerticalIcon className="w-5 h-5 inline" />}
              </button>
            </div>
            <div className="space-y-4">
              {getSortedTasks("In Progress").length > 0 ? (
                getSortedTasks("In Progress").map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} moveTask={moveTask} />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No tasks in progress.</p>
              )}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-xl shadow-lg border border-green-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Completed</h3>
              <button onClick={() => toggleSortOrder("Completed")} className="text-green-600 dark:text-green-300">
                {sortOrder["Completed"] === "asc" ? <ArrowUpIcon className="w-5 h-5 inline" /> : 
                 sortOrder["Completed"] === "desc" ? <ArrowDownIcon className="w-5 h-5 inline" /> : 
                 <SwitchVerticalIcon className="w-5 h-5 inline" />}
              </button>
            </div>
            <div className="space-y-4">
              {getSortedTasks("Completed").length > 0 ? (
                getSortedTasks("Completed").map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} moveTask={moveTask} />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No completed tasks.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default AllTasks;
