"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Clock3,
  Eye,
  Filter,
  MapPin,
  MoreHorizontal,
  Navigation,
  ParkingCircle,
  Phone,
  Search,
  ShieldCheck,
  User,
  X,
  XCircle,
} from "lucide-react";

const locations = [
  {
    name: "Ocean Mall Parking",
    area: "Clifton, Karachi",
  },
  {
    name: "Dolmen Mall Parking",
    area: "Tariq Road, Karachi",
  },
  {
    name: "Business District Parking",
    area: "Shahrah-e-Faisal",
  },
  {
    name: "City Center Parking",
    area: "Saddar, Karachi",
  },
  {
    name: "Grand Avenue Parking",
    area: "Main Boulevard, Karachi",
  },
];

const initialReservations = [
  {
    id: "SPG-2026-09124",
    customer: "Ahmed Khan",
    phone: "+92 300 821 4521",
    email: "ahmed.khan@email.com",
    vehicle: "Toyota Corolla",
    plate: "ABC-782",
    vehicleType: "Car",
    location: "Ocean Mall Parking",
    area: "Clifton, Karachi",
    slot: "A-18",
    floor: "Ground Floor",
    zone: "Zone A",
    date: "Sep 03, 2026",
    startTime: "07:15 PM",
    endTime: "10:15 PM",
    duration: "3 hours",
    amount: 340,
    payment: "Paid",
    status: "Active",
    created: "Sep 03, 2026 • 06:42 PM",
  },
  {
    id: "SPG-2026-09118",
    customer: "Usman Ali",
    phone: "+92 321 774 1902",
    email: "usman.ali@email.com",
    vehicle: "Honda Civic",
    plate: "KHI-441",
    vehicleType: "Car",
    location: "Dolmen Mall Parking",
    area: "Tariq Road, Karachi",
    slot: "B-07",
    floor: "Basement 1",
    zone: "Zone B",
    date: "Sep 03, 2026",
    startTime: "06:40 PM",
    endTime: "09:40 PM",
    duration: "3 hours",
    amount: 390,
    payment: "Paid",
    status: "Active",
    created: "Sep 03, 2026 • 06:12 PM",
  },
  {
    id: "SPG-2026-09096",
    customer: "Hamza Shah",
    phone: "+92 333 118 6022",
    email: "hamza.shah@email.com",
    vehicle: "KIA Sportage",
    plate: "LEA-928",
    vehicleType: "SUV",
    location: "Business District Parking",
    area: "Shahrah-e-Faisal",
    slot: "D-14",
    floor: "Ground Floor",
    zone: "Zone A",
    date: "Sep 03, 2026",
    startTime: "05:50 PM",
    endTime: "08:50 PM",
    duration: "3 hours",
    amount: 325,
    payment: "Paid",
    status: "Completed",
    created: "Sep 03, 2026 • 05:21 PM",
  },
  {
    id: "SPG-2026-09084",
    customer: "Bilal Ahmed",
    phone: "+92 301 668 9241",
    email: "bilal.ahmed@email.com",
    vehicle: "Honda City",
    plate: "BIL-210",
    vehicleType: "Car",
    location: "City Center Parking",
    area: "Saddar, Karachi",
    slot: "C-09",
    floor: "Basement 1",
    zone: "Zone B",
    date: "Sep 03, 2026",
    startTime: "04:30 PM",
    endTime: "07:30 PM",
    duration: "3 hours",
    amount: 260,
    payment: "Pending",
    status: "Pending",
    created: "Sep 03, 2026 • 04:02 PM",
  },
  {
    id: "SPG-2026-09072",
    customer: "Saad Malik",
    phone: "+92 322 915 7730",
    email: "saad.malik@email.com",
    vehicle: "Toyota Yaris",
    plate: "SAD-510",
    vehicleType: "Car",
    location: "Grand Avenue Parking",
    area: "Main Boulevard, Karachi",
    slot: "E-04",
    floor: "Ground Floor",
    zone: "Zone A",
    date: "Sep 03, 2026",
    startTime: "03:15 PM",
    endTime: "06:15 PM",
    duration: "3 hours",
    amount: 280,
    payment: "Paid",
    status: "Completed",
    created: "Sep 03, 2026 • 02:44 PM",
  },
  {
    id: "SPG-2026-09061",
    customer: "Ali Raza",
    phone: "+92 300 552 8137",
    email: "ali.raza@email.com",
    vehicle: "Suzuki Swift",
    plate: "ALR-804",
    vehicleType: "Car",
    location: "Ocean Mall Parking",
    area: "Clifton, Karachi",
    slot: "A-27",
    floor: "Ground Floor",
    zone: "Zone A",
    date: "Sep 03, 2026",
    startTime: "08:00 PM",
    endTime: "11:00 PM",
    duration: "3 hours",
    amount: 340,
    payment: "Paid",
    status: "Reserved",
    created: "Sep 03, 2026 • 01:22 PM",
  },
  {
    id: "SPG-2026-09042",
    customer: "Fahad Iqbal",
    phone: "+92 334 401 9282",
    email: "fahad.iqbal@email.com",
    vehicle: "Hyundai Tucson",
    plate: "FAH-119",
    vehicleType: "SUV",
    location: "Dolmen Mall Parking",
    area: "Tariq Road, Karachi",
    slot: "B-21",
    floor: "Basement 1",
    zone: "Zone B",
    date: "Sep 03, 2026",
    startTime: "09:30 PM",
    endTime: "11:59 PM",
    duration: "2.5 hours",
    amount: 345,
    payment: "Paid",
    status: "Reserved",
    created: "Sep 03, 2026 • 12:54 PM",
  },
  {
    id: "SPG-2026-09017",
    customer: "Zain Ahmed",
    phone: "+92 301 441 8821",
    email: "zain.ahmed@email.com",
    vehicle: "Toyota Corolla",
    plate: "ZAI-330",
    vehicleType: "Car",
    location: "Business District Parking",
    area: "Shahrah-e-Faisal",
    slot: "D-31",
    floor: "Basement 1",
    zone: "Zone B",
    date: "Sep 02, 2026",
    startTime: "06:10 PM",
    endTime: "09:10 PM",
    duration: "3 hours",
    amount: 325,
    payment: "Paid",
    status: "Completed",
    created: "Sep 02, 2026 • 05:38 PM",
  },
  {
    id: "SPG-2026-08991",
    customer: "Owais Hassan",
    phone: "+92 323 771 4490",
    email: "owais.hassan@email.com",
    vehicle: "Honda Civic",
    plate: "OWA-710",
    vehicleType: "Car",
    location: "City Center Parking",
    area: "Saddar, Karachi",
    slot: "C-22",
    floor: "Basement 2",
    zone: "Zone C",
    date: "Sep 02, 2026",
    startTime: "05:20 PM",
    endTime: "08:20 PM",
    duration: "3 hours",
    amount: 260,
    payment: "Refunded",
    status: "Cancelled",
    created: "Sep 02, 2026 • 04:41 PM",
  },
  {
    id: "SPG-2026-08970",
    customer: "Adeel Hussain",
    phone: "+92 311 555 7284",
    email: "adeel.h@email.com",
    vehicle: "KIA Sportage",
    plate: "ADE-665",
    vehicleType: "SUV",
    location: "Grand Avenue Parking",
    area: "Main Boulevard, Karachi",
    slot: "E-18",
    floor: "Ground Floor",
    zone: "Zone A",
    date: "Sep 02, 2026",
    startTime: "02:30 PM",
    endTime: "05:30 PM",
    duration: "3 hours",
    amount: 365,
    payment: "Paid",
    status: "Completed",
    created: "Sep 02, 2026 • 01:58 PM",
  },
  {
    id: "SPG-2026-08943",
    customer: "Muneeb Khan",
    phone: "+92 320 621 8832",
    email: "muneeb.khan@email.com",
    vehicle: "Suzuki Swift",
    plate: "MUN-280",
    vehicleType: "Car",
    location: "Ocean Mall Parking",
    area: "Clifton, Karachi",
    slot: "A-43",
    floor: "Basement 1",
    zone: "Zone B",
    date: "Sep 02, 2026",
    startTime: "12:15 PM",
    endTime: "03:15 PM",
    duration: "3 hours",
    amount: 260,
    payment: "Paid",
    status: "Completed",
    created: "Sep 02, 2026 • 11:47 AM",
  },
];

const statusStyles = {
  Active: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
  Reserved: {
    dot: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700",
  },
  Pending: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700",
  },
  Completed: {
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700",
  },
  Cancelled: {
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700",
  },
};

const paymentStyles = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Refunded: "bg-slate-100 text-slate-600",
};

function StatCard({ icon: Icon, label, value, helper, type }) {
  const styles = {
    total: {
      icon: "bg-slate-100 text-slate-700",
      line: "bg-slate-900",
    },
    active: {
      icon: "bg-emerald-100 text-emerald-600",
      line: "bg-emerald-500",
    },
    upcoming: {
      icon: "bg-violet-100 text-violet-600",
      line: "bg-violet-500",
    },
    revenue: {
      icon: "bg-blue-100 text-blue-600",
      line: "bg-blue-500",
    },
  };

  const style = styles[type];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className={`absolute left-0 top-0 h-1 w-full ${style.line}`} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">{helper}</p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.Pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

function ReservationModal({
  reservation,
  onClose,
  onStatusChange,
}) {
  if (!reservation) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                <ParkingCircle size={20} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-slate-900">
                    Reservation Details
                  </h3>

                  <StatusBadge status={reservation.status} />
                </div>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {reservation.id}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-5 p-6">
          {/* Customer */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-2">
              <User size={16} className="text-slate-600" />

              <h4 className="text-sm font-bold text-slate-800">
                Customer Information
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                label="Customer"
                value={reservation.customer}
              />

              <InfoItem
                label="Phone"
                value={reservation.phone}
              />

              <InfoItem
                label="Email"
                value={reservation.email}
              />

              <InfoItem
                label="Vehicle"
                value={`${reservation.vehicle} • ${reservation.plate}`}
              />
            </div>
          </div>

          {/* Parking */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-slate-600" />

              <h4 className="text-sm font-bold text-slate-800">
                Parking Details
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <InfoItem
                label="Location"
                value={reservation.location}
              />

              <InfoItem
                label="Slot"
                value={reservation.slot}
                highlight
              />

              <InfoItem
                label="Floor"
                value={reservation.floor}
              />

              <InfoItem
                label="Zone"
                value={reservation.zone}
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays size={16} className="text-slate-600" />

              <h4 className="text-sm font-bold text-slate-800">
                Reservation Schedule
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] text-slate-400">Date</p>
                <p className="mt-1 text-xs font-bold text-slate-800">
                  {reservation.date}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] text-slate-400">Parking Time</p>
                <p className="mt-1 text-xs font-bold text-slate-800">
                  {reservation.startTime} – {reservation.endTime}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] text-slate-400">Duration</p>
                <p className="mt-1 text-xs font-bold text-slate-800">
                  {reservation.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">Total Amount</p>

                <p className="mt-1 text-2xl font-bold">
                  Rs {reservation.amount.toLocaleString()}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${
                  reservation.payment === "Paid"
                    ? "bg-emerald-500/10 text-emerald-300"
                    : reservation.payment === "Pending"
                    ? "bg-amber-500/10 text-amber-300"
                    : "bg-white/10 text-slate-300"
                }`}
              >
                {reservation.payment}
              </span>
            </div>
          </div>

          {/* Actions */}
          {reservation.status !== "Cancelled" &&
            reservation.status !== "Completed" && (
              <div className="flex flex-col gap-3 sm:flex-row">
                {reservation.status === "Pending" && (
                  <button
                    onClick={() =>
                      onStatusChange(reservation.id, "Active")
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <Check size={16} />
                    Confirm Reservation
                  </button>
                )}

                {reservation.status === "Active" && (
                  <button
                    onClick={() =>
                      onStatusChange(reservation.id, "Completed")
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Check size={16} />
                    Mark Completed
                  </button>
                )}

                <button
                  onClick={() =>
                    onStatusChange(reservation.id, "Cancelled")
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <XCircle size={16} />
                  Cancel Reservation
                </button>
              </div>
            )}

          <p className="text-center text-[10px] text-slate-400">
            Created {reservation.created}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function InfoItem({ label, value, highlight }) {
  return (
    <div>
      <p className="text-[10px] font-medium text-slate-400">{label}</p>

      <p
        className={`mt-1 text-xs font-semibold ${
          highlight ? "text-blue-600" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(
    initialReservations
  );

  const [selectedLocation, setSelectedLocation] =
    useState("All Locations");

  const [statusFilter, setStatusFilter] = useState("All");

  const [vehicleFilter, setVehicleFilter] =
    useState("All Vehicles");

  const [dateFilter, setDateFilter] = useState("Today");

  const [search, setSearch] = useState("");

  const [selectedReservation, setSelectedReservation] =
    useState(null);

  const [sortOrder, setSortOrder] = useState("newest");

  const stats = useMemo(() => {
    const today = reservations.filter(
      (item) => item.date === "Sep 03, 2026"
    );

    return {
      total: today.length,
      active: today.filter((item) => item.status === "Active").length,
      upcoming: today.filter(
        (item) => item.status === "Reserved"
      ).length,
      revenue: today
        .filter((item) => item.payment === "Paid")
        .reduce((sum, item) => sum + item.amount, 0),
    };
  }, [reservations]);

  const filteredReservations = useMemo(() => {
    const filtered = reservations.filter((reservation) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        reservation.id.toLowerCase().includes(query) ||
        reservation.customer.toLowerCase().includes(query) ||
        reservation.vehicle.toLowerCase().includes(query) ||
        reservation.plate.toLowerCase().includes(query) ||
        reservation.slot.toLowerCase().includes(query) ||
        reservation.location.toLowerCase().includes(query);

      const matchesLocation =
        selectedLocation === "All Locations" ||
        reservation.location === selectedLocation;

      const matchesStatus =
        statusFilter === "All" ||
        reservation.status === statusFilter;

      const matchesVehicle =
        vehicleFilter === "All Vehicles" ||
        reservation.vehicleType === vehicleFilter;

      const matchesDate =
        dateFilter === "All Dates" ||
        (dateFilter === "Today" &&
          reservation.date === "Sep 03, 2026") ||
        (dateFilter === "Yesterday" &&
          reservation.date === "Sep 02, 2026");

      return (
        matchesSearch &&
        matchesLocation &&
        matchesStatus &&
        matchesVehicle &&
        matchesDate
      );
    });

    return [...filtered].sort((a, b) => {
      const aNumber = Number(a.id.split("-").pop());
      const bNumber = Number(b.id.split("-").pop());

      return sortOrder === "newest"
        ? bNumber - aNumber
        : aNumber - bNumber;
    });
  }, [
    reservations,
    search,
    selectedLocation,
    statusFilter,
    vehicleFilter,
    dateFilter,
    sortOrder,
  ]);

  const updateReservationStatus = (id, status) => {
    setReservations((current) =>
      current.map((reservation) =>
        reservation.id === id
          ? {
              ...reservation,
              status,
              payment:
                status === "Cancelled"
                  ? "Refunded"
                  : reservation.payment,
            }
          : reservation
      )
    );

    setSelectedReservation((current) =>
      current && current.id === id
        ? {
            ...current,
            status,
            payment:
              status === "Cancelled"
                ? "Refunded"
                : current.payment,
          }
        : current
    );
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
              RESERVATIONS LIVE
            </span>

            <span className="text-xs text-slate-400">
              Real-time parking activity
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Reservations
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage parking reservations across all SPOT-GO
            locations.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <ShieldCheck size={16} className="text-emerald-500" />

          <div>
            <p className="text-[10px] font-bold text-slate-800">
              Booking System
            </p>

            <p className="text-[9px] text-slate-400">
              Operational
            </p>
          </div>

          <span className="ml-2 h-2 w-2 rounded-full bg-emerald-500" />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          icon={CalendarDays}
          label="Today's Reservations"
          value={stats.total}
          helper="+18.4% compared with yesterday"
          type="total"
        />

        <StatCard
          icon={Car}
          label="Active Now"
          value={stats.active}
          helper="Vehicles currently parked"
          type="active"
        />

        <StatCard
          icon={Clock3}
          label="Upcoming"
          value={stats.upcoming}
          helper="Confirmed future bookings"
          type="upcoming"
        />

        <StatCard
          icon={Check}
          label="Today's Revenue"
          value={`Rs ${stats.revenue.toLocaleString()}`}
          helper="+11.8% from yesterday"
          type="revenue"
        />
      </motion.div>

      {/* Location tabs */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-500" />

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Reservation Locations
              </h2>

              <p className="text-[10px] text-slate-400">
                Filter reservations by parking facility
              </p>
            </div>
          </div>

          <span className="hidden text-xs text-slate-400 sm:block">
            5 active locations
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedLocation("All Locations")}
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
              selectedLocation === "All Locations"
                ? "bg-slate-900 text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Locations
          </button>

          {locations.map((location) => (
            <button
              key={location.name}
              onClick={() => setSelectedLocation(location.name)}
              className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                selectedLocation === location.name
                  ? "bg-slate-900 text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {location.name.replace(" Parking", "")}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section
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
              placeholder="Search reservation, customer, vehicle..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <SelectFilter
              value={dateFilter}
              onChange={setDateFilter}
              options={["Today", "Yesterday", "All Dates"]}
              icon={CalendarDays}
            />

            <SelectFilter
              value={vehicleFilter}
              onChange={setVehicleFilter}
              options={[
                "All Vehicles",
                "Car",
                "SUV",
                "Motorcycle",
              ]}
              icon={Car}
            />

            <SelectFilter
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                "All",
                "Active",
                "Reserved",
                "Pending",
                "Completed",
                "Cancelled",
              ]}
              icon={Filter}
            />

            <button
              onClick={() =>
                setSortOrder((current) =>
                  current === "newest" ? "oldest" : "newest"
                )
              }
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              {sortOrder === "newest" ? (
                <ArrowDown size={14} />
              ) : (
                <ArrowUp size={14} />
              )}

              {sortOrder === "newest" ? "Newest" : "Oldest"}
            </button>
          </div>
        </div>
      </motion.section>

      {/* Reservation table */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Reservation Management
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {filteredReservations.length} reservations matching
              your filters
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Live updates enabled
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Reservation
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Parking Location
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Slot
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Schedule
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Payment
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredReservations.map((reservation) => (
                  <motion.tr
                    key={reservation.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                  >
                    {/* Reservation */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {reservation.id}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          {reservation.created}
                        </p>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                          {reservation.customer
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {reservation.customer}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {reservation.vehicle}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        <MapPin
                          size={14}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />

                        <div>
                          <p className="text-xs font-semibold text-slate-700">
                            {reservation.location}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {reservation.area}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Slot */}
                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5">
                        <ParkingCircle
                          size={13}
                          className="text-slate-500"
                        />

                        <span className="text-xs font-bold text-slate-800">
                          {reservation.slot}
                        </span>
                      </div>
                    </td>

                    {/* Schedule */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          {reservation.startTime}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {reservation.date} •{" "}
                          {reservation.duration}
                        </p>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Rs {reservation.amount.toLocaleString()}
                        </p>

                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${paymentStyles[reservation.payment]}`}
                        >
                          {reservation.payment}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={reservation.status} />
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() =>
                            setSelectedReservation(reservation)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
                          title="View reservation"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
                          title="More actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredReservations.length === 0 && (
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Search size={23} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-800">
                No reservations found
              </h3>

              <p className="mt-1 max-w-sm text-xs text-slate-400">
                Try changing your filters or search query.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedLocation("All Locations");
                  setStatusFilter("All");
                  setVehicleFilter("All Vehicles");
                  setDateFilter("Today");
                }}
                className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3 text-xs text-slate-400 sm:flex-row sm:items-center">
          <span>
            Showing {filteredReservations.length} of{" "}
            {reservations.length} reservations
          </span>

          <span>SPOT-GO Reservation Management</span>
        </div>
      </motion.section>

      {/* Bottom operational cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Booking flow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Booking Flow
              </p>

              <h3 className="mt-1 text-base font-bold text-slate-900">
                Today's Reservation Pipeline
              </h3>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Navigation size={17} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-4">
            <PipelineCard
              label="Pending"
              value={
                reservations.filter(
                  (item) =>
                    item.date === "Sep 03, 2026" &&
                    item.status === "Pending"
                ).length
              }
              type="pending"
            />

            <PipelineCard
              label="Confirmed"
              value={
                reservations.filter(
                  (item) =>
                    item.date === "Sep 03, 2026" &&
                    item.status === "Reserved"
                ).length
              }
              type="reserved"
            />

            <PipelineCard
              label="Active"
              value={
                reservations.filter(
                  (item) =>
                    item.date === "Sep 03, 2026" &&
                    item.status === "Active"
                ).length
              }
              type="active"
            />

            <PipelineCard
              label="Completed"
              value={
                reservations.filter(
                  (item) =>
                    item.date === "Sep 03, 2026" &&
                    item.status === "Completed"
                ).length
              }
              type="completed"
            />
          </div>
        </motion.div>

        {/* Quick insight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400">
                SYSTEM INSIGHT
              </p>

              <h3 className="mt-1 text-base font-bold">
                Reservation Health
              </h3>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck size={17} />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold">94.8%</span>

              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-bold text-emerald-400">
                Excellent
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "94.8%" }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-emerald-400"
              />
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Reservation operations are running normally. Most bookings
              are being confirmed and processed without issues.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedReservation && (
          <ReservationModal
            key="reservation-modal"
            reservation={selectedReservation}
            onClose={() => setSelectedReservation(null)}
            onStatusChange={updateReservationStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SelectFilter({ value, onChange, options, icon: Icon }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <Icon size={13} />
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs font-semibold text-slate-600 outline-none transition hover:bg-slate-50 focus:border-slate-400"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown
        size={13}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function PipelineCard({ label, value, type }) {
  const styles = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      dot: "bg-amber-500",
    },
    reserved: {
      bg: "bg-violet-50",
      text: "text-violet-700",
      dot: "bg-violet-500",
    },
    active: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    completed: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      dot: "bg-blue-500",
    },
  };

  const style = styles[type];

  return (
    <div className={`rounded-xl p-4 ${style.bg}`}>
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold ${style.text}`}>
          {label}
        </span>

        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
      </div>

      <p className={`mt-3 text-2xl font-bold ${style.text}`}>
        {value}
      </p>

      <p className="mt-1 text-[9px] text-slate-400">
        reservations
      </p>
    </div>
  );
}