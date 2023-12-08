import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signOutAccountError,
  signOutAccountStart,
  signOutAccountSuccess,
} from "../redux/slices/userSlice";
import ToggleTheme from "./ToggleTheme";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutAccountStart());
      const res = await fetch("http://localhost:5000/api/auth/signOut");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutAccountError(data.message));
        return;
      }
      dispatch(signOutAccountSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutAccountError(data.message));
    }
  };
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li className="button">
              <Link to="/add-task">
                <button>Add Task</button>
              </Link>
            </li>
            <Link to={"/"}>
              <li className="hover:text-gray-300 cursor-pointer">Home</li>
            </Link>
            <li className="hover:text-gray-300 cursor-pointer">Tasks</li>
            <li className="hover:text-gray-300 cursor-pointer">About</li>
            <li className="hover:text-gray-300 cursor-pointer">
              <ToggleTheme />
            </li>
            <li className="hover:text-gray-300 cursor-pointer">
              <span
                onClick={handleSignOut}
                className="text-red-700 cursor-pointer font-semibold"
              >
                Sign out
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
