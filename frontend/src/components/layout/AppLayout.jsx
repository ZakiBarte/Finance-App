import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-toggle";
import { useAuthStore } from "../../store/authStore";
import { Menu, X, LogOut } from "lucide-react";

export default function AppLayout({ children }) {
  const { logout } = useAuthStore();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Expenses", path: "/expenses" },
    { name: "Profile", path: "/profile" },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <div className="w-full md:hidden flex items-center justify-between p-3 bg-card shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">Finance App</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" onClick={logout} className="p-2">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Sidebar desktop */}
      <aside className="w-64 bg-card shadow-md p-4 hidden md:block">
        <h1 className="text-2xl font-bold mb-6">Finance App</h1>

        <nav className="flex flex-col space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded 
                ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-col gap-3">
          <div>
            <ModeToggle />
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Mobile overlay sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-card p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              {menu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2 rounded ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex items-center gap-3">
              <ModeToggle />
              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
