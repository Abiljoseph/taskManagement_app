import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableFilter from "../components/TableFilter";
import Modal from "../components/TaskDetails";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;

  const [alltask, setAllTask] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/task/getAllTask/${userId}`);
        const data = response.data;
        setAllTask(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex gap-2 border border-r">
        <div className="w-3/4 mx-5 my-5 grid grid-cols-3 gap-3">
          {alltask.length > 0 ? (
            alltask.map((task, index) => (
              <div
                className="container mx-auto mb-3"
                key={task.id}
                onClick={() => handleTaskClick(task)}
              >
                <div className="bg-white max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
                  <div
                    className={`h-20 ${
                      task.status === "pending"
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    } flex items-center justify-between`}
                  >
                    <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
                      {index + 1}
                    </h1>
                    <p className="mx-5 text-white text-lg">{task.title}</p>
                    <p className="mr-4 text-white font-thin text-lg">
                      {task.status}
                    </p>
                  </div>

                  <p className="py-6 text-lg tracking-wide ml-16">
                    {task.description.split(" ").slice(0, 5).join(" ")}....
                  </p>
                  <hr />
                  <div className="flex justify-between px-5 mb-2 text-sm text-gray-600">
                    <p>Last Update</p>
                    <p>{new Date(task.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-bold text-2xl text-gray-500 mt-10">
              You haven't been assigned any tasks yet
            </p>
          )}
        </div>

        <div className="w-1/4 me-5">
          <TableFilter />
        </div>
      </div>

      {isModalOpen && selectedTask && (
        <Modal onClose={closeModal} data={selectedTask}></Modal>
      )}
    </>
  );
}
