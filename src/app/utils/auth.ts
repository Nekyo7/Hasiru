// Authentication utility for managing user session and setup flow

export interface SelectedCHC {
  id: number;
  name: string;
}

export interface UserSession {
  userLocation: string | null;
  selectedCHC: SelectedCHC | null;
  hasCompletedSetup: boolean;
}

// Check if user has completed entire setup flow
export function hasCompletedSetup(): boolean {
  return localStorage.getItem("hasCompletedSetup") === "true";
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
    userLocation: getUserLocation(),
    selectedCHC: getSelectedCHC(),
    hasCompletedSetup: hasCompletedSetup(),
  };
}

// Clear all setup session data
export function clearSetupSession(): void {
  localStorage.removeItem("userLocation");
  localStorage.removeItem("selectedCHC");
  localStorage.removeItem("hasCompletedSetup");
}

// Determine next route based on setup progress (Assumes user is authenticated)
export function getNextRoute(): string {
  if (!getSelectedCHC()) {
    return "/chc-selection";
  }
  return "/discover";
}
