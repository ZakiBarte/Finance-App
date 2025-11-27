import { create } from "zustand";

export const useExpenseStore = create((set) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async () => {
    set({ loading: true });
    try {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      const activeTeam = JSON.parse(localStorage.getItem("activeTeam")) || null;
      const url = activeTeam ? `http://localhost:5000/api/finance?teamId=${activeTeam._id}` : "http://localhost:5000/api/finance";
      const res = await fetch(url, {
        headers: user ? { Authorization: `Bearer ${user.token}` } : {},
      });
      const data = await res.json();
      set({ expenses: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addExpense: async ({ title, price, category, date, teamId = null }) => {
    set({ loading: true });
    try {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      const headers = { "Content-Type": "application/json" };
      if (user) headers.Authorization = `Bearer ${user.token}`;
      const res = await fetch("http://localhost:5000/api/finance", {
        method: "POST",
        headers,
        body: JSON.stringify({ title, price, category, date, teamId }),
      });
      const data = await res.json();
      set((state) => ({ expenses: [...state.expenses, data], loading: false }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteExpense: async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      const headers = {};
      if (user) headers.Authorization = `Bearer ${user.token}`;
      await fetch(`http://localhost:5000/api/finance/${id}`, {
        method: "DELETE",
        headers,
      });
      set((state) => ({
        expenses: state.expenses.filter((e) => e._id !== id),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateExpense: async (id, dataObj) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      const headers = { "Content-Type": "application/json" };
      if (user) headers.Authorization = `Bearer ${user.token}`;
      const res = await fetch(`http://localhost:5000/api/finance/${id}`, {
        method: "PUT",
        headers,
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
  fetchSummary: async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      const headers = {};
      const activeTeam = JSON.parse(localStorage.getItem("activeTeam")) || null;
      if (user) headers.Authorization = `Bearer ${user.token}`;
      const url = activeTeam ? `http://localhost:5000/api/finance/summary?teamId=${activeTeam._id}` : "http://localhost:5000/api/finance/summary";
      const res = await fetch(url, { headers });
      const data = await res.json();
      return data;
    } catch (err) {
      set({ error: err.message });
      return null;
    }
  },
}));
