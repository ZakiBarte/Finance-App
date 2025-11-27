import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Expense", expenseSchema);
