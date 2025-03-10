import { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";

const TaskForm = ({ onClose, task = null }) => {
  const { dispatch } = useContext(TaskContext);
  const isEditing = !!task;

  const [taskData, setTaskData] = useState(
    task || { title: "", description: "", dueDate: "", status: "Pending" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.dueDate) return alert("Title and Due Date are required");

    if (isEditing) {
      dispatch({ type: "EDIT_TASK", payload: taskData });
    } else {
      dispatch({ type: "ADD_TASK", payload: { ...taskData, id: Date.now() } });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            className="border p-2 rounded"
          ></textarea>
          <input
            type="date"
            value={taskData.dueDate}
            onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <select
            value={taskData.status}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {isEditing ? "Save Changes" : "Add Task"}
          </button>
          <button type="button" onClick={onClose} className="text-gray-600 mt-2 hover:underline">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
