import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MapPin, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { selectLocation } from "../utils/auth";

const LOCATIONS = [
  "Doddaballapura",
  "Devanahalli",
  "Hoskote",
  "Nelamangala",
  "Anekal",
];

export function LocationSetupPage() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [useManual, setUseManual] = useState(false);

  // Try to get user's location on mount
  useEffect(() => {
    const attemptGeolocation = () => {
      setIsLoadingGeo(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real app, you'd use coordinates to find nearest CHC
            // For now, we'll just show the option was attempted
            setIsLoadingGeo(false);
            console.log("[v0] Geolocation successful:", position.coords);
          },
          (error) => {
            console.log("[v0] Geolocation error:", error.message);
            setGeoError("Unable to detect location. Please select manually.");
            setUseManual(true);
            setIsLoadingGeo(false);
          }
        );
      } else {
        setGeoError("Geolocation not supported. Please select manually.");
        setUseManual(true);
        setIsLoadingGeo(false);
      }
    };

    attemptGeolocation();
  }, []);

  const handleSelectLocation = () => {
    if (!selectedLocation) return;

    selectLocation(selectedLocation);
    navigate("/chc-selection");
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Select Your Location</h1>
          <p className="text-muted-foreground">
            Choose your location to find nearby CHC centers and available equipment
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
          {/* Auto-detection Section */}
          {!useManual && (
            <div className="mb-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
              <div className="flex items-start gap-4">
                {isLoadingGeo ? (
                  <Loader className="w-6 h-6 text-primary animate-spin flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {isLoadingGeo ? "Detecting your location..." : "Location detection ready"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isLoadingGeo
                      ? "Please allow location access in your browser"
                      : "We can use your device location to find the nearest CHC center"}
                  </p>
                </div>
              </div>
              {geoError && (
                <div className="flex items-start gap-3 mt-4 pt-4 border-t border-primary/10">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-600">{geoError}</p>
                </div>
              )}
            </div>
          )}

          {/* Manual Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                {useManual ? "Select Location" : "Or Select Manually"}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {LOCATIONS.map((location) => (
                <button
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    selectedLocation === location
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedLocation === location
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}
                    >
                      {selectedLocation === location && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </div>
                    <span>{location}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleSelectLocation}
              disabled={!selectedLocation}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to CHC Selection
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-secondary/10 rounded-xl p-6 border border-secondary/20">
          <h3 className="font-semibold text-foreground mb-2">About CHC Centers</h3>
          <p className="text-sm text-muted-foreground">
            Custom Hiring Centers are strategically located across Bengaluru Rural to provide you with convenient access to quality farm equipment. Each center maintains a diverse fleet of machinery suitable for various farming operations.
          </p>
        </div>
      </div>
    </div>
  );
}
