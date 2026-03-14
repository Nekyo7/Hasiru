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
    image: "/images/gkvk_ch_centre.png"
  },
  {
    id: 15,
    name: "Uddurkaval",
    address: "Uddurkaval, Bengaluru Rural",
    map_link: "https://maps.app.goo.gl/z9tUBEy8GwkWbifZ9",
    distance: "8 km away",
    phone: "080-23330154",
    image: "/images/uddurkaval_ch_centre.png"
  },
  {
    id: 16,
    name: "Doddaballapura",
    address: "Doddaballapura, Bengaluru Rural",
    map_link: "https://www.google.com/maps/search/Primary+Health+Cent",
    distance: "12 km away",
    phone: "080-23330155",
    image: "/images/dodballapura_ch_centre.jpg"
  },
  {
    id: 20,
    name: "Dalasanuru",
    address: "Dalasanuru, Karnataka",
    map_link: "https://share.google/6z8m6XfwmRBCPcAue",
    distance: "Local",
    phone: "Contact Local Authority",
    image: "/images/dalasanuru_ch_centre.png"
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
  if (!chc) return null;
  try {
    return JSON.parse(chc);
  } catch (e) {
    console.error("Error parsing selectedCHC from localStorage", e);
    return null;
  }
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
