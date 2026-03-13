import { useNavigate } from "react-router";
import { MapPin, Users, Clock, Phone, ArrowRight } from "lucide-react";
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

export function CHCCentersPage() {
  const navigate = useNavigate();

  const handleSelectCHC = (location: string) => {
    localStorage.setItem("userLocation", location);
    navigate("/discover");
  };

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
          {CHC_CENTERS.map((center) => (
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
                        <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Available Equipment</p>
                          <p className="font-semibold text-foreground">{center.equipment}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-semibold text-foreground">{center.address}</p>
                          <p className="text-xs text-muted-foreground mt-1">{center.distance}</p>
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
                          <p className="font-semibold text-foreground">6:00 AM - 6:00 PM</p>
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
