import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { FaSort } from "react-icons/fa6";

export default function TableFilter() {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;

  const [filteredData, setFilteredData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/task/getAllTask/${userId}`);
        const data = response.data;

        const sortedData = sortBy
          ? [...data].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
          : data;

        const filteredTasks =
          filterStatus === "all"
            ? sortedData
            : sortedData.filter((task) => task.status === filterStatus);

        setFilteredData(filteredTasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, filterStatus, sortBy, filteredData]);

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const handleSort = (property) => {
    setSortBy(property);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/task/deleteTask/${taskId}`);

      setFilteredData((prevData) =>
        prevData.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-3 mt-5">
        <p className="flex flex-row gap-3">
          <FaFilter className="text-yellow-500" />
          Filter
        </p>
        <button onClick={() => handleFilter("completed")}>
          <span className="p-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Completed
          </span>
        </button>
        <button onClick={() => handleFilter("pending")}>
          <span className="p-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-red-800">
            Pending
          </span>
        </button>
        <button onClick={() => handleFilter("all")}>
          <span className="p-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-blue-800">
            All
          </span>
        </button>
        <div className="ml-3">
          <button onClick={() => handleSort("title")}>
            <span className="p-3 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-blue-800">
              <TiSortAlphabeticallyOutline />
            </span>
          </button>
          <button onClick={() => handleSort("status")}>
            <span className="p-3 mt-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-blue-800">
              <FaSort />
            </span>
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="items-center">
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((task, index) => (
            <tr key={task._id}>
              <td className="px-3 py-4 whitespace-nowrap">
                {task.title.split(" ").slice(0, 2).join(" ")}
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <Link to={`/edit-task/${task._id}`}>
                  <button className="px-3 py-2 font-medium text-white bg-yellow-500 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="ml-2 px-3 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
