import Expense from "../models/Expense.js";

// GET summary: monthly totals, category totals, recent transactions
export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Monthly totals
    const monthly = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$price" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Category totals
    const byCategory = await Expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$category", total: { $sum: "$price" } } },
      { $sort: { total: -1 } },
    ]);

    // Recent transactions
    const recent = await Expense.find({ user: userId })
      .sort({ date: -1 })
      .limit(8);

    res.json({ monthly, byCategory, recent });
  } catch (error) {
    console.error("Get summary error:", error);
    res.status(500).json({ error: "Summary failed" });
  }
};

// GET all expenses
export const getExpenses = async (req, res) => {
  try {
    // Return only expenses belonging to the authenticated user
    const expenses = await Expense.find({ user: req.user._id });
    return res.json(expenses || []);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST new expense
export const createExpense = async (req, res) => {
  const { title, price, category, date } = req.body;
  try {
    // If an expense with the same title exists for this user, update it for that user
    const existing = await Expense.findOne({ title, user: req.user._id });
    if (existing) {
      existing.price = Number(price);
      existing.category = category || existing.category;
      existing.date = date ? new Date(date) : existing.date;
      await existing.save();
      return res.json(existing);
    }

    const newExpense = new Expense({
      title,
      price,
      category,
      date: date ? new Date(date) : undefined,
      user: req.user._id,
    });
    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    console.error("Create expense error:", error);
    res.status(500).json({ error: "Creation failed" });
  }
};

// DELETE expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ error: "Not found" });
    if (expense.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Forbidden" });
    const deletedExpense = await Expense.findByIdAndDelete(id);
    res.json(deletedExpense);
  } catch (error) {
    console.error("Delete expense error:", error);
    res.status(500).json({ error: "Delete failed" });
  }
};

// UPDATE expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ error: "Not found" });
    if (expense.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Forbidden" });
    const data = req.body;
    if (data.date) data.date = new Date(data.date);
    const updatedExpense = await Expense.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updatedExpense);
  } catch (error) {
    console.error("Update expense error:", error);
    res.status(500).json({ error: "Update failed" });
  }
};
