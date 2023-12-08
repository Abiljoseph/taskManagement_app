import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Login";
import AddTask from "./pages/AddTask";
import EditPage from "./pages/EditPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/edit-task/:taskId" element={<EditPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
