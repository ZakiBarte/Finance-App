import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard/dashboard";
import { useAuthStore } from "./store/authStore";

function RequireAuth({ children }) {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname.endsWith("/register");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => navigate("/login")}
            className={`px-4 py-2 rounded-md font-semibold ${
              !isRegister ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className={`px-4 py-2 rounded-md font-semibold ${
              isRegister ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;