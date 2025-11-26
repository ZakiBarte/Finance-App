import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/finance", expenseRoutes);
app.use("/api/finance", expenseRoutes);

export default app;
