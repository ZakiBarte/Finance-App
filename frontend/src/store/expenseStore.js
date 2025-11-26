import { create } from "zustand";

export const useExpenseStore = create((set) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async () => {
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:5000/api/finance");
      const data = await res.json();
      set({ expenses: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addExpense: async ({ title, price, category, date }) => {
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:5000/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price, category, date }),
      });
      const data = await res.json();
      set((state) => ({ expenses: [...state.expenses, data], loading: false }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteExpense: async (id) => {
    try {
      await fetch(`http://localhost:5000/api/finance/${id}`, { method: "DELETE" });
      set((state) => ({
        expenses: state.expenses.filter((e) => e._id !== id),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateExpense: async (id, dataObj) => {
    try {
      const res = await fetch(`http://localhost:5000/api/finance/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });
      const data = await res.json();
      set((state) => ({
        expenses: state.expenses.map((e) => (e._id === id ? data : e)),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));
