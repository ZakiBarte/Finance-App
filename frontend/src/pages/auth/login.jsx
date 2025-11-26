import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function Login({ onSwitch }) {
  const { login, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearError = useAuthStore((s) => s.clearError);

  useEffect(() => {
    if (user) navigate("/dashboard");
    // Clear any previous auth errors when this component mounts or user changes
    clearError();
  }, [user, navigate, clearError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={loading} className="w-full">
            {loading ? "Loading..." : "Login"}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            className="text-yellow-500 font-semibold underline"
            onClick={() => {
              clearError();
              if (onSwitch) onSwitch();
              else navigate("/register");
            }}
          >
            Register
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
