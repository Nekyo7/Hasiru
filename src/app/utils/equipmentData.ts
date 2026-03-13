
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
    model_number: "575DI"
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
    model_number: "5105"
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
    model_number: "744FE"
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
    type: "Multi-crop combine harvester"
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
    type: "Paddy combine harvester"
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
    type: "Seed Drill"
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
    type: "Multi Crop Seed Drill"
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
    type: "Rotary Tiller"
  },
  {
    id: 402,
    name: "Fieldking heavy Duty rotavator",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbdi?fit=crop&q=80&w=800",
    distance: "14 km away",
    price: "₹550",
    available: true,
    category: "Rotavator",
    brand: "Fieldking",
    model_number: "FKRTMG-175",
    type: "Heavy Duty Rotavator"
  }
];
