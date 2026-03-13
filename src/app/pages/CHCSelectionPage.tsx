import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { MapPin, Users, Phone, Clock, ArrowRight, CheckCircle, Search, Loader2, ExternalLink } from "lucide-react";
import { selectCHC, CHC_CENTERS } from "../utils/auth";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CHCSelectionPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [centers] = useState<any[]>(CHC_CENTERS);
  const [isLoading] = useState(false);

  useEffect(() => {
    // Supabase fetch removed - using hardcoded centers
  }, []);

  const filteredCenters = useMemo(() => {
    if (!searchQuery.trim()) {
      return centers;
    }
    const query = searchQuery.toLowerCase();
    return centers.filter(
      (center) =>
        center.name.toLowerCase().includes(query) ||
        center.address.toLowerCase().includes(query) ||
        center.phone.includes(query)
    );
  }, [searchQuery, centers]);

  const selectedCenter = centers.find((c) => c.id === selectedId);

  const handleConfirmSelection = () => {
    if (!selectedCenter) return;

    selectCHC({
      id: selectedCenter.id,
      name: selectedCenter.name,
    });

    navigate("/discover");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Select Your CHC Center</h1>
          <p className="text-muted-foreground mb-6">
            Find and select the CHC center near you to browse available equipment
          </p>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by center name, location, or phone number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CHC List */}
          <div className="lg:col-span-2">
            {filteredCenters.length > 0 ? (
              <div className="space-y-4">
                {filteredCenters.map((center) => (
                  <button
                    key={center.id}
                    onClick={() => setSelectedId(center.id)}
                    className={`w-full text-left transition-all rounded-xl overflow-hidden border-2 ${
                      selectedId === center.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="grid grid-cols-4 gap-0 h-full">
                      {/* Image */}
                      <div className="col-span-1 aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={center.image}
                          alt={center.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="col-span-3 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-foreground">{center.name}</h3>
                            {selectedId === center.id && (
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{center.address}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {center.distance}
                            </span>
                          </div>
                          <ArrowRight
                            className={`w-4 h-4 transition-transform ${
                              selectedId === center.id ? "text-primary translate-x-1" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">
                  No CHC centers found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-primary hover:underline text-sm mt-2"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedCenter ? (
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-sm border border-border space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Selected Center</p>
                  <h2 className="text-2xl font-bold text-foreground">{selectedCenter.name}</h2>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Location</p>
                    <p className="font-semibold text-foreground text-sm">{selectedCenter.address}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{selectedCenter.distance}</span>
                      {selectedCenter.map_link && (
                        <a
                          href={selectedCenter.map_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View on Map
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Contact</p>
                    <p className="font-semibold text-foreground">{selectedCenter.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Hours</p>
                    <p className="font-semibold text-foreground">{selectedCenter.operating_hours || '6:00 AM - 6:00 PM'}</p>
                  </div>
                </div>

                <button
                  onClick={handleConfirmSelection}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <span>Confirm Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  You can change your CHC center anytime in your profile settings.
                </p>
              </div>
            ) : (
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-sm border border-dashed border-border flex flex-col items-center justify-center min-h-64">
                <MapPin className="w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-center text-muted-foreground text-sm">
                  Select a CHC center from the list to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
