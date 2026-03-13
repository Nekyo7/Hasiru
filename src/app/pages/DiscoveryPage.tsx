import { useState } from "react";
import { Link } from "react-router";
import { MapPin, Filter, Search, Tractor } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const equipmentData = [
  {
    id: 1,
    name: "Mahindra 475 DI Tractor",
    distance: "3 km away",
    price: "₹550",
    available: true,
    image: "https://images.unsplash.com/photo-1739066483931-b9d218fe50b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhpbmRyYSUyMHRyYWN0b3IlMjBpbmRpYXxlbnwxfHx8fDE3NzMzODkzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: 2,
    name: "John Deere 5055E",
    distance: "5.2 km away",
    price: "₹750",
    available: true,
    image: "https://images.unsplash.com/photo-1685335686020-e0b487f7f426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2huJTIwZGVlcmUlMjB0cmFjdG9yfGVufDF8fHx8MTc3MzM4OTM0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    location: { lat: 28.6239, lng: 77.2190 }
  },
  {
    id: 3,
    name: "Combine Harvester Pro",
    distance: "8 km away",
    price: "₹2,500",
    available: true,
    image: "https://images.unsplash.com/photo-1655818805647-585cb9c9b02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbWFjaGluZXJ5JTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MzMwODE0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    location: { lat: 28.6339, lng: 77.2290 }
  },
  {
    id: 4,
    name: "Irrigation Pump System",
    distance: "6.5 km away",
    price: "₹350",
    available: true,
    image: "https://images.unsplash.com/photo-1598370025936-0856434d26e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwc3lzdGVtJTIwZmFybXxlbnwxfHx8fDE3NzMzODkwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: { lat: 28.6039, lng: 77.1990 }
  },
  {
    id: 5,
    name: "Seed Drill Planter",
    distance: "4.8 km away",
    price: "₹450",
    available: false,
    image: "https://images.unsplash.com/photo-1764277434161-23d72931335f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkaW5nJTIwZXF1aXBtZW50JTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzczMzg5MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: { lat: 28.6439, lng: 77.2390 }
  },
  {
    id: 6,
    name: "Farm Transport Truck",
    distance: "10 km away",
    price: "₹800",
    available: true,
    image: "https://images.unsplash.com/photo-1760765622766-0338e7c65d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdHJhbnNwb3J0JTIwdHJ1Y2t8ZW58MXx8fHwxNzczMzg5MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: { lat: 28.5939, lng: 77.1890 }
  },
  {
    id: 7,
    name: "Heavy Duty Tractor",
    distance: "7.2 km away",
    price: "₹650",
    available: true,
    image: "https://images.unsplash.com/photo-1758636528604-a8b3d3824157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0cmFjdG9yJTIwd29ya2luZ3xlbnwxfHx8fDE3NzMzODkzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: { lat: 28.6539, lng: 77.2490 }
  },
  {
    id: 8,
    name: "Agricultural Sprayer",
    distance: "5.5 km away",
    price: "₹400",
    available: true,
    image: "https://images.unsplash.com/photo-1767615073776-a78f0bdf4006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBlcXVpcG1lbnQlMjB3b3JrfGVufDF8fHx8MTc3MzM4OTM0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    location: { lat: 28.6139, lng: 77.1790 }
  }
];

export function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-16">
      {/* Search Header */}
      <div className="bg-card border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for tractors, harvesters, equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl border-0 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-input-background rounded-xl hover:bg-muted transition-colors">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-8rem)]">
        {/* Equipment List */}
        <div className="w-full lg:w-1/2 overflow-y-auto px-4 py-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {equipmentData.map((equipment) => (
              <Link
                key={equipment.id}
                to={`/equipment/${equipment.id}`}
                onMouseEnter={() => setSelectedEquipment(equipment.id)}
                onMouseLeave={() => setSelectedEquipment(null)}
                className={`block bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all ${
                  selectedEquipment === equipment.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="sm:flex">
                  <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <ImageWithFallback
                      src={equipment.image}
                      alt={equipment.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="sm:w-3/5 p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{equipment.name}</h3>
                      {equipment.available && (
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                          Available
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{equipment.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-foreground">{equipment.price}</span>
                        <span className="text-muted-foreground">/hour</span>
                      </div>
                      <span className="text-primary font-medium hover:underline">View details →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Map View */}
        <div className="hidden lg:block w-1/2 sticky top-32 h-[calc(100vh-8rem)]">
          <div className="h-full bg-muted rounded-l-2xl relative overflow-hidden">
            {/* Mock Map Background */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1689585190795-3352640d5401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbG93ZWQlMjBmaWVsZCUyMHBhdHRlcm58ZW58MXx8fHwxNzczMzg5MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Map background"
              className="w-full h-full object-cover opacity-20"
            />
            
            {/* Map Markers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-primary rounded-full p-6 mb-4 inline-block animate-pulse">
                  <Tractor className="w-12 h-12 text-primary-foreground" />
                </div>
                <p className="text-foreground font-medium text-lg">Interactive map showing nearby equipment</p>
                <p className="text-muted-foreground mt-2">Hover over listings to see locations</p>
              </div>
            </div>

            {/* Marker Indicators */}
            {equipmentData.slice(0, 5).map((equipment, index) => (
              <div
                key={equipment.id}
                className={`absolute bg-primary rounded-full p-2 cursor-pointer transition-all ${
                  selectedEquipment === equipment.id ? "scale-125 ring-4 ring-secondary" : "hover:scale-110"
                }`}
                style={{
                  top: `${20 + index * 15}%`,
                  left: `${30 + index * 10}%`,
                }}
              >
                <Tractor className="w-4 h-4 text-primary-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
