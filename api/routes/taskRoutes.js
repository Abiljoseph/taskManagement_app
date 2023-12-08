import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getTaskById,
  getTasksByUser,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/addTask", createTask);
router.put("/editTask/:taskId", editTask);
router.get("/getAllTask/:userId", getTasksByUser);
router.get("/taskDetails/:taskId", getTaskById);
router.delete("/deleteTask/:taskId", deleteTask);

export default router;
