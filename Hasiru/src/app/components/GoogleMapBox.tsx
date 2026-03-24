import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";

interface Location {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  image?: string;
  price?: string;
}

interface GoogleMapBoxProps {
  locations: Location[];
  onMarkerClick?: (id: number) => void;
  selectedId?: number | null;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const API_KEY = (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY;

export function GoogleMapBox({
  locations,
  onMarkerClick,
  selectedId,
  center = { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore
  zoom = 12
}: GoogleMapBoxProps) {
  const [openInfoId, setOpenInfoId] = useState<number | null>(null);

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner bg-muted/20">
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          mapId="eb84666f7f2d3d92" // Optional: custom styles
        >
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={loc.position}
              onClick={() => {
                if (onMarkerClick) onMarkerClick(loc.id);
                setOpenInfoId(loc.id);
              }}
            />
          ))}

          {openInfoId && (
            <InfoWindow
              position={locations.find(l => l.id === openInfoId)?.position}
              onCloseClick={() => setOpenInfoId(null)}
            >
              <div className="p-2 max-w-[200px]">
                <h3 className="font-bold text-sm mb-1">
                  {locations.find(l => l.id === openInfoId)?.name}
                </h3>
                {locations.find(l => l.id === openInfoId)?.price && (
                  <p className="text-xs text-primary font-semibold">
                    {locations.find(l => l.id === openInfoId)?.price}
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
