import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditPage() {
  const navigate = useNavigate();

  const { taskId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/task/taskDetails/${taskId}`
        );
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleToggle = () => {
    const newStatus = status === "completed" ? "pending" : "completed";
    setStatus(newStatus);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/task/editTask/${taskId}`, {
        title,
        description,
        status,
      });
      toast.success("Task updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error occurred on update", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <div className="bg-white shadow p-4 py-8">
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">
          Edit Task
        </div>
        <div className="w-10/12 mx-auto my-8 bg-white border rounded p-4 shadow-md max-w-2xl">
          <input
            className="w-full p-2 mb-4 border border-gray-300 outline-none"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-3 h-40 border border-gray-300 outline-none"
            placeholder="Describe everything about this task here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="text-gray-400 text-xs font-semibold">0/300</div>
          <div className="flex justify-end mt-3">
            <div className="flex flex-row gap-3">
              <p>Mark this box if your task is completed</p>
              <div className="me-4">
                <input
                  type="checkbox"
                  id="statusCheckbox"
                  checked={status === "completed"}
                  onChange={handleToggle}
                  className="hidden"
                />
                <label
                  htmlFor="statusCheckbox"
                  className={`${
                    status === "completed" ? "bg-green-500" : "bg-red-500"
                  } me-3 mx-3 w-8 h-4 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out`}
                >
                  <span
                    className={`${
                      status === "completed" ? "translate-x-4" : "translate-x-0"
                    } inline-block w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out`}
                  ></span>
                </label>
                <span className="ml-2 text-sm text-gray-600">
                  {status === "completed" ? "Completed" : "Pending"}
                </span>
              </div>
            </div>
            <div
              onClick={handleUpdate}
              className="p-1 px-4 font-semibold cursor-pointer text-white bg-indigo-500 uppercase"
            >
              Update
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
