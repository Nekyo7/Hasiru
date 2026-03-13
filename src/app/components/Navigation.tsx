import { Link, useLocation } from "react-router";
import { Tractor, Map, LayoutDashboard, Plus, Building2, BookOpen, User, LogOut } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 transition-all ${
      isHome ? "bg-transparent absolute w-full" : "bg-card shadow-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary rounded-lg p-2 group-hover:scale-105 transition-transform">
              <Tractor className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className={`text-xl font-semibold ${
              isHome ? "text-white" : "text-foreground"
            }`}>
              FarmShare
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`transition-colors ${
                isHome ? "text-white hover:text-secondary" : "text-foreground hover:text-primary"
              }`}
            >
              <span>Home</span>
            </Link>
            <Link
              to="/chc-centers"
              className={`flex items-center gap-2 transition-colors ${
                isHome ? "text-white hover:text-secondary" : "text-foreground hover:text-primary"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">CHC Centers</span>
            </Link>
            <Link
              to="/discover"
              className={`flex items-center gap-2 transition-colors ${
                isHome ? "text-white hover:text-secondary" : "text-foreground hover:text-primary"
              }`}
            >
              <span>Find Equipment</span>
            </Link>
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 transition-colors ${
                isHome ? "text-white hover:text-secondary" : "text-foreground hover:text-primary"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">My Bookings</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isHome 
                    ? "text-white hover:bg-white/10" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors text-foreground text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("userInfo");
                      localStorage.removeItem("userLocation");
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors text-foreground text-sm border-t border-border"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link
              to="/list-equipment"
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              <span>List Machine</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
