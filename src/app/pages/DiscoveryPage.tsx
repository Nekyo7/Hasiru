import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { MapPin, Filter, Search, Tractor, ArrowLeft, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getSelectedCHC } from "../utils/auth";
import { EQUIPMENT_LIST } from "../utils/equipmentData";

export function DiscoveryPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [equipmentList] = useState<any[]>(EQUIPMENT_LIST);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Supabase fetch removed - using hardware constants
    
    // Get user's selected CHC from auth utilities
    const selectedCHC = getSelectedCHC();
    if (selectedCHC) {
      setSelectedLocation(selectedCHC.name);
    }
  }, []);

  const handleChangeLocation = () => {
    // Navigate to CHC selection to change center
    navigate("/chc-selection");
  };

  const filteredEquipment = equipmentList.filter(eq => 
    eq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    eq.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* CHC Selection Header */}
      {selectedLocation && (
        <div className="bg-primary/10 border-b border-primary/20 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Selected CHC</p>
                  <p className="text-lg font-semibold text-foreground">CHC Center – {selectedLocation}</p>
                </div>
              </div>
              <button
                onClick={handleChangeLocation}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-primary font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Change Center
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Header */}
      <div className="bg-card border-b sticky top-32 z-40">
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
            {filteredEquipment.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No equipment available at the moment.
              </div>
            ) : (
              filteredEquipment.map((equipment) => (
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
            )))}
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
            {filteredEquipment.slice(0, 5).map((equipment, index) => (
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
