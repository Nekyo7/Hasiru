import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Navigation } from "./Navigation";
import { getNextRoute, hasCompletedSetup, isAuthenticated } from "../utils/auth";

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user needs to complete setup flow
    // Skip redirect on setup pages and landing page
    const setupPages = ["/login", "/location-setup", "/chc-selection", "/"];
    const isOnSetupPage = setupPages.includes(location.pathname);

    if (!isOnSetupPage) {
      // If trying to access protected pages without setup, redirect
      if (!isAuthenticated()) {
        navigate("/login", { replace: true });
        return;
      }

      if (!hasCompletedSetup()) {
        const nextRoute = getNextRoute();
        if (nextRoute !== location.pathname) {
          navigate(nextRoute, { replace: true });
        }
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Outlet />
    </div>
  );
}
