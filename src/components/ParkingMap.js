"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

function MapController({ selectedArea }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedArea) return;

    map.flyTo(selectedArea.coords, 13.5, {
      duration: 0.8,
    });
  }, [selectedArea, map]);

  return null;
}

function createAreaIcon(active) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 38px;
        height: 38px;
        border-radius: 13px;
        background: ${active ? "#4f46e5" : "#ffffff"};
        border: 3px solid ${active ? "#ffffff" : "#4f46e5"};
        box-shadow: 0 7px 20px rgba(15,23,42,.22);
        display:flex;
        align-items:center;
        justify-content:center;
        color:${active ? "#ffffff" : "#4f46e5"};
        font-weight:900;
        font-size:11px;
      ">
        P
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });
}

function createSpotIcon(available, selected) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 10px;
        background: ${
          selected ? "#4f46e5" : available ? "#10b981" : "#94a3b8"
        };
        border: 3px solid white;
        box-shadow: 0 5px 15px rgba(15,23,42,.2);
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        font-weight:900;
        font-size:10px;
      ">
        P
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -17],
  });
}

export default function ParkingMap({
  areas,
  selectedArea,
  selectedSpot,
  parkingSpots,
  onAreaChange,
  onSpotSelect,
}) {
  const activeArea = areas.find((area) => area.id === selectedArea);

  /*
    These are visual parking points around each Karachi area.
    In the real backend you can replace these with actual parking
    coordinates from your database.
  */

  const offsets = [
    [0.004, 0.005],
    [-0.004, 0.006],
    [0.006, -0.005],
    [-0.005, -0.004],
    [0.002, -0.008],
  ];

  return (
    <MapContainer
      center={[24.8607, 67.0011]}
      zoom={11}
      scrollWheelZoom={true}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController selectedArea={activeArea} />

      {/* AREA MARKERS */}
      {areas.map((area) => (
        <Marker
          key={area.id}
          position={area.coords}
          icon={createAreaIcon(area.id === selectedArea)}
          eventHandlers={{
            click: () => onAreaChange(area.id),
          }}
        >
          <Popup>
            <div className="min-w-[150px]">
              <div className="font-bold text-slate-900">{area.name}</div>

              <div className="mt-1 text-xs text-slate-500">
                {area.available} parking spots available
              </div>

              <div className="mt-2 text-sm font-bold text-indigo-600">
                From Rs. {area.price}/hr
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* PARKING SPOTS */}
      {activeArea &&
        parkingSpots.map((spot, index) => {
          const offset = offsets[index % offsets.length];

          const position = [
            activeArea.coords[0] + offset[0],
            activeArea.coords[1] + offset[1],
          ];

          const selected = selectedSpot?.id === spot.id;

          return (
            <Marker
              key={spot.id}
              position={position}
              icon={createSpotIcon(spot.available, selected)}
              eventHandlers={{
                click: () => onSpotSelect(spot.id),
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <div className="font-bold text-slate-900">
                    {spot.name}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {spot.address}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      Rs. {spot.price}/hr
                    </span>

                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                        spot.available
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {spot.available ? "Available" : "Occupied"}
                    </span>
                  </div>

                  {spot.available && (
                    <button
                      onClick={() => onSpotSelect(spot.id)}
                      className="mt-3 w-full rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white"
                    >
                      Select Spot
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}