import React from "react";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../../components/ui/button";

export default function Dashboard() {
  const { user, logout } = useAuthStore();

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.name || user?.email}
        </h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-700">Dashboard content will go here...</p>
      </div>
    </div>
  );
}
