import express from "express";
import { signIn, signOut, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signIn);
router.get("/signOut", signOut);

export default router;
