import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TaskForm({ user }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Please provide a title and description.");
      return;
    }
    try {
      const response = await axios.post("/api/task/addTask", {
        title,
        description,
        userId: currentUser._id,
      });
      toast.success("Task Added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTitle("");
      setDescription("");
      setSuccess("Task submitted successfully!");
      setError("");
      navigate("/");
    } catch (error) {
      console.error("Error submitting task:", error.message);
      setError("An error occurred while submitting the task.");
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
    <>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this task here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="count ml-auto text-gray-400 text-xs font-semibold">
          0/300
        </div>
        <div class="buttons flex justify-end mt-3">
          <div
            onClick={handleSubmit}
            class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 uppercase"
          >
            Create
          </div>
        </div>
      </div>
    </>
  );
}
