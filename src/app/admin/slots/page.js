"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  Grid3X3,
  MapPin,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Wrench,
  X,
  Zap,
  Navigation,
  ParkingCircle,
  CircleDot,
  Layers3,
} from "lucide-react";

const LOCATION_CONFIG = [
  {
    name: "Ocean Mall Parking",
    area: "Clifton, Karachi",
    total: 320,
    available: 94,
    occupied: 188,
    reserved: 28,
    maintenance: 10,
    prefix: "A",
    offset: 0,
    color: "blue",
  },
  {
    name: "Dolmen Mall Parking",
    area: "Tariq Road, Karachi",
    total: 280,
    available: 61,
    occupied: 187,
    reserved: 24,
    maintenance: 8,
    prefix: "B",
    offset: 2,
    color: "violet",
  },
  {
    name: "Business District Parking",
    area: "Shahrah-e-Faisal",
    total: 240,
    available: 82,
    occupied: 133,
    reserved: 18,
    maintenance: 7,
    prefix: "D",
    offset: 4,
    color: "emerald",
  },
  {
    name: "City Center Parking",
    area: "Saddar, Karachi",
    total: 210,
    available: 73,
    occupied: 108,
    reserved: 20,
    maintenance: 9,
    prefix: "C",
    offset: 6,
    color: "orange",
  },
  {
    name: "Grand Avenue Parking",
    area: "Main Boulevard, Karachi",
    total: 198,
    available: 76,
    occupied: 88,
    reserved: 22,
    maintenance: 12,
    prefix: "E",
    offset: 8,
    color: "cyan",
  },
];

const STATUS_CONFIG = {
  Available: {
    label: "Available",
    icon: Check,
    card:
      "border-emerald-200 bg-emerald-50/80 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
  Occupied: {
    label: "Occupied",
    icon: Car,
    card:
      "border-red-200 bg-red-50/80 text-red-700 hover:border-red-400 hover:bg-red-100",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700",
  },
  Reserved: {
    label: "Reserved",
    icon: Clock3,
    card:
      "border-violet-200 bg-violet-50/80 text-violet-700 hover:border-violet-400 hover:bg-violet-100",
    dot: "bg-violet-500",
    badge: "bg-violet-100 text-violet-700",
  },
  Maintenance: {
    label: "Maintenance",
    icon: Wrench,
    card:
      "border-amber-200 bg-amber-50/80 text-amber-700 hover:border-amber-400 hover:bg-amber-100",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
};

const statusCycle = [
  "Available",
  "Available",
  "Occupied",
  "Available",
  "Occupied",
  "Reserved",
  "Available",
  "Occupied",
  "Available",
  "Maintenance",
  "Occupied",
  "Available",
];

const vehicleModels = [
  "Toyota Corolla",
  "Honda Civic",
  "Suzuki Swift",
  "Toyota Yaris",
  "Honda City",
  "KIA Sportage",
  "Hyundai Tucson",
];

function generateSlots() {
  const result = [];

  LOCATION_CONFIG.forEach((location) => {
    // We visualize the first 96 slots for each location.
    // The complete location totals are shown in the summary cards.
    const visibleCount = 96;

    for (let i = 0; i < visibleCount; i++) {
      const status = statusCycle[(i + location.offset) % statusCycle.length];

      const floor =
        i < 32 ? "Ground Floor" : i < 64 ? "Basement 1" : "Basement 2";

      const zone = i < 32 ? "Zone A" : i < 64 ? "Zone B" : "Zone C";

      const slotNumber = String(i + 1).padStart(2, "0");

      const isElectric = i % 13 === 0;
      const isVip = i % 29 === 0;

      result.push({
        id: `${location.prefix}-${slotNumber}`,
        location: location.name,
        area: location.area,
        status,
        floor,
        zone,
        vehicle:
          status === "Occupied" || status === "Reserved"
            ? vehicleModels[(i + location.offset) % vehicleModels.length]
            : null,
        user:
          status === "Occupied" || status === "Reserved"
            ? [
                "Ahmed Khan",
                "Usman Ali",
                "Hamza Shah",
                "Bilal Ahmed",
                "Saad Malik",
                "Ali Raza",
              ][(i + location.offset) % 6]
            : null,
        entryTime:
          status === "Occupied" || status === "Reserved"
            ? ["06:40 PM", "07:15 PM", "05:50 PM", "04:30 PM"][
                (i + location.offset) % 4
              ]
            : null,
        isElectric,
        isVip,
      });
    }
  });

  return result;
}

const INITIAL_SLOTS = generateSlots();

function SummaryCard({ icon: Icon, label, value, helper, type }) {
  const styles = {
    total: {
      icon: "bg-slate-100 text-slate-700",
      line: "bg-slate-900",
    },
    available: {
      icon: "bg-emerald-100 text-emerald-600",
      line: "bg-emerald-500",
    },
    occupied: {
      icon: "bg-red-100 text-red-600",
      line: "bg-red-500",
    },
    reserved: {
      icon: "bg-violet-100 text-violet-600",
      line: "bg-violet-500",
    },
    maintenance: {
      icon: "bg-amber-100 text-amber-600",
      line: "bg-amber-500",
    },
  };

  const style = styles[type];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div
        className={`absolute left-0 top-0 h-1 w-full ${style.line}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <div className="mt-2 flex items-end gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              {value.toLocaleString()}
            </h3>
          </div>

          <p className="mt-1 text-xs text-slate-400">{helper}</p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon size={21} strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
}

function StatusLegend({ status, count }) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${config.dot}`} />
      <span className="text-sm text-slate-600">{status}</span>
      <span className="text-sm font-semibold text-slate-900">
        {count.toLocaleString()}
      </span>
    </div>
  );
}

function SlotCard({ slot, onClick }) {
  const config = STATUS_CONFIG[slot.status];
  const Icon = config.icon;

  return (
    <motion.button
      layout
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(slot)}
      className={`group relative flex min-h-[100px] flex-col justify-between rounded-xl border p-3 text-left transition-all duration-200 ${config.card}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold">{slot.id}</span>

            {slot.isElectric && (
              <span
                title="EV Charging"
                className="flex h-4 w-4 items-center justify-center rounded bg-cyan-500 text-white"
              >
                <Zap size={10} fill="currentColor" />
              </span>
            )}

            {slot.isVip && (
              <span className="rounded bg-slate-900 px-1 py-0.5 text-[8px] font-bold text-white">
                VIP
              </span>
            )}
          </div>

          <p className="mt-0.5 text-[10px] opacity-70">{slot.zone}</p>
        </div>

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 shadow-sm">
          <Icon size={14} />
        </div>
      </div>

      <div>
        {slot.status === "Available" && (
          <p className="text-[10px] font-medium opacity-70">
            Ready to park
          </p>
        )}

        {slot.status === "Occupied" && (
          <div>
            <p className="truncate text-[10px] font-semibold">
              {slot.vehicle}
            </p>
            <p className="text-[9px] opacity-60">{slot.entryTime}</p>
          </div>
        )}

        {slot.status === "Reserved" && (
          <div>
            <p className="truncate text-[10px] font-semibold">
              {slot.user}
            </p>
            <p className="text-[9px] opacity-60">Reserved</p>
          </div>
        )}

        {slot.status === "Maintenance" && (
          <p className="text-[10px] font-semibold opacity-70">
            Under maintenance
          </p>
        )}
      </div>

      <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-60">
        <Edit3 size={11} />
      </div>
    </motion.button>
  );
}

function SlotModal({ slot, onClose, onSave }) {
  const [status, setStatus] = useState(slot.status);
  const [floor, setFloor] = useState(slot.floor);
  const [zone, setZone] = useState(slot.zone);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <ParkingCircle size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Slot {slot.id}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {slot.location}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Slot ID
              </label>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {slot.id}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Location
              </label>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {slot.location}
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Slot Status
            </label>

            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              >
                {Object.keys(STATUS_CONFIG).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Floor
              </label>

              <div className="relative">
                <select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                >
                  <option>Ground Floor</option>
                  <option>Basement 1</option>
                  <option>Basement 2</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Zone
              </label>

              <div className="relative">
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                >
                  <option>Zone A</option>
                  <option>Zone B</option>
                  <option>Zone C</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          {(slot.vehicle || slot.user) && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Current Session
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] text-slate-400">Vehicle</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {slot.vehicle || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400">Customer</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {slot.user || "—"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                onSave({
                  ...slot,
                  status,
                  floor,
                  zone,
                })
              }
              className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AddSlotModal({ onClose, onAdd }) {
  const [location, setLocation] = useState(LOCATION_CONFIG[0].name);
  const [status, setStatus] = useState("Available");
  const [floor, setFloor] = useState("Ground Floor");
  const [zone, setZone] = useState("Zone A");

  const selectedLocation = LOCATION_CONFIG.find(
    (item) => item.name === location
  );

  const [slotNumber, setSlotNumber] = useState("");

  const submit = () => {
    if (!slotNumber.trim()) return;

    onAdd({
      id: `${selectedLocation.prefix}-${slotNumber.padStart(2, "0")}`,
      location,
      area: selectedLocation.area,
      status,
      floor,
      zone,
      vehicle: null,
      user: null,
      entryTime: null,
      isElectric: false,
      isVip: false,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Add Parking Slot
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Create a new parking slot for your facility
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Parking Location
            </label>

            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              >
                {LOCATION_CONFIG.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Slot Number
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100">
              <div className="flex items-center bg-slate-50 px-4 text-sm font-bold text-slate-500">
                {selectedLocation.prefix}-
              </div>

              <input
                value={slotNumber}
                onChange={(e) =>
                  setSlotNumber(e.target.value.replace(/\D/g, ""))
                }
                placeholder="97"
                className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              >
                {Object.keys(STATUS_CONFIG).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Zone
              </label>

              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              >
                <option>Zone A</option>
                <option>Zone B</option>
                <option>Zone C</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Floor
            </label>

            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
            >
              <option>Ground Floor</option>
              <option>Basement 1</option>
              <option>Basement 2</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={submit}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus size={17} />
              Add Slot
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ParkingSlotsPage() {
  const [slots, setSlots] = useState(INITIAL_SLOTS);

  const [selectedLocation, setSelectedLocation] =
    useState("All Locations");

  const [statusFilter, setStatusFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [viewMode, setViewMode] = useState("grid");

  const totals = useMemo(() => {
    return LOCATION_CONFIG.reduce(
      (acc, location) => {
        acc.total += location.total;
        acc.available += location.available;
        acc.occupied += location.occupied;
        acc.reserved += location.reserved;
        acc.maintenance += location.maintenance;

        return acc;
      },
      {
        total: 0,
        available: 0,
        occupied: 0,
        reserved: 0,
        maintenance: 0,
      }
    );
  }, []);

  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      const matchesLocation =
        selectedLocation === "All Locations" ||
        slot.location === selectedLocation;

      const matchesStatus =
        statusFilter === "All" || slot.status === statusFilter;

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        slot.id.toLowerCase().includes(query) ||
        slot.location.toLowerCase().includes(query) ||
        slot.area.toLowerCase().includes(query) ||
        (slot.vehicle &&
          slot.vehicle.toLowerCase().includes(query)) ||
        (slot.user && slot.user.toLowerCase().includes(query));

      return matchesLocation && matchesStatus && matchesSearch;
    });
  }, [slots, selectedLocation, statusFilter, search]);

  const currentLocation = useMemo(() => {
    if (selectedLocation === "All Locations") return null;

    return LOCATION_CONFIG.find(
      (location) => location.name === selectedLocation
    );
  }, [selectedLocation]);

  const handleSaveSlot = (updatedSlot) => {
    setSlots((current) =>
      current.map((slot) =>
        slot.id === updatedSlot.id ? updatedSlot : slot
      )
    );

    setSelectedSlot(null);
  };

  const handleAddSlot = (newSlot) => {
    setSlots((current) => [newSlot, ...current]);
    setShowAddModal(false);
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 text-[11px] font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              LIVE SYSTEM
            </span>

            <span className="text-xs text-slate-400">
              Last synced just now
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Parking Slots
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and update parking slot availability across all facilities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex h-10 items-center gap-2 rounded-xl border px-3 text-sm font-semibold transition ${
              viewMode === "grid"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Grid3X3 size={16} />
            Grid
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            <Plus size={17} />
            Add Parking Slot
          </button>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        <SummaryCard
          icon={ParkingCircle}
          label="Total Slots"
          value={totals.total}
          helper="Across all locations"
          type="total"
        />

        <SummaryCard
          icon={Check}
          label="Available"
          value={totals.available}
          helper={`${((totals.available / totals.total) * 100).toFixed(
            1
          )}% of capacity`}
          type="available"
        />

        <SummaryCard
          icon={Car}
          label="Occupied"
          value={totals.occupied}
          helper={`${((totals.occupied / totals.total) * 100).toFixed(
            1
          )}% currently occupied`}
          type="occupied"
        />

        <SummaryCard
          icon={Clock3}
          label="Reserved"
          value={totals.reserved}
          helper="Upcoming bookings"
          type="reserved"
        />

        <SummaryCard
          icon={Wrench}
          label="Maintenance"
          value={totals.maintenance}
          helper="Temporarily unavailable"
          type="maintenance"
        />
      </motion.div>

      {/* Location selector */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <MapPin size={17} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Parking Locations
              </h2>
              <p className="text-xs text-slate-400">
                Select a facility to manage its slots
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Navigation size={13} />
            Karachi Parking Network
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedLocation("All Locations")}
            className={`min-w-[180px] rounded-xl border p-3 text-left transition ${
              selectedLocation === "All Locations"
                ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <p
              className={`text-xs font-semibold ${
                selectedLocation === "All Locations"
                  ? "text-white"
                  : "text-slate-500"
              }`}
            >
              All Locations
            </p>

            <div className="mt-2 flex items-end justify-between">
              <span className="text-xl font-bold">
                {totals.total.toLocaleString()}
              </span>

              <span
                className={`text-[10px] ${
                  selectedLocation === "All Locations"
                    ? "text-slate-300"
                    : "text-slate-400"
                }`}
              >
                slots
              </span>
            </div>
          </button>

          {LOCATION_CONFIG.map((location) => {
            const occupancy =
              ((location.occupied + location.reserved) / location.total) *
              100;

            const active = selectedLocation === location.name;

            return (
              <button
                key={location.name}
                onClick={() => setSelectedLocation(location.name)}
                className={`min-w-[220px] rounded-xl border p-3 text-left transition ${
                  active
                    ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p
                      className={`text-xs font-bold ${
                        active ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {location.name}
                    </p>

                    <p
                      className={`mt-0.5 text-[10px] ${
                        active ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {location.area}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                      occupancy >= 75
                        ? active
                          ? "bg-red-500/20 text-red-200"
                          : "bg-red-50 text-red-600"
                        : active
                        ? "bg-emerald-500/20 text-emerald-200"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {occupancy.toFixed(0)}%
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`text-lg font-bold ${
                      active ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {location.total}
                  </span>

                  <span
                    className={`text-[10px] ${
                      active ? "text-slate-300" : "text-slate-400"
                    }`}
                  >
                    total slots
                  </span>
                </div>

                <div
                  className={`mt-2 h-1.5 overflow-hidden rounded-full ${
                    active ? "bg-white/10" : "bg-slate-100"
                  }`}
                >
                  <div
                    className={`h-full rounded-full ${
                      occupancy >= 75
                        ? "bg-red-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${occupancy}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search slot, customer, vehicle..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["All", "Available", "Occupied", "Reserved", "Maintenance"].map(
              (status) => {
                const active = statusFilter === status;

                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-slate-900 text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {status}
                  </button>
                );
              }
            )}

            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
              <Settings2 size={14} />
              More Filters
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main slot area */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Slot map header */}
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    {selectedLocation === "All Locations"
                      ? "Parking Slot Map"
                      : selectedLocation}
                  </h2>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                    {filteredSlots.length} shown
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Click any slot to view or update its details.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <StatusLegend
                  status="Available"
                  count={
                    currentLocation
                      ? currentLocation.available
                      : totals.available
                  }
                />

                <StatusLegend
                  status="Occupied"
                  count={
                    currentLocation
                      ? currentLocation.occupied
                      : totals.occupied
                  }
                />

                <StatusLegend
                  status="Reserved"
                  count={
                    currentLocation
                      ? currentLocation.reserved
                      : totals.reserved
                  }
                />
              </div>
            </div>
          </div>

          {/* Driving lane */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-3">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <Navigation size={12} />
              <span>Entry</span>
              <div className="h-px w-16 bg-slate-200 sm:w-28" />
              <span>Drive Aisle</span>
              <div className="h-px w-16 bg-slate-200 sm:w-28" />
              <span>Exit</span>
              <Navigation size={12} className="rotate-180" />
            </div>
          </div>

          <div className="p-5">
            <AnimatePresence mode="popLayout">
              {filteredSlots.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6"
                >
                  {filteredSlots.map((slot) => (
                    <SlotCard
                      key={`${slot.location}-${slot.id}`}
                      slot={slot}
                      onClick={setSelectedSlot}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <Search size={23} />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-800">
                    No slots found
                  </h3>

                  <p className="mt-1 max-w-sm text-sm text-slate-400">
                    Try changing your search or status filter to see more
                    parking slots.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All");
                    }}
                    className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Map footer */}
          <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Available
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  Occupied
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                  Reserved
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  Maintenance
                </span>
              </div>

              <p className="text-xs text-slate-400">
                Showing visualized slots for faster management
              </p>
            </div>
          </div>
        </motion.section>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Location overview */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Location Overview
                </p>

                <h3 className="mt-1 text-base font-bold text-slate-900">
                  {currentLocation
                    ? currentLocation.name
                    : "All Facilities"}
                </h3>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Layers3 size={17} />
              </div>
            </div>

            {currentLocation ? (
              <>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">
                      {(
                        ((currentLocation.occupied +
                          currentLocation.reserved) /
                          currentLocation.total) *
                        100
                      ).toFixed(0)}
                      %
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Current occupancy
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      currentLocation.occupied +
                        currentLocation.reserved >
                      currentLocation.total * 0.75
                        ? "bg-red-50 text-red-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {currentLocation.occupied +
                      currentLocation.reserved >
                    currentLocation.total * 0.75
                      ? "Busy"
                      : "Healthy"}
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ((currentLocation.occupied +
                          currentLocation.reserved) /
                          currentLocation.total) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 0.7 }}
                    className="h-full rounded-full bg-slate-900"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Available
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      {currentLocation.available}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      Occupied
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      {currentLocation.occupied}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-violet-500" />
                      Reserved
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      {currentLocation.reserved}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      Maintenance
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      {currentLocation.maintenance}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                    <MapPin size={19} className="text-slate-600" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      5 Active Locations
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Across Karachi
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Sparkles size={17} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Quick Actions
                </h3>

                <p className="text-[11px] text-slate-400">
                  Manage your parking network
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Plus size={15} />
                  </span>

                  <span>
                    <span className="block text-xs font-bold text-slate-800">
                      Add New Slot
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      Create a parking slot
                    </span>
                  </span>
                </span>

                <ChevronDown
                  size={14}
                  className="-rotate-90 text-slate-300"
                />
              </button>

              <button
                onClick={() => {
                  setStatusFilter("Maintenance");
                  setSelectedLocation("All Locations");
                }}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Wrench size={15} />
                  </span>

                  <span>
                    <span className="block text-xs font-bold text-slate-800">
                      Maintenance Slots
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      Review unavailable slots
                    </span>
                  </span>
                </span>

                <span className="rounded-full bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-600">
                  {totals.maintenance}
                </span>
              </button>

              <button
                onClick={() => {
                  setStatusFilter("Reserved");
                  setSelectedLocation("All Locations");
                }}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <Clock3 size={15} />
                  </span>

                  <span>
                    <span className="block text-xs font-bold text-slate-800">
                      Reserved Slots
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      View upcoming reservations
                    </span>
                  </span>
                </span>

                <span className="rounded-full bg-violet-50 px-2 py-1 text-[9px] font-bold text-violet-600">
                  {totals.reserved}
                </span>
              </button>
            </div>
          </motion.div>

          {/* System status */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.34 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  System Status
                </p>

                <h3 className="mt-1 text-lg font-bold">
                  Parking Network Online
                </h3>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CircleDot size={18} />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Slot monitoring
                </span>

                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Operational
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Availability sync
                </span>

                <span className="text-xs font-semibold text-white">
                  Live
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Last update
                </span>

                <span className="text-xs font-semibold text-white">
                  Just now
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedSlot && (
          <SlotModal
            key="slot-modal"
            slot={selectedSlot}
            onClose={() => setSelectedSlot(null)}
            onSave={handleSaveSlot}
          />
        )}

        {showAddModal && (
          <AddSlotModal
            key="add-modal"
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddSlot}
          />
        )}
      </AnimatePresence>
    </div>
  );
}