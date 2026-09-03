"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  Gauge,
  Globe2,
  Info,
  Landmark,
  MapPin,
  Navigation,
  ParkingCircle,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";

const locations = [
  {
    id: "ocean",
    name: "Ocean Mall Parking",
    shortName: "Ocean Mall",
    area: "Clifton, Karachi",
    address: "Ocean Mall, Khayaban-e-Iqbal, Clifton Block 9",
    phone: "+92 21 111 111 001",
    email: "ocean@spotgo.pk",
    type: "Shopping Mall",
    floors: 4,
    totalSlots: 320,
    availableSlots: 94,
    occupancy: 71,
    rating: 4.8,
    status: "Operational",
    opened: "08:00 AM",
    closes: "12:00 AM",
    peak: "06:00 PM – 10:00 PM",
    monthlyUsers: 8420,
    revenue: 1286400,
    coordinates: "24.8138° N, 67.0305° E",
    manager: "Ahmed Raza",
    amenities: ["CCTV", "EV Charging", "Security", "Car Wash", "Valet", "Wi-Fi"],
    rules: [
      "Maximum parking duration: 12 hours",
      "Reserved slots must be occupied within 15 minutes",
      "No overnight parking without approval",
      "EV charging requires active parking session",
    ],
  },
  {
    id: "dolmen",
    name: "Dolmen Mall Parking",
    shortName: "Dolmen Mall",
    area: "Tariq Road, Karachi",
    address: "Dolmen Mall, Tariq Road, PECHS",
    phone: "+92 21 111 111 002",
    email: "dolmen@spotgo.pk",
    type: "Shopping Mall",
    floors: 3,
    totalSlots: 280,
    availableSlots: 61,
    occupancy: 78,
    rating: 4.7,
    status: "High Traffic",
    opened: "08:00 AM",
    closes: "11:30 PM",
    peak: "05:30 PM – 09:30 PM",
    monthlyUsers: 7310,
    revenue: 1168200,
    coordinates: "24.8766° N, 67.0624° E",
    manager: "Usman Farooq",
    amenities: ["CCTV", "Security", "EV Charging", "Valet", "Wi-Fi"],
    rules: [
      "Maximum parking duration: 10 hours",
      "Valet area is restricted to authorized vehicles",
      "Reserved bookings expire after 15 minutes",
      "Follow floor-specific parking signs",
    ],
  },
  {
    id: "business",
    name: "Business District Parking",
    shortName: "Business District",
    area: "Shahrah-e-Faisal",
    address: "Main Shahrah-e-Faisal, PECHS Extension",
    phone: "+92 21 111 111 003",
    email: "business@spotgo.pk",
    type: "Commercial",
    floors: 3,
    totalSlots: 240,
    availableSlots: 82,
    occupancy: 66,
    rating: 4.6,
    status: "Operational",
    opened: "06:00 AM",
    closes: "01:00 AM",
    peak: "08:00 AM – 11:00 AM",
    monthlyUsers: 6250,
    revenue: 948700,
    coordinates: "24.8748° N, 67.0891° E",
    manager: "Bilal Ahmed",
    amenities: ["CCTV", "Security", "EV Charging", "Wi-Fi", "Covered Parking"],
    rules: [
      "Business-hour rates apply from 08:00 AM",
      "No blocking of emergency access lanes",
      "Monthly permit holders must use assigned zones",
      "Security clearance may be required for restricted zones",
    ],
  },
  {
    id: "city",
    name: "City Center Parking",
    shortName: "City Center",
    area: "Saddar, Karachi",
    address: "City Center Plaza, Saddar, Karachi",
    phone: "+92 21 111 111 004",
    email: "citycenter@spotgo.pk",
    type: "City Center",
    floors: 3,
    totalSlots: 210,
    availableSlots: 73,
    occupancy: 65,
    rating: 4.5,
    status: "Operational",
    opened: "07:00 AM",
    closes: "12:00 AM",
    peak: "04:00 PM – 09:00 PM",
    monthlyUsers: 5480,
    revenue: 812500,
    coordinates: "24.8607° N, 67.0011° E",
    manager: "Hamza Shah",
    amenities: ["CCTV", "Security", "Valet", "Covered Parking", "Wi-Fi"],
    rules: [
      "Maximum parking duration: 8 hours",
      "Keep entrance and exit lanes clear",
      "Valet parking is available during peak hours",
      "Lost ticket replacement requires vehicle verification",
    ],
  },
  {
    id: "grand",
    name: "Grand Avenue Parking",
    shortName: "Grand Avenue",
    area: "Main Boulevard, Karachi",
    address: "Grand Avenue Commercial Complex, Main Boulevard",
    phone: "+92 21 111 111 005",
    email: "grandavenue@spotgo.pk",
    type: "Commercial",
    floors: 2,
    totalSlots: 198,
    availableSlots: 76,
    occupancy: 61,
    rating: 4.7,
    status: "Operational",
    opened: "08:00 AM",
    closes: "11:00 PM",
    peak: "06:00 PM – 09:00 PM",
    monthlyUsers: 4920,
    revenue: 736400,
    coordinates: "24.8721° N, 67.0648° E",
    manager: "Saad Malik",
    amenities: ["CCTV", "Security", "EV Charging", "Car Wash", "Wi-Fi"],
    rules: [
      "Parking is limited to 12 hours",
      "EV charging spots are reserved for electric vehicles",
      "No commercial loading inside parking zones",
      "Security team may inspect suspicious vehicles",
    ],
  },
];

const defaultForm = {
  name: "",
  area: "",
  address: "",
  phone: "",
  email: "",
  type: "",
  manager: "",
  opened: "",
  closes: "",
  peak: "",
};

function occupancyLabel(value) {
  if (value >= 80) return "Critical";
  if (value >= 70) return "High";
  if (value >= 55) return "Moderate";
  return "Low";
}

function occupancyClass(value) {
  if (value >= 80) {
    return "from-rose-500 to-red-500";
  }

  if (value >= 70) {
    return "from-orange-500 to-amber-400";
  }

  return "from-emerald-500 to-cyan-400";
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-PK").format(value);
}

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  trend,
  accent = "blue",
}) {
  const accents = {
    blue: "from-blue-500/15 via-cyan-500/10 to-transparent text-blue-600",
    emerald:
      "from-emerald-500/15 via-teal-500/10 to-transparent text-emerald-600",
    violet:
      "from-violet-500/15 via-purple-500/10 to-transparent text-violet-600",
    orange:
      "from-orange-500/15 via-amber-500/10 to-transparent text-orange-600",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accents[accent]} opacity-60`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>

          <div className="mt-2 flex items-end gap-2">
            <h3 className="text-[27px] font-black tracking-tight text-slate-900">
              {value}
            </h3>

            {trend && (
              <span className="mb-1 flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                <ArrowUpRight size={11} />
                {trend}
              </span>
            )}
          </div>

          <p className="mt-1 text-[12px] font-medium text-slate-400">
            {helper}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 ${accents[
            accent
          ].split(" ").pop()}`}
        >
          <Icon size={20} strokeWidth={2.2} />
        </div>
      </div>
    </motion.div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 ring-1 ring-slate-200">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-[13px] font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/70 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ParkingInformationPage() {
  const [activeId, setActiveId] = useState("ocean");
  const [locationData, setLocationData] = useState(locations);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [saved, setSaved] = useState(false);

  const active = useMemo(
    () => locationData.find((location) => location.id === activeId),
    [locationData, activeId]
  );

  const totalSlots = locationData.reduce(
    (sum, location) => sum + location.totalSlots,
    0
  );

  const availableSlots = locationData.reduce(
    (sum, location) => sum + location.availableSlots,
    0
  );

  const avgOccupancy = Math.round(
    locationData.reduce((sum, location) => sum + location.occupancy, 0) /
      locationData.length
  );

  const totalMonthlyUsers = locationData.reduce(
    (sum, location) => sum + location.monthlyUsers,
    0
  );

  const openEdit = () => {
    setSaved(false);
    setShowEdit(true);
  };

  const saveChanges = (form) => {
    setLocationData((current) =>
      current.map((location) =>
        location.id === active.id
          ? {
              ...location,
              ...form,
            }
          : location
      )
    );

    setSaved(true);

    setTimeout(() => {
      setShowEdit(false);
      setSaved(false);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-[1700px] space-y-6 pb-10">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[30px] border border-slate-200/70 bg-[#0b1220] shadow-[0_20px_70px_rgba(15,23,42,0.12)]"
      >
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-9">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              LIVE PARKING NETWORK
            </div>

            <h1 className="max-w-3xl text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
              Parking Information
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                Command Center
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Manage facility information, operating hours, contact details,
              amenities and parking rules across your entire SPOT-GO network.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={openEdit}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                <Edit3 size={15} />
                Edit Information
              </button>

              <button
                onClick={() => setShowDetails(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <Info size={15} />
                Facility Details
              </button>
            </div>
          </div>

          <div className="hidden min-w-[240px] items-center justify-center lg:flex">
            <div className="relative h-44 w-44">
              <div className="absolute inset-0 rounded-full border border-blue-400/20" />
              <div className="absolute inset-5 rounded-full border border-cyan-400/20" />
              <div className="absolute inset-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/10 shadow-[0_0_60px_rgba(59,130,246,0.15)]">
                <ParkingCircle
                  size={54}
                  strokeWidth={1.4}
                  className="text-cyan-300"
                />
              </div>

              <div className="absolute right-1 top-8 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                <Activity size={11} className="text-emerald-300" />
                LIVE
              </div>

              <div className="absolute bottom-3 left-0 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md">
                <p className="text-[9px] uppercase tracking-wider text-slate-400">
                  Network
                </p>
                <p className="text-sm font-black text-white">
                  {locationData.length} Facilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Building2}
          label="Active Facilities"
          value={locationData.length}
          helper="Across Karachi"
          trend="+1 this month"
          accent="blue"
        />

        <StatCard
          icon={ParkingCircle}
          label="Network Capacity"
          value={totalSlots.toLocaleString()}
          helper={`${availableSlots} slots currently available`}
          accent="emerald"
        />

        <StatCard
          icon={Gauge}
          label="Average Occupancy"
          value={`${avgOccupancy}%`}
          helper="Live network utilization"
          trend="+4.2%"
          accent="violet"
        />

        <StatCard
          icon={Users}
          label="Monthly Users"
          value={`${(totalMonthlyUsers / 1000).toFixed(1)}K`}
          helper="Across all facilities"
          trend="+12.8%"
          accent="orange"
        />
      </div>

      {/* LOCATION SELECTOR */}
      <section className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.045)] sm:p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-blue-600">
              Facility Network
            </p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900">
              Select a parking facility
            </h2>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Data synchronized
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {locationData.map((location) => {
            const isActive = location.id === activeId;

            return (
              <motion.button
                key={location.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setActiveId(location.id)}
                className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-[0_10px_30px_rgba(37,99,235,0.12)]"
                    : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white"
                }`}
              >
                {isActive && (
                  <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-blue-500/10 blur-xl" />
                )}

                <div className="relative flex items-start justify-between gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "bg-white text-slate-500 ring-1 ring-slate-200"
                    }`}
                  >
                    <Building2 size={18} />
                  </div>

                  {isActive && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>

                <h3 className="relative mt-3 text-sm font-black text-slate-900">
                  {location.shortName}
                </h3>

                <p className="relative mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <MapPin size={11} />
                  {location.area}
                </p>

                <div className="relative mt-4 flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold ${
                      location.occupancy >= 70
                        ? "text-orange-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {location.occupancy}% occupied
                  </span>

                  <span className="text-[10px] font-bold text-slate-400">
                    {location.availableSlots} free
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${occupancyClass(
                      location.occupancy
                    )}`}
                    style={{ width: `${location.occupancy}%` }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* MAIN INFORMATION */}
      <div className="grid gap-6 xl:grid-cols-[1.55fr_0.95fr]">
        {/* LEFT */}
        <div className="space-y-6">
          <motion.section
            key={active.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.05)]"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#101a2d] to-blue-950 px-6 py-7 sm:px-8">
              <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute bottom-0 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                      {active.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-slate-300">
                      {active.type}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {active.name}
                  </h2>

                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <MapPin size={13} className="text-cyan-300" />
                    {active.address}
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
                  <Star
                    size={17}
                    fill="currentColor"
                    className="text-amber-300"
                  />
                  <div>
                    <p className="text-sm font-black text-white">
                      {active.rating}
                    </p>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">
                      Facility rating
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Landmark size={16} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900">
                    Facility Information
                  </h3>
                </div>

                <div className="space-y-4">
                  <InfoRow
                    icon={MapPin}
                    label="Location"
                    value={active.area}
                  />
                  <InfoRow
                    icon={Navigation}
                    label="Coordinates"
                    value={active.coordinates}
                  />
                  <InfoRow
                    icon={Building2}
                    label="Facility Type"
                    value={`${active.type} • ${active.floors} floors`}
                  />
                  <InfoRow
                    icon={Users}
                    label="Facility Manager"
                    value={active.manager}
                  />
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                    <Phone size={16} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900">
                    Contact Information
                  </h3>
                </div>

                <div className="space-y-4">
                  <InfoRow
                    icon={Phone}
                    label="Support Phone"
                    value={active.phone}
                  />
                  <InfoRow
                    icon={Globe2}
                    label="Email"
                    value={active.email}
                  />
                  <InfoRow
                    icon={Clock3}
                    label="Operating Hours"
                    value={`${active.opened} – ${active.closes}`}
                  />
                  <InfoRow
                    icon={Activity}
                    label="Peak Hours"
                    value={active.peak}
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* CAPACITY */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Total Capacity
                </span>
                <ParkingCircle size={18} className="text-blue-500" />
              </div>

              <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                {active.totalSlots}
              </p>

              <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Parking slots
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Available Now
                </span>
                <Zap size={18} className="text-emerald-500" />
              </div>

              <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                {active.availableSlots}
              </p>

              <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Ready for booking
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Occupancy
                </span>
                <Gauge size={18} className="text-violet-500" />
              </div>

              <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                {active.occupancy}%
              </p>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${occupancyClass(
                    active.occupancy
                  )}`}
                  style={{ width: `${active.occupancy}%` }}
                />
              </div>
            </div>
          </section>

          {/* AMENITIES */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
                  Facility Experience
                </p>
                <h3 className="mt-1 text-xl font-black text-slate-900">
                  Amenities & Services
                </h3>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500">
                {active.amenities.length} available
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {active.amenities.map((amenity, index) => {
                const icons = [ShieldCheck, Zap, Car, Sparkles, Star, Wifi];
                const Icon = icons[index % icons.length];

                return (
                  <motion.div
                    key={amenity}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition hover:border-blue-100 hover:bg-blue-50/40"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                      <Icon size={17} />
                    </div>

                    <div>
                      <p className="text-xs font-black text-slate-800">
                        {amenity}
                      </p>
                      <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                        Available facility
                      </p>
                    </div>

                    <Check
                      size={15}
                      className="ml-auto text-emerald-500"
                      strokeWidth={3}
                    />
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* LIVE STATUS */}
          <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-[0_18px_50px_rgba(37,99,235,0.2)]">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 left-10 h-36 w-36 rounded-full bg-cyan-300/10 blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-200">
                    Live Facility Status
                  </p>
                  <h3 className="mt-1 text-xl font-black">
                    {active.shortName}
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Activity size={18} />
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-5xl font-black tracking-[-0.05em]">
                    {active.occupancy}%
                  </p>
                  <p className="mt-1 text-xs font-medium text-blue-200">
                    {occupancyLabel(active.occupancy)} occupancy
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black">
                    {active.availableSlots}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                    slots free
                  </p>
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${active.occupancy}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-white"
                />
              </div>

              <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold text-blue-100">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                Live data updated just now
              </div>
            </div>
          </section>

          {/* HOURS */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-violet-600">
                  Availability
                </p>
                <h3 className="mt-1 text-xl font-black text-slate-900">
                  Operating Schedule
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <CalendarDays size={18} />
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Monday – Sunday
                </span>

                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black uppercase text-emerald-700">
                  Open Today
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 rounded-xl bg-white p-3 ring-1 ring-slate-200">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Opens
                  </p>
                  <p className="mt-1 text-sm font-black text-slate-800">
                    {active.opened}
                  </p>
                </div>

                <div className="text-slate-300">—</div>

                <div className="flex-1 rounded-xl bg-white p-3 ring-1 ring-slate-200">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Closes
                  </p>
                  <p className="mt-1 text-sm font-black text-slate-800">
                    {active.closes}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/60 p-4">
              <Clock3 size={17} className="mt-0.5 shrink-0 text-orange-500" />
              <div>
                <p className="text-xs font-black text-orange-900">
                  Peak traffic window
                </p>
                <p className="mt-1 text-[11px] font-medium leading-5 text-orange-700">
                  {active.peak}. Dynamic pricing may apply during peak hours.
                </p>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <Phone size={18} />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-600">
                  Facility Contact
                </p>
                <h3 className="mt-1 text-lg font-black text-slate-900">
                  Support & Management
                </h3>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5">
                <Phone size={16} className="text-slate-500" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Phone
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-slate-700">
                    {active.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5">
                <Globe2 size={16} className="text-slate-500" />
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </p>
                  <p className="mt-0.5 truncate text-xs font-bold text-slate-700">
                    {active.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5">
                <Users size={16} className="text-slate-500" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Facility Manager
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-slate-700">
                    {active.manager}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* MAP */}
          <section className="relative min-h-[250px] overflow-hidden rounded-[28px] border border-slate-200 bg-[#eaf1f4] shadow-sm">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: `
                  linear-gradient(30deg, transparent 48%, rgba(148,163,184,.35) 49%, rgba(148,163,184,.35) 51%, transparent 52%),
                  linear-gradient(120deg, transparent 48%, rgba(148,163,184,.25) 49%, rgba(148,163,184,.25) 51%, transparent 52%)
                `,
                backgroundSize: "80px 80px",
              }}
            />

            <div className="absolute left-[18%] top-[24%] h-[3px] w-[75%] rotate-[8deg] bg-white shadow-sm" />
            <div className="absolute left-[7%] top-[58%] h-[3px] w-[85%] -rotate-[15deg] bg-white shadow-sm" />
            <div className="absolute left-[42%] top-[4%] h-[92%] w-[3px] rotate-[12deg] bg-white shadow-sm" />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/15">
                <div className="absolute h-10 w-10 animate-ping rounded-full bg-blue-500/20" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/30">
                  <MapPin size={19} fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="absolute left-4 top-4 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-600">
                Facility Location
              </p>
              <p className="mt-1 text-xs font-black text-slate-800">
                {active.shortName}
              </p>
              <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                {active.area}
              </p>
            </div>

            <button className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-[10px] font-bold text-white shadow-xl transition hover:bg-slate-800">
              <Navigation size={13} />
              Open Directions
            </button>
          </section>
        </div>
      </div>

      {/* RULES */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <AlertCircle size={19} />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-600">
                Facility Policy
              </p>
              <h3 className="mt-1 text-xl font-black text-slate-900">
                Parking Rules & Guidelines
              </h3>
            </div>
          </div>

          <button
            onClick={openEdit}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Edit3 size={14} />
            Manage Information
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {active.rules.map((rule, index) => (
            <motion.div
              key={rule}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                <span className="text-[10px] font-black">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="pt-1 text-xs font-semibold leading-5 text-slate-600">
                {rule}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDIT MODAL */}
      {showEdit && (
        <EditModal
          active={active}
          saved={saved}
          onClose={() => setShowEdit(false)}
          onSave={saveChanges}
        />
      )}

      {/* DETAILS MODAL */}
      {showDetails && (
        <Modal onClose={() => setShowDetails(false)}>
          <div className="border-b border-slate-100 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
                  Facility Profile
                </p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  {active.name}
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  Complete facility information
                </p>
              </div>

              <button
                onClick={() => setShowDetails(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-7">
            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="text-[9px] font-black uppercase tracking-wider text-blue-500">
                Capacity
              </p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {active.totalSlots}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                Total parking slots
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-[9px] font-black uppercase tracking-wider text-emerald-500">
                Available
              </p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {active.availableSlots}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                Slots currently free
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-4">
              <p className="text-[9px] font-black uppercase tracking-wider text-violet-500">
                Monthly Users
              </p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {active.monthlyUsers.toLocaleString()}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                Estimated active users
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="text-[9px] font-black uppercase tracking-wider text-orange-500">
                Monthly Revenue
              </p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                Rs {formatMoney(active.revenue)}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                Parking revenue
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 p-6 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow icon={MapPin} label="Address" value={active.address} />
              <InfoRow
                icon={Navigation}
                label="Coordinates"
                value={active.coordinates}
              />
              <InfoRow icon={Phone} label="Phone" value={active.phone} />
              <InfoRow icon={Globe2} label="Email" value={active.email} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function EditModal({ active, onClose, onSave, saved }) {
  const [form, setForm] = useState({
    name: active.name,
    area: active.area,
    address: active.address,
    phone: active.phone,
    email: active.email,
    type: active.type,
    manager: active.manager,
    opened: active.opened,
    closes: active.closes,
    peak: active.peak,
  });

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <Modal onClose={onClose}>
      <div className="border-b border-slate-100 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-blue-600">
              <Edit3 size={11} />
              Facility Editor
            </div>

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Edit Parking Information
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Update public-facing facility information for {active.shortName}.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-7">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Building2 size={16} className="text-blue-600" />
            <h3 className="text-sm font-black text-slate-900">
              Facility Details
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Facility Name"
              value={form.name}
              onChange={(value) => update("name", value)}
            />

            <Field
              label="Area"
              value={form.area}
              onChange={(value) => update("area", value)}
            />

            <Field
              label="Address"
              value={form.address}
              onChange={(value) => update("address", value)}
              full
            />

            <Field
              label="Facility Type"
              value={form.type}
              onChange={(value) => update("type", value)}
            />

            <Field
              label="Facility Manager"
              value={form.manager}
              onChange={(value) => update("manager", value)}
            />
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Phone size={16} className="text-cyan-600" />
            <h3 className="text-sm font-black text-slate-900">
              Contact Details
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Phone"
              value={form.phone}
              onChange={(value) => update("phone", value)}
            />

            <Field
              label="Email"
              value={form.email}
              onChange={(value) => update("email", value)}
            />
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Clock3 size={16} className="text-violet-600" />
            <h3 className="text-sm font-black text-slate-900">
              Operating Schedule
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Opening Time"
              value={form.opened}
              onChange={(value) => update("opened", value)}
            />

            <Field
              label="Closing Time"
              value={form.closes}
              onChange={(value) => update("closes", value)}
            />

            <Field
              label="Peak Hours"
              value={form.peak}
              onChange={(value) => update("peak", value)}
              full
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            disabled={saved}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {saved ? (
              <>
                <Check size={15} />
                Changes Saved
              </>
            ) : (
              <>
                <Save size={15} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Field({ label, value, onChange, full = false }) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
    </label>
  );
}