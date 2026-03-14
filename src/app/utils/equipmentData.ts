
export interface Equipment {
  id: number;
  name: string;
  image: string;
  distance: string;
  price: string;
  available: boolean;
  category: string;
  brand?: string;
  model_number?: string;
  type?: string;
  chc_id: number; // Associated CHC center ID
  ownerName?: string;
  ownerEmail?: string;
}

export const EQUIPMENT_LIST: Equipment[] = [
  {
    id: 101,
    name: "Mahindra 575DI Tractor",
    image: "/images/mahindra_575di.png",
    distance: "5 km away",
    price: "₹600",
    available: true,
    category: "Tractor",
    brand: "Mahindra",
    model_number: "575DI",
    chc_id: 14,
    ownerName: "Ravi Kumar",
    ownerEmail: "ravi@gkvk.in"
  },
  {
    id: 102,
    name: "John Deere 5105 Tractor",
    image: "/images/john_deere_5105.png",
    distance: "8 km away",
    price: "₹750",
    available: true,
    category: "Tractor",
    brand: "John Deere",
    model_number: "5105",
    chc_id: 15,
    ownerName: "Suresh Patil",
    ownerEmail: "suresh@uddurkaval.in"
  },
  {
    id: 103,
    name: "Swaraj 744FE Tractor",
    image: "/images/swaraj_744fe.png",
    distance: "12 km away",
    price: "₹550",
    available: true,
    category: "Tractor",
    brand: "Swaraj",
    model_number: "744FE",
    chc_id: 16,
    ownerName: "Mohan Reddy",
    ownerEmail: "mohan@doddaballapura.in"
  },
  {
    id: 201,
    name: "Claas Crop Tiger 30",
    image: "/images/claas_crop_tiger.png",
    distance: "15 km away",
    price: "₹1800",
    available: true,
    category: "Harvester",
    brand: "Claas",
    model_number: "Crop Tiger 30 Terra Trac",
    type: "Multi-crop combine harvester",
    chc_id: 20,
    ownerName: "Anjali Hegde",
    ownerEmail: "anjali@dalasanuru.in"
  },
  {
    id: 202,
    name: "Kubota DC-68G-HK",
    image: "/images/kubota_dc68g.png",
    distance: "20 km away",
    price: "₹2000",
    available: true,
    category: "Harvester",
    brand: "Kubota",
    model_number: "DC-68G-HK",
    type: "Paddy combine harvester",
    chc_id: 14,
    ownerName: "Ravi Kumar",
    ownerEmail: "ravi@gkvk.in"
  },
  {
    id: 301,
    name: "Fieldking Seed Drill FKSD-9",
    image: "/images/fieldking_seed_drill.png",
    distance: "6 km away",
    price: "₹400",
    available: true,
    category: "Seed Drill",
    brand: "Fieldking",
    model_number: "FKSD-9",
    type: "Seed Drill",
    chc_id: 15,
    ownerName: "Suresh Patil",
    ownerEmail: "suresh@uddurkaval.in"
  },
  {
    id: 302,
    name: "Fieldking Multi Crop FKMSD-13",
    image: "/images/fieldking_seed_drill.png",
    distance: "10 km away",
    price: "₹500",
    available: true,
    category: "Seed Drill",
    brand: "Fieldking",
    model_number: "FKMSD-13",
    type: "Multi Crop Seed Drill",
    chc_id: 16,
    ownerName: "Mohan Reddy",
    ownerEmail: "mohan@doddaballapura.in"
  },
  {
    id: 401,
    name: "Fieldking Rotary Tiller",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbdi?fit=crop&q=80&w=800",
    distance: "9 km away",
    price: "₹450",
    available: true,
    category: "Rotavator",
    brand: "Fieldking",
    model_number: "FKRTMG-145",
    type: "Rotary Tiller",
    chc_id: 20,
    ownerName: "Anjali Hegde",
    ownerEmail: "anjali@dalasanuru.in"
  },
  {
    id: 402,
    name: "Fieldking Heavy Duty Rotavator",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbdi?fit=crop&q=80&w=800",
    distance: "14 km away",
    price: "₹550",
    available: true,
    category: "Rotavator",
    brand: "Fieldking",
    model_number: "FKRTMG-175",
    type: "Heavy Duty Rotavator",
    chc_id: 14,
    ownerName: "Ravi Kumar",
    ownerEmail: "ravi@gkvk.in"
  }
];

// ─── Equipment Local Storage ───────────────────────────────────────────────────

const USER_EQUIPMENT_KEY = "user_listed_equipment";

export function saveUserEquipment(equipment: Omit<Equipment, "id" | "available" | "distance">): void {
  const existing = getUserEquipment();
  const newId = 5000 + existing.length + Math.floor(Math.random() * 1000);

  const newEquipment: Equipment = {
    ...equipment,
    id: newId,
    available: true,
    distance: "Your Location"
  };

  localStorage.setItem(USER_EQUIPMENT_KEY, JSON.stringify([...existing, newEquipment]));
}

export function getUserEquipment(chcId?: number): Equipment[] {
  const data = localStorage.getItem(USER_EQUIPMENT_KEY);
  if (!data) return [];
  try {
    const equipment: Equipment[] = JSON.parse(data);
    return chcId ? equipment.filter(e => e.chc_id === chcId) : equipment;
  } catch (e) {
    return [];
  }
}

export function getEquipmentByOwner(ownerEmail: string): Equipment[] {
  const allUserListed = getUserEquipment();
  return allUserListed.filter(e => e.ownerEmail === ownerEmail);
}

export function getAllEquipment(chcId?: number): Equipment[] {
  const masterList = chcId
    ? EQUIPMENT_LIST.filter(e => e.chc_id === chcId)
    : EQUIPMENT_LIST;
  return [...getUserEquipment(chcId), ...masterList];
}

export function getEquipmentById(id: number): Equipment | undefined {
  return getAllEquipment().find(e => e.id === id);
}

// ─── Rental Request System ─────────────────────────────────────────────────────

export type RequestStatus = "pending" | "accepted" | "declined";

export interface RentalRequest {
  id: string;
  equipmentId: number;
  equipmentName: string;
  equipmentImage: string;
  // Requester (person who wants to rent)
  requesterEmail: string;
  requesterName: string;
  // Owner (person who listed the equipment)
  ownerEmail: string;
  ownerName: string;
  // Booking details
  date: string;
  hours: number;
  totalPrice: string;
  status: RequestStatus;
  createdAt: string;
}

const REQUESTS_KEY = "rental_requests";

export function saveRentalRequest(request: Omit<RentalRequest, "id" | "createdAt" | "status">): void {
  const existing = getRentalRequests();
  const newRequest: RentalRequest = {
    ...request,
    id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(REQUESTS_KEY, JSON.stringify([...existing, newRequest]));
}

export function getRentalRequests(): RentalRequest[] {
  const data = localStorage.getItem(REQUESTS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getRequestsForOwner(ownerEmail: string): RentalRequest[] {
  return getRentalRequests().filter(r => r.ownerEmail === ownerEmail);
}

export function getRequestsByRequester(requesterEmail: string): RentalRequest[] {
  return getRentalRequests().filter(r => r.requesterEmail === requesterEmail);
}

export function updateRequestStatus(requestId: string, status: RequestStatus): void {
  const requests = getRentalRequests();
  const updated = requests.map(r => r.id === requestId ? { ...r, status } : r);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
}
