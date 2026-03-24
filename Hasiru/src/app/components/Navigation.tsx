import { Link, useLocation, useNavigate } from "react-router";
import { Tractor, LayoutDashboard, Plus, Building2, BookOpen, User, LogOut, UserCircle, Globe, Map } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { clearSetupSession } from "../utils/auth";
import { useLanguage } from "../contexts/LanguageContext";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { user, isAuthenticated, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const currentUser = user?.user_metadata || {};

  const handleLogout = async () => {
    await signOut();
    clearSetupSession();
    setShowDropdown(false);
    navigate("/login", { replace: true });
  };

  const currentHeaderTextColor = isHome ? "text-white" : "text-foreground";
  const currentHeaderHoverColor = isHome ? "hover:text-secondary" : "hover:text-primary";

  return (
    <nav className={`top-0 z-50 transition-all w-full ${
      isHome ? "bg-transparent absolute" : "bg-card shadow-sm sticky"
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
              Hasiru
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
                isHome 
                  ? "border-white/30 text-white hover:bg-white/10" 
                  : "border-border text-foreground hover:bg-muted"
              } text-sm font-medium`}
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'ಕನ್ನಡ' : 'English'}
            </button>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/chc-centers"
                className={`flex items-center gap-2 transition-colors ${currentHeaderTextColor} ${currentHeaderHoverColor}`}
              >
                <Building2 className="w-4 h-4" />
                <span>{t('nav.chcCenters')}</span>
              </Link>
              <Link
                to="/discover"
                className={`flex items-center gap-2 transition-colors ${currentHeaderTextColor} ${currentHeaderHoverColor}`}
              >
                <span>{t('nav.findEquipment')}</span>
              </Link>
              <Link
                to="/map"
                className={`flex items-center gap-2 transition-colors ${currentHeaderTextColor} ${currentHeaderHoverColor}`}
              >
                <Map className="w-4 h-4" />
                <span>{t('nav.mapView')}</span>
              </Link>
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 transition-colors ${currentHeaderTextColor} ${currentHeaderHoverColor}`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('nav.dashboard')}</span>
              </Link>
            </div>

            {/* Profile Dropdown */}
            {isAuthenticated ? (
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
                  <span className="hidden sm:inline text-sm truncate max-w-[100px]">
                    {currentUser?.name || t('nav.profile')}
                  </span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-lg border border-border overflow-hidden z-10">
                    {/* User Info */}
                    <div className="px-4 py-3 bg-muted/50 border-b border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('nav.loggedInAs')}</p>
                      <p className="font-semibold text-foreground text-sm truncate">{currentUser?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
                    </div>

                    {/* Menu Items */}
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors text-foreground text-sm"
                      onClick={() => setShowDropdown(false)}
                    >
                      <UserCircle className="w-4 h-4" />
                      {t('nav.myProfile')}
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors text-foreground text-sm"
                      onClick={() => setShowDropdown(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {t('nav.dashboard')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors text-foreground text-sm border-t border-border"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.signOut')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isHome 
                    ? "text-white hover:bg-white/10" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('nav.login')}</span>
                </span>
              </Link>
            )}

            <Link
              to="/list-equipment"
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav.listEquipment')}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
