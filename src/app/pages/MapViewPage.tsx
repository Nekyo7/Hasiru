import { useState } from "react";
import { Tractor, MapPin, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

const getEquipmentLocations = (t: any) => [
  {
    id: 1,
    name: "Mahindra 475 DI",
    price: "₹550/hr",
    distance: "3 km",
    image: "https://images.unsplash.com/photo-1739066483931-b9d218fe50b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhpbmRyYSUyMHRyYWN0b3IlMjBpbmRpYXxlbnwxfHx8fDE3NzMzODkzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "30%", left: "40%" }
  },
  {
    id: 2,
    name: "John Deere 5055E",
    price: "₹750/hr",
    distance: "5.2 km",
    image: "https://images.unsplash.com/photo-1685335686020-e0b487f7f426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2huJTIwZGVlcmUlMjB0cmFjdG9yfGVufDF8fHx8MTc3MzM4OTM0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "45%", left: "55%" }
  },
  {
    id: 3,
    name: t('dashboard.types.harvester'),
    price: "₹2,500/hr",
    distance: "8 km",
    image: "https://images.unsplash.com/photo-1655818805647-585cb9c9b02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbWFjaGluZXJ5JTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MzMwODE0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "60%", left: "35%" }
  },
  {
    id: 4,
    name: t('dashboard.types.irrigation'),
    price: "₹350/hr",
    distance: "6.5 km",
    image: "https://images.unsplash.com/photo-1598370025936-0856434d26e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwc3lzdGVtJTIwZmFybXxlbnwxfHx8fDE3NzMzODkwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "25%", left: "65%" }
  },
  {
    id: 5,
    name: t('dashboard.types.seeder'),
    price: "₹450/hr",
    distance: "4.8 km",
    image: "https://images.unsplash.com/photo-1764277434161-23d72931335f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkaW5nJTIwZXF1aXBtZW50JTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzczMzg5MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "50%", left: "25%" }
  },
  {
    id: 6,
    name: t('dashboard.types.transport'),
    price: "₹800/hr",
    distance: "10 km",
    image: "https://images.unsplash.com/photo-1760765622766-0338e7c65d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdHJhbnNwb3J0JTIwdHJ1Y2t8ZW58MXx8fHwxNzczMzg5MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "70%", left: "60%" }
  }
];

import { useLanguage } from "../contexts/LanguageContext";

export function MapViewPage() {
  const { t } = useLanguage();
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);

  const equipmentLocations = getEquipmentLocations(t);
  const selected = equipmentLocations.find(e => e.id === selectedEquipment);

  return (
    <div className="h-screen pt-16 bg-background overflow-hidden">
      <div className="relative h-full">
        {/* Map Background */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1689585190795-3352640d5401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbG93ZWQlMjBmaWVsZCUyMHBhdHRlcm58ZW58MXx8fHwxNzczMzg5MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Map"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        </div>

        {/* Map Overlay */}
        <div className="absolute top-6 left-6 right-6 bg-card rounded-2xl p-4 shadow-lg z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{t('map.equipmentNearYou')}</h1>
              <p className="text-sm text-muted-foreground">{t('map.clickToView')}</p>
            </div>
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg">
              <span className="font-semibold">{equipmentLocations.length} {t('map.available')}</span>
            </div>
          </div>
        </div>

        {/* Equipment Markers */}
        <div className="absolute inset-0">
          {equipmentLocations.map((equipment) => (
            <button
              key={equipment.id}
              onClick={() => setSelectedEquipment(equipment.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                selectedEquipment === equipment.id
                  ? "scale-150 z-20"
                  : "hover:scale-125 z-10"
              }`}
              style={{
                top: equipment.position.top,
                left: equipment.position.left
              }}
            >
              <div className={`bg-primary rounded-full p-3 shadow-lg ${
                selectedEquipment === equipment.id
                  ? "ring-4 ring-secondary animate-pulse"
                  : ""
              }`}>
                <Tractor className="w-6 h-6 text-primary-foreground" />
              </div>
              {selectedEquipment !== equipment.id && (
                <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {equipment.id}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Equipment Detail Card */}
        {selected && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-30 animate-in slide-in-from-bottom">
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative">
                <button
                  onClick={() => setSelectedEquipment(null)}
                  className="absolute top-4 right-4 bg-card rounded-full p-2 shadow-lg hover:bg-muted transition-colors z-10"
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
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{selected.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{selected.distance} {t('map.away')}</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-primary">{selected.price.split('/')[0]}</span>
                    <span className="text-muted-foreground">/{selected.price.split('/')[1]}</span>
                  </div>
                  <Link
                    to={`/equipment/${selected.id}`}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition-opacity font-semibold"
                  >
                    {t('map.viewDetails')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-card rounded-xl p-4 shadow-lg z-10">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t('map.legend')}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-full p-2">
                <Tractor className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">{t('map.availableEquipment')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 rounded-full p-2">
                <Tractor className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{t('map.selected')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
