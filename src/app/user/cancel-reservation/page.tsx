"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Info,
  MapPin,
  ParkingCircle,
  RotateCcw,
  ShieldCheck,
  Ticket,
  Wallet,
  X,
  XCircle,
} from "lucide-react";

type ReservationStatus = "upcoming" | "cancelled";

type Reservation = {
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
  bookedOn: string;
  status: ReservationStatus;
  refundEligible: boolean;
  refundPercent: number;
  gradient: string;
};

const initialReservations: Reservation[] = [
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
    bookedOn: "Sep 03, 2026",
    status: "upcoming",
    refundEligible: true,
    refundPercent: 100,
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "SPG-2026-09131",
    parkingName: "Dolmen Mall Parking",
    location: "Marine Drive, Clifton",
    area: "Clifton, Karachi",
    date: "Sep 06, 2026",
    time: "06:30 PM",
    duration: "3 hours",
    slot: "B-07",
    vehicle: "Honda Civic",
    vehicleNumber: "KHI-456",
    amount: 450,
    bookedOn: "Sep 03, 2026",
    status: "upcoming",
    refundEligible: true,
    refundPercent: 80,
    gradient: "from-violet-600 to-purple-500",
  },
  {
    id: "SPG-2026-09018",
    parkingName: "Business District Parking",
    location: "Shahrah-e-Faisal",
    area: "PECHS, Karachi",
    date: "Sep 08, 2026",
    time: "09:00 AM",
    duration: "2 hours",
    slot: "D-14",
    vehicle: "Toyota Yaris",
    vehicleNumber: "ABC-908",
    amount: 240,
    bookedOn: "Sep 02, 2026",
    status: "upcoming",
    refundEligible: true,
    refundPercent: 100,
    gradient: "from-emerald-600 to-teal-500",
  },
];

const cancellationReasons = [
  "My plans changed",
  "I booked the wrong parking",
  "I found another parking",
  "I no longer need parking",
  "Parking is too expensive",
  "Other reason",
];

export default function CancelReservationPage() {
  const [reservations, setReservations] =
    useState<Reservation[]>(initialReservations);

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const [reason, setReason] = useState("");
  const [reasonOpen, setReasonOpen] = useState(false);

  const [walletBalance, setWalletBalance] = useState(1250);

  const [successBooking, setSuccessBooking] =
    useState<Reservation | null>(null);

  const activeReservations = useMemo(
    () => reservations.filter((item) => item.status === "upcoming"),
    [reservations]
  );

  const cancelledReservations = useMemo(
    () => reservations.filter((item) => item.status === "cancelled"),
    [reservations]
  );

  const refundAmount = selectedReservation
    ? Math.round(
        selectedReservation.amount *
          (selectedReservation.refundPercent / 100)
      )
    : 0;

  function openCancelModal(reservation: Reservation) {
    setSelectedReservation(reservation);
    setReason("");
  }

  function closeCancelModal() {
    setSelectedReservation(null);
    setReason("");
  }

  function cancelReservation() {
    if (!selectedReservation || !reason) return;

    const reservation = selectedReservation;
    const refund =
      reservation.refundEligible &&
      reservation.refundPercent > 0
        ? Math.round(
            reservation.amount *
              (reservation.refundPercent / 100)
          )
        : 0;

    setReservations((current) =>
      current.map((item) =>
        item.id === reservation.id
          ? {
              ...item,
              status: "cancelled",
            }
          : item
      )
    );

    setWalletBalance((current) => current + refund);

    setSuccessBooking(reservation);
    setSelectedReservation(null);
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="flex min-h-screen">
        {/* Existing Sidebar */}
        

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Existing Topbar */}
          <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="flex h-20 items-center justify-between px-5 lg:px-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Reservations
                </p>

                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  Cancel Reservation
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 sm:flex">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Wallet size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Wallet balance
                    </p>

                    <p className="text-sm font-black text-slate-800">
                      Rs {walletBalance.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-black text-white">
                  SL
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden px-5 py-7 lg:px-8 lg:py-10">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600">
                  <XCircle size={14} />
                  Manage reservations
                </div>

                <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Cancel a Reservation
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Need to change your plans? Select a reservation below to
                  cancel it and receive your eligible refund directly into
                  your SPOT-GO wallet.
                </p>
              </motion.div>

              {/* Top cards */}
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <InfoCard
                  icon={<CalendarDays size={21} />}
                  title="Active reservations"
                  value={activeReservations.length.toString()}
                  text="Reservations available to cancel"
                  gradient="from-blue-500 to-cyan-500"
                />

                <InfoCard
                  icon={<Wallet size={21} />}
                  title="Wallet balance"
                  value={`Rs ${walletBalance.toLocaleString()}`}
                  text="Available for future bookings"
                  gradient="from-emerald-500 to-teal-500"
                />

                <InfoCard
                  icon={<RotateCcw size={21} />}
                  title="Refund method"
                  value="SPOT-GO Wallet"
                  text="Refunds are credited automatically"
                  gradient="from-violet-500 to-purple-500"
                />
              </div>

              <div className="grid gap-7 xl:grid-cols-[1fr_330px]">
                {/* Reservations */}
                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        Upcoming reservations
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Choose the booking you want to cancel
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
                      {activeReservations.length} bookings
                    </span>
                  </div>

                  <AnimatePresence mode="popLayout">
                    {activeReservations.map((reservation, index) => (
                      <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                        index={index}
                        onCancel={() =>
                          openCancelModal(reservation)
                        }
                      />
                    ))}
                  </AnimatePresence>

                  {activeReservations.length === 0 && (
                    <EmptyState />
                  )}

                  {/* Cancelled */}
                  {cancelledReservations.length > 0 && (
                    <div className="mt-10">
                      <div className="mb-4">
                        <h3 className="text-lg font-black text-slate-900">
                          Recently cancelled
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Your cancelled reservations and refund records
                        </p>
                      </div>

                      {cancelledReservations.map((reservation) => (
                        <CancelledCard
                          key={reservation.id}
                          reservation={reservation}
                        />
                      ))}
                    </div>
                  )}
                </section>

                {/* Right sidebar */}
                <aside className="space-y-5">
                  {/* Refund policy */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                        <ShieldCheck size={22} />
                      </div>

                      <h3 className="mt-4 text-lg font-black">
                        Cancellation policy
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-300">
                        Your refund depends on how early you cancel your
                        reservation.
                      </p>
                    </div>

                    <div className="space-y-4 p-5">
                      <PolicyRow
                        color="bg-emerald-500"
                        title="24+ hours before"
                        value="100% refund"
                      />

                      <PolicyRow
                        color="bg-amber-500"
                        title="6–24 hours before"
                        value="80% refund"
                      />

                      <PolicyRow
                        color="bg-rose-500"
                        title="Less than 6 hours"
                        value="No refund"
                      />
                    </div>
                  </motion.div>

                  {/* Wallet */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 }}
                    className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                          Your wallet
                        </p>

                        <p className="mt-2 text-3xl font-black text-slate-900">
                          Rs {walletBalance.toLocaleString()}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Refunds will be added here
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                        <Wallet size={21} />
                      </div>
                    </div>

                    <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700">
                      View wallet
                      <ArrowRight size={14} />
                    </button>
                  </motion.div>

                  {/* Help */}
                  <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-5">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <Info size={18} />
                      </div>

                      <div>
                        <h4 className="text-sm font-black text-slate-800">
                          Before cancelling
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Please make sure you no longer need this parking
                          reservation. Once cancelled, your slot will be
                          released for other drivers.
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Cancel modal */}
      <AnimatePresence>
        {selectedReservation && (
          <CancelModal
            reservation={selectedReservation}
            reason={reason}
            reasonOpen={reasonOpen}
            refundAmount={refundAmount}
            onReasonChange={setReason}
            onReasonOpen={() => setReasonOpen((value) => !value)}
            onClose={closeCancelModal}
            onConfirm={cancelReservation}
          />
        )}
      </AnimatePresence>

      {/* Success modal */}
      <AnimatePresence>
        {successBooking && (
          <SuccessModal
            reservation={successBooking}
            refundAmount={Math.round(
              successBooking.amount *
                (successBooking.refundPercent / 100)
            )}
            walletBalance={walletBalance}
            onClose={() => setSuccessBooking(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========================================================= */
/* INFO CARD */
/* ========================================================= */

function InfoCard({
  icon,
  title,
  value,
  text,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  text: string;
  gradient: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-xl"
    >
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
      >
        {icon}
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">{text}</p>

      <div
        className={`absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-gradient-to-br ${gradient} opacity-[0.06] transition duration-500 group-hover:scale-150`}
      />
    </motion.div>
  );
}

/* ========================================================= */
/* RESERVATION CARD */
/* ========================================================= */

function ReservationCard({
  reservation,
  index,
  onCancel,
}: {
  reservation: Reservation;
  index: number;
  onCancel: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.06 }}
      className="group mb-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Visual */}
        <div
          className={`relative flex min-h-[150px] w-full shrink-0 items-center justify-center bg-gradient-to-br ${reservation.gradient} lg:w-32`}
        >
          <ParkingCircle
            size={48}
            strokeWidth={1.5}
            className="text-white"
          />

          <div className="absolute bottom-3 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur">
            Slot {reservation.slot}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 lg:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                  UPCOMING
                </span>

                <span className="text-xs font-semibold text-slate-400">
                  #{reservation.id}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900">
                {reservation.parkingName}
              </h3>

              <div className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <span>
                  {reservation.location}, {reservation.area}
                </span>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Amount
              </p>

              <p className="mt-1 text-xl font-black text-slate-900">
                Rs {reservation.amount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4">
            <DetailItem
              icon={<CalendarDays size={15} />}
              label="Date"
              value={reservation.date}
            />

            <DetailItem
              icon={<Clock3 size={15} />}
              label="Time"
              value={reservation.time}
            />

            <DetailItem
              icon={<Ticket size={15} />}
              label="Duration"
              value={reservation.duration}
            />

            <DetailItem
              icon={<Car size={15} />}
              label="Vehicle"
              value={reservation.vehicleNumber}
            />
          </div>

          {/* Bottom */}
          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Check size={14} />
              </span>

              <span className="text-xs font-bold text-slate-600">
                {reservation.refundPercent}% refund eligible
              </span>
            </div>

            <button
              onClick={onCancel}
              className="flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-black text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              <XCircle size={15} />
              Cancel reservation
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ========================================================= */
/* DETAIL ITEM */
/* ========================================================= */

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {icon}
        {label}
      </div>

      <p className="truncate text-xs font-black text-slate-700">
        {value}
      </p>
    </div>
  );
}

/* ========================================================= */
/* POLICY */
/* ========================================================= */

function PolicyRow({
  color,
  title,
  value,
}: {
  color: string;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="text-xs font-bold text-slate-600">
          {title}
        </span>
      </div>

      <span className="text-xs font-black text-slate-800">
        {value}
      </span>
    </div>
  );
}

/* ========================================================= */
/* CANCEL MODAL */
/* ========================================================= */

function CancelModal({
  reservation,
  reason,
  reasonOpen,
  refundAmount,
  onReasonChange,
  onReasonOpen,
  onClose,
  onConfirm,
}: {
  reservation: Reservation;
  reason: string;
  reasonOpen: boolean;
  refundAmount: number;
  onReasonChange: (value: string) => void;
  onReasonOpen: () => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[30px] bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 to-orange-500 p-6 text-white">
          <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10" />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25"
          >
            <X size={18} />
          </button>

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <XCircle size={25} />
            </div>

            <h2 className="mt-4 text-2xl font-black">
              Cancel reservation?
            </h2>

            <p className="mt-1 text-sm text-white/80">
              Please review the details before confirming.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Booking */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${reservation.gradient} text-white`}
              >
                <ParkingCircle size={21} />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-black text-slate-900">
                  {reservation.parkingName}
                </h3>

                <p className="mt-1 flex items-start gap-1 text-xs text-slate-500">
                  <MapPin size={13} className="mt-0.5 shrink-0" />
                  {reservation.location}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-600">
                    {reservation.date}
                  </span>

                  <span className="rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-600">
                    {reservation.time}
                  </span>

                  <span className="rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-blue-600">
                    Slot {reservation.slot}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Refund */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  <Wallet size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold text-emerald-700">
                    Estimated wallet refund
                  </p>

                  <p className="mt-0.5 text-xl font-black text-slate-900">
                    Rs {refundAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-emerald-600">
                {reservation.refundPercent}% refund
              </span>
            </div>

            <div className="border-t border-emerald-100 px-4 py-3">
              <p className="text-[11px] leading-5 text-emerald-700">
                This amount will be added to your SPOT-GO wallet after
                cancellation.
              </p>
            </div>
          </div>

          {/* Reason */}
          <div className="mt-6">
            <label className="mb-2 block text-xs font-black text-slate-800">
              Why are you cancelling?
            </label>

            <div className="relative">
              <button
                onClick={onReasonOpen}
                className={`flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-left text-sm transition ${
                  reason
                    ? "border-blue-300 text-slate-800"
                    : "border-slate-200 text-slate-400"
                }`}
              >
                <span>{reason || "Select a reason"}</span>

                <ChevronDown
                  size={17}
                  className={`transition ${
                    reasonOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {reasonOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 right-0 top-14 z-10 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                  >
                    {cancellationReasons.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          onReasonChange(item);
                          onReasonOpen();
                        }}
                        className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        {item}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-5 flex gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0 text-amber-600"
            />

            <p className="text-xs leading-5 text-amber-800">
              Once you cancel this reservation, parking slot{" "}
              <strong>{reservation.slot}</strong> will become available
              for another customer. This action cannot be undone.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              onClick={onClose}
              className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Keep reservation
            </button>

            <button
              disabled={!reason}
              onClick={onConfirm}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <XCircle size={17} />
              Confirm cancellation
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ========================================================= */
/* SUCCESS MODAL */
/* ========================================================= */

function SuccessModal({
  reservation,
  refundAmount,
  walletBalance,
  onClose,
}: {
  reservation: Reservation;
  refundAmount: number;
  walletBalance: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-2xl"
      >
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 px-6 pb-8 pt-8 text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.1,
              type: "spring",
            }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20"
          >
            <CheckCircle2 size={42} />
          </motion.div>

          <h2 className="mt-5 text-2xl font-black">
            Reservation cancelled
          </h2>

          <p className="mt-1 text-sm text-white/80">
            Your reservation has been successfully cancelled.
          </p>
        </div>

        <div className="p-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-400">
              Cancelled booking
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {reservation.parkingName}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {reservation.date} · {reservation.time} · Slot{" "}
              {reservation.slot}
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Refund added to wallet
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              Rs {refundAmount.toLocaleString()}
            </p>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-emerald-700">
              <Wallet size={15} />
              New wallet balance: Rs{" "}
              {walletBalance.toLocaleString()}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
              <CreditCard size={17} />
            </div>

            <p className="text-xs leading-5 text-slate-600">
              Your refund is now available in your SPOT-GO wallet and can
              be used for your next parking reservation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-600"
          >
            Done
            <Check size={17} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ========================================================= */
/* EMPTY STATE */
/* ========================================================= */

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
        <CheckCircle2 size={29} />
      </div>

      <h3 className="mt-4 text-lg font-black text-slate-900">
        No active reservations
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-400">
        You don't have any upcoming reservations that need to be
        cancelled.
      </p>
    </motion.div>
  );
}

/* ========================================================= */
/* CANCELLED CARD */
/* ========================================================= */

function CancelledCard({
  reservation,
}: {
  reservation: Reservation;
}) {
  const refund = Math.round(
    reservation.amount * (reservation.refundPercent / 100)
  );

  return (
    <div className="mb-4 rounded-3xl border border-slate-200 bg-white p-5 opacity-80">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <ParkingCircle size={21} />
          </div>

          <div>
            <p className="text-sm font-black text-slate-700">
              {reservation.parkingName}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {reservation.date} · Slot {reservation.slot}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Refund
            </p>

            <p className="text-sm font-black text-emerald-600">
              Rs {refund.toLocaleString()}
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-500">
            Cancelled
          </span>
        </div>
      </div>
    </div>
  );
}