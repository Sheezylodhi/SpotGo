"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  Eye,
  LockKeyhole,
  MapPin,
  MoreHorizontal,
  ParkingCircle,
  Plus,
  Receipt,
  Search,
  ShieldCheck,
  Smartphone,
  Wallet,
  X,
  XCircle,
} from "lucide-react";

type PaymentStatus = "completed" | "pending" | "failed";

type Payment = {
  id: string;
  bookingId: string;
  parking: string;
  location: string;
  slot: string;
  date: string;
  time: string;
  amount: number;
  method: string;
  lastFour?: string;
  status: PaymentStatus;
};

const initialPayments: Payment[] = [
  {
    id: "PAY-98321",
    bookingId: "SPG-2026-09124",
    parking: "Ocean Mall Parking",
    location: "Clifton, Karachi",
    slot: "A-18",
    date: "Sep 03, 2026",
    time: "07:15 PM",
    amount: 240,
    method: "Visa",
    lastFour: "4242",
    status: "completed",
  },
  {
    id: "PAY-97842",
    bookingId: "SPG-2026-08972",
    parking: "Dolmen Mall Parking",
    location: "Tariq Road, Karachi",
    slot: "B-07",
    date: "Aug 31, 2026",
    time: "06:22 PM",
    amount: 450,
    method: "Wallet",
    status: "completed",
  },
  {
    id: "PAY-97411",
    bookingId: "SPG-2026-08564",
    parking: "Business District Parking",
    location: "Shahrah-e-Faisal, Karachi",
    slot: "D-14",
    date: "Aug 24, 2026",
    time: "08:50 AM",
    amount: 240,
    method: "Mastercard",
    lastFour: "8891",
    status: "completed",
  },
  {
    id: "PAY-97008",
    bookingId: "SPG-2026-08192",
    parking: "City Center Parking",
    location: "Saddar, Karachi",
    slot: "C-09",
    date: "Aug 20, 2026",
    time: "04:40 PM",
    amount: 180,
    method: "Wallet",
    status: "completed",
  },
  {
    id: "PAY-96421",
    bookingId: "SPG-2026-07931",
    parking: "Grand Avenue Parking",
    location: "North Nazimabad, Karachi",
    slot: "A-04",
    date: "Aug 17, 2026",
    time: "01:30 PM",
    amount: 320,
    method: "Visa",
    lastFour: "4242",
    status: "pending",
  },
  {
    id: "PAY-95811",
    bookingId: "SPG-2026-07420",
    parking: "Central Mall Parking",
    location: "PECHS, Karachi",
    slot: "F-21",
    date: "Aug 12, 2026",
    time: "09:15 PM",
    amount: 275,
    method: "Mastercard",
    lastFour: "8891",
    status: "failed",
  },
];

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    lastFour: "4242",
    expiry: "09/28",
    primary: true,
  },
  {
    id: 2,
    type: "Mastercard",
    lastFour: "8891",
    expiry: "04/29",
    primary: false,
  },
];

function formatCurrency(amount: number) {
  return `Rs ${amount.toLocaleString()}`;
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const config = {
    completed: {
      label: "Completed",
      icon: Check,
      className:
        "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    pending: {
      label: "Pending",
      icon: Clock3,
      className:
        "bg-amber-50 text-amber-700 border-amber-200",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      className:
        "bg-rose-50 text-rose-700 border-rose-200",
    },
  }[status];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${config.className}`}
    >
      <Icon size={13} />
      {config.label}
    </span>
  );
}

function PaymentMethodIcon({ method }: { method: string }) {
  if (method === "Wallet") {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
        <Wallet size={19} />
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
      <CreditCard size={19} />
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  iconClass: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs font-medium text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </motion.div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={15} />
        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function PaymentDetailsModal({
  payment,
  onClose,
}: {
  payment: Payment | null;
  onClose: () => void;
}) {
  if (!payment) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <X size={18} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Receipt size={24} />
            </div>

            <p className="mt-5 text-sm text-white/60">
              Payment receipt
            </p>

            <h2 className="mt-1 text-3xl font-black">
              {formatCurrency(payment.amount)}
            </h2>

            <div className="mt-4">
              <StatusBadge status={payment.status} />
            </div>
          </div>

          <div className="space-y-5 p-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <ParkingCircle size={21} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">
                    {payment.parking}
                  </p>

                  <p className="truncate text-sm text-slate-500">
                    {payment.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailItem
                icon={Car}
                label="Parking Slot"
                value={payment.slot}
              />

              <DetailItem
                icon={CalendarDays}
                label="Date"
                value={payment.date}
              />

              <DetailItem
                icon={Clock3}
                label="Time"
                value={payment.time}
              />

              <DetailItem
                icon={CreditCard}
                label="Payment"
                value={
                  payment.method === "Wallet"
                    ? "Wallet"
                    : `${payment.method} •••• ${payment.lastFour}`
                }
              />
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500">
                  Booking ID
                </span>

                <span className="font-mono text-xs font-bold text-slate-900">
                  {payment.bookingId}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="font-semibold text-slate-700">
                  Total paid
                </span>

                <span className="text-lg font-black text-slate-900">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}

function AddPaymentMethodModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: () => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const submit = () => {
    if (!cardNumber || !name || !expiry || !cvv) return;

    onAdd();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <CreditCard size={21} />
              </div>

              <h2 className="mt-4 text-xl font-black text-slate-900">
                Add payment method
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add a card for faster parking payments.
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <Input
              label="Card number"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={setCardNumber}
            />

            <Input
              label="Cardholder name"
              placeholder="John Doe"
              value={name}
              onChange={setName}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={setExpiry}
              />

              <Input
                label="CVV"
                placeholder="•••"
                value={cvv}
                onChange={setCvv}
                type="password"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-700">
              <LockKeyhole size={15} />
              Your payment information is securely protected.
            </div>

            <button
              onClick={submit}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <Plus size={17} />
              Add card
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>

      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const [payments, setPayments] =
    useState<Payment[]>(initialPayments);

  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState<"all" | PaymentStatus>("all");

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  const [addMethodOpen, setAddMethodOpen] = useState(false);

  const [methods, setMethods] = useState(paymentMethods);

  const [showAllMethods, setShowAllMethods] = useState(false);

  const filteredPayments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return payments.filter((payment) => {
      const matchesSearch =
        payment.parking.toLowerCase().includes(query) ||
        payment.location.toLowerCase().includes(query) ||
        payment.bookingId.toLowerCase().includes(query) ||
        payment.id.toLowerCase().includes(query) ||
        payment.method.toLowerCase().includes(query) ||
        payment.slot.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" || payment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [payments, search, filter]);

  const completedPayments = payments.filter(
    (payment) => payment.status === "completed"
  );

  const totalSpent = completedPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const successfulCount = completedPayments.length;

  const thisMonth = completedPayments
    .filter((payment) => payment.date.includes("Sep 2026"))
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingCount = payments.filter(
    (payment) => payment.status === "pending"
  ).length;

  const handleAddMethod = () => {
    const newMethod = {
      id: Date.now(),
      type: "Visa",
      lastFour: "7318",
      expiry: "11/29",
      primary: false,
    };

    setMethods((prev) => [...prev, newMethod]);
    setAddMethodOpen(false);
  };

  const removeMethod = (id: number) => {
    setMethods((prev) =>
      prev.filter((method) => method.id !== id)
    );
  };

  return (
    <div className="w-full text-slate-900">
      {/* PAGE CONTENT */}
      <div className="w-full">
        {/* PAGE HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              <CreditCard size={14} />
              Payments
            </div>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Payments & Billing
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your parking payments, cards and receipts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 sm:flex">
              <ShieldCheck size={15} />
              Secure payments
            </div>

            <button
              onClick={() => setAddMethodOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              <Plus size={17} />

              <span className="hidden sm:block">
                Add payment method
              </span>
            </button>
          </div>
        </motion.div>

        {/* HERO */}

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-8"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                <Wallet size={17} />
                Your payment overview
              </div>

              <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
                Simple, secure & transparent parking payments.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Manage your parking payments, payment methods and
                receipts from one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur">
                  <span className="text-blue-200">
                    This month
                  </span>{" "}
                  {formatCurrency(thisMonth)}
                </div>

                <div className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur">
                  <span className="text-blue-200">
                    Successful
                  </span>{" "}
                  {successfulCount}
                </div>
              </div>
            </div>

            <div className="hidden h-40 w-40 items-center justify-center rounded-full border border-white/15 bg-white/10 lg:flex">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <CreditCard size={48} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* STATS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total spent"
            value={formatCurrency(totalSpent)}
            subtitle="All successful payments"
            icon={Banknote}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            title="This month"
            value={formatCurrency(thisMonth)}
            subtitle="September 2026"
            icon={ArrowUpRight}
            iconClass="bg-violet-50 text-violet-600"
          />

          <StatCard
            title="Successful"
            value={successfulCount.toString()}
            subtitle="Completed payments"
            icon={BadgeCheck}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Pending"
            value={pendingCount.toString()}
            subtitle="Awaiting confirmation"
            icon={Clock3}
            iconClass="bg-amber-50 text-amber-600"
          />
        </section>

        {/* PAYMENT METHODS */}

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Payment methods
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Cards available for your parking payments.
              </p>
            </div>

            <button
              onClick={() => setAddMethodOpen(true)}
              className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              <Plus size={16} />
              Add new
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {methods
              .slice(
                0,
                showAllMethods ? methods.length : 2
              )
              .map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-50 transition group-hover:scale-125" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <CreditCard size={21} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-slate-900">
                            {method.type}
                          </p>

                          {method.primary && (
                            <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                              Primary
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                          •••• •••• •••• {method.lastFour}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Expires
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {method.expiry}
                      </p>
                    </div>

                    {!method.primary && (
                      <button
                        onClick={() =>
                          removeMethod(method.id)
                        }
                        className="text-xs font-bold text-rose-500 hover:text-rose-600"
                      >
                        Remove
                      </button>
                    )}

                    {method.primary && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                        <ShieldCheck size={14} />
                        Secure
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>

          {methods.length > 2 && (
            <button
              onClick={() =>
                setShowAllMethods((prev) => !prev)
              }
              className="mt-3 flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-slate-800"
            >
              {showAllMethods
                ? "Show less"
                : "Show all methods"}

              <ChevronDown
                size={15}
                className={`transition ${
                  showAllMethods ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </section>

        {/* PAYMENT HISTORY */}

        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Payment history
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage all your parking transactions.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search payments..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:w-64"
                />
              </div>

              <div className="flex overflow-x-auto rounded-xl border border-slate-200 bg-white p-1">
                {[
                  ["all", "All"],
                  ["completed", "Completed"],
                  ["pending", "Pending"],
                  ["failed", "Failed"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() =>
                      setFilter(
                        value as "all" | PaymentStatus
                      )
                    }
                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${
                      filter === value
                        ? "bg-slate-900 text-white"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* DESKTOP */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Parking
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Date & time
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Method
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredPayments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="group transition hover:bg-slate-50/80"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <PaymentMethodIcon
                            method={payment.method}
                          />

                          <div>
                            <p className="font-bold text-slate-900">
                              {payment.parking}
                            </p>

                            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                              <MapPin size={12} />
                              {payment.location}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-700">
                          {payment.date}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {payment.time}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {payment.method}
                        </p>

                        {payment.lastFour && (
                          <p className="mt-1 text-xs text-slate-400">
                            •••• {payment.lastFour}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-slate-900">
                          {formatCurrency(payment.amount)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={payment.status}
                        />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() =>
                            setSelectedPayment(payment)
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}

            <div className="divide-y divide-slate-100 md:hidden">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <PaymentMethodIcon
                        method={payment.method}
                      />

                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-900">
                          {payment.parking}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={12} />
                          <span className="truncate">
                            {payment.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <StatusBadge status={payment.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Date
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-700">
                        {payment.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Slot
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-700">
                        {payment.slot}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Payment
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-700">
                        {payment.method}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Amount
                      </p>

                      <p className="mt-1 text-sm font-black text-slate-900">
                        {formatCurrency(payment.amount)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedPayment(payment)
                    }
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Eye size={15} />
                    View payment details
                  </button>
                </div>
              ))}
            </div>

            {filteredPayments.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Search size={23} />
                </div>

                <h3 className="mt-4 font-black text-slate-900">
                  No payments found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or payment filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECURITY INFO */}

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoCard
            icon={ShieldCheck}
            title="Secure payments"
            description="Your payment information is protected with secure encryption."
          />

          <InfoCard
            icon={Receipt}
            title="Instant receipts"
            description="Every successful parking payment generates a digital receipt."
          />

          <InfoCard
            icon={Smartphone}
            title="Easy checkout"
            description="Use saved payment methods for faster future bookings."
          />
        </section>

        {/* FOOTER */}

        <footer className="mt-10 border-t border-slate-200 py-6">
          <div className="flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 SPOT-GO. Smart parking made simple.
            </p>

            <div className="flex items-center gap-2">
              <LockKeyhole size={13} />
              Secure payment environment
            </div>
          </div>
        </footer>
      </div>

      {/* MODALS */}

      <PaymentDetailsModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />

      {addMethodOpen && (
        <AddPaymentMethodModal
          onClose={() => setAddMethodOpen(false)}
          onAdd={handleAddMethod}
        />
      )}
    </div>
  );
}