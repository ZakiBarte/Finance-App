import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function Register({ onSwitch }) {
  const { register, loading, error } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearError = useAuthStore((s) => s.clearError);

  useEffect(() => {
    if (user) navigate("/dashboard");
    clearError();
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            {loading ? "Loading..." : "Register"}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            className="text-yellow-500 font-semibold underline"
            onClick={() => {
              if (onSwitch) onSwitch();
              else navigate("/login");
            }}
          >
            Login
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
