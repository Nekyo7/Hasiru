import { supabase } from "../../lib/supabase";

// ─── Types ────────────────────────────────────────────────────────
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
  type?: string;           // maps to equipment_type in DB
  chc_id: number;
  ownerName?: string;      // maps to owner_name in DB
  ownerEmail?: string;     // maps to owner_email in DB
  ownerPhone?: string;     // maps to owner_phone in DB
  ownerUserId?: string;    // maps to owner_user_id in DB
  created_at?: string;
}

export type RequestStatus = "pending" | "accepted" | "declined";

export interface RentalRequest {
  id: string;
  equipmentId: number;         // equipment_id
  equipmentName: string;       // equipment_name
  equipmentImage: string;      // equipment_image
  requesterEmail: string;      // requester_email
  requesterName: string;       // requester_name
  requesterPhone?: string;     // requester_phone
  ownerEmail: string;          // owner_email
  ownerName: string;           // owner_name
  date: string;                // booking_date
  hours: number;
  totalPrice: string;          // total_price
  status: RequestStatus;
  createdAt: string;           // created_at
}

export interface EquipmentReview {
  id: string;
  equipmentId: number;
  userId?: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ─── Hardcoded Equipment (always shown, from CHC centers) ──────────
export const EQUIPMENT_LIST: Equipment[] = [
  {
    id: 101, name: "Mahindra 575DI Tractor", image: "/images/mahindra_575di.png",
    distance: "5 km away", price: "₹600", available: true, category: "Tractor",
    brand: "Mahindra", model_number: "575DI", chc_id: 14,
    ownerName: "Ravi Kumar", ownerEmail: "ravi@gkvk.in",
    ownerPhone: "+91 94488 12345"
  },
  {
    id: 102, name: "John Deere 5105 Tractor", image: "/images/john_deere_5105.png",
    distance: "8 km away", price: "₹750", available: true, category: "Tractor",
    brand: "John Deere", model_number: "5105", chc_id: 15,
    ownerName: "Suresh Patil", ownerEmail: "suresh@uddurkaval.in",
    ownerPhone: "+91 98450 67890"
  },
  {
    id: 103, name: "Swaraj 744FE Tractor", image: "/images/swaraj_744fe.png",
    distance: "12 km away", price: "₹550", available: true, category: "Tractor",
    brand: "Swaraj", model_number: "744FE", chc_id: 16,
    ownerName: "Mohan Reddy", ownerEmail: "mohan@doddaballapura.in",
    ownerPhone: "+91 99000 54321"
  },
  {
    id: 201, name: "Claas Crop Tiger 30", image: "/images/claas_crop_tiger.png",
    distance: "15 km away", price: "₹1800", available: true, category: "Harvester",
    brand: "Claas", model_number: "Crop Tiger 30 Terra Trac",
    type: "Multi-crop combine harvester", chc_id: 20,
    ownerName: "Anjali Hegde", ownerEmail: "anjali@dalasanuru.in",
    ownerPhone: "+91 81234 56789"
  },
  {
    id: 202, name: "Kubota DC-68G-HK", image: "/images/kubota_dc68g.png",
    distance: "20 km away", price: "₹2000", available: true, category: "Harvester",
    brand: "Kubota", model_number: "DC-68G-HK",
    type: "Paddy combine harvester", chc_id: 14,
    ownerName: "Ravi Kumar", ownerEmail: "ravi@gkvk.in",
    ownerPhone: "+91 94488 12345"
  },
  {
    id: 301, name: "Fieldking Seed Drill FKSD-9", image: "/images/fieldking_seed_drill.png",
    distance: "6 km away", price: "₹400", available: true, category: "Seed Drill",
    brand: "Fieldking", model_number: "FKSD-9", type: "Seed Drill", chc_id: 15,
    ownerName: "Suresh Patil", ownerEmail: "suresh@uddurkaval.in",
    ownerPhone: "+91 98450 67890"
  },
  {
    id: 302, name: "Fieldking Multi Crop FKMSD-13", image: "/images/fieldking_seed_drill.png",
    distance: "10 km away", price: "₹500", available: true, category: "Seed Drill",
    brand: "Fieldking", model_number: "FKMSD-13",
    type: "Multi Crop Seed Drill", chc_id: 16,
    ownerName: "Mohan Reddy", ownerEmail: "mohan@doddaballapura.in",
    ownerPhone: "+91 99000 54321"
  },
  {
    id: 401, name: "Fieldking Rotary Tiller",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbdi?fit=crop&q=80&w=800",
    distance: "9 km away", price: "₹450", available: true, category: "Rotavator",
    brand: "Fieldking", model_number: "FKRTMG-145", type: "Rotary Tiller", chc_id: 20,
    ownerName: "Anjali Hegde", ownerEmail: "anjali@dalasanuru.in",
    ownerPhone: "+91 81234 56789"
  },
  {
    id: 402, name: "Fieldking Heavy Duty Rotavator",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbdi?fit=crop&q=80&w=800",
    distance: "14 km away", price: "₹550", available: true, category: "Rotavator",
    brand: "Fieldking", model_number: "FKRTMG-175",
    type: "Heavy Duty Rotavator", chc_id: 14,
    ownerName: "Ravi Kumar", ownerEmail: "ravi@gkvk.in",
    ownerPhone: "+91 94488 12345"
  }
];

// ─── DB Row ↔ App Type Mappers ─────────────────────────────────────
function rowToEquipment(row: any): Equipment {
  return {
    id: row.id,
    name: row.name,
    image: row.image || "",
    distance: row.distance || "Nearby",
    price: row.price || "₹0",
    available: row.available ?? true,
    category: row.category || "Other",
    brand: row.brand,
    model_number: row.model_number,
    type: row.equipment_type,
    chc_id: row.chc_id || 0,
    ownerName: row.owner_name,
    ownerEmail: row.owner_email,
    ownerPhone: row.owner_phone,
    ownerUserId: row.owner_user_id,
    created_at: row.created_at,
  };
}

function rowToRequest(row: any): RentalRequest {
  return {
    id: row.id,
    equipmentId: row.equipment_id,
    equipmentName: row.equipment_name,
    equipmentImage: row.equipment_image || "",
    requesterEmail: row.requester_email,
    requesterName: row.requester_name,
    requesterPhone: row.requester_phone,
    ownerEmail: row.owner_email,
    ownerName: row.owner_name,
    date: row.booking_date,
    hours: row.hours,
    totalPrice: row.total_price,
    status: row.status,
    createdAt: row.created_at,
  };
}

// ─── Equipment API ─────────────────────────────────────────────────

const LOCAL_STORAGE_KEY = "hasiru_user_listings";

/** Save a new equipment listing to Supabase (and localStorage as fallback) */
export async function saveUserEquipment(
  equipment: Omit<Equipment, "id" | "available" | "distance">,
  userId: string
): Promise<{ error: string | null }> {
  console.log("Saving equipment:", equipment);
  
  // 1. First try Supabase
  let supabaseError = null;
  try {
    const { error } = await supabase.from("equipment").insert({
      name: equipment.name,
      image: equipment.image,
      price: equipment.price,
      category: equipment.category,
      available: true,
      distance: "Nearby",
      brand: equipment.brand,
      model_number: equipment.model_number,
      equipment_type: equipment.type,
      chc_id: equipment.chc_id,
      owner_name: equipment.ownerName,
      owner_email: equipment.ownerEmail,
      owner_phone: equipment.ownerPhone,
      owner_user_id: userId,
    });
    if (error) {
      console.error("Supabase insert error:", error.message);
      supabaseError = error.message;
    }
  } catch (err: any) {
    console.error("Supabase exception caught during insert:", err);
    supabaseError = err.message || "Unknown database error";
  }

  // 2. Always save to localStorage as well (per user request for reliability)
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const listings: Equipment[] = localData ? JSON.parse(localData) : [];
    const newId = -Date.now(); // Use negative ID to avoid collision with Supabase serials
    const newListing: Equipment = {
      ...equipment,
      id: newId,
      available: true,
      distance: "Nearby",
      created_at: new Date().toISOString()
    };
    listings.unshift(newListing); // Add to front
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listings));
    console.log("Saved to localStorage successfully as fallback.");
  } catch (lsError) {
    console.error("LocalStorage save error:", lsError);
  }

  return { error: supabaseError };
}

/** Fetch equipment by owner email */
export async function getEquipmentByOwner(ownerEmail: string): Promise<Equipment[]> {
  const { data, error } = await supabase
    .from("equipment")
    .select("*")
    .eq("owner_email", ownerEmail)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(rowToEquipment);
}

/** Fetch user-listed equipment from Supabase */
export async function getSupabaseEquipment(chcId?: number): Promise<Equipment[]> {
  try {
    let query = supabase.from("equipment").select("*").order("created_at", { ascending: false });
    if (chcId) query = query.eq("chc_id", chcId);
    const { data, error } = await query;
    if (error || !data) {
      console.warn("Could not fetch from Supabase:", error?.message);
      return [];
    }
    return data.map(rowToEquipment);
  } catch (e) {
    console.error("Supabase fetch exception:", e);
    return [];
  }
}

/** Fetch user-listed equipment from LocalStorage */
export function getLocalEquipment(chcId?: number): Equipment[] {
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!localData) return [];
    let listings: Equipment[] = JSON.parse(localData);
    if (chcId) {
      listings = listings.filter(e => e.chc_id === chcId);
    }
    return listings;
  } catch (e) {
    console.error("LocalStorage fetch exception:", e);
    return [];
  }
}

/** Merge all sources: Supabase + LocalStorage + Hardcoded */
export async function getAllEquipment(chcId?: number): Promise<Equipment[]> {
  console.log("Fetching all equipment for CHC:", chcId);
  
  const [supabaseList, localList] = await Promise.all([
    getSupabaseEquipment(chcId),
    Promise.resolve(getLocalEquipment(chcId))
  ]);

  // Merge dynamic lists
  const dynamicList = [...localList, ...supabaseList];
  
  // Remove duplicates by ID (if someone saved to both and we fetched both)
  const seenIds = new Set();
  const uniqueDynamic = dynamicList.filter(item => {
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });

  const hardcoded = chcId
    ? EQUIPMENT_LIST.filter(e => e.chc_id === chcId)
    : EQUIPMENT_LIST;

  // Newest user listings first, then hardcoded
  return [...uniqueDynamic, ...hardcoded];
}

/** Get a single equipment item by ID */
export function getEquipmentById(id: number): Equipment | undefined {
  return EQUIPMENT_LIST.find(e => e.id === id);
}

// ─── Rental Request API ────────────────────────────────────────────

/** Save a rental request to Supabase */
export async function saveRentalRequest(
  request: Omit<RentalRequest, "id" | "createdAt" | "status">,
  userId: string
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("rental_requests").insert({
    equipment_id: request.equipmentId,
    equipment_name: request.equipmentName,
    equipment_image: request.equipmentImage,
    requester_email: request.requesterEmail,
    requester_name: request.requesterName,
    requester_phone: request.requesterPhone,
    requester_user_id: userId,
    owner_email: request.ownerEmail,
    owner_name: request.ownerName,
    booking_date: request.date,
    hours: request.hours,
    total_price: request.totalPrice,
    status: "pending",
  });
  return { error: error?.message || null };
}

/** Get all requests where the user is the equipment owner */
export async function getRequestsForOwner(ownerEmail: string): Promise<RentalRequest[]> {
  const { data, error } = await supabase
    .from("rental_requests")
    .select("*")
    .eq("owner_email", ownerEmail)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(rowToRequest);
}

/** Get all requests the user has sent */
export async function getRequestsByRequester(requesterEmail: string): Promise<RentalRequest[]> {
  const { data, error } = await supabase
    .from("rental_requests")
    .select("*")
    .eq("requester_email", requesterEmail)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(rowToRequest);
}

/** Update a request's status (accept / decline) */
export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus
): Promise<void> {
  await supabase
    .from("rental_requests")
    .update({ status })
    .eq("id", requestId);
}

// ─── Review API ───────────────────────────────────────────────────

function rowToReview(row: any): EquipmentReview {
  return {
    id: row.id,
    equipmentId: row.equipment_id,
    userId: row.user_id,
    userName: row.user_name,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
  };
}

/** Fetch all reviews for a specific equipment */
export async function getEquipmentReviews(equipmentId: number): Promise<EquipmentReview[]> {
  const { data, error } = await supabase
    .from("equipment_reviews")
    .select("*")
    .eq("equipment_id", equipmentId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(rowToReview);
}

/** Add a new review */
export async function addEquipmentReview(
  review: Omit<EquipmentReview, "id" | "createdAt">
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("equipment_reviews").insert({
    equipment_id: review.equipmentId,
    user_id: review.userId,
    user_name: review.userName,
    rating: review.rating,
    comment: review.comment,
  });
  return { error: error?.message || null };
}

// ─── Storage API ───────────────────────────────────────────────────

/** 
 * Upload an image to Supabase Storage and return the public URL 
 */
export async function uploadEquipmentImage(file: File): Promise<{ url: string | null; error: string | null }> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('equipment-images')
    .upload(filePath, file);

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data } = supabase.storage
    .from('equipment-images')
    .getPublicUrl(filePath);

  return { url: data.publicUrl, error: null };
}
