import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
// app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connected..!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("app listen on port 5000...! ");
});

// app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal serval Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
