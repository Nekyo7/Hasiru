import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Users, Clock, Phone, ArrowRight, Loader2, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CHC_CENTERS } from "../utils/auth";

export function CHCCentersPage() {
  const navigate = useNavigate();
  const [centers] = useState<any[]>(CHC_CENTERS);
  const [isLoading] = useState(false);

  useEffect(() => {
    // Supabase fetch removed - using hardcoded centers
  }, []);

  const handleSelectCHC = (location: string) => {
    localStorage.setItem("userLocation", location);
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">CHC Centers</h1>
          <p className="text-lg text-muted-foreground">
            Select your nearest Custom Hiring Center in Bengaluru Rural area
          </p>
        </div>

        {/* CHC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {centers.map((center) => (
            <div
              key={center.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="grid md:grid-cols-5 gap-0 h-full">
                {/* Image */}
                <div className="md:col-span-2 aspect-[4/3] md:aspect-auto overflow-hidden">
                  <ImageWithFallback
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-6 flex flex-col justify-between">
                  {/* Info */}
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      CHC – {center.name}
                    </h2>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-semibold text-foreground">{center.address}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{center.distance}</span>
                            {center.map_link && (
                              <a
                                href={center.map_link}
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
                          <p className="text-muted-foreground">Contact</p>
                          <p className="font-semibold text-foreground">{center.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Operating Hours</p>
                          <p className="font-semibold text-foreground">{center.operating_hours || '6:00 AM - 6:00 PM'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleSelectCHC(center.name)}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Select This Center</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/10">
          <h3 className="text-2xl font-semibold text-foreground mb-4">About Our CHCs</h3>
          <p className="text-muted-foreground mb-4">
            Custom Hiring Centers (CHCs) are government-supported facilities where farmers can rent agricultural equipment instead of purchasing them. This reduces costs and makes modern farming technology accessible to all farmers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Wide Equipment Range</h4>
              <p className="text-sm text-muted-foreground">Tractors, harvesters, seeders, irrigation systems, and more</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Affordable Rates</h4>
              <p className="text-sm text-muted-foreground">Hourly rental pricing designed for farming operations</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Quality Support</h4>
              <p className="text-sm text-muted-foreground">Professional maintenance and customer service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
