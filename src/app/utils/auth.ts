// Authentication utility for managing user session and setup flow

export interface UserAuth {
  isAuthenticated: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface SelectedCHC {
  id: number;
  name: string;
}

export interface UserSession {
  userAuth: UserAuth | null;
  userLocation: string | null;
  selectedCHC: SelectedCHC | null;
  hasCompletedSetup: boolean;
}

// Get current user authentication status
export function isAuthenticated(): boolean {
  const auth = localStorage.getItem("userAuth");
  return auth ? JSON.parse(auth).isAuthenticated : false;
}

// Check if user has completed entire setup flow
export function hasCompletedSetup(): boolean {
  return localStorage.getItem("hasCompletedSetup") === "true";
}

// Get current user data
export function getCurrentUser(): UserAuth | null {
  const auth = localStorage.getItem("userAuth");
  return auth ? JSON.parse(auth) : null;
}

// Get selected CHC
export function getSelectedCHC(): SelectedCHC | null {
  const chc = localStorage.getItem("selectedCHC");
  return chc ? JSON.parse(chc) : null;
}

// Get user location
export function getUserLocation(): string | null {
  return localStorage.getItem("userLocation");
}

// Login user and store credentials
export function login(userData: Omit<UserAuth, "isAuthenticated">): void {
  const authData: UserAuth = {
    isAuthenticated: true,
    ...userData,
  };
  localStorage.setItem("userAuth", JSON.stringify(authData));
  localStorage.setItem("hasCompletedSetup", "false");
}

// Select location (triggered after location detection/selection)
export function selectLocation(location: string): void {
  localStorage.setItem("userLocation", location);
}

// Select CHC and mark setup as complete
export function selectCHC(chc: SelectedCHC): void {
  localStorage.setItem("selectedCHC", JSON.stringify(chc));
  localStorage.setItem("hasCompletedSetup", "true");
}

// Get entire session data
export function getSession(): UserSession {
  return {
    userAuth: getCurrentUser(),
    userLocation: getUserLocation(),
    selectedCHC: getSelectedCHC(),
    hasCompletedSetup: hasCompletedSetup(),
  };
}

// Logout and clear all session data
export function logout(): void {
  localStorage.removeItem("userAuth");
  localStorage.removeItem("userLocation");
  localStorage.removeItem("selectedCHC");
  localStorage.removeItem("hasCompletedSetup");
}

// Determine next route based on setup progress
export function getNextRoute(): string {
  if (!isAuthenticated()) {
    return "/login";
  }
  if (!getSelectedCHC()) {
    return "/chc-selection";
  }
  return "/discover";
}
