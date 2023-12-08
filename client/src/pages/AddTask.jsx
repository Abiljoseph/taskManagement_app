import React from "react";
import TaskForm from "../components/TaskForm";
import { useSelector } from "react-redux";

export default function AddTask() {
  return (
    <div>
      <div className="bg-white shadow p-4 py-8" x-data="{ images: [] }">
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">
          New Task
        </div>
        <TaskForm />
      </div>
    </div>
  );
}
