import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      set({ user: data, loading: false });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      set({ user: data, loading: false });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
  updateUser: async (payload) => {
    set({ loading: true, error: null });
    try {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      const headers = { "Content-Type": "application/json" };
      if (user) headers.Authorization = `Bearer ${user.token}`;
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      set({ user: data, loading: false });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  // Clear error message
  clearError: () => set({ error: null }),
}));
