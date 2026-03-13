import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Users, Phone, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { selectCHC, getUserLocation } from "../utils/auth";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const CHC_CENTERS = [
  {
    id: 1,
    name: "Doddaballapura",
    equipment: "120+ equipment",
    distance: "45 km from Bengaluru",
    phone: "+91-80-2753-XXXX",
    image: "https://images.unsplash.com/photo-1758636528604-a8b3d3824157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0cmFjdG9yJTIwd29ya2luZ3xlbnwxfHx8fDE3NzMzODkzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Doddaballapura Taluk, Bengaluru Rural District"
  },
  {
    id: 2,
    name: "Devanahalli",
    equipment: "95+ equipment",
    distance: "40 km from Bengaluru",
    phone: "+91-80-2796-XXXX",
    image: "https://images.unsplash.com/photo-1685335686020-e0b487f7f426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2huJTIwZGVlcmUlMjB0cmFjdG9yfGVufDF8fHx8MTc3MzM4OTM0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Devanahalli Taluk, Bengaluru Rural District"
  },
  {
    id: 3,
    name: "Hoskote",
    equipment: "110+ equipment",
    distance: "35 km from Bengaluru",
    phone: "+91-80-2772-XXXX",
    image: "https://images.unsplash.com/photo-1655818805647-585cb9c9b02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbWFjaGluZXJ5JTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MzMwODE0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Hoskote Taluk, Bengaluru Rural District"
  },
  {
    id: 4,
    name: "Nelamangala",
    equipment: "85+ equipment",
    distance: "50 km from Bengaluru",
    phone: "+91-80-2788-XXXX",
    image: "https://images.unsplash.com/photo-1598370025936-0856434d26e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwc3lzdGVtJTIwZmFybXxlbnwxfHx8fDE3NzMzODkwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Nelamangala Taluk, Bengaluru Rural District"
  },
  {
    id: 5,
    name: "Anekal",
    equipment: "100+ equipment",
    distance: "55 km from Bengaluru",
    phone: "+91-80-2741-XXXX",
    image: "https://images.unsplash.com/photo-1764277434161-23d72931335f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkaW5nJTIwZXF1aXBtZW50JTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzczMzg5MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "Anekal Taluk, Bengaluru Rural District"
  }
];

export function CHCSelectionPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const userLocation = getUserLocation();

  const selectedCenter = CHC_CENTERS.find((c) => c.id === selectedId);

  const handleConfirmSelection = () => {
    if (!selectedCenter) return;

    selectCHC({
      id: selectedCenter.id,
      name: selectedCenter.name,
    });

    navigate("/discover");
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Select Your CHC Center</h1>
          <p className="text-muted-foreground">
            {userLocation
              ? `Showing centers in and near ${userLocation}`
              : "Select the CHC center you want to work with"}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CHC List */}
          <div className="lg:col-span-2 space-y-4">
            {CHC_CENTERS.map((center) => (
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
                          <Users className="w-4 h-4" />
                          {center.equipment}
                        </span>
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

          {/* Detail Panel */}
          <div>
            {selectedCenter ? (
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  CHC – {selectedCenter.name}
                </h3>

                <div className="space-y-5 mb-6">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Equipment</p>
                      <p className="font-semibold text-foreground">{selectedCenter.equipment}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Location</p>
                      <p className="font-semibold text-foreground text-sm">{selectedCenter.address}</p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedCenter.distance}</p>
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
                      <p className="font-semibold text-foreground">6:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmSelection}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <span>Confirm Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
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
