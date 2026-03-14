import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { MapPin, Filter, Search, Tractor, ArrowLeft, Loader2, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getSelectedCHC } from "../utils/auth";
import { getAllEquipment } from "../utils/equipmentData";

export function DiscoveryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [equipmentList, setEquipmentList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Update searchQuery if URL changes
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    const selectedCHC = getSelectedCHC();
    if (selectedCHC) setSelectedLocation(selectedCHC.name);

    async function loadEquipment() {
      setIsLoading(true);
      const data = await getAllEquipment(selectedCHC?.id);
      setEquipmentList(data);
      setIsLoading(false);
    }
    loadEquipment();
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-muted-foreground">
              No equipment available at the moment.
            </div>
          ) : (
            filteredEquipment.map((equipment) => (
              <Link
                key={equipment.id}
                to={`/equipment/${equipment.id}`}
                className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <ImageWithFallback
                    src={equipment.image}
                    alt={equipment.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {equipment.available && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Available
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{equipment.name}</h3>
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{equipment.distance}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">{equipment.price}</span>
                      <span className="text-muted-foreground">/hour</span>
                    </div>
                    <span className="text-primary font-medium hover:underline flex items-center gap-1">
                      View details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
