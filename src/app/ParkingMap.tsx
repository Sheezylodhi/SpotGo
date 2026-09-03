"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Car, Navigation, ParkingCircle } from "lucide-react";

type ParkingLot = {
  id: number;
  name: string;
  location: string;
  distance: number;
  total: number;
  available: number;
  reserved: number;
  price: number;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
};

type Props = {
  parkingLots: ParkingLot[];
  selectedParking: ParkingLot;
  onSelect: (parking: ParkingLot) => void;
  userLocation?: {
    lat: number;
    lng: number;
  } | null;
};

function createParkingIcon(
  active: boolean,
  available: number,
) {
  return L.divIcon({
    className: "spot-go-marker",
    html: `
      <div class="marker-wrap ${active ? "active" : ""}">
        <div class="marker-pulse"></div>

        <div class="marker-pin">
          <div class="marker-icon">
            ${available}
          </div>
        </div>

        <div class="marker-label">
          ${available} free
        </div>
      </div>
    `,
    iconSize: [70, 80],
    iconAnchor: [35, 40],
  });
}

function createUserIcon() {
  return L.divIcon({
    className: "spot-go-user",
    html: `
      <div class="user-pulse"></div>
      <div class="user-dot">
        <div></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

function FlyToSelected({
  parking,
}: {
  parking: ParkingLot;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(
      [
        parking.coordinates.lat,
        parking.coordinates.lng,
      ],
      15,
      {
        duration: 1.2,
      },
    );
  }, [parking, map]);

  return null;
}

function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => clearTimeout(timeout);
  }, [map]);

  return null;
}

export default function ParkingMap({
  parkingLots,
  selectedParking,
  onSelect,
  userLocation,
}: Props) {
  const center: [number, number] = [
    selectedParking.coordinates.lat,
    selectedParking.coordinates.lng,
  ];

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={15}
        zoomControl={false}
        attributionControl={true}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapResizeFix />

        <FlyToSelected parking={selectedParking} />

        {parkingLots.map((parking) => (
          <Marker
            key={parking.id}
            position={[
              parking.coordinates.lat,
              parking.coordinates.lng,
            ]}
            icon={createParkingIcon(
              parking.id === selectedParking.id,
              parking.available,
            )}
            eventHandlers={{
              click: () => onSelect(parking),
            }}
          />
        ))}

        {userLocation && (
          <Marker
            position={[
              userLocation.lat,
              userLocation.lng,
            ]}
            icon={createUserIcon()}
          />
        )}
      </MapContainer>

      <style jsx global>{`
        .spot-go-marker {
          background: transparent !important;
          border: 0 !important;
        }

        .marker-wrap {
          position: relative;
          width: 70px;
          height: 80px;
        }

        .marker-pin {
          position: absolute;
          left: 15px;
          top: 4px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 4px solid white;
          background: white;
          box-shadow:
            0 12px 30px rgba(15, 23, 42, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          z-index: 3;
        }

        .marker-wrap.active .marker-pin {
          background: #2563eb;
          transform: scale(1.13);
          box-shadow:
            0 14px 35px rgba(37, 99, 235, 0.38);
        }

        .marker-icon {
          width: 27px;
          height: 27px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 900;
          color: #2563eb;
          background: #eff6ff;
        }

        .marker-wrap.active .marker-icon {
          background: transparent;
          color: white;
        }

        .marker-label {
          position: absolute;
          top: 48px;
          left: 2px;
          white-space: nowrap;
          padding: 5px 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow:
            0 7px 20px rgba(15, 23, 42, 0.12);
          font-size: 8px;
          font-weight: 900;
          color: #0f172a;
          backdrop-filter: blur(10px);
        }

        .marker-pulse {
          position: absolute;
          left: 15px;
          top: 4px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.18);
          opacity: 0;
        }

        .marker-wrap.active .marker-pulse {
          opacity: 1;
          animation: markerPulse 2s infinite;
        }

        @keyframes markerPulse {
          0% {
            transform: scale(1);
            opacity: 0.45;
          }

          70% {
            transform: scale(1.8);
            opacity: 0;
          }

          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .spot-go-user {
          background: transparent !important;
          border: 0 !important;
        }

        .user-dot {
          position: absolute;
          width: 22px;
          height: 22px;
          left: 7px;
          top: 7px;
          border-radius: 50%;
          border: 4px solid white;
          background: #2563eb;
          box-shadow:
            0 5px 20px rgba(37, 99, 235, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .user-dot div {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
        }

        .user-pulse {
          position: absolute;
          width: 22px;
          height: 22px;
          left: 7px;
          top: 7px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.25);
          animation: userPulse 2s infinite;
        }

        @keyframes userPulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }

          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.75) !important;
          backdrop-filter: blur(10px);
          border-radius: 8px 0 0 0;
          font-size: 8px !important;
        }

        .leaflet-container {
          font-family: inherit;
          background: #e8eef2;
        }
      `}</style>
    </div>
  );
}