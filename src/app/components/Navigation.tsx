import { Link, useLocation } from "react-router";
import { Tractor, Map, LayoutDashboard, Plus } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === "/";

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
              to="/discover"
              className={`flex items-center gap-2 transition-colors ${
                isHome ? "text-white hover:text-secondary" : "text-foreground hover:text-primary"
              }`}
            >
              <span>Find Equipment</span>
            </Link>
            <Link
              to="/map"
              className={`flex items-center gap-2 transition-colors ${
                isHome ? "text-white hover:text-secondary" : "text-foreground hover:text-primary"
              }`}
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Map</span>
            </Link>
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 transition-colors ${
                isHome ? "text-white hover:text-secondary" : "text-foreground hover:text-primary"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
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
