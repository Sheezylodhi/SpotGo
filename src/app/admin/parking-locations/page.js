"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Car,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  ExternalLink,
  Gauge,
  Globe2,
  Layers3,
  MapPin,
  Navigation,
  ParkingCircle,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Wifi,
  X,
  Zap,
  Trash2,
  Save,
} from "lucide-react";

const initialLocations = [
  {
    id: "LOC-001",
    name: "Ocean Mall Parking",
    shortName: "Ocean Mall",
    area: "Clifton, Karachi",
    address: "Ocean Mall, Khayaban-e-Iqbal, Clifton Block 9",
    type: "Shopping Mall",
    status: "Operational",
    manager: "Ahmed Raza",
    phone: "+92 21 111 111 001",
    email: "ocean@spotgo.pk",
    floors: 4,
    totalSlots: 320,
    available: 94,
    occupied: 188,
    reserved: 28,
    maintenance: 10,
    occupancy: 71,
    rating: 4.8,
    monthlyUsers: 8420,
    revenue: 1286400,
    opened: "08:00 AM",
    closes: "12:00 AM",
    coordinates: "24.8138° N, 67.0305° E",
    zones: 8,
    evSlots: 18,
    security: "24/7",
  },
  {
    id: "LOC-002",
    name: "Dolmen Mall Parking",
    shortName: "Dolmen Mall",
    area: "Tariq Road, Karachi",
    address: "Dolmen Mall, Tariq Road, PECHS",
    type: "Shopping Mall",
    status: "High Traffic",
    manager: "Usman Farooq",
    phone: "+92 21 111 111 002",
    email: "dolmen@spotgo.pk",
    floors: 3,
    totalSlots: 280,
    available: 61,
    occupied: 187,
    reserved: 24,
    maintenance: 8,
    occupancy: 78,
    rating: 4.7,
    monthlyUsers: 7310,
    revenue: 1168200,
    opened: "08:00 AM",
    closes: "11:30 PM",
    coordinates: "24.8766° N, 67.0624° E",
    zones: 7,
    evSlots: 12,
    security: "24/7",
  },
  {
    id: "LOC-003",
    name: "Business District Parking",
    shortName: "Business District",
    area: "Shahrah-e-Faisal",
    address: "Main Shahrah-e-Faisal, PECHS Extension",
    type: "Commercial",
    status: "Operational",
    manager: "Bilal Ahmed",
    phone: "+92 21 111 111 003",
    email: "business@spotgo.pk",
    floors: 3,
    totalSlots: 240,
    available: 82,
    occupied: 133,
    reserved: 18,
    maintenance: 7,
    occupancy: 66,
    rating: 4.6,
    monthlyUsers: 6250,
    revenue: 948700,
    opened: "06:00 AM",
    closes: "01:00 AM",
    coordinates: "24.8748° N, 67.0891° E",
    zones: 6,
    evSlots: 14,
    security: "24/7",
  },
  {
    id: "LOC-004",
    name: "City Center Parking",
    shortName: "City Center",
    area: "Saddar, Karachi",
    address: "City Center Plaza, Saddar, Karachi",
    type: "City Center",
    status: "Operational",
    manager: "Hamza Shah",
    phone: "+92 21 111 111 004",
    email: "citycenter@spotgo.pk",
    floors: 3,
    totalSlots: 210,
    available: 73,
    occupied: 108,
    reserved: 20,
    maintenance: 9,
    occupancy: 65,
    rating: 4.5,
    monthlyUsers: 5480,
    revenue: 812500,
    opened: "07:00 AM",
    closes: "12:00 AM",
    coordinates: "24.8607° N, 67.0011° E",
    zones: 5,
    evSlots: 8,
    security: "24/7",
  },
  {
    id: "LOC-005",
    name: "Grand Avenue Parking",
    shortName: "Grand Avenue",
    area: "Main Boulevard, Karachi",
    address: "Grand Avenue Commercial Complex, Main Boulevard",
    type: "Commercial",
    status: "Operational",
    manager: "Saad Malik",
    phone: "+92 21 111 111 005",
    email: "grandavenue@spotgo.pk",
    floors: 2,
    totalSlots: 198,
    available: 76,
    occupied: 88,
    reserved: 22,
    maintenance: 12,
    occupancy: 61,
    rating: 4.7,
    monthlyUsers: 4920,
    revenue: 736400,
    opened: "08:00 AM",
    closes: "11:00 PM",
    coordinates: "24.8721° N, 67.0648° E",
    zones: 5,
    evSlots: 10,
    security: "24/7",
  },
];

const blankLocation = {
  name: "",
  area: "",
  address: "",
  type: "Commercial",
  manager: "",
  phone: "",
  email: "",
  floors: 1,
  totalSlots: 100,
  available: 100,
  occupied: 0,
  reserved: 0,
  maintenance: 0,
  occupancy: 0,
  rating: 5,
  monthlyUsers: 0,
  revenue: 0,
  opened: "08:00 AM",
  closes: "11:00 PM",
  coordinates: "",
  zones: 3,
  evSlots: 0,
  security: "24/7",
};

function money(value) {
  return new Intl.NumberFormat("en-PK").format(value);
}

function occupancyGradient(value) {
  if (value >= 80) return "from-rose-500 to-red-500";
  if (value >= 70) return "from-orange-500 to-amber-400";
  return "from-emerald-500 to-cyan-400";
}

function statusStyle(status) {
  if (status === "Operational") {
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  }

  if (status === "High Traffic") {
    return "bg-orange-50 text-orange-700 border-orange-100";
  }

  if (status === "Maintenance") {
    return "bg-rose-50 text-rose-700 border-rose-100";
  }

  return "bg-slate-100 text-slate-600 border-slate-200";
}

function StatCard({ icon: Icon, label, value, helper, accent }) {
  const gradients = {
    blue: "from-blue-500/15 via-cyan-500/10",
    violet: "from-violet-500/15 via-purple-500/10",
    emerald: "from-emerald-500/15 via-teal-500/10",
    orange: "from-orange-500/15 via-amber-500/10",
  };

  const iconColors = {
    blue: "text-blue-600 bg-blue-50",
    violet: "text-violet-600 bg-violet-50",
    emerald: "text-emerald-600 bg-emerald-50",
    orange: "text-orange-600 bg-orange-50",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[accent]} to-transparent`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-[27px] font-black tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            {helper}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconColors[accent]}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}

function Modal({ children, onClose, wide = false }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className={`max-h-[92vh] w-full overflow-y-auto rounded-[30px] border border-white/70 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.25)] ${
            wide ? "max-w-4xl" : "max-w-2xl"
          }`}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
    </label>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50/80 p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-xs font-bold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function LocationMap({ locations, activeId, onSelect }) {
  const points = [
    { id: "LOC-001", left: "64%", top: "27%" },
    { id: "LOC-002", left: "75%", top: "52%" },
    { id: "LOC-003", left: "42%", top: "43%" },
    { id: "LOC-004", left: "23%", top: "68%" },
    { id: "LOC-005", left: "53%", top: "76%" },
  ];

  return (
    <div className="relative min-h-[390px] overflow-hidden rounded-[28px] border border-slate-200 bg-[#eaf1f4]">
      {/* abstract map */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(25deg, transparent 48%, rgba(148,163,184,.35) 49%, rgba(148,163,184,.35) 51%, transparent 52%),
            linear-gradient(115deg, transparent 48%, rgba(148,163,184,.25) 49%, rgba(148,163,184,.25) 51%, transparent 52%),
            linear-gradient(90deg, transparent 48%, rgba(255,255,255,.9) 49%, rgba(255,255,255,.9) 52%, transparent 53%)
          `,
          backgroundSize: "95px 95px, 125px 125px, 170px 170px",
        }}
      />

      <div className="absolute left-[8%] top-[19%] h-2 w-[82%] rotate-[12deg] rounded-full bg-white/90 shadow-sm" />
      <div className="absolute left-[4%] top-[63%] h-2 w-[92%] -rotate-[9deg] rounded-full bg-white/90 shadow-sm" />
      <div className="absolute left-[48%] top-[2%] h-[96%] w-2 rotate-[13deg] rounded-full bg-white/90 shadow-sm" />

      <div className="absolute left-5 top-5 z-20 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
            <MapPin size={15} />
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-600">
              SPOT-GO Network
            </p>
            <p className="mt-0.5 text-xs font-black text-slate-800">
              Karachi Facilities
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 z-20 flex items-center gap-4 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-[10px] font-bold shadow-lg backdrop-blur">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Operational
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          High Traffic
        </span>
      </div>

      {points.map((point) => {
        const location = locations.find((item) => item.id === point.id);
        const active = point.id === activeId;

        return (
          <button
            key={point.id}
            onClick={() => onSelect(point.id)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: point.left,
              top: point.top,
            }}
          >
            <div className="relative">
              {active && (
                <div className="absolute -inset-4 animate-ping rounded-full bg-blue-500/20" />
              )}

              <div
                className={`relative flex h-11 w-11 items-center justify-center rounded-full border-4 border-white shadow-xl transition ${
                  active
                    ? "bg-blue-600 text-white scale-110"
                    : location.status === "High Traffic"
                    ? "bg-orange-500 text-white"
                    : "bg-emerald-500 text-white"
                }`}
              >
                <ParkingCircle size={18} />
              </div>

              <div
                className={`absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[9px] font-black shadow-lg ${
                  active
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                {location.shortName}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function ParkingLocationsPage() {
  const [locations, setLocations] = useState(initialLocations);
  const [activeId, setActiveId] = useState("LOC-001");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [view, setView] = useState("cards");
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const active = locations.find((item) => item.id === activeId);

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(search.toLowerCase()) ||
        location.area.toLowerCase().includes(search.toLowerCase()) ||
        location.manager.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || location.status === statusFilter;

      const matchesType =
        typeFilter === "All" || location.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [locations, search, statusFilter, typeFilter]);

  const totalSlots = locations.reduce(
    (sum, location) => sum + Number(location.totalSlots),
    0
  );

  const totalAvailable = locations.reduce(
    (sum, location) => sum + Number(location.available),
    0
  );

  const totalRevenue = locations.reduce(
    (sum, location) => sum + Number(location.revenue),
    0
  );

  const avgOccupancy = Math.round(
    locations.reduce((sum, location) => sum + Number(location.occupancy), 0) /
      locations.length
  );

  const updateLocation = (data) => {
    setLocations((current) =>
      current.map((location) =>
        location.id === activeId
          ? {
              ...location,
              ...data,
            }
          : location
      )
    );

    setShowEdit(false);
  };

  const addLocation = (data) => {
    const id = `LOC-${String(locations.length + 1).padStart(3, "0")}`;

    const newLocation = {
      ...blankLocation,
      ...data,
      id,
      shortName: data.name.split(" Parking")[0],
      status: "Operational",
      floors: Number(data.floors),
      totalSlots: Number(data.totalSlots),
      available: Number(data.totalSlots),
      occupied: 0,
      reserved: 0,
      maintenance: 0,
      occupancy: 0,
      rating: 5,
      monthlyUsers: 0,
      revenue: 0,
      zones: Number(data.zones || 3),
      evSlots: Number(data.evSlots || 0),
    };

    setLocations((current) => [...current, newLocation]);
    setActiveId(id);
    setShowAdd(false);
  };

  const removeLocation = () => {
    if (locations.length <= 1) return;

    const remaining = locations.filter((location) => location.id !== activeId);

    setLocations(remaining);
    setActiveId(remaining[0].id);
    setShowDetails(false);
  };

  return (
    <div className="mx-auto max-w-[1700px] space-y-6 pb-10">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[30px] bg-[#0b1220] shadow-[0_20px_70px_rgba(15,23,42,0.14)]"
      >
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[35%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[20%] top-1/2 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-9">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Location Network Online
            </div>

            <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
              Parking Locations
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                Network Control
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Monitor and manage every SPOT-GO parking facility from one
              centralized location hub.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowAdd(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                <Plus size={15} />
                Add New Location
              </button>

              <button
                onClick={() => setView("map")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <Navigation size={15} />
                Network Map
              </button>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="relative flex h-44 w-44 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-blue-400/20" />
              <div className="absolute inset-5 rounded-full border border-cyan-400/20" />
              <div className="absolute inset-10 flex items-center justify-center rounded-full bg-blue-500/10 shadow-[0_0_70px_rgba(59,130,246,.2)]">
                <MapPin size={45} className="text-cyan-300" />
              </div>

              <div className="absolute right-0 top-6 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-black text-white backdrop-blur">
                {locations.length} LOCATIONS
              </div>

              <div className="absolute bottom-2 left-0 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">
                <p className="text-[8px] uppercase tracking-wider text-slate-500">
                  Network
                </p>
                <p className="text-sm font-black text-white">
                  {totalSlots.toLocaleString()} Slots
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Building2}
          label="Total Locations"
          value={locations.length}
          helper="Active SPOT-GO facilities"
          accent="blue"
        />

        <StatCard
          icon={ParkingCircle}
          label="Network Capacity"
          value={totalSlots.toLocaleString()}
          helper={`${totalAvailable} currently available`}
          accent="violet"
        />

        <StatCard
          icon={Gauge}
          label="Average Occupancy"
          value={`${avgOccupancy}%`}
          helper="Across all locations"
          accent="emerald"
        />

        <StatCard
          icon={TrendingUp}
          label="Monthly Revenue"
          value={`Rs ${(totalRevenue / 1000000).toFixed(2)}M`}
          helper="Combined facility revenue"
          accent="orange"
        />
      </div>

      {/* MAP + ACTIVE LOCATION */}
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.8fr]">
        <LocationMap
          locations={locations}
          activeId={activeId}
          onSelect={setActiveId}
        />

        {/* ACTIVE LOCATION PANEL */}
        {active && (
          <motion.section
            key={active.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_45px_rgba(15,23,42,.05)]"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white">
              <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-black uppercase ${statusStyle(
                      active.status
                    )}`}
                  >
                    {active.status}
                  </span>

                  <h2 className="mt-3 text-2xl font-black tracking-tight">
                    {active.shortName}
                  </h2>

                  <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-blue-100">
                    <MapPin size={12} />
                    {active.area}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Building2 size={19} />
                </div>
              </div>

              <div className="relative mt-6 flex items-end justify-between">
                <div>
                  <p className="text-5xl font-black tracking-[-0.06em]">
                    {active.occupancy}%
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-blue-200">
                    Occupancy
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black">
                    {active.available}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-blue-200">
                    Slots Free
                  </p>
                </div>
              </div>

              <div className="relative mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${active.occupancy}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full rounded-full bg-gradient-to-r ${occupancyGradient(
                    active.occupancy
                  )}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-slate-100">
              <div className="bg-white p-4">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Capacity
                </p>
                <p className="mt-1 text-xl font-black text-slate-900">
                  {active.totalSlots}
                </p>
              </div>

              <div className="bg-white p-4">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Floors
                </p>
                <p className="mt-1 text-xl font-black text-slate-900">
                  {active.floors}
                </p>
              </div>

              <div className="bg-white p-4">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Monthly Users
                </p>
                <p className="mt-1 text-xl font-black text-slate-900">
                  {(active.monthlyUsers / 1000).toFixed(1)}K
                </p>
              </div>

              <div className="bg-white p-4">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Rating
                </p>
                <p className="mt-1 flex items-center gap-1 text-xl font-black text-slate-900">
                  <Star
                    size={15}
                    fill="currentColor"
                    className="text-amber-400"
                  />
                  {active.rating}
                </p>
              </div>
            </div>

            <div className="flex gap-2 p-4">
              <button
                onClick={() => setShowDetails(true)}
                className="flex-1 rounded-xl bg-slate-900 px-3 py-2.5 text-[10px] font-black text-white transition hover:bg-slate-800"
              >
                View Details
              </button>

              <button
                onClick={() => setShowEdit(true)}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-50"
              >
                Edit Location
              </button>
            </div>
          </motion.section>
        )}
      </div>

      {/* LOCATION MANAGEMENT */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
              Facility Directory
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              Manage Locations
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Search, filter and manage every parking facility.
            </p>
          </div>

          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setView("cards")}
              className={`rounded-lg px-3 py-2 text-[10px] font-black ${
                view === "cards"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-400"
              }`}
            >
              Cards
            </button>

            <button
              onClick={() => setView("map")}
              className={`rounded-lg px-3 py-2 text-[10px] font-black ${
                view === "map"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-400"
              }`}
            >
              Map
            </button>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="mt-6 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search location, area or manager..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-9 text-xs font-bold text-slate-600 outline-none lg:w-[170px]"
            >
              <option value="All">All Status</option>
              <option value="Operational">Operational</option>
              <option value="High Traffic">High Traffic</option>
              <option value="Maintenance">Maintenance</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-9 text-xs font-bold text-slate-600 outline-none lg:w-[170px]"
            >
              <option value="All">All Types</option>
              <option value="Shopping Mall">Shopping Mall</option>
              <option value="Commercial">Commercial</option>
              <option value="City Center">City Center</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* CARDS */}
        {view === "cards" && (
          <div className="mt-6 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => setActiveId(location.id)}
                className={`group cursor-pointer overflow-hidden rounded-[24px] border bg-white transition ${
                  activeId === location.id
                    ? "border-blue-400 shadow-[0_15px_40px_rgba(37,99,235,.10)]"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-[0_12px_35px_rgba(15,23,42,.06)]"
                }`}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-5 text-white">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                        <Building2 size={19} />
                      </div>

                      <div>
                        <h3 className="text-sm font-black">
                          {location.name}
                        </h3>

                        <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-slate-400">
                          <MapPin size={10} />
                          {location.area}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-2 py-1 text-[8px] font-black uppercase ${statusStyle(
                        location.status
                      )}`}
                    >
                      {location.status}
                    </span>
                  </div>

                  <div className="relative mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-black">
                        {location.occupancy}%
                      </p>

                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Occupancy
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-black">
                        {location.available}
                      </p>

                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Available
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${occupancyGradient(
                        location.occupancy
                      )}`}
                      style={{ width: `${location.occupancy}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 border-b border-slate-100">
                  <div className="p-3.5 text-center">
                    <p className="text-[9px] font-bold uppercase text-slate-400">
                      Slots
                    </p>
                    <p className="mt-1 text-sm font-black text-slate-800">
                      {location.totalSlots}
                    </p>
                  </div>

                  <div className="border-x border-slate-100 p-3.5 text-center">
                    <p className="text-[9px] font-bold uppercase text-slate-400">
                      Floors
                    </p>
                    <p className="mt-1 text-sm font-black text-slate-800">
                      {location.floors}
                    </p>
                  </div>

                  <div className="p-3.5 text-center">
                    <p className="text-[9px] font-bold uppercase text-slate-400">
                      Zones
                    </p>
                    <p className="mt-1 text-sm font-black text-slate-800">
                      {location.zones}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[10px] font-black text-blue-600">
                      {location.manager
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Manager
                      </p>
                      <p className="truncate text-[11px] font-black text-slate-700">
                        {location.manager}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveId(location.id);
                        setShowDetails(true);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <ExternalLink size={14} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveId(location.id);
                        setShowEdit(true);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* MAP VIEW */}
        {view === "map" && (
          <div className="mt-6">
            <LocationMap
              locations={filteredLocations}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </div>
        )}

        {filteredLocations.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <Search
              size={28}
              className="mx-auto text-slate-300"
            />
            <p className="mt-3 text-sm font-black text-slate-700">
              No locations found
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </section>

      {/* NETWORK INSIGHTS */}
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600">
                Network Health
              </p>
              <h3 className="mt-1 text-xl font-black text-slate-900">
                Facility Status
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Activity size={18} />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {locations.map((location) => (
              <div key={location.id}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    {location.shortName}
                  </span>

                  <span className="text-[10px] font-black text-slate-400">
                    {location.occupancy}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${occupancyGradient(
                      location.occupancy
                    )}`}
                    style={{ width: `${location.occupancy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-violet-600">
                Infrastructure
              </p>
              <h3 className="mt-1 text-xl font-black text-slate-900">
                Network Assets
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Layers3 size={18} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Asset icon={Building2} value={locations.length} label="Facilities" />
            <Asset
              icon={ParkingCircle}
              value={locations.reduce((s, x) => s + x.totalSlots, 0)}
              label="Parking Slots"
            />
            <Asset
              icon={Zap}
              value={locations.reduce((s, x) => s + x.evSlots, 0)}
              label="EV Chargers"
            />
            <Asset
              icon={Layers3}
              value={locations.reduce((s, x) => s + x.zones, 0)}
              label="Parking Zones"
            />
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white shadow-[0_15px_45px_rgba(15,23,42,.12)]">
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/20 blur-2xl" />

          <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-300">
              Performance Snapshot
            </p>

            <h3 className="mt-1 text-xl font-black">
              Network is performing well
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              All registered facilities are online and accepting parking
              reservations.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-[9px] font-bold uppercase text-slate-500">
                  Online
                </p>
                <p className="mt-1 text-xl font-black text-emerald-300">
                  {locations.length}/{locations.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-[9px] font-bold uppercase text-slate-500">
                  Avg Rating
                </p>
                <p className="mt-1 flex items-center gap-1 text-xl font-black">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-amber-300"
                  />
                  {(
                    locations.reduce((s, x) => s + x.rating, 0) /
                    locations.length
                  ).toFixed(1)}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[10px] font-bold text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              All systems operational
            </div>
          </div>
        </section>
      </div>

      {/* EDIT MODAL */}
      {showEdit && active && (
        <EditLocationModal
          location={active}
          onClose={() => setShowEdit(false)}
          onSave={updateLocation}
        />
      )}

      {/* ADD MODAL */}
      {showAdd && (
        <AddLocationModal
          onClose={() => setShowAdd(false)}
          onSave={addLocation}
        />
      )}

      {/* DETAILS MODAL */}
      {showDetails && active && (
        <Modal
          onClose={() => setShowDetails(false)}
          wide
        >
          <div className="border-b border-slate-100 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[9px] font-black uppercase ${statusStyle(
                      active.status
                    )}`}
                  >
                    {active.status}
                  </span>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black uppercase text-slate-500">
                    {active.id}
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
                  {active.name}
                </h2>

                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <MapPin size={13} />
                  {active.address}
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

          <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <InfoItem
                icon={MapPin}
                label="Area"
                value={active.area}
              />

              <InfoItem
                icon={Building2}
                label="Facility Type"
                value={active.type}
              />

              <InfoItem
                icon={Users}
                label="Manager"
                value={active.manager}
              />

              <InfoItem
                icon={Phone}
                label="Phone"
                value={active.phone}
              />

              <InfoItem
                icon={Globe2}
                label="Email"
                value={active.email}
              />

              <InfoItem
                icon={Navigation}
                label="Coordinates"
                value={active.coordinates}
              />
            </div>

            <div>
              <div className="grid grid-cols-2 gap-3">
                <Metric
                  label="Total Slots"
                  value={active.totalSlots}
                  icon={ParkingCircle}
                />

                <Metric
                  label="Available"
                  value={active.available}
                  icon={Zap}
                />

                <Metric
                  label="Occupied"
                  value={active.occupied}
                  icon={Car}
                />

                <Metric
                  label="Reserved"
                  value={active.reserved}
                  icon={Clock3}
                />

                <Metric
                  label="Floors"
                  value={active.floors}
                  icon={Layers3}
                />

                <Metric
                  label="EV Slots"
                  value={active.evSlots}
                  icon={Zap}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 p-6 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-blue-50 p-4">
                <p className="text-[9px] font-black uppercase tracking-wider text-blue-500">
                  Monthly Users
                </p>
                <p className="mt-2 text-2xl font-black text-slate-900">
                  {active.monthlyUsers.toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-[9px] font-black uppercase tracking-wider text-emerald-500">
                  Monthly Revenue
                </p>
                <p className="mt-2 text-2xl font-black text-slate-900">
                  Rs {money(active.revenue)}
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <p className="text-[9px] font-black uppercase tracking-wider text-violet-500">
                  Facility Rating
                </p>
                <p className="mt-2 flex items-center gap-1 text-2xl font-black text-slate-900">
                  <Star
                    size={17}
                    fill="currentColor"
                    className="text-amber-400"
                  />
                  {active.rating}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-between sm:p-7">
            <button
              onClick={removeLocation}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-100 px-4 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
            >
              <Trash2 size={14} />
              Remove Location
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDetails(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setShowDetails(false);
                  setShowEdit(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-blue-500/20"
              >
                <Edit3 size={14} />
                Edit Location
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Metric({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <Icon size={15} className="text-blue-500" />
      </div>

      <p className="mt-2 text-2xl font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

function Asset({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm ring-1 ring-slate-200">
        <Icon size={16} />
      </div>

      <p className="mt-3 text-xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] font-bold text-slate-400">
        {label}
      </p>
    </div>
  );
}

function EditLocationModal({ location, onClose, onSave }) {
  const [form, setForm] = useState({
    name: location.name,
    area: location.area,
    address: location.address,
    type: location.type,
    manager: location.manager,
    phone: location.phone,
    email: location.email,
    floors: location.floors,
    totalSlots: location.totalSlots,
    opened: location.opened,
    closes: location.closes,
    coordinates: location.coordinates,
    zones: location.zones,
    evSlots: location.evSlots,
  });

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <Modal onClose={onClose} wide>
      <div className="border-b border-slate-100 p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-blue-600">
              <Edit3 size={10} />
              Location Editor
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Edit Parking Location
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Update facility details and operational information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="space-y-7 p-6 sm:p-7">
        <div>
          <SectionTitle
            icon={Building2}
            title="Facility Details"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Location Name"
              value={form.name}
              onChange={(v) => update("name", v)}
            />

            <Field
              label="Area"
              value={form.area}
              onChange={(v) => update("area", v)}
            />

            <div className="sm:col-span-2">
              <Field
                label="Full Address"
                value={form.address}
                onChange={(v) => update("address", v)}
              />
            </div>

            <Field
              label="Facility Type"
              value={form.type}
              onChange={(v) => update("type", v)}
            />

            <Field
              label="Manager"
              value={form.manager}
              onChange={(v) => update("manager", v)}
            />
          </div>
        </div>

        <div>
          <SectionTitle
            icon={Phone}
            title="Contact Information"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Phone"
              value={form.phone}
              onChange={(v) => update("phone", v)}
            />

            <Field
              label="Email"
              value={form.email}
              onChange={(v) => update("email", v)}
            />

            <div className="sm:col-span-2">
              <Field
                label="Coordinates"
                value={form.coordinates}
                onChange={(v) => update("coordinates", v)}
              />
            </div>
          </div>
        </div>

        <div>
          <SectionTitle
            icon={ParkingCircle}
            title="Parking Configuration"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field
              label="Total Slots"
              type="number"
              value={form.totalSlots}
              onChange={(v) => update("totalSlots", v)}
            />

            <Field
              label="Floors"
              type="number"
              value={form.floors}
              onChange={(v) => update("floors", v)}
            />

            <Field
              label="Parking Zones"
              type="number"
              value={form.zones}
              onChange={(v) => update("zones", v)}
            />

            <Field
              label="EV Slots"
              type="number"
              value={form.evSlots}
              onChange={(v) => update("evSlots", v)}
            />
          </div>
        </div>

        <div>
          <SectionTitle
            icon={Clock3}
            title="Operating Hours"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Opening Time"
              value={form.opened}
              onChange={(v) => update("opened", v)}
            />

            <Field
              label="Closing Time"
              value={form.closes}
              onChange={(v) => update("closes", v)}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/20"
          >
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}

function AddLocationModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    area: "",
    address: "",
    type: "Commercial",
    manager: "",
    phone: "",
    email: "",
    floors: 2,
    totalSlots: 100,
    opened: "08:00 AM",
    closes: "11:00 PM",
    coordinates: "",
    zones: 3,
    evSlots: 0,
  });

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <Modal onClose={onClose} wide>
      <div className="border-b border-slate-100 p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-600">
              <Plus size={10} />
              New Facility
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Add Parking Location
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Register a new facility in the SPOT-GO network.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="space-y-7 p-6 sm:p-7">
        <div>
          <SectionTitle
            icon={Building2}
            title="Basic Information"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Location Name"
              value={form.name}
              onChange={(v) => update("name", v)}
            />

            <Field
              label="Area"
              value={form.area}
              onChange={(v) => update("area", v)}
            />

            <div className="sm:col-span-2">
              <Field
                label="Full Address"
                value={form.address}
                onChange={(v) => update("address", v)}
              />
            </div>

            <Field
              label="Facility Type"
              value={form.type}
              onChange={(v) => update("type", v)}
            />

            <Field
              label="Facility Manager"
              value={form.manager}
              onChange={(v) => update("manager", v)}
            />
          </div>
        </div>

        <div>
          <SectionTitle
            icon={Phone}
            title="Contact & Location"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Phone"
              value={form.phone}
              onChange={(v) => update("phone", v)}
            />

            <Field
              label="Email"
              value={form.email}
              onChange={(v) => update("email", v)}
            />

            <div className="sm:col-span-2">
              <Field
                label="Coordinates"
                value={form.coordinates}
                onChange={(v) => update("coordinates", v)}
              />
            </div>
          </div>
        </div>

        <div>
          <SectionTitle
            icon={ParkingCircle}
            title="Capacity & Configuration"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            <Field
              label="Total Slots"
              type="number"
              value={form.totalSlots}
              onChange={(v) => update("totalSlots", v)}
            />

            <Field
              label="Floors"
              type="number"
              value={form.floors}
              onChange={(v) => update("floors", v)}
            />

            <Field
              label="Zones"
              type="number"
              value={form.zones}
              onChange={(v) => update("zones", v)}
            />

            <Field
              label="EV Slots"
              type="number"
              value={form.evSlots}
              onChange={(v) => update("evSlots", v)}
            />
          </div>
        </div>

        <div>
          <SectionTitle
            icon={Clock3}
            title="Operating Hours"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Opening Time"
              value={form.opened}
              onChange={(v) => update("opened", v)}
            />

            <Field
              label="Closing Time"
              value={form.closes}
              onChange={(v) => update("closes", v)}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            disabled={!form.name || !form.area}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={14} />
            Add Location
          </button>
        </div>
      </div>
    </Modal>
  );
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon size={15} />
      </div>

      <h3 className="text-sm font-black text-slate-900">
        {title}
      </h3>
    </div>
  );
}