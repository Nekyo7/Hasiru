import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { MapPin, Star, Shield, Calendar, ArrowLeft, User, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { getAllEquipment } from "../utils/equipmentData";

export function EquipmentDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [equipment, setEquipment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = getAllEquipment().find(e => e.id === parseInt(id));
    if (found) {
      setEquipment(found);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 bg-background">
        <h2 className="text-2xl font-bold mb-4">Equipment Not Found</h2>
        <Link to="/discover" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </Link>
      </div>
    );
  }

  // Fallback data for fields not yet in our Supabase schema
  const details = {
    rating: 4.8,
    reviews: 24,
    images: [
      equipment.image || "https://images.unsplash.com/photo-1739066483931-b9d218fe50b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhpbmRyYSUyMHRyYWN0b3IlMjBpbmRpYXxlbnwxfHx8fDE3NzMzODkzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758636528604-a8b3d3824157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0cmFjdG9yJTIwd29ya2luZ3xlbnwxfHx8fDE3NzMzODkzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1685335686020-e0b487f7f426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2huJTIwZGVlcmUlMjB0cmFjdG9yfGVufDF8fHx8MTc3MzM4OTM0MHww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description: `Well-maintained ${equipment.name}, perfect for plowing, tilling, and general farm work. Regularly serviced and in excellent working condition. Comes with standard attachments.`,
    specifications: {
      "Engine Power": "42 HP",
      "Fuel Type": "Diesel",
      "Year": "2021",
      "Condition": "Excellent",
      "Hours Used": "850 hours",
      "Transmission": "8 Forward + 2 Reverse"
    },
    owner: {
      name: "Rajesh Kumar",
      image: "https://images.unsplash.com/photo-1719154718540-8ef3d94e7712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdCUyMHNtaWxpbmd8ZW58MXx8fHwxNzczMzA5MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      equipmentCount: 3,
      joinedDate: "Member since 2023"
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={details.images[selectedImage]}
                  alt={equipment.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {details.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                    } transition-all`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${equipment.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">About this equipment</h2>
              <p className="text-muted-foreground leading-relaxed">{details.description}</p>
            </div>

            {/* Specifications */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(details.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-border pb-3">
                    <p className="text-sm text-muted-foreground mb-1">{key}</p>
                    <p className="font-medium text-foreground">{value as string}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Equipment Owner</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={details.owner.image}
                    alt={details.owner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{details.owner.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span>{details.owner.rating}</span>
                    </div>
                    <span>{details.owner.equipmentCount} equipment listed</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{details.owner.joinedDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="bg-card rounded-2xl p-6 shadow-lg">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-foreground">{equipment.price}</span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-medium">{details.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({details.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>{equipment.distance}</span>
                </div>

                {/* Calendar */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Select booking date
                  </h3>
                  <div className="bg-background rounded-xl p-4">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md"
                    />
                  </div>
                </div>

                <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Request Booking
                </button>

                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Equipment insured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>Verified owner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
