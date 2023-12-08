import express from "express";
import {
  createTask,
  editTask,
  getTaskById,
  getTasksByUser,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/addTask", createTask);
router.put("/editTask/:taskId", editTask);
router.get("/getAllTask/:userId", getTasksByUser);
router.get("/taskDetails/:taskId", getTaskById);

export default router;
