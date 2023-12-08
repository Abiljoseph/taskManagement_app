import React, { useState, useEffect } from "react";

function useTheme() {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "light");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return {
    theme,
    toggleTheme,
  };
}

export default useTheme;
