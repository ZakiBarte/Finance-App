import Expense from "../models/Expense.js";

// GET all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    // Always return an array (empty if none) to simplify frontend handling
    return res.json(expenses || []);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST new expense
export const createExpense = async (req, res) => {
  const { title, price, category, date } = req.body;
  try {
    const existing = await Expense.findOne({ title });
    if (existing) {
      existing.price = Number(price);
      existing.category = category || existing.category;
      existing.date = date ? new Date(date) : existing.date;
      await existing.save();
      return res.json(existing);
    }

    const newExpense = new Expense({ title, price, category, date: date ? new Date(date) : undefined });
    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ error: "Creation failed" });
  }
};

// DELETE expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    res.json(deletedExpense);
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ error: "Delete failed" });
  }
};

// UPDATE expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.date) data.date = new Date(data.date);
    const updatedExpense = await Expense.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ error: "Update failed" });
  }
};
