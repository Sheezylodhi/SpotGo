"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  CreditCard,
  Eye,
  Filter,
  MapPin,
  Navigation,
  ParkingCircle,
  Search,
  Ticket,
  X,
  XCircle,
  QrCode,
  MoreHorizontal,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

type BookingStatus = "upcoming" | "completed" | "cancelled";

type Booking = {
  id: string;
  parkingName: string;
  location: string;
  area: string;
  date: string;
  time: string;
  duration: string;
  slot: string;
  vehicle: string;
  vehicleNumber: string;
  amount: number;
  status: BookingStatus;
  bookedOn: string;
  rating?: number;
  color: string;
};

const bookings: Booking[] = [
  {
    id: "SPG-2026-09124",
    parkingName: "Ocean Mall Parking",
    location: "Main Khayaban-e-Iqbal, Clifton",
    area: "Clifton, Karachi",
    date: "Sep 05, 2026",
    time: "10:00 AM",
    duration: "2 hours",
    slot: "A-18",
    vehicle: "Toyota Corolla",
    vehicleNumber: "ABC-123",
    amount: 240,
    status: "upcoming",
    bookedOn: "Sep 03, 2026",
    rating: 4.9,
    color: "blue",
  },
  {
    id: "SPG-2026-08972",
    parkingName: "Dolmen Mall Parking",
    location: "Marine Drive, Clifton",
    area: "Clifton, Karachi",
    date: "Aug 31, 2026",
    time: "06:30 PM",
    duration: "3 hours",
    slot: "B-07",
    vehicle: "Honda Civic",
    vehicleNumber: "KHI-456",
    amount: 450,
    status: "completed",
    bookedOn: "Aug 31, 2026",
    rating: 4.8,
    color: "violet",
  },
  {
    id: "SPG-2026-08731",
    parkingName: "Lucky One Parking",
    location: "Main Rashid Minhas Road",
    area: "Gulshan-e-Iqbal, Karachi",
    date: "Aug 28, 2026",
    time: "02:00 PM",
    duration: "1 hour",
    slot: "C-21",
    vehicle: "Suzuki Swift",
    vehicleNumber: "KHI-781",
    amount: 120,
    status: "completed",
    bookedOn: "Aug 28, 2026",
    rating: 4.7,
    color: "emerald",
  },
  {
    id: "SPG-2026-08564",
    parkingName: "Business District Parking",
    location: "Shahrah-e-Faisal",
    area: "PECHS, Karachi",
    date: "Aug 25, 2026",
    time: "09:00 AM",
    duration: "2 hours",
    slot: "D-14",
    vehicle: "Toyota Yaris",
    vehicleNumber: "ABC-908",
    amount: 240,
    status: "cancelled",
    bookedOn: "Aug 24, 2026",
    color: "rose",
  },
  {
    id: "SPG-2026-08218",
    parkingName: "Atrium Mall Parking",
    location: "Zaib-un-Nisa Street",
    area: "Saddar, Karachi",
    date: "Aug 20, 2026",
    time: "05:00 PM",
    duration: "2 hours",
    slot: "A-32",
    vehicle: "Honda City",
    vehicleNumber: "KHI-112",
    amount: 260,
    status: "completed",
    bookedOn: "Aug 20, 2026",
    rating: 4.6,
    color: "amber",
  },
];

const statusConfig = {
  upcoming: {
    label: "Upcoming",
    icon: Clock3,
    className: "bg-blue-50 text-blue-600 border-blue-100",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-rose-50 text-rose-600 border-rose-100",
    dot: "bg-rose-500",
  },
};

const colorConfig: Record<string, string> = {
  blue: "from-blue-500 to-cyan-500",
  violet: "from-violet-500 to-purple-500",
  emerald: "from-emerald-500 to-teal-500",
  rose: "from-rose-500 to-pink-500",
  amber: "from-amber-500 to-orange-500",
};

export default function BookingHistoryPage() {
  const [activeTab, setActiveTab] = useState<"all" | BookingStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesTab =
        activeTab === "all" || booking.status === activeTab;

      const query = search.toLowerCase();

      const matchesSearch =
        booking.parkingName.toLowerCase().includes(query) ||
        booking.location.toLowerCase().includes(query) ||
        booking.area.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query) ||
        booking.slot.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const upcomingCount = bookings.filter(
    (item) => item.status === "upcoming"
  ).length;

  const completedCount = bookings.filter(
    (item) => item.status === "completed"
  ).length;

  const cancelledCount = bookings.filter(
    (item) => item.status === "cancelled"
  ).length;

  const totalSpent = bookings
    .filter((item) => item.status !== "cancelled")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -left-32 top-[45%] h-96 w-96 rounded-full bg-violet-100/30 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
              <ParkingCircle size={23} />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                SPOT<span className="text-blue-600">GO</span>
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Smart Parking
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to parking
          </Link>
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
            <Ticket size={14} />
            Your parking activity
          </div>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Booking History
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            View all your parking reservations, payment details, locations,
            slots and booking information in one place.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Ticket size={20} />}
            title="Total Bookings"
            value={bookings.length}
            description="All reservations"
            gradient="from-blue-500 to-cyan-500"
            delay={0}
          />

          <StatCard
            icon={<Clock3 size={20} />}
            title="Upcoming"
            value={upcomingCount}
            description="Ready for parking"
            gradient="from-violet-500 to-purple-500"
            delay={0.05}
          />

          <StatCard
            icon={<CheckCircle2 size={20} />}
            title="Completed"
            value={completedCount}
            description="Finished bookings"
            gradient="from-emerald-500 to-teal-500"
            delay={0.1}
          />

          <StatCard
            icon={<CreditCard size={20} />}
            title="Total Spent"
            value={`Rs ${totalSpent.toLocaleString()}`}
            description="Parking expenses"
            gradient="from-orange-500 to-amber-500"
            delay={0.15}
          />
        </div>

        {/* Main card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)]"
        >
          {/* Toolbar */}
          <div className="border-b border-slate-100 p-5 lg:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              {/* Tabs */}
              <div className="flex overflow-x-auto rounded-2xl bg-slate-100 p-1.5">
                {[
                  ["all", "All bookings"],
                  ["upcoming", "Upcoming"],
                  ["completed", "Completed"],
                  ["cancelled", "Cancelled"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() =>
                      setActiveTab(value as "all" | BookingStatus)
                    }
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      activeTab === value
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Search + filter */}
              <div className="flex gap-3">
                <div className="relative min-w-0 flex-1 xl:w-80">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search booking or location..."
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-sm font-medium outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                <button className="hidden h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 sm:flex">
                  <Filter size={17} />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Booking list */}
          <div className="p-4 sm:p-5 lg:p-6">
            <AnimatePresence mode="popLayout">
              {filteredBookings.map((booking, index) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  index={index}
                  onView={() => setSelectedBooking(booking)}
                />
              ))}
            </AnimatePresence>

            {filteredBookings.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                  <Search size={26} />
                </div>

                <h3 className="text-lg font-black">
                  No bookings found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  Try changing your search or selecting another booking
                  category.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveTab("all");
                  }}
                  className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20"
                >
                  <RotateCcw size={15} />
                  Reset filters
                </button>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ------------------------------------------------ */
/* STAT CARD */
/* ------------------------------------------------ */

function StatCard({
  icon,
  title,
  value,
  description,
  gradient,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl hover:shadow-slate-200/50"
    >
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
      >
        {icon}
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black tracking-tight">{value}</p>

      <p className="mt-1 text-xs font-medium text-slate-400">
        {description}
      </p>

      <div
        className={`absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-[0.06] transition-transform duration-500 group-hover:scale-150`}
      />
    </motion.div>
  );
}

/* ------------------------------------------------ */
/* BOOKING CARD */
/* ------------------------------------------------ */

function BookingCard({
  booking,
  index,
  onView,
}: {
  booking: Booking;
  index: number;
  onView: () => void;
}) {
  const status = statusConfig[booking.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.05 }}
      className="group mb-4 overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Color strip / icon */}
        <div
          className={`relative flex min-h-[150px] w-full shrink-0 items-center justify-center bg-gradient-to-br ${colorConfig[booking.color]} lg:w-28`}
        >
          <ParkingCircle
            size={45}
            strokeWidth={1.5}
            className="text-white/90"
          />

          <div className="absolute bottom-3 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
            {booking.slot}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 p-5 lg:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${status.className}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                  />
                  {status.label}
                </span>

                <span className="text-xs font-semibold text-slate-400">
                  #{booking.id}
                </span>
              </div>

              <h3 className="text-lg font-black tracking-tight text-slate-900">
                {booking.parkingName}
              </h3>

              <div className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-blue-500"
                />
                <span>
                  {booking.location} · {booking.area}
                </span>
              </div>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <p className="text-xs font-semibold text-slate-400">
                Total paid
              </p>
              <p className="mt-0.5 text-xl font-black text-slate-900">
                Rs {booking.amount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Details row */}
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4">
            <MiniInfo
              icon={<CalendarDays size={15} />}
              label="Date"
              value={booking.date}
            />

            <MiniInfo
              icon={<Clock3 size={15} />}
              label="Time"
              value={booking.time}
            />

            <MiniInfo
              icon={<Ticket size={15} />}
              label="Duration"
              value={booking.duration}
            />

            <MiniInfo
              icon={<Car size={15} />}
              label="Vehicle"
              value={booking.vehicle}
            />
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Booked on</span>
              <span className="text-slate-600">{booking.bookedOn}</span>
            </div>

            <button
              onClick={onView}
              className="group/button flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600"
            >
              <Eye size={15} />
              View details
              <ChevronRight
                size={14}
                className="transition-transform group-hover/button:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MiniInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {icon}
        {label}
      </div>

      <p className="truncate text-xs font-bold text-slate-700">{value}</p>
    </div>
  );
}

/* ------------------------------------------------ */
/* DETAILS MODAL */
/* ------------------------------------------------ */

function BookingDetailsModal({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const status = statusConfig[booking.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[30px] bg-white shadow-2xl"
      >
        {/* Modal header */}
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${colorConfig[booking.color]} p-6 text-white sm:p-7`}
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/10" />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 transition hover:bg-white/25"
          >
            <X size={18} />
          </button>

          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <ParkingCircle size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-white/70">
              Booking details
            </p>

            <h2 className="mt-1 text-2xl font-black">
              {booking.parkingName}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
              <MapPin size={15} />
              {booking.location}
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          {/* Status */}
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div>
              <p className="text-xs font-semibold text-slate-400">
                Booking status
              </p>

              <div
                className={`mt-1 inline-flex items-center gap-1.5 text-sm font-black ${
                  booking.status === "upcoming"
                    ? "text-blue-600"
                    : booking.status === "completed"
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                <StatusIcon size={17} />
                {status.label}
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold text-slate-400">
                Booking ID
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-sm font-black text-slate-800">
                  {booking.id}
                </span>

                <button
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-blue-600"
                  onClick={() => navigator.clipboard?.writeText(booking.id)}
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative mb-6 h-44 overflow-hidden rounded-2xl border border-slate-200 bg-[#e8f0e7]">
            {/* Fake map visual for UI-only */}
            <div className="absolute inset-0 opacity-60">
              <div className="absolute left-[15%] top-0 h-full w-8 rotate-[22deg] bg-white shadow-sm" />
              <div className="absolute left-[55%] top-0 h-full w-12 -rotate-[18deg] bg-white shadow-sm" />
              <div className="absolute left-0 top-[35%] h-8 w-full rotate-[-8deg] bg-white shadow-sm" />
              <div className="absolute left-0 top-[68%] h-6 w-full rotate-[5deg] bg-white shadow-sm" />
              <div className="absolute right-[8%] top-[12%] h-20 w-24 rounded-2xl bg-emerald-200/70" />
              <div className="absolute left-[8%] bottom-[10%] h-14 w-28 rounded-2xl bg-emerald-200/70" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="absolute h-14 w-14 rounded-full bg-blue-500/20"
              />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-xl">
                <MapPin size={19} fill="currentColor" />
              </div>
            </div>

            <button className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-lg">
              <Navigation size={14} className="text-blue-600" />
              Open location
            </button>
          </div>

          {/* Parking information */}
          <div>
            <SectionTitle title="Parking information" />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <DetailBox
                icon={<CalendarDays size={17} />}
                label="Date"
                value={booking.date}
              />

              <DetailBox
                icon={<Clock3 size={17} />}
                label="Time"
                value={booking.time}
              />

              <DetailBox
                icon={<Ticket size={17} />}
                label="Slot"
                value={booking.slot}
              />

              <DetailBox
                icon={<Clock3 size={17} />}
                label="Duration"
                value={booking.duration}
              />
            </div>
          </div>

          {/* Vehicle */}
          <div className="mt-6">
            <SectionTitle title="Vehicle information" />

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <Car size={21} />
              </div>

              <div>
                <p className="text-sm font-black text-slate-800">
                  {booking.vehicle}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-slate-400">
                  {booking.vehicleNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mt-6">
            <SectionTitle title="Payment summary" />

            <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Parking fee</span>
                <span className="font-bold text-slate-700">
                  Rs {booking.amount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Service fee</span>
                <span className="font-bold text-slate-700">Rs 0</span>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">
                    Total amount
                  </span>

                  <span className="text-xl font-black text-blue-600">
                    Rs {booking.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QR */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <div>
                <div className="flex items-center gap-2 text-blue-600">
                  <QrCode size={20} />
                  <span className="font-black">Parking QR Code</span>
                </div>

                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                  Show this QR code at the parking entrance to verify your
                  reservation.
                </p>
              </div>

              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white p-3 shadow-sm">
                <QrCode size={65} className="text-slate-800" />
              </div>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {booking.status === "upcoming" && (
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
                <Navigation size={17} />
                Navigate to parking
              </button>
            )}

            <button
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="mb-3 text-sm font-black text-slate-800">{title}</h3>
  );
}

function DetailBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
      <div className="mb-2 text-blue-500">{icon}</div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}