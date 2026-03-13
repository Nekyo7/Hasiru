// Authentication utility for managing user session and setup flow

export interface SelectedCHC {
  id: number;
  name: string;
}

export interface CHCCenter extends SelectedCHC {
  address: string;
  map_link: string;
  distance: string;
  phone: string;
  image: string;
  operating_hours?: string;
}

export const CHC_CENTERS: CHCCenter[] = [
  {
    id: 14,
    name: "GKVK",
    address: "GKVK Campus, Bengaluru Rural",
    map_link: "https://maps.app.goo.gl/8NBNHyEzyCWnifh59",
    distance: "3 km away",
    phone: "080-23330153",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbdi+Ramanagar"
  },
  {
    id: 15,
    name: "Uddurkaval",
    address: "Uddurkaval, Bengaluru Rural",
    map_link: "https://maps.app.goo.gl/z9tUBEy8GwkWbifZ9",
    distance: "8 km away",
    phone: "080-23330154",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
  },
  {
    id: 16,
    name: "Doddaballapura",
    address: "Doddaballapura, Bengaluru Rural",
    map_link: "https://www.google.com/maps/search/Primary+Health+Cent",
    distance: "12 km away",
    phone: "080-23330155",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
  },
  {
    id: 20,
    name: "Dalasanuru",
    address: "Dalasanuru, Karnataka",
    map_link: "https://share.google/6z8m6XfwmRBCPcAue",
    distance: "Local",
    phone: "Contact Local Authority",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
  }
];

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
