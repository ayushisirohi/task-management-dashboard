import { useContext, useRef, useState } from "react";
import TaskContext from "../context/TaskContext";
import { useDrag, useDrop } from "react-dnd";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import TaskForm from "./TaskForm";

const statusColors = {
  Pending: "border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-300",
  "In Progress": "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-800 dark:text-blue-300",
  Completed: "border-green-500 bg-green-50 text-green-800 dark:bg-green-800 dark:text-green-300",
};

const TaskCard = ({ task }) => {
  const { dispatch } = useContext(TaskContext);
  const ref = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (draggedTask) => {
      if (draggedTask.id !== task.id && draggedTask.status !== task.status) {
        dispatch({ type: "EDIT_TASK", payload: { ...draggedTask, status: task.status } });
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { ...task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setShowEditModal(true);
  };

  return (
    <>
      <div
        ref={ref}
        onClick={handleClick}
        className={`p-5 border-l-4 shadow-md rounded-xl transition hover:scale-105 cursor-pointer flex justify-between items-start ${
          isDragging ? "opacity-50" : statusColors[task.status]
        }`}
      >
        <div className="w-full">
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-500 dark:text-gray-300 truncate">{task.description}</p>
          <p className="text-sm font-medium">Due: {task.dueDate}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); setShowEditModal(true); }} className="text-blue-500 hover:text-blue-700">
            <PencilIcon className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setShowDeleteModal(true); }} className="text-red-500 hover:text-red-700">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      {showEditModal && <TaskForm task={task} onClose={() => setShowEditModal(false)} />}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Delete Task</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
