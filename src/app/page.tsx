"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Building2,
  Car,
  Check,
  LockKeyhole,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crosshair,
  Crown,
  DoorOpen,
  LocateFixed,
  MapPin,
  Minus,
  Navigation,
  ParkingCircle,
  Plus,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  X,
  type LucideIcon,
} from "lucide-react";

import { useMemo, useState } from "react";

import SpotGoNavbar from "@/components/SpotGoNavbar";
import SpotGoFooter from "@/components/SpotGoFooter";
import GlobalLoader from "@/components/GlobalLoader";


type SpotType = "standard" | "vip";
type SpotStatus = "available" | "reserved" | "booked";

type ParkingSpotData = {
  id: string;
  row: string;
  type: SpotType;
  status: SpotStatus;
  price: number;
};

type ParkingArea = {
  id: number;
  name: string;
  location: string;
  distance: string;
  floors: number;
  available: number;
  total: number;
  price: number;
  rating: number;
  features: string[];
  zone: string;
  eta: string;
  mapX: number;
  mapY: number;
  layout: "mall" | "tower" | "street" | "airport" | "open";
};

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const PARKING_AREAS: ParkingArea[] = [
  // =========================================================
  // SUPER HIGHWAY — PRIORITY LOCATIONS
  // =========================================================
  {
    id: 1,
    name: "Kababjees Super Highway Parking",
    location: "Sector 4-B, Gulzar-e-Hijri, Scheme 33",
    distance: "0.3 km",
    floors: 2,
    available: 86,
    total: 180,
    price: 100,
    rating: 4.9,
    features: ["Restaurant Parking", "CCTV", "24/7"],
    zone: "Super Highway",
    eta: "2 min",
    mapX: 51,
    mapY: 48,
    layout: "open",
  },

  {
    id: 2,
    name: "Haveli Kebab & Grill Parking",
    location: "Super Highway, Sector 4-B, Gulzar-e-Hijri",
    distance: "0.5 km",
    floors: 2,
    available: 61,
    total: 140,
    price: 90,
    rating: 4.8,
    features: ["Restaurant Parking", "Security", "Open"],
    zone: "Super Highway",
    eta: "3 min",
    mapX: 57,
    mapY: 45,
    layout: "open",
  },

  {
    id: 3,
    name: "BBQ Tonight Super Highway Parking",
    location: "M9 Super Highway, Karachi",
    distance: "1.1 km",
    floors: 3,
    available: 74,
    total: 165,
    price: 100,
    rating: 4.8,
    features: ["Covered", "CCTV", "Restaurant Parking"],
    zone: "Super Highway",
    eta: "4 min",
    mapX: 63,
    mapY: 41,
    layout: "mall",
  },

  {
    id: 4,
    name: "Kababjees Bakers Highway Parking",
    location: "Near Jamali Pull, Gulzar-e-Hijri, Scheme 33",
    distance: "0.4 km",
    floors: 1,
    available: 39,
    total: 80,
    price: 80,
    rating: 4.7,
    features: ["Bakery", "CCTV", "Open"],
    zone: "Super Highway",
    eta: "2 min",
    mapX: 54,
    mapY: 52,
    layout: "street",
  },

  // =========================================================
  // KARACHI — OTHER LOCATIONS
  // =========================================================
  {
    id: 5,
    name: "Ocean Mall Parking",
    location: "Block 5, Clifton",
    distance: "12.8 km",
    floors: 4,
    available: 47,
    total: 128,
    price: 120,
    rating: 4.9,
    features: ["Covered", "CCTV", "24/7"],
    zone: "Clifton",
    eta: "28 min",
    mapX: 47,
    mapY: 53,
    layout: "mall",
  },

  {
    id: 6,
    name: "Dolmen Mall Clifton",
    location: "Marine Drive, Clifton",
    distance: "13.2 km",
    floors: 5,
    available: 68,
    total: 180,
    price: 150,
    rating: 4.8,
    features: ["Covered", "CCTV", "24/7"],
    zone: "Clifton",
    eta: "30 min",
    mapX: 40,
    mapY: 40,
    layout: "mall",
  },

  {
    id: 7,
    name: "Dolmen Mall Tariq Road",
    location: "Tariq Road, PECHS",
    distance: "10.4 km",
    floors: 6,
    available: 81,
    total: 220,
    price: 130,
    rating: 4.8,
    features: ["Smart Entry", "CCTV", "Covered"],
    zone: "PECHS",
    eta: "24 min",
    mapX: 59,
    mapY: 38,
    layout: "tower",
  },

  {
    id: 8,
    name: "LuckyOne Mall Parking",
    location: "Federal B Area",
    distance: "7.4 km",
    floors: 7,
    available: 94,
    total: 260,
    price: 100,
    rating: 4.7,
    features: ["Covered", "CCTV", "24/7"],
    zone: "FB Area",
    eta: "17 min",
    mapX: 70,
    mapY: 25,
    layout: "mall",
  },

  {
    id: 9,
    name: "Tariq Road Smart Parking",
    location: "PECHS Block 2",
    distance: "10.8 km",
    floors: 3,
    available: 32,
    total: 84,
    price: 110,
    rating: 4.7,
    features: ["Smart Entry", "CCTV", "Open"],
    zone: "PECHS",
    eta: "25 min",
    mapX: 61,
    mapY: 47,
    layout: "street",
  },

  {
    id: 10,
    name: "Bahadurabad Parking Hub",
    location: "Bahadurabad Chowrangi",
    distance: "9.1 km",
    floors: 4,
    available: 43,
    total: 112,
    price: 100,
    rating: 4.6,
    features: ["CCTV", "24/7", "Covered"],
    zone: "Bahadurabad",
    eta: "22 min",
    mapX: 67,
    mapY: 51,
    layout: "tower",
  },

  {
    id: 11,
    name: "Shahrah-e-Faisal Business Parking",
    location: "PECHS Extension",
    distance: "13.5 km",
    floors: 5,
    available: 31,
    total: 96,
    price: 150,
    rating: 4.7,
    features: ["VIP", "Covered", "Security"],
    zone: "Shahrah-e-Faisal",
    eta: "29 min",
    mapX: 54,
    mapY: 60,
    layout: "tower",
  },

  {
    id: 12,
    name: "DHA Phase 6 Parking",
    location: "Khayaban-e-Shahbaz",
    distance: "19.2 km",
    floors: 3,
    available: 52,
    total: 140,
    price: 140,
    rating: 4.8,
    features: ["Covered", "CCTV", "Security"],
    zone: "DHA",
    eta: "35 min",
    mapX: 25,
    mapY: 61,
    layout: "open",
  },

  {
    id: 13,
    name: "Boat Basin Parking",
    location: "Clifton Block 1",
    distance: "14.4 km",
    floors: 2,
    available: 28,
    total: 72,
    price: 120,
    rating: 4.6,
    features: ["Open", "CCTV", "24/7"],
    zone: "Clifton",
    eta: "31 min",
    mapX: 31,
    mapY: 51,
    layout: "street",
  },

  {
    id: 14,
    name: "Saddar Smart Parking",
    location: "Saddar Town",
    distance: "15.8 km",
    floors: 6,
    available: 82,
    total: 210,
    price: 100,
    rating: 4.8,
    features: ["24/7", "CCTV", "Smart Entry"],
    zone: "Saddar",
    eta: "33 min",
    mapX: 43,
    mapY: 25,
    layout: "tower",
  },

  {
    id: 15,
    name: "Jinnah Airport Parking",
    location: "Jinnah International Airport",
    distance: "17.6 km",
    floors: 4,
    available: 117,
    total: 300,
    price: 180,
    rating: 4.9,
    features: ["24/7", "Covered", "Security"],
    zone: "Airport",
    eta: "37 min",
    mapX: 82,
    mapY: 68,
    layout: "airport",
  },
];

const FLOOR_SEEDS: Record<number, number[]> = {
  1: [2, 6, 10, 15, 19, 23],
  2: [1, 5, 8, 13, 18, 22],
  3: [3, 6, 11, 14, 20, 24],
  4: [2, 7, 10, 16, 18, 23],
  5: [4, 8, 12, 17, 21, 24],
  6: [2, 5, 9, 14, 19, 22],
  7: [1, 6, 10, 15, 18, 23],
};

const RESERVED_SEEDS = [4, 11, 17, 21];

function makeFloor(
  floorNumber: number,
  area: ParkingArea
): ParkingSpotData[] {
  const rows = ["A", "B", "C", "D"];
  const booked = FLOOR_SEEDS[floorNumber] ?? FLOOR_SEEDS[1];

  const spots: ParkingSpotData[] = [];

  rows.forEach((row, rowIndex) => {
    for (let i = 1; i <= 6; i++) {
      const seed = rowIndex * 6 + i;

      let status: SpotStatus = "available";

      if (booked.includes(seed)) {
        status = "booked";
      } else if (RESERVED_SEEDS.includes(seed)) {
        status = "reserved";
      }

      const vip =
        area.layout === "airport"
          ? i === 6
          : area.layout === "tower"
            ? i === 5
            : i === 2;

      spots.push({
        id: `${row}${String((floorNumber - 1) * 10 + i).padStart(2, "0")}`,
        row,
        type: vip ? "vip" : "standard",
        status,
        price: vip ? area.price + 70 : area.price,
      });
    }
  });

  return spots;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-cyan-50 group-hover:text-cyan-600">
          <Icon size={19} />
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-600">
          Live
        </span>
      </div>

      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <div className="mt-1 flex items-end gap-2">
        <p className="text-2xl font-black tracking-tight text-slate-950">
          {value}
        </p>

        <p className="mb-1 text-[10px] font-semibold text-slate-400">
          {sub}
        </p>
      </div>
    </div>
  );
}

function ParkingSpot({
  spot,
  selected,
  onClick,
}: {
  spot: ParkingSpotData;
  selected: boolean;
  onClick: () => void;
}) {
  const booked = spot.status === "booked";
  const reserved = spot.status === "reserved";
  const vip = spot.type === "vip";

  const carColor = selected
    ? "text-white"
    : booked
      ? "text-slate-300"
      : reserved
        ? "text-blue-200"
        : vip
          ? "text-violet-200"
          : "text-emerald-100";

  return (
    <button
      type="button"
      disabled={booked || reserved}
      onClick={onClick}
      aria-label={`${spot.id} ${spot.type} parking spot`}
      className={cn(
        "group relative h-[82px] w-[52px] shrink-0 overflow-visible rounded-[12px] border-2",
        "transition-all duration-200 sm:h-[90px] sm:w-[58px]",

        // BOOKED
        booked &&
          "cursor-not-allowed border-slate-300 bg-slate-400",

        // RESERVED
        reserved &&
          "cursor-not-allowed border-blue-500 bg-blue-600",

        // AVAILABLE STANDARD
        spot.status === "available" &&
          !vip &&
          !selected &&
          "border-emerald-600 bg-emerald-600 text-white shadow-sm hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-600 hover:shadow-lg",

        // VIP
        spot.status === "available" &&
          vip &&
          !selected &&
          "border-violet-500 bg-violet-500 text-white shadow-sm hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-600 hover:shadow-lg",

        // SELECTED
        selected &&
          "z-10 scale-[1.04] border-cyan-300 bg-cyan-800 text-white shadow-xl shadow-cyan-900/40"
      )}
    >
      {/* =========================
          PARKING BAY LINES
      ========================== */}
     {/* =========================
    PARKING BAY + CAR
========================= */}
<div
  className={cn(
    "absolute left-1/2 top-[5px] z-[3]",
    "-translate-x-1/2",
    "h-[68px] w-[34px]",
    "rounded-[8px]",
    "border",
    "flex items-center justify-center",
    "pointer-events-none",

    selected
      ? "border-white/25 bg-white/10"
      : booked
        ? "border-slate-500 bg-slate-600/70"
        : reserved
          ? "border-blue-400/40 bg-blue-700/60"
          : vip
            ? "border-violet-400/40 bg-violet-800/60"
            : "border-emerald-400/40 bg-emerald-800/60"
  )}
>
  {/* CAR - STRAIGHT INSIDE BAY */}
  <Car
    size={27}
    strokeWidth={2.4}
    className={cn(
      "relative z-[5]",
      "shrink-0",
      carColor,
      "drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]",
      "transition-transform duration-200",
      !booked &&
        !reserved &&
        "group-hover:scale-105"
    )}
  />
</div>

      {/* =========================
          CAR BODY / PARKING SHADOW
      ========================== */}
      <div
        className={cn(
          "absolute left-1/2 top-[15px] z-[1]",
          "h-[48px] w-[27px]",
          "-translate-x-1/2",
          "rounded-[9px]",
          "pointer-events-none",

          selected
            ? "bg-white/10 border border-white/20"
            : booked
              ? "bg-slate-600/80 border border-slate-500/60"
              : reserved
                ? "bg-blue-700/70 border border-blue-400/40"
                : vip
                  ? "bg-violet-800/70 border border-violet-400/40"
                  : "bg-emerald-800/70 border border-emerald-400/40"
        )}
      />

      {/* =========================
          WINDSHIELD
      ========================== */}
      <div
        className={cn(
          "absolute left-1/2 top-[22px] z-[3]",
          "h-[11px] w-[17px]",
          "-translate-x-1/2",
          "rounded-[4px]",
          "pointer-events-none",

          selected
            ? "bg-white/25 border border-white/30"
            : booked
              ? "bg-slate-400/30 border border-slate-300/20"
              : reserved
                ? "bg-blue-300/25 border border-blue-200/20"
                : vip
                  ? "bg-violet-300/25 border border-violet-200/20"
                  : "bg-emerald-300/25 border border-emerald-200/20"
        )}
      />

      {/* =========================
          CAR HEADLIGHTS
      ========================== */}
      <div className="absolute left-1/2 top-[12px] z-[4] flex -translate-x-1/2 gap-[10px]">
        <span
          className={cn(
            "h-[3px] w-[4px] rounded-full",
            selected
              ? "bg-white"
              : booked
                ? "bg-slate-300"
                : reserved
                  ? "bg-blue-200"
                  : vip
                    ? "bg-violet-200"
                    : "bg-emerald-200"
          )}
        />

        <span
          className={cn(
            "h-[3px] w-[4px] rounded-full",
            selected
              ? "bg-white"
              : booked
                ? "bg-slate-300"
                : reserved
                  ? "bg-blue-200"
                  : vip
                    ? "bg-violet-200"
                    : "bg-emerald-200"
          )}
        />
      </div>

      {/* =========================
          STATUS ICON
      ========================== */}
      {reserved && (
        <div className="absolute right-[3px] top-[3px] z-[6]">
          <Ticket
            size={10}
            strokeWidth={2.5}
            className="text-white"
          />
        </div>
      )}

      {vip && !selected && !reserved && !booked && (
        <div className="absolute right-[3px] top-[3px] z-[6]">
          <Crown
            size={10}
            strokeWidth={2.5}
            className="text-yellow-200"
          />
        </div>
      )}

      {/* =========================
          SPOT ID
      ========================== */}
      <span
        className={cn(
          "absolute bottom-[5px] left-1/2 z-[7]",
          "-translate-x-1/2",
          "rounded-md px-1.5 py-[2px]",
          "text-[8px] font-black leading-none",
          "tracking-wide",

          selected
            ? "bg-white/15 text-white"
            : booked
              ? "bg-black/20 text-slate-200"
              : reserved
                ? "bg-black/15 text-blue-100"
                : vip
                  ? "bg-black/15 text-violet-100"
                  : "bg-black/10 text-white"
        )}
      >
        {spot.id}
      </span>

      {/* =========================
          SELECTED LABEL
      ========================== */}
      {selected && (
        <span
          className="
            absolute
            -bottom-6
            left-1/2
            z-20
            -translate-x-1/2
            whitespace-nowrap
            rounded-full
            bg-cyan-950
            px-2
            py-0.5
            text-[7px]
            font-black
            uppercase
            tracking-wider
            text-cyan-200
            shadow-md
          "
        >
          Selected
        </span>
      )}
    </button>
  );
}

function ParkingRow({
  row,
  spots,
  selectedSpot,
  onSelect,
}: {
  row: string;
  spots: ParkingSpotData[];
  selectedSpot: ParkingSpotData | null;
  onSelect: (spot: ParkingSpotData) => void;
}) {
  const rowSpots = spots.filter((spot) => spot.row === row);

  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-500">
        {row}
      </div>

      <div className="flex min-w-0 flex-1 justify-center gap-2.5 sm:gap-4">
        {rowSpots.map((spot, index) => (
          <div key={spot.id} className="relative">
            {index === 3 && (
              <div className="pointer-events-none absolute -left-3 top-1/2 h-[68px] w-px -translate-y-1/2 bg-slate-300 sm:-left-4 sm:h-[74px]" />
            )}

            <ParkingSpot
              spot={spot}
              selected={selectedSpot?.id === spot.id}
              onClick={() => onSelect(spot)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ParkingArchitecture({
  area,
  floor,
  spots,
  selectedSpot,
  onSelect,
}: {
  area: ParkingArea;
  floor: number;
  spots: ParkingSpotData[];
  selectedSpot: ParkingSpotData | null;
  onSelect: (spot: ParkingSpotData) => void;
}) {
  if (area.layout === "street") {
    return (
      <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#e7ecea] p-5 sm:p-8">
        <div className="absolute inset-y-0 left-[38%] w-[24%] border-x-4 border-dashed border-white bg-slate-300/30" />

        <div className="absolute left-[42%] top-0 h-full w-[16%] bg-slate-400/10" />

        <div className="relative z-10">
          <div className="flex items-center justify-between rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2">
              <DoorOpen size={15} className="text-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-600">
                Main Entrance
              </span>
            </div>

            <span className="text-[9px] font-black text-slate-400">
              Floor {floor}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">
                Exit
              </span>
              <ArrowRight size={14} className="text-slate-400" />
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {["A", "B", "C", "D"].map((row) => (
              <ParkingRow
                key={row}
                row={row}
                spots={spots}
                selectedSpot={selectedSpot}
                onSelect={onSelect}
              />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white bg-white/80 p-3">
              <p className="text-[8px] font-black uppercase text-slate-400">
                Entry
              </p>
              <p className="mt-1 text-xs font-black text-slate-900">
                Shahbaz Gate
              </p>
            </div>

            <div className="rounded-2xl border border-white bg-white/80 p-3">
              <p className="text-[8px] font-black uppercase text-slate-400">
                Exit
              </p>
              <p className="mt-1 text-xs font-black text-slate-900">
                Main Road
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white bg-white/80 p-3 sm:block">
              <p className="text-[8px] font-black uppercase text-slate-400">
                Direction
              </p>
              <p className="mt-1 text-xs font-black text-slate-900">
                One-way
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (area.layout === "airport") {
    return (
      <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#e9eeec] p-5 sm:p-8">
        <div className="absolute left-0 right-0 top-[35%] h-14 border-y border-white bg-white/60" />

        <div className="absolute bottom-0 left-[12%] top-0 w-10 border-x border-white bg-white/30" />

        <div className="relative z-10">
          <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-3 text-white shadow-lg">
            <div className="flex items-center gap-2">
              <Navigation size={14} className="text-cyan-400" />
              <span className="text-[9px] font-black uppercase tracking-wider">
                Terminal Entrance
              </span>
            </div>

            <span className="text-[9px] font-black text-slate-500">
              F{floor}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">
                Exit
              </span>
              <ArrowRight size={13} className="text-cyan-400" />
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {["A", "B", "C", "D"].map((row) => (
              <ParkingRow
                key={row}
                row={row}
                spots={spots}
                selectedSpot={selectedSpot}
                onSelect={onSelect}
              />
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">
                  Drop-off lane
                </p>
                <p className="mt-1 text-xs font-black text-slate-900">
                  Terminal access road
                </p>
              </div>

              <div className="rounded-xl bg-cyan-50 px-3 py-2 text-[9px] font-black text-cyan-600">
                24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (area.layout === "open") {
    return (
      <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#e3ebe6] p-5 sm:p-8">
        <div className="absolute inset-x-0 top-[45%] h-16 border-y-2 border-dashed border-white bg-white/30" />

        <div className="absolute bottom-4 left-4 top-4 w-14 rounded-2xl bg-emerald-100/50" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <DoorOpen size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-600">
                  Gate A
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-white/90 px-4 py-3 text-[9px] font-black uppercase tracking-wider text-slate-500 shadow-sm">
              Open Parking • F{floor}
            </div>

            <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-600">
                  Exit B
                </span>
                <ArrowRight size={13} />
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {["A", "B", "C", "D"].map((row) => (
              <ParkingRow
                key={row}
                row={row}
                spots={spots}
                selectedSpot={selectedSpot}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#edf1ef] p-5 sm:p-8">
      {/* MALL / TOWER STYLE */}
      <div className="absolute left-[5%] right-[5%] top-0 h-12 border-x border-slate-200 bg-white/70" />

      <div className="absolute bottom-0 left-[43%] top-0 w-[14%] border-x border-dashed border-slate-300 bg-white/60" />

      <div className="relative z-10">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <DoorOpen size={14} className="text-emerald-500" />
              <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">
                Entrance
              </span>
            </div>

            <p className="mt-1 text-[11px] font-black text-slate-900">
              Gate A
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
            <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">
              Floor
            </p>

            <p className="mt-1 text-sm font-black text-slate-950">
              F{floor}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">
                Exit
              </span>
              <ArrowRight size={13} className="text-slate-400" />
            </div>

            <p className="mt-1 text-[11px] font-black text-slate-900">
              Gate B
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {["A", "B", "C", "D"].map((row) => (
            <ParkingRow
              key={row}
              row={row}
              spots={spots}
              selectedSpot={selectedSpot}
              onSelect={onSelect}
            />
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center">
          <div className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[8px] font-black uppercase tracking-[0.15em] text-slate-400 shadow-sm">
            Central driving lane
          </div>
        </div>
      </div>
    </div>
  );
}

function RealMap({
  activeArea,
  areas,
  onSelect,
}: {
  activeArea: ParkingArea;
  areas: ParkingArea[];
  onSelect: (area: ParkingArea) => void;
}) {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${activeArea.name}, ${activeArea.location}, Karachi, Pakistan`
  )}&z=15&output=embed`;

  return (
    <div className="relative min-h-[590px] overflow-hidden rounded-[30px] border border-slate-200 bg-slate-100 shadow-xl">
      <iframe
        title={`Map showing ${activeArea.name}`}
        src={mapUrl}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* MAP OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

      {/* TOP CONTROL */}
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
          <MapPin size={15} className="text-cyan-500" />

          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-400">
              Selected location
            </p>

            <p className="mt-0.5 max-w-[180px] truncate text-[11px] font-black text-slate-900">
              {activeArea.name}
            </p>
          </div>
        </div>
      </div>

      {/* ZOOM */}
      <div className="absolute right-5 top-5 z-10 overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-xl backdrop-blur">
        <button className="flex h-10 w-10 items-center justify-center border-b border-slate-200 text-slate-600 hover:bg-slate-50">
          <Plus size={16} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center text-slate-600 hover:bg-slate-50">
          <Minus size={16} />
        </button>
      </div>

      {/* CURRENT LOCATION */}
      <button className="absolute bottom-32 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/95 text-slate-700 shadow-xl backdrop-blur transition hover:text-cyan-500">
        <Crosshair size={17} />
      </button>

      {/* LOCATION SWITCHER */}
      <div className="absolute bottom-5 left-5 right-5 z-10">
        <div className="rounded-[24px] border border-white/70 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[8px] font-black uppercase tracking-[0.18em] text-emerald-300">
                  Selected parking
                </span>
              </div>

              <h3 className="mt-2 truncate text-base font-black">
                {activeArea.name}
              </h3>

              <div className="mt-1 flex flex-wrap gap-3 text-[9px] font-semibold text-slate-400">
                <span>{activeArea.location}</span>
                <span>•</span>
                <span>{activeArea.distance}</span>
                <span>•</span>
                <span>{activeArea.available} free</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                  Starting
                </p>

                <p className="text-base font-black">
                  Rs {activeArea.price}
                  <span className="text-[9px] text-slate-500">/hr</span>
                </p>
              </div>

              <a
                href="#parking"
                className="flex h-11 items-center gap-2 rounded-xl bg-cyan-400 px-4 text-[10px] font-black text-slate-950 transition hover:bg-cyan-300"
              >
                Select spot
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Small location dots */}
      <div className="pointer-events-none absolute left-5 top-24 z-10 hidden rounded-2xl border border-white/70 bg-white/90 p-3 shadow-lg backdrop-blur sm:block">
        <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">
          SpotGo network
        </p>

        <p className="mt-1 text-xs font-black text-slate-900">
          {areas.length} locations
        </p>
      </div>
    </div>
  );
}

function HeroLiveCard({ activeArea }: { activeArea: ParkingArea }) {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-[34px] bg-slate-950 p-5 shadow-2xl shadow-slate-950/20 sm:p-7">

      {/* AMBIENT LIGHT */}
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* SUBTLE GARAGE GRID */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-[12%] top-0 h-full w-px bg-white/10" />
        <div className="absolute left-[30%] top-0 h-full w-px bg-white/10" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-white/10" />
        <div className="absolute left-[70%] top-0 h-full w-px bg-white/10" />
        <div className="absolute left-[88%] top-0 h-full w-px bg-white/10" />

        <div className="absolute left-0 top-[22%] h-px w-full bg-white/10" />
        <div className="absolute left-0 top-[44%] h-px w-full bg-white/10" />
        <div className="absolute left-0 top-[66%] h-px w-full bg-white/10" />
        <div className="absolute left-0 top-[88%] h-px w-full bg-white/10" />
      </div>

      {/* HEADER */}
      <div className="relative z-20 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            Live parking
          </div>

          <h3 className="mt-2 max-w-[245px] text-xl font-black tracking-tight text-white">
            {activeArea.name}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-[9px] font-semibold text-slate-500">
            <MapPin size={11} className="text-cyan-400" />
            {activeArea.location}
          </div>
        </div>

        {/* LIVE COUNTER */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-right backdrop-blur">
          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
            Available
          </p>

          <p className="mt-0.5 text-base font-black text-white">
            {activeArea.available}
            <span className="text-[9px] text-slate-500">
              /{activeArea.total}
            </span>
          </p>

          <div className="mt-1 flex items-center justify-end gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[7px] font-black uppercase tracking-wider text-emerald-400">
              Live
            </span>
          </div>
        </div>
      </div>

      {/* PARKING GARAGE */}
      <div className="absolute inset-x-7 bottom-[105px] top-[130px]">

        {/* GARAGE FRAME */}
        <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-white/[0.025]" />

        {/* ROOF / STRUCTURE */}
        <div className="absolute left-[7%] right-[7%] top-[7%] h-5 rounded-full border border-white/10 bg-white/[0.035]" />

        {/* PARKING LEVELS */}
        {[0, 1, 2, 3].map((level) => (
          <div
            key={level}
            className="absolute left-[8%] right-[8%]"
            style={{
              top: `${18 + level * 21}%`,
            }}
          >
            {/* FLOOR LABEL */}
            <div className="absolute -left-2 -translate-x-full text-[7px] font-black uppercase tracking-widest text-slate-600">
              F{level + 1}
            </div>

            {/* FLOOR */}
            <div className="relative h-[65px] border-b border-dashed border-white/10">

              {/* PARKING BAYS */}
              <div className="absolute inset-x-3 top-2 flex justify-center gap-1.5 sm:gap-2">
                {Array.from({ length: 9 }).map((_, index) => {
                  const isOccupied = (index + level) % 4 === 0;
                  const isVip = index === 7;

                  return (
                    <div
                      key={index}
                      className="relative h-12 w-7 rounded-md border border-white/10 bg-white/[0.025] sm:h-14 sm:w-8"
                    >
                      {/* BAY NUMBER */}
                      <span className="absolute left-1/2 top-1 -translate-x-1/2 text-[5px] font-black text-slate-700">
                        {level + 1}
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {isOccupied ? (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                          <Car
                            size={17}
                            className="text-slate-600"
                            strokeWidth={2}
                          />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "absolute bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full",
                            isVip
                              ? "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,.5)]"
                              : "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.45)]"
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* DRIVE LANE */}
              <div className="absolute bottom-0 left-1/2 h-1 w-[76%] -translate-x-1/2 rounded-full bg-white/5" />
            </div>
          </div>
        ))}

        {/* CENTER NAVIGATION MARKER */}
        <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">

          <span className="absolute h-24 w-24 animate-ping rounded-full bg-cyan-400/10" />

          <span className="absolute h-20 w-20 rounded-full bg-cyan-400/5 blur-xl" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-slate-950 bg-cyan-400 shadow-[0_0_45px_rgba(34,211,238,.3)]">
            <Navigation
              size={23}
              className="-rotate-45 text-slate-950"
              fill="currentColor"
            />
          </div>

          {/* LOCATION LABEL */}
          <div className="absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-900/90 px-3 py-1.5 text-[7px] font-black uppercase tracking-widest text-cyan-300 shadow-xl backdrop-blur">
            Your parking area
          </div>
        </div>

        {/* ENTRANCE */}
        <div className="absolute bottom-[-5px] left-[6%] flex items-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1.5">
          <DoorOpen size={11} className="text-emerald-400" />
          <span className="text-[7px] font-black uppercase tracking-wider text-emerald-300">
            Entry
          </span>
        </div>

        {/* EXIT */}
        <div className="absolute bottom-[-5px] right-[6%] flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
          <span className="text-[7px] font-black uppercase tracking-wider text-slate-500">
            Exit
          </span>
          <ArrowRight size={11} className="text-slate-500" />
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 sm:left-7 sm:right-7">

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <ParkingCircle size={13} className="text-cyan-400" />

            <span className="text-[8px] font-bold text-slate-500">
              Available
            </span>
          </div>

          <p className="mt-1 text-sm font-black text-white">
            {activeArea.available}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <Clock3 size={13} className="text-cyan-400" />

            <span className="text-[8px] font-bold text-slate-500">
              Arrival
            </span>
          </div>

          <p className="mt-1 text-sm font-black text-white">
            {activeArea.eta}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <Route size={13} className="text-cyan-400" />

            <span className="text-[8px] font-bold text-slate-500">
              Distance
            </span>
          </div>

          <p className="mt-1 text-sm font-black text-white">
            {activeArea.distance}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeArea, setActiveArea] = useState<ParkingArea>(
    PARKING_AREAS[0]
  );

  const [floor, setFloor] = useState(1);
  const [selectedSpot, setSelectedSpot] =
    useState<ParkingSpotData | null>(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [duration, setDuration] = useState(2);
  const [search, setSearch] = useState("");

  const spots = useMemo(
    () => makeFloor(floor, activeArea),
    [floor, activeArea]
  );

  const availableCount = spots.filter(
    (spot) => spot.status === "available"
  ).length;

  const reservedCount = spots.filter(
    (spot) => spot.status === "reserved"
  ).length;

  const bookedCount = spots.filter(
    (spot) => spot.status === "booked"
  ).length;

  const total = selectedSpot
    ? selectedSpot.price * duration
    : activeArea.price * duration;

  const filteredAreas = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return PARKING_AREAS;

    return PARKING_AREAS.filter((area) =>
      `${area.name} ${area.location} ${area.zone}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  function changeArea(area: ParkingArea) {
    setActiveArea(area);
    setSelectedSpot(null);
    setFloor(1);
  }

  return (
    <main className="min-h-screen bg-[#f7f9f8] text-slate-950">
      <GlobalLoader />
      <SpotGoNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-cyan-100/50 blur-3xl" />
        <div className="absolute right-[-180px] top-20 h-[450px] w-[450px] rounded-full bg-blue-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-cyan-700">
                <Sparkles size={12} />
                Smart parking across Karachi
              </div>

              <h1 className="mt-7 max-w-2xl text-[48px] font-black leading-[0.96] tracking-[-0.055em] text-slate-950 sm:text-[62px] lg:text-[76px]">
                Know Your
                <br />
                <span className="text-cyan-500">Spot . </span> Before You <span className="text-cyan-500">GO. </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                Find available parking around Karachi, compare prices,
                choose your exact spot and reserve it before you arrive.
              </p>

              <div className="mt-8 flex max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/5">
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                  <Search size={19} className="shrink-0 text-slate-400" />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search Clifton, DHA, Tariq Road..."
                    className="w-full bg-transparent py-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                <a
                  href="#locations"
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white transition hover:bg-cyan-500 hover:text-slate-950"
                >
                  Find parking
                  <ArrowRight size={14} />
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "Live availability",
                  "Reserve exact spot",
                  "Secure checkout",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[11px] font-bold text-slate-500"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check size={11} strokeWidth={3} />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            <HeroLiveCard activeArea={activeArea} />
          </div>
        </div>
      </section>

      {/* LOCATIONS + ACTUAL MAP */}
      <section
        id="locations"
        className="scroll-mt-24 border-y border-slate-200/70 bg-[#f7f9f8] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
                <LocateFixed size={13} />
                Explore Karachi
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Choose your destination.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Select any location and the map will update to show its
                actual location. Your parking layout updates automatically.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

              <span className="text-[11px] font-black text-slate-700">
                Network online
              </span>

              <span className="text-[10px] font-bold text-slate-400">
                {PARKING_AREAS.length} locations
              </span>
            </div>
          </div>

          <div className="grid overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[390px_1fr]">
            {/* LEFT LOCATIONS */}
            <div className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
              <div className="p-5 sm:p-6">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search locations..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-xs font-semibold text-slate-900 outline-none transition focus:border-cyan-400 focus:bg-white"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                    Parking locations
                  </p>

                  <span className="text-[10px] font-black text-slate-400">
                    {filteredAreas.length} found
                  </span>
                </div>
              </div>

              <div className="max-h-[590px] overflow-y-auto px-3 pb-3 sm:px-4">
                {filteredAreas.map((area) => {
                  const active = area.id === activeArea.id;
                  const percentage = Math.round(
                    (area.available / area.total) * 100
                  );

                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => changeArea(area)}
                      className={cn(
                        "mb-2 w-full rounded-2xl border p-4 text-left transition-all",
                        active
                          ? "border-cyan-300 bg-cyan-50/70 shadow-sm"
                          : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                            active
                              ? "bg-slate-950 text-cyan-400"
                              : "bg-slate-100 text-slate-500"
                          )}
                        >
                          <ParkingCircle size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate text-[13px] font-black text-slate-900">
                                {area.name}
                              </h3>

                              <p className="mt-1 truncate text-[10px] font-medium text-slate-400">
                                {area.location}
                              </p>
                            </div>

                            {active && (
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                                <Check size={12} strokeWidth={3} />
                              </span>
                            )}
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-emerald-600">
                                {area.available} free
                              </span>

                              <span className="text-[9px] text-slate-300">
                                •
                              </span>

                              <span className="text-[10px] font-semibold text-slate-400">
                                {area.distance}
                              </span>
                            </div>

                            <span className="text-[10px] font-black text-slate-700">
                              Rs {area.price}/hr
                            </span>
                          </div>

                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-emerald-400"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {filteredAreas.length === 0 && (
                  <div className="px-5 py-12 text-center">
                    <Search
                      size={24}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-black text-slate-700">
                      No parking found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try another Karachi location.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT ACTUAL MAP */}
            <div className="p-3 sm:p-4">
              <RealMap
                activeArea={activeArea}
                areas={PARKING_AREAS}
                onSelect={changeArea}
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={ParkingCircle}
              label="Live spots"
              value="1,240+"
              sub="available"
            />

            <StatCard
              icon={Building2}
              label="Parking zones"
              value="11"
              sub="across Karachi"
            />

            <StatCard
              icon={Car}
              label="Smart bays"
              value="3,840+"
              sub="connected"
            />

            <StatCard
              icon={ShieldCheck}
              label="Secure parking"
              value="24/7"
              sub="monitored"
            />
          </div>
        </div>
      </section>

      {/* PARKING SPOT SELECTION */}
      <section
        id="parking"
        className="scroll-mt-24 bg-[#f7f9f8] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
                <Car size={13} />
                Exact spot selection
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Pick your spot.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                {activeArea.name} has its own parking architecture. Choose a
                floor, check the lane and reserve the exact bay you want.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-[11px] font-black text-slate-700">
                  {availableCount} spots available
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
            {/* PARKING LAYOUT */}
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
              <div className="border-b border-slate-200 p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                      Parking floor
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
                      {Array.from(
                        { length: activeArea.floors },
                        (_, index) => index + 1
                      ).map((floorNumber) => (
                        <button
                          key={floorNumber}
                          type="button"
                          onClick={() => {
                            setFloor(floorNumber);
                            setSelectedSpot(null);
                          }}
                          className={cn(
                            "flex h-10 min-w-12 shrink-0 items-center justify-center rounded-xl px-3 text-[11px] font-black transition",
                            floor === floorNumber
                              ? "bg-slate-950 text-white shadow-lg"
                              : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                          )}
                        >
                          F{floorNumber}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-emerald-50 px-3 py-2.5 text-center">
                      <p className="text-[8px] font-bold uppercase text-emerald-500">
                        Available
                      </p>

                      <p className="mt-0.5 text-sm font-black text-emerald-600">
                        {availableCount}
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 px-3 py-2.5 text-center">
                      <p className="text-[8px] font-bold uppercase text-blue-400">
                        Reserved
                      </p>

                      <p className="mt-0.5 text-sm font-black text-blue-500">
                        {reservedCount}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 px-3 py-2.5 text-center">
                      <p className="text-[8px] font-bold uppercase text-slate-400">
                        Booked
                      </p>

                      <p className="mt-0.5 text-sm font-black text-slate-600">
                        {bookedCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-7">
                <ParkingArchitecture
                  area={activeArea}
                  floor={floor}
                  spots={spots}
                  selectedSpot={selectedSpot}
                  onSelect={setSelectedSpot}
                />

                {/* LEGEND */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-200 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md border border-emerald-300 bg-emerald-50" />
                    <span className="text-[9px] font-bold text-slate-500">
                      Available
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md border border-blue-300 bg-blue-50" />
                    <span className="text-[9px] font-bold text-slate-500">
                      Reserved
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md border border-slate-300 bg-slate-300" />
                    <span className="text-[9px] font-bold text-slate-500">
                      Booked
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md bg-cyan-500" />
                    <span className="text-[9px] font-bold text-slate-500">
                      Selected
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md border border-violet-300 bg-violet-50" />
                    <span className="text-[9px] font-bold text-slate-500">
                      VIP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="h-fit rounded-[32px] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/15 sm:p-6 xl:sticky xl:top-28">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-400">
                    Reservation
                  </p>

                  <h3 className="mt-2 text-xl font-black tracking-tight">
                    Your parking spot
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <ParkingCircle size={18} className="text-cyan-400" />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      Location
                    </p>

                    <p className="mt-1 truncate text-sm font-black">
                      {activeArea.name}
                    </p>
                  </div>

                  <span className="rounded-lg bg-emerald-400/10 px-2.5 py-1.5 text-[9px] font-black text-emerald-300">
                    F{floor}
                  </span>
                </div>

                <div className="mt-4 h-px bg-white/10" />

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      Selected spot
                    </p>

                    <p className="mt-1 text-lg font-black">
                      {selectedSpot?.id ?? "Choose a spot"}
                    </p>
                  </div>

                  {selectedSpot && (
                    <button
                      type="button"
                      onClick={() => setSelectedSpot(null)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Parking duration
                </p>

                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => setDuration(hours)}
                      className={cn(
                        "rounded-xl border py-3 text-[10px] font-black transition",
                        duration === hours
                          ? "border-cyan-400 bg-cyan-400 text-slate-950"
                          : "border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {hours}h
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {selectedSpot
                      ? `Spot ${selectedSpot.id}`
                      : "Parking rate"}
                  </span>

                  <span className="font-bold">
                    Rs {selectedSpot?.price ?? activeArea.price}/hr
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Duration</span>

                  <span className="font-bold">{duration} hours</span>
                </div>

                <div className="flex items-end justify-between pt-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Estimated total
                  </span>

                  <span className="text-2xl font-black tracking-tight">
                    Rs {total}
                  </span>
                </div>
              </div>

    <button
  type="button"
  disabled={!selectedSpot}
  onClick={() => {
    if (!selectedSpot) return;

    const localUser = localStorage.getItem("spotgo_user");
    const sessionUser = sessionStorage.getItem("spotgo_user");
    const loggedIn = Boolean(localUser || sessionUser);

    const params = new URLSearchParams({
      redirect: "/user/booking",
      spot: selectedSpot.id,
      area: activeArea.name,
      floor: String(floor),
      locationId: String(activeArea.id),
      locationName: activeArea.name,
      price: String(selectedSpot.price),
    });

    // Already logged in → direct booking page
    if (loggedIn) {
      sessionStorage.setItem(
        "spotgo_pending_booking",
        JSON.stringify({
          spot: selectedSpot.id,
          area: activeArea.name,
          floor: String(floor),
          locationId: String(activeArea.id),
          locationName: activeArea.name,
          price: String(selectedSpot.price),
          redirect: "/user/booking",
          createdAt: new Date().toISOString(),
        })
      );

      window.location.href = "/user/booking";
      return;
    }

    // Not logged in → login with booking information
    window.location.href = `/login?${params.toString()}`;
  }}
  className={cn(
    "mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black transition",
    selectedSpot
      ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/10 hover:bg-cyan-300"
      : "cursor-not-allowed bg-white/10 text-slate-600"
  )}
>
  {selectedSpot ? "Reserve this spot" : "Select a spot first"}
  <ArrowRight size={15} />
</button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-semibold text-slate-600">
                <ShieldCheck size={12} />
                Secure reservation • No hidden fees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
              <Route size={13} />
              How it works
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Park in three simple steps.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              No circling the block. No guessing. No parking stress.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: Search,
                title: "Find your area",
                text: "Search Karachi by location and instantly see nearby parking zones.",
              },
              {
                number: "02",
                icon: ParkingCircle,
                title: "Pick your spot",
                text: "Choose the exact floor and parking bay you want before arriving.",
              },
              {
                number: "03",
                icon: Navigation,
                title: "Drive & park",
                text: "Follow the route, arrive at your reserved bay and park with confidence.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-cyan-400 transition group-hover:bg-cyan-400 group-hover:text-slate-950">
                    <item.icon size={19} />
                  </div>

                  <span className="text-5xl font-black tracking-[-0.08em] text-slate-100">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-8 text-lg font-black text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {item.text}
                </p>

                <div className="mt-7 flex items-center gap-2 text-[10px] font-black text-slate-400 transition group-hover:text-cyan-600">
                  Explore SpotGo
                  <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS */}
      <section
        id="business"
        className="scroll-mt-24 bg-[#f7f9f8] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[34px] bg-slate-950 p-7 shadow-2xl sm:p-10 lg:p-14">
            <div className="absolute right-[-100px] top-[-140px] h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-cyan-300">
                  <Building2 size={12} />
                  For parking operators
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  Turn empty parking capacity into a smarter business.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                  Manage occupancy, pricing, reservations and parking
                  operations from one modern platform.
                </p>
              </div>

              <button className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 text-xs font-black text-slate-950 transition hover:bg-cyan-300">
                Become a partner
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <Star size={17} fill="currentColor" />
            </div>

            <div>
              <p className="text-xs font-black text-slate-900">
                Built for busy drivers
              </p>

              <p className="text-[10px] font-medium text-slate-400">
                Simple parking experience, built for modern cities.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[10px] font-black text-slate-400">
            <span className="flex items-center gap-2">
              <Check size={13} className="text-emerald-500" />
              Real-time availability
            </span>

            <span className="flex items-center gap-2">
              <Check size={13} className="text-emerald-500" />
              Exact spot booking
            </span>

            <span className="flex items-center gap-2">
              <Check size={13} className="text-emerald-500" />
              Secure payments
            </span>
          </div>
        </div>
      </section>

      {showAuthModal && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-md"
    onClick={() => setShowAuthModal(false)}
  >
    <div
      className="relative w-full max-w-[440px] overflow-hidden rounded-[30px] border border-white/10 bg-white shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top accent */}
      <div className="h-1.5 bg-cyan-400" />

      <div className="p-6 sm:p-8">

        {/* Close */}
        <button
          type="button"
          onClick={() => setShowAuthModal(false)}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
          <ShieldCheck size={22} />
        </div>

        {/* Heading */}
        <div className="mt-5 pr-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
            Almost there
          </p>

          <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
            Sign in to reserve
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create an account or sign in to continue with your parking
            reservation.
          </p>
        </div>

        {/* Selected spot preview */}
        {selectedSpot && (
          <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Selected spot
              </p>

              <p className="mt-1 text-base font-black text-slate-950">
                {selectedSpot.id}
              </p>

              <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                {activeArea.name} • Floor {floor}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
              <ParkingCircle size={18} />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 space-y-3">

          {/* Login */}
          <button
  type="button"
  onClick={() => {
    if (!selectedSpot) return;

    const params = new URLSearchParams({
      redirect: "/user/booking",
      spot: selectedSpot.id,
      area: activeArea.name,
      floor: String(floor),
      locationId: String(activeArea.id),
      locationName: activeArea.name,
      price: String(selectedSpot.price),
    });

    window.location.href = `/login?${params.toString()}`;
  }}
  className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-black text-white transition hover:bg-slate-900"
>
  Sign in
  <ArrowRight
    size={16}
    className="transition-transform group-hover:translate-x-1"
  />
</button>

          {/* Register */}
         <button
  type="button"
  onClick={() => {
    if (!selectedSpot) return;

    const params = new URLSearchParams({
      redirect: "/user/booking",
      spot: selectedSpot.id,
      area: activeArea.name,
      floor: String(floor),
      locationId: String(activeArea.id),
      locationName: activeArea.name,
      price: String(selectedSpot.price),
    });

    window.location.href = `/register?${params.toString()}`;
  }}
  className="flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-black text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
>
  Create an account
</button>

        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-semibold text-slate-400">
          <LockKeyhole size={12} />
          Your reservation is securely held during checkout
        </div>

      </div>
    </div>
  </div>
)}

      <SpotGoFooter />

      {/* MOBILE RESERVATION BAR */}
      {selectedSpot && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl xl:hidden">
          <div className="mx-auto flex max-w-[700px] items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-cyan-400">
                <ParkingCircle size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-950">
                  Spot {selectedSpot.id}
                </p>

                <p className="truncate text-[9px] font-semibold text-slate-400">
                  {activeArea.name}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Total
              </p>

              <p className="text-sm font-black text-slate-950">
                Rs {total}
              </p>
            </div>

            <button className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-cyan-400 px-4 text-[10px] font-black text-slate-950">
              Reserve
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}