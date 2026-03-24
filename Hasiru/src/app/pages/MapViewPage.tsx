import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import { GoogleMapBox } from "../components/GoogleMapBox";
import { useLanguage } from "../contexts/LanguageContext";

const getEquipmentLocations = (t: any) => [
  {
    id: 1,
    name: "Mahindra 475 DI",
    price: "₹550/hr",
    distance: "3 km",
    image: "https://images.unsplash.com/photo-1739066483931-b9d218fe50b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhpbmRyYSUyMHRyYWN0b3IlMjBpbmRyYXxlbnwxfHx8fDE3NzMzODkzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 2,
    name: "John Deere 5055E",
    price: "₹750/hr",
    distance: "5.2 km",
    image: "https://images.unsplash.com/photo-1685335686020-e0b487f7f426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2huJTIwZGVlcmUlMjB0cmFjdG9yfGVufDF8fHx8MTc3MzM4OTM0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    position: { lat: 12.9800, lng: 77.6000 }
  },
  {
    id: 3,
    name: t('dashboard.types.harvester'),
    price: "₹2,500/hr",
    distance: "8 km",
    image: "https://images.unsplash.com/photo-1655818805647-585cb9c9b02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbWFjaGluZXJ5JTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MzMwODE0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    position: { lat: 12.9600, lng: 77.5800 }
  },
  {
    id: 4,
    name: t('dashboard.types.irrigation'),
    price: "₹350/hr",
    distance: "6.5 km",
    image: "https://images.unsplash.com/photo-1598370025936-0856434d26e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwc3lzdGVtJTIwZmFybXxlbnwxfHx8fDE3NzMzODkwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { lat: 12.9900, lng: 77.6100 }
  },
  {
    id: 5,
    name: t('dashboard.types.seeder'),
    price: "₹450/hr",
    distance: "4.8 km",
    image: "https://images.unsplash.com/photo-1764277434161-23d72931335f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkaW5nJTIwZXF1aXBtZW50JTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzczMzg5MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { lat: 12.9500, lng: 77.5700 }
  },
  {
    id: 6,
    name: t('dashboard.types.transport'),
    price: "₹800/hr",
    distance: "10 km",
    image: "https://images.unsplash.com/photo-1760765622766-0338e7c65d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdHJhbnNwb3J0JTIwdHJ1Y2t8ZW58MXx8fHwxNzczMzg5MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { lat: 13.0000, lng: 77.6200 }
  }
];

export function MapViewPage() {
  const { t } = useLanguage();
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);

  const equipmentLocations = getEquipmentLocations(t);
  const selected = equipmentLocations.find(e => e.id === selectedEquipment);

  return (
    <div className="h-screen pt-16 bg-background overflow-hidden">
      <div className="relative h-full">
        {/* Real Google Map */}
        <div className="absolute inset-0">
          <GoogleMapBox 
            locations={equipmentLocations}
            onMarkerClick={(id) => setSelectedEquipment(id)}
            selectedId={selectedEquipment}
          />
        </div>

        {/* Map Overlay */}
        <div className="absolute top-6 left-6 right-6 bg-card/80 backdrop-blur-md rounded-2xl p-4 shadow-lg z-10 border border-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{t('map.equipmentNearYou')}</h1>
              <p className="text-sm text-muted-foreground">{t('map.clickToView')}</p>
            </div>
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg border border-primary/20">
              <span className="font-semibold">{equipmentLocations.length} {t('map.available')}</span>
            </div>
          </div>
        </div>

        {/* Equipment Detail Card */}
        {selected && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md z-30 animate-in slide-in-from-bottom duration-500">
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-primary/10 ring-1 ring-primary/5">
              <div className="relative">
                <button
                  onClick={() => setSelectedEquipment(null)}
                  className="absolute top-4 right-4 bg-card/80 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-muted transition-colors z-10 border border-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-b from-card to-background">
                <h3 className="text-2xl font-bold mb-3">{selected.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{selected.distance} {t('map.away')}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-3xl font-bold text-primary">{selected.price.split('/')[0]}</span>
                    <span className="text-muted-foreground">/{selected.price.split('/')[1]}</span>
                  </div>
                  <Link
                    to={`/equipment/${selected.id}`}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all font-bold"
                  >
                    {t('map.viewDetails')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
