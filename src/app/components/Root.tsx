import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Navigation } from "./Navigation";
import { getNextRoute, hasCompletedSetup } from "../utils/auth";
import { useAuth } from "../contexts/AuthContext";

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Check if user needs to complete setup flow
    // Skip redirect on setup pages and landing page
    const setupPages = ["/login", "/chc-selection", "/signup", "/"];
    const isOnSetupPage = setupPages.includes(location.pathname);

    if (!isOnSetupPage) {
      // If trying to access protected pages without setup, redirect
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
        return;
      }

      const nextRoute = getNextRoute();
      if (!hasCompletedSetup()) {
        if (nextRoute !== location.pathname) {
          navigate(nextRoute, { replace: true });
        }
      }
    }
  }, [location.pathname, navigate, isAuthenticated, isLoading]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Outlet />
    </div>
  );
}
