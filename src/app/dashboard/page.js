"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  LocateFixed,
  MapPin,
  Menu,
  Navigation,
  ParkingCircle,
  QrCode,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  X,
} from "lucide-react";

const parkingLocations = [
  {
    id: 1,
    name: "Ocean Mall Parking",
    area: "Clifton, Karachi",
    distance: "0.8 km",
    available: 18,
    total: 86,
    price: 120,
    status: "Open",
  },
  {
    id: 2,
    name: "Dolmen Mall Clifton",
    area: "Block 4, Clifton",
    distance: "1.4 km",
    available: 27,
    total: 120,
    price: 150,
    status: "Open",
  },
  {
    id: 3,
    name: "Dolmen Mall Tariq Road",
    area: "PECHS, Karachi",
    distance: "3.2 km",
    available: 11,
    total: 74,
    price: 100,
    status: "Busy",
  },
];

const activity = [
  {
    title: "Parking session completed",
    location: "Ocean Mall Parking",
    time: "Yesterday, 8:42 PM",
    amount: "Rs. 240",
    icon: ParkingCircle,
  },
  {
    title: "Spot reservation",
    location: "Dolmen Mall Clifton",
    time: "Aug 31, 6:15 PM",
    amount: "Rs. 150",
    icon: TicketCheck,
  },
  {
    title: "Payment completed",
    location: "Ocean Mall Parking",
    time: "Aug 29, 9:10 PM",
    amount: "Rs. 360",
    icon: CreditCard,
  },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [pendingBooking, setPendingBooking] = useState(null);

  const [bookingCompleted, setBookingCompleted] = useState(false);

  useEffect(() => {
    try {
      const localUser = localStorage.getItem("spotgo_user");
      const sessionUser = sessionStorage.getItem("spotgo_user");

      const savedUser = localUser || sessionUser;

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const pending = localStorage.getItem("spotgo_pending_booking");

      if (pending) {
        const parsedBooking = JSON.parse(pending);

        if (parsedBooking && parsedBooking.spot) {
          setPendingBooking(parsedBooking);
        }
      }
    } catch (error) {
      console.error("SPOT GO dashboard data error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const hasDirectBooking = useMemo(() => {
    return Boolean(pendingBooking?.spot) && !bookingCompleted;
  }, [pendingBooking, bookingCompleted]);

  if (loading) {
    return <DashboardLoader />;
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">
      {/* Sidebar is ONLY imported as a component */}
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="min-h-screen lg:ml-[270px]">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"
          >
            <Menu size={19} />
          </button>

          <div className="text-[17px] font-black tracking-[0.15em]">
            SPOT<span className="text-cyan-500">GO</span>
          </div>

          <div className="h-10 w-10 rounded-xl bg-[#07111f] flex items-center justify-center text-xs font-black text-white">
            {getInitials(user?.name)}
          </div>
        </div>

        {hasDirectBooking ? (
          <DirectBooking
            user={user}
            booking={pendingBooking}
            onComplete={() => {
              setBookingCompleted(true);
              setPendingBooking(null);
            }}
          />
        ) : (
          <OverviewDashboard user={user} />
        )}
      </main>
    </div>
  );
}

/* =========================================================
   NORMAL DASHBOARD
========================================================= */

function OverviewDashboard({ user }) {
  const firstName = user?.name?.split(" ")?.[0] || "there";

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 xl:px-12">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-cyan-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            SMART PARKING
          </div>

          <h1 className="text-[32px] font-black tracking-[-0.045em] text-slate-950 sm:text-[38px]">
            Good evening, {firstName}.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Everything you need for a smoother parking experience.
          </p>
        </div>

        <Link
          href="/parking"
          className="group flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#07111f] px-5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(7,17,31,.14)] transition hover:-translate-y-0.5 hover:bg-slate-900"
        >
          <MapPin size={17} className="text-cyan-400" />
          Find parking
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<CalendarDays size={19} />}
          label="Upcoming booking"
          value="1"
          detail="Today, 7:30 PM"
          accent="cyan"
        />

        <StatCard
          icon={<Clock3 size={19} />}
          label="Parking hours"
          value="18.5h"
          detail="This month"
          accent="blue"
        />

        <StatCard
          icon={<MapPin size={19} />}
          label="Saved locations"
          value="4"
          detail="Frequently visited"
          accent="violet"
        />

        <StatCard
          icon={<Sparkles size={19} />}
          label="SPOTGO rewards"
          value="420"
          detail="Points available"
          accent="amber"
        />
      </div>

      {/* Main grid */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.85fr]">
        {/* Next booking */}
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,.05)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <div className="text-[15px] font-black text-slate-950">
                Your next booking
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Your reserved parking spot
              </div>
            </div>

            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Confirmed
            </span>
          </div>

          <div className="grid md:grid-cols-[1fr_260px]">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <ParkingCircle size={23} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Ocean Mall Parking
                  </h2>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin size={13} />
                    Clifton, Karachi
                  </div>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MiniInfo
                  label="Date"
                  value="Today"
                  icon={<CalendarDays size={14} />}
                />
                <MiniInfo
                  label="Arrival"
                  value="7:30 PM"
                  icon={<Clock3 size={14} />}
                />
                <MiniInfo
                  label="Spot"
                  value="A-04"
                  icon={<ParkingCircle size={14} />}
                />
                <MiniInfo
                  label="Duration"
                  value="2 hours"
                  icon={<Clock3 size={14} />}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/dashboard/bookings"
                  className="flex h-10 items-center gap-2 rounded-xl bg-[#07111f] px-4 text-xs font-bold text-white"
                >
                  View booking
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/parking"
                  className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Directions
                  <Navigation size={14} />
                </Link>
              </div>
            </div>

            {/* Spot visual */}
            <div className="relative hidden overflow-hidden bg-[#07111f] md:block">
              <div className="absolute inset-0 opacity-[0.06]">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              <div className="relative flex h-full items-center justify-center p-7">
                <div className="relative h-[185px] w-[170px] rounded-[25px] border border-white/10 bg-white/[0.035] p-3">
                  <div className="absolute left-1/2 top-3 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Entry
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-2">
                    {["A-01", "A-02", "A-03", "A-04"].map((spot) => (
                      <div
                        key={spot}
                        className={`flex h-[55px] items-center justify-center rounded-xl border text-[10px] font-black ${
                          spot === "A-04"
                            ? "border-cyan-400 bg-cyan-400/15 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,.12)]"
                            : "border-white/10 bg-white/[0.025] text-slate-500"
                        }`}
                      >
                        {spot}
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-[0.15em] text-slate-600">
                    Level B1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick access */}
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.05)]">
          <div className="text-[15px] font-black text-slate-950">
            Quick access
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Jump straight to what you need.
          </p>

          <div className="mt-5 space-y-2">
            <QuickLink
              href="/parking"
              icon={<MapPin size={17} />}
              title="Find a parking spot"
              text="Browse available parking"
            />

            <QuickLink
              href="/dashboard/bookings"
              icon={<CalendarDays size={17} />}
              title="My bookings"
              text="Manage reservations"
            />

            <QuickLink
              href="/dashboard/vehicles"
              icon={<Car size={17} />}
              title="My vehicles"
              text="Manage your vehicles"
            />

            <QuickLink
              href="/dashboard/payments"
              icon={<CreditCard size={17} />}
              title="Payments"
              text="View payment history"
            />
          </div>
        </section>
      </div>

      {/* Nearby parking */}
      <section className="mt-7">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-[20px] font-black tracking-[-0.025em]">
              Nearby parking
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Available spaces around Karachi
            </p>
          </div>

          <Link
            href="/parking"
            className="hidden items-center gap-1 text-xs font-bold text-cyan-600 sm:flex"
          >
            View all
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {parkingLocations.map((parking) => (
            <ParkingCard key={parking.id} parking={parking} />
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section className="mt-7 rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,.05)]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-[15px] font-black">Recent activity</h2>
            <p className="mt-1 text-xs text-slate-400">
              Your latest parking activity
            </p>
          </div>

          <Link
            href="/dashboard/history"
            className="text-xs font-bold text-cyan-600"
          >
            View history
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {activity.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                  <Icon size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-slate-800">
                    {item.title}
                  </div>

                  <div className="mt-1 truncate text-[11px] text-slate-400">
                    {item.location} · {item.time}
                  </div>
                </div>

                <div className="text-xs font-black text-slate-700">
                  {item.amount}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   DIRECT BOOKING SCREEN
========================================================= */

function DirectBooking({ user, booking, onComplete }) {
  const [date, setDate] = useState(getToday());
  const [time, setTime] = useState("19:30");
  const [duration, setDuration] = useState("2");
  const [vehicle, setVehicle] = useState("KHI-1234");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const locationName =
    booking?.locationName || booking?.location || "Ocean Mall Parking";

  const locationArea =
    booking?.area || booking?.address || "Clifton, Karachi";

  const spot = booking?.spot || "A-04";
  const floor = booking?.floor || "B1";

  const hourlyRate = Number(booking?.price || 120);

  const subtotal = hourlyRate * Number(duration);
  const serviceFee = 25;
  const total = subtotal + serviceFee;

  const handleConfirm = () => {
    const reservation = {
      ...booking,
      date,
      time,
      duration,
      vehicle,
      notes,
      total,
      confirmedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "spotgo_last_booking",
      JSON.stringify(reservation)
    );

    localStorage.removeItem("spotgo_pending_booking");

    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <BookingSuccess
        booking={{
          ...booking,
          locationName,
          locationArea,
          spot,
          floor,
          date,
          time,
          duration,
          vehicle,
          total,
        }}
        onContinue={onComplete}
      />
    );
  }

  return (
    <div className="mx-auto max-w-[1450px] px-5 py-7 sm:px-8 lg:px-10 xl:px-12">
      {/* Header */}
      <div className="mb-7">
        <Link
          href="/parking"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 transition hover:text-slate-700"
        >
          ← Back to parking
        </Link>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-cyan-600">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              RESERVATION
            </div>

            <h1 className="text-[32px] font-black tracking-[-0.045em] sm:text-[38px]">
              Complete your booking
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Your selected parking spot is waiting for you.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-[11px] font-bold text-emerald-600">
            <ShieldCheck size={14} />
            Spot held for you
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
        {/* Left */}
        <div className="space-y-6">
          {/* Selected spot */}
          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,.05)]">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="text-[15px] font-black">
                Your selected spot
              </div>

              <div className="mt-1 text-xs text-slate-400">
                Review your parking location
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_290px]">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-13 w-13 h-[52px] shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                    <ParkingCircle size={23} />
                  </div>

                  <div>
                    <h2 className="text-lg font-black">{locationName}</h2>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={13} />
                      {locationArea}
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <BookingMeta
                    label="Parking spot"
                    value={spot}
                  />

                  <BookingMeta
                    label="Floor"
                    value={`Level ${floor}`}
                  />

                  <BookingMeta
                    label="Status"
                    value="Available"
                    success
                  />
                </div>
              </div>

              {/* Parking visual */}
              <div className="relative min-h-[240px] overflow-hidden bg-[#07111f]">
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />

                <div className="relative flex h-full items-center justify-center">
                  <div className="relative grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                    {["A-02", "A-03", spot, "A-05", "A-06", "A-07"].map(
                      (item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className={`flex h-[65px] w-[70px] items-center justify-center rounded-xl border text-[10px] font-black ${
                            item === spot
                              ? "border-cyan-400 bg-cyan-400/15 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,.14)]"
                              : "border-white/10 bg-white/[0.025] text-slate-600"
                          }`}
                        >
                          {item}
                        </div>
                      )
                    )}

                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Entrance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Booking details */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.05)]">
            <div className="mb-6">
              <div className="text-[15px] font-black">
                Booking details
              </div>

              <div className="mt-1 text-xs text-slate-400">
                Tell us when you are arriving.
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Parking date">
                <input
                  type="date"
                  value={date}
                  min={getToday()}
                  onChange={(e) => setDate(e.target.value)}
                  className="booking-input"
                />
              </Field>

              <Field label="Arrival time">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="booking-input"
                />
              </Field>

              <Field label="Parking duration">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="booking-input"
                >
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                  <option value="5">5 hours</option>
                  <option value="6">6 hours</option>
                </select>
              </Field>

              <Field label="Vehicle">
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="booking-input"
                >
                  <option value="KHI-1234">Toyota Corolla · KHI-1234</option>
                  <option value="KHI-7865">Honda Civic · KHI-7865</option>
                  <option value="KHI-4590">Suzuki Swift · KHI-4590</option>
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Additional note (optional)">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know?"
                  rows={3}
                  className="booking-input min-h-[90px] resize-none py-3"
                />
              </Field>
            </div>
          </section>
        </div>

        {/* Right summary */}
        <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.06)] xl:sticky xl:top-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[15px] font-black">
                Booking summary
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Review before confirming
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <TicketCheck size={18} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Selected spot
              </span>

              <span className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-black text-slate-900 shadow-sm">
                {spot}
              </span>
            </div>

            <div className="mt-4">
              <div className="text-sm font-black text-slate-900">
                {locationName}
              </div>

              <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                <MapPin size={12} />
                {locationArea}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <PriceRow
              label={`${duration} hour${Number(duration) > 1 ? "s" : ""}`}
              value={`Rs. ${subtotal}`}
            />

            <PriceRow
              label="Service fee"
              value={`Rs. ${serviceFee}`}
            />

            <div className="my-4 h-px bg-slate-100" />

            <div className="flex items-end justify-between">
              <span className="text-sm font-bold text-slate-600">
                Total
              </span>

              <span className="text-2xl font-black tracking-[-0.04em] text-slate-950">
                Rs. {total}
              </span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="group mt-6 flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-[#07111f] text-sm font-bold text-white shadow-[0_15px_35px_rgba(7,17,31,.18)] transition hover:-translate-y-0.5 hover:bg-slate-900"
          >
            Confirm & reserve
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-[10px] leading-4 text-emerald-700">
            <ShieldCheck size={14} className="mt-0.5 shrink-0" />
            Your reservation details will be saved securely to your SPOT GO
            account.
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   BOOKING SUCCESS
========================================================= */

function BookingSuccess({ booking, onContinue }) {
  return (
    <div className="flex min-h-[calc(100vh-20px)] items-center justify-center px-5 py-10 sm:px-8">
      <div className="w-full max-w-[720px]">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,.08)]">
          <div className="bg-[#07111f] px-7 py-10 text-center sm:px-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400 text-[#07111f] shadow-[0_0_40px_rgba(52,211,153,.2)]">
              <Check size={30} strokeWidth={3} />
            </div>

            <div className="mt-6 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400">
              Reservation confirmed
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
              Your spot is reserved.
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              You are all set. Show the QR code below when you arrive at the
              parking location.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[1fr_190px]">
              <div>
                <div className="text-sm font-black text-slate-950">
                  {booking.locationName}
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin size={13} />
                  {booking.locationArea}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <BookingMeta
                    label="Parking spot"
                    value={booking.spot}
                  />

                  <BookingMeta
                    label="Floor"
                    value={`Level ${booking.floor}`}
                  />

                  <BookingMeta
                    label="Date"
                    value={formatDate(booking.date)}
                  />

                  <BookingMeta
                    label="Arrival"
                    value={booking.time}
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Vehicle
                  </div>

                  <div className="mt-1 text-sm font-black text-slate-800">
                    {booking.vehicle}
                  </div>
                </div>
              </div>

              {/* QR */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-[125px] w-[125px] items-center justify-center rounded-xl border border-slate-200 bg-white">
                  <QrCode size={88} strokeWidth={1.4} className="text-slate-800" />
                </div>

                <div className="mt-3 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  SPOTGO PASS
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
              <div>
                <div className="text-xs text-slate-400">Total paid</div>
                <div className="mt-1 text-xl font-black text-slate-950">
                  Rs. {booking.total}
                </div>
              </div>

              <button
                onClick={onContinue}
                className="flex h-11 items-center gap-2 rounded-xl bg-[#07111f] px-5 text-xs font-bold text-white"
              >
                Go to dashboard
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function StatCard({ icon, label, value, detail }) {
  return (
    <div className="rounded-[23px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,.04)]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
          {icon}
        </div>

        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      </div>

      <div className="mt-5 text-[11px] font-bold text-slate-400">
        {label}
      </div>

      <div className="mt-1 flex items-end gap-2">
        <span className="text-[26px] font-black tracking-[-0.04em] text-slate-950">
          {value}
        </span>

        <span className="pb-1 text-[10px] font-semibold text-slate-400">
          {detail}
        </span>
      </div>
    </div>
  );
}

function MiniInfo({ label, value, icon }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
        {icon}
        {label}
      </div>

      <div className="mt-1.5 text-xs font-black text-slate-800">
        {value}
      </div>
    </div>
  );
}

function QuickLink({ href, icon, title, text }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-transparent p-3 transition hover:border-slate-100 hover:bg-slate-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-cyan-50 group-hover:text-cyan-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-xs font-black text-slate-800">
          {title}
        </div>

        <div className="mt-0.5 text-[10px] text-slate-400">
          {text}
        </div>
      </div>

      <ChevronRight
        size={15}
        className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-600"
      />
    </Link>
  );
}

function ParkingCard({ parking }) {
  const busy = parking.status === "Busy";

  return (
    <Link
      href={`/parking?location=${parking.id}`}
      className="group rounded-[23px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,.08)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <ParkingCircle size={18} />
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
            busy
              ? "bg-amber-50 text-amber-600"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {parking.status}
        </span>
      </div>

      <h3 className="mt-5 text-sm font-black text-slate-900">
        {parking.name}
      </h3>

      <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
        <MapPin size={11} />
        {parking.area}
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <div className="text-[10px] text-slate-400">
            Available
          </div>

          <div className="mt-1 text-lg font-black text-slate-900">
            {parking.available}
            <span className="text-[10px] font-semibold text-slate-400">
              {" "}
              / {parking.total}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400">
            From
          </div>

          <div className="mt-1 text-sm font-black text-slate-900">
            Rs. {parking.price}
            <span className="text-[9px] font-semibold text-slate-400">
              /hr
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-cyan-600">
        <LocateFixed size={12} />
        {parking.distance} away
      </div>
    </Link>
  );
}

function BookingMeta({ label, value, success = false }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </div>

      <div
        className={`mt-1.5 text-xs font-black ${
          success ? "text-emerald-600" : "text-slate-800"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}

function PriceRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}

function DashboardLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-500" />
        <div className="mt-4 text-xs font-bold text-slate-400">
          Loading SPOT GO...
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getInitials(name = "") {
  if (!name) return "SG";

  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getToday() {
  const date = new Date();
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .split("T")[0];
}

function formatDate(value) {
  if (!value) return "Today";

  try {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
}