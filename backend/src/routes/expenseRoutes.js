import express from "express";
import {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getSummary,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All finance routes require authentication and are scoped to the user
router.get("/", protect, getExpenses);
router.get("/summary", protect, getSummary);
router.post("/", protect, createExpense);
router.delete("/:id", protect, deleteExpense);
router.put("/:id", protect, updateExpense);

export default router;
