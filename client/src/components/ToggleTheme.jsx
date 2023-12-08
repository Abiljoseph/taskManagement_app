// ToggleTheme.js
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-row">
      <p>{theme}</p>
      <button
        className={`bg-${theme === "light" ? "white" : "gray-800"} text-${
          theme === "light" ? "black" : "white"
        }`}
        onClick={toggleTheme}
      >
        {theme === "light" ? <CiLight /> : <CiDark />}
      </button>
    </div>
  );
};

export default ToggleTheme;
