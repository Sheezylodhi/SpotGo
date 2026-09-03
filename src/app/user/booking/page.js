"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  MapPin,
  ParkingCircle,
  QrCode,
  ShieldCheck,
  TicketCheck,
  WalletCards,
} from "lucide-react";

export default function BookingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    try {
      const localUser = localStorage.getItem("spotgo_user");
      const sessionUser = sessionStorage.getItem("spotgo_user");

      const savedUser = localUser || sessionUser;

      /*
       * User must be logged in
       */
      if (!savedUser) {
        router.replace("/login");
        return;
      }

      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      /*
       * Check whether this page was reached
       * through "Reserve this spot".
       */
      const pendingBooking =
        sessionStorage.getItem("spotgo_pending_booking");

      /*
       * No selected spot:
       * this is a normal booking-page visit
       * from the sidebar.
       */
      if (!pendingBooking) {
        setBooking(null);
        setLoading(false);
        return;
      }

      const parsedBooking = JSON.parse(pendingBooking);

      /*
       * Invalid booking context
       */
      if (!parsedBooking?.spot) {
        sessionStorage.removeItem("spotgo_pending_booking");
        setBooking(null);
        setLoading(false);
        return;
      }

      setBooking(parsedBooking);
    } catch (error) {
      console.error("SPOT GO booking error:", error);

      sessionStorage.removeItem("spotgo_pending_booking");
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <BookingLoader />;
  }

  return (
    <div className="min-h-full bg-[#f6f8fb] text-slate-950">
      {booking ? (
        <BookingCheckout booking={booking} />
      ) : (
        <EmptyBookingState />
      )}
    </div>
  );
}

/* =========================================================
   EMPTY BOOKING STATE
   Shown when user opens Booking from Sidebar
========================================================= */

function EmptyBookingState() {
  return (
    <div className="flex min-h-[calc(100vh-76px)] items-center justify-center py-8 sm:py-10">
      <div className="w-full max-w-[560px] text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-slate-200 bg-white text-cyan-500 shadow-[0_15px_45px_rgba(15,23,42,.06)]">
          <ParkingCircle size={34} strokeWidth={1.7} />
        </div>

        <div className="mt-7">
          <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">
            MY BOOKING
          </div>

          <h1 className="text-[32px] font-black tracking-[-0.045em] text-slate-950 sm:text-[38px]">
            No active booking
          </h1>

          <p className="mx-auto mt-3 max-w-[430px] text-sm leading-6 text-slate-500">
            You don't have a parking reservation waiting for
            confirmation. Find a parking location and choose
            your exact spot to get started.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-[430px] flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/#locations"
            className="group flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#07111f] px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(7,17,31,.16)] transition hover:-translate-y-0.5 hover:bg-slate-900"
          >
            Browse parking

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
          <ShieldCheck size={14} />
          Choose your spot before you arrive
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BOOKING CHECKOUT
========================================================= */

function BookingCheckout({ booking }) {
  const router = useRouter();

  const [date, setDate] = useState(getToday());
  const [time, setTime] = useState("19:30");
  const [duration, setDuration] = useState("2");
  const [vehicle, setVehicle] = useState("KHI-1234");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [confirmed, setConfirmed] = useState(false);

  const locationName =
    booking.locationName || "Ocean Mall Parking";

  const locationArea =
    booking.area || "Clifton, Karachi";

  const spot =
    booking.spot || "A-04";

  const floor =
    booking.floor || "B1";

  const hourlyRate =
    Number(booking.price) || 120;

  const subtotal =
    hourlyRate * Number(duration);

  const serviceFee = 25;

  const total =
    subtotal + serviceFee;

  /*
   * ---------------------------------------------------------
   * CONFIRM PAYMENT
   * ---------------------------------------------------------
   */

  const handleConfirm = () => {
    const reservation = {
      ...booking,

      locationName,
      locationArea,
      spot,
      floor,

      date,
      time,
      duration,
      vehicle,

      paymentMethod,

      subtotal,
      serviceFee,
      total,

      status: "Confirmed",

      confirmedAt:
        new Date().toISOString(),
    };

    /*
     * Existing bookings
     */
    let existing = [];

    try {
      existing = JSON.parse(
        localStorage.getItem("spotgo_bookings") || "[]"
      );
    } catch {
      existing = [];
    }

    /*
     * Save booking
     */
    localStorage.setItem(
      "spotgo_bookings",
      JSON.stringify([
        reservation,
        ...existing,
      ])
    );

    localStorage.setItem(
      "spotgo_last_booking",
      JSON.stringify(reservation)
    );

    /*
     * Remove temporary reservation context
     */
    sessionStorage.removeItem(
      "spotgo_pending_booking"
    );

    setConfirmed(true);
  };

  /*
   * ---------------------------------------------------------
   * SUCCESS
   * ---------------------------------------------------------
   */

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
          paymentMethod,
          total,
        }}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1450px] py-1">
      {/* Back */}
      <Link
        href="/parking"
        className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-slate-700"
      >
        ← Back to parking
      </Link>

      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-cyan-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            RESERVATION
          </div>

          <h1 className="text-[32px] font-black tracking-[-0.045em] sm:text-[38px]">
            Complete your booking
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your selected parking spot is ready.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-[11px] font-bold text-emerald-600">
          <ShieldCheck size={14} />
          Spot held for you
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        {/* =====================================================
            LEFT
        ====================================================== */}

        <div className="min-w-0 space-y-6">
          {/* Selected Spot */}
          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,.05)]">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="text-[15px] font-black">
                Your selected spot
              </div>

              <div className="mt-1 text-xs text-slate-400">
                Review your parking location
              </div>
            </div>

            <div className="grid md:grid-cols-[minmax(0,1fr)_290px]">
              {/* Info */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                    <ParkingCircle size={23} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-black">
                      {locationName}
                    </h2>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={13} />
                      <span className="truncate">
                        {locationArea}
                      </span>
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

              {/* Parking Visual */}
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
                    {[
                      "A-02",
                      "A-03",
                      spot,
                      "A-05",
                      "A-06",
                      "A-07",
                    ].map((item, index) => (
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
                    ))}

                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Entrance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================
              BOOKING DETAILS
          ==================================================== */}

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
                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={date}
                    min={getToday()}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    className="booking-input pl-11"
                  />
                </div>
              </Field>

              <Field label="Arrival time">
                <div className="relative">
                  <Clock3
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    className="booking-input pl-11"
                  />
                </div>
              </Field>

              <Field label="Parking duration">
                <select
                  value={duration}
                  onChange={(e) =>
                    setDuration(e.target.value)
                  }
                  className="booking-input"
                >
                  <option value="1">
                    1 hour
                  </option>

                  <option value="2">
                    2 hours
                  </option>

                  <option value="3">
                    3 hours
                  </option>

                  <option value="4">
                    4 hours
                  </option>

                  <option value="5">
                    5 hours
                  </option>

                  <option value="6">
                    6 hours
                  </option>
                </select>
              </Field>

              <Field label="Vehicle">
                <select
                  value={vehicle}
                  onChange={(e) =>
                    setVehicle(e.target.value)
                  }
                  className="booking-input"
                >
                  <option value="KHI-1234">
                    Toyota Corolla · KHI-1234
                  </option>

                  <option value="KHI-7865">
                    Honda Civic · KHI-7865
                  </option>

                  <option value="KHI-4590">
                    Suzuki Swift · KHI-4590
                  </option>
                </select>
              </Field>
            </div>
          </section>

          {/* ===================================================
              PAYMENT METHOD
          ==================================================== */}

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.05)]">
            <div className="mb-6">
              <div className="text-[15px] font-black">
                Payment method
              </div>

              <div className="mt-1 text-xs text-slate-400">
                Choose how you'd like to pay.
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Card */}
              <button
                type="button"
                onClick={() =>
                  setPaymentMethod("card")
                }
                className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  paymentMethod === "card"
                    ? "border-cyan-400 bg-cyan-50/60 shadow-[0_8px_25px_rgba(34,211,238,.08)]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    paymentMethod === "card"
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <CreditCard size={19} />
                </div>

                <div className="flex-1">
                  <div className="text-sm font-black">
                    Credit / Debit Card
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Pay securely online
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-white">
                    <Check
                      size={13}
                      strokeWidth={3}
                    />
                  </div>
                )}
              </button>

              {/* Wallet */}
              <button
                type="button"
                onClick={() =>
                  setPaymentMethod("wallet")
                }
                className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  paymentMethod === "wallet"
                    ? "border-cyan-400 bg-cyan-50/60 shadow-[0_8px_25px_rgba(34,211,238,.08)]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    paymentMethod === "wallet"
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <WalletCards size={19} />
                </div>

                <div className="flex-1">
                  <div className="text-sm font-black">
                    SPOT GO Wallet
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Use your available balance
                  </div>
                </div>

                {paymentMethod === "wallet" && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-white">
                    <Check
                      size={13}
                      strokeWidth={3}
                    />
                  </div>
                )}
              </button>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-2xl bg-slate-50 p-4">
              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-emerald-500"
              />

              <div>
                <div className="text-xs font-bold text-slate-700">
                  Secure payment
                </div>

                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  Your payment information is protected.
                  This demo does not process real payments.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            SUMMARY
        ====================================================== */}

        <aside className="h-fit min-w-0 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.06)] xl:sticky xl:top-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[15px] font-black">
                Booking summary
              </div>

              <div className="mt-1 text-xs text-slate-400">
                Review before payment
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <TicketCheck size={18} />
            </div>
          </div>

          {/* Spot */}
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

          {/* Price */}
          <div className="mt-6 space-y-3">
            <PriceRow
              label={`${duration} hour${
                Number(duration) > 1 ? "s" : ""
              } × Rs. ${hourlyRate}`}
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

              <span className="text-2xl font-black tracking-[-0.04em]">
                Rs. {total}
              </span>
            </div>
          </div>

          {/* Payment */}
          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Payment
              </span>

              <span className="text-[11px] font-black capitalize text-slate-700">
                {paymentMethod === "card"
                  ? "Card"
                  : "SPOT GO Wallet"}
              </span>
            </div>
          </div>

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            className="group mt-6 flex h-[58px] w-full items-center justify-center gap-2 rounded-2xl bg-[#07111f] text-sm font-bold text-white shadow-[0_15px_35px_rgba(7,17,31,.18)] transition hover:-translate-y-0.5 hover:bg-slate-900"
          >
            Confirm & Pay

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <div className="mt-4 text-center text-[10px] leading-4 text-slate-400">
            By confirming, you agree to SPOT GO's
            parking reservation terms.
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   SUCCESS
========================================================= */

function BookingSuccess({ booking }) {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-76px)] items-center justify-center py-8 sm:py-10">
      <div className="w-full max-w-[720px]">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,.08)]">
          {/* Header */}
          <div className="bg-[#07111f] px-7 py-10 text-center sm:px-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400 text-[#07111f]">
              <Check
                size={30}
                strokeWidth={3}
              />
            </div>

            <div className="mt-6 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400">
              Reservation confirmed
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
              Your spot is reserved.
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              Your parking reservation has been confirmed.
              Show your SPOT GO pass when you arrive.
            </p>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[1fr_190px]">
              <div>
                <div className="text-sm font-black">
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

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <BookingMeta
                    label="Vehicle"
                    value={booking.vehicle}
                  />

                  <BookingMeta
                    label="Payment"
                    value={
                      booking.paymentMethod === "card"
                        ? "Card"
                        : "Wallet"
                    }
                  />
                </div>
              </div>

              {/* QR */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-[125px] w-[125px] items-center justify-center rounded-xl border border-slate-200 bg-white">
                  <QrCode
                    size={88}
                    strokeWidth={1.4}
                  />
                </div>

                <div className="mt-3 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  SPOTGO PASS
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs text-slate-400">
                  Total paid
                </div>

                <div className="mt-1 text-xl font-black">
                  Rs. {booking.total}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/parking"
                  className="flex h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Browse parking
                </Link>

                <button
                  onClick={() =>
                    router.replace("/user/dashboard")
                  }
                  className="flex h-11 items-center gap-2 rounded-xl bg-[#07111f] px-5 text-xs font-bold text-white transition hover:bg-slate-900"
                >
                  Go to dashboard
                  <ArrowRight size={15} />
                </button>
              </div>
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

function BookingMeta({
  label,
  value,
  success = false,
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </div>

      <div
        className={`mt-1.5 truncate text-xs font-black ${
          success
            ? "text-emerald-600"
            : "text-slate-800"
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
    <div className="flex items-center justify-between gap-4 text-xs">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="shrink-0 font-bold text-slate-800">
        {value}
      </span>
    </div>
  );
}

function BookingLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-500" />

        <div className="mt-4 text-xs font-bold text-slate-400">
          Preparing your booking...
        </div>
      </div>
    </div>
  );
}

function getToday() {
  const date = new Date();
  const offset = date.getTimezoneOffset();

  return new Date(
    date.getTime() - offset * 60000
  )
    .toISOString()
    .split("T")[0];
}

function formatDate(value) {
  if (!value) return "Today";

  try {
    return new Date(
      `${value}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

function getInitials(name = "") {
  if (!name) return "SG";

  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}