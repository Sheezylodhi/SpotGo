"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  CreditCard,
  Filter,
  History,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Ticket,
  TrendingUp,
  Wallet,
  X,
  XCircle,
} from "lucide-react";

type TransactionType = "credit" | "debit";

type Transaction = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  amount: number;
  type: TransactionType;
  category: "refund" | "parking" | "topup";
  bookingId?: string;
};

const initialTransactions: Transaction[] = [
  {
    id: "TXN-98321",
    title: "Parking Refund",
    description: "Refund from cancelled reservation",
    date: "Sep 03, 2026",
    time: "08:42 PM",
    amount: 240,
    type: "credit",
    category: "refund",
    bookingId: "SPG-2026-09124",
  },
  {
    id: "TXN-98114",
    title: "Parking Payment",
    description: "Ocean Mall Parking · Slot A-18",
    date: "Sep 03, 2026",
    time: "07:15 PM",
    amount: 240,
    type: "debit",
    category: "parking",
    bookingId: "SPG-2026-09124",
  },
  {
    id: "TXN-97842",
    title: "Wallet Top Up",
    description: "Added money using Visa ending 4242",
    date: "Sep 01, 2026",
    time: "11:20 AM",
    amount: 1000,
    type: "credit",
    category: "topup",
  },
  {
    id: "TXN-97411",
    title: "Parking Payment",
    description: "Dolmen Mall Parking · Slot B-07",
    date: "Aug 31, 2026",
    time: "06:22 PM",
    amount: 450,
    type: "debit",
    category: "parking",
    bookingId: "SPG-2026-08972",
  },
  {
    id: "TXN-97008",
    title: "Parking Refund",
    description: "Refund from cancelled reservation",
    date: "Aug 25, 2026",
    time: "09:35 AM",
    amount: 192,
    type: "credit",
    category: "refund",
    bookingId: "SPG-2026-08564",
  },
  {
    id: "TXN-96532",
    title: "Parking Payment",
    description: "Business District Parking · Slot D-14",
    date: "Aug 24, 2026",
    time: "08:50 AM",
    amount: 240,
    type: "debit",
    category: "parking",
    bookingId: "SPG-2026-08564",
  },
];

const quickAmounts = [500, 1000, 2000, 5000];

export default function WalletPage() {
  const [balance, setBalance] = useState(1250);
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");

  const [activeFilter, setActiveFilter] = useState<
    "all" | "credit" | "debit"
  >("all");

  const [search, setSearch] = useState("");

  const [success, setSuccess] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesType =
        activeFilter === "all" ||
        transaction.type === activeFilter;

      const query = search.toLowerCase();

      const matchesSearch =
        transaction.title.toLowerCase().includes(query) ||
        transaction.description.toLowerCase().includes(query) ||
        transaction.id.toLowerCase().includes(query) ||
        transaction.bookingId?.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [transactions, activeFilter, search]);

  const totalCredits = transactions
    .filter((item) => item.type === "credit")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalDebits = transactions
    .filter((item) => item.type === "debit")
    .reduce((sum, item) => sum + item.amount, 0);

  function handleAddMoney() {
    const amount = customAmount
      ? Number(customAmount)
      : selectedAmount;

    if (!amount || amount <= 0) return;

    const newTransaction: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 89999)}`,
      title: "Wallet Top Up",
      description: "Money added to SPOT-GO wallet",
      date: "Sep 03, 2026",
      time: "Now",
      amount,
      type: "credit",
      category: "topup",
    };

    setBalance((current) => current + amount);
    setTransactions((current) => [
      newTransaction,
      ...current,
    ]);

    setAddMoneyOpen(false);
    setCustomAmount("");
    setSuccess(true);
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="flex min-h-screen">
        {/* Existing Sidebar */}
        

        <main className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="flex h-20 items-center justify-between px-5 lg:px-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Payments
                </p>

                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  My Wallet
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 sm:flex">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Wallet size={18} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Available balance
                    </p>

                    <p className="text-sm font-black text-slate-800">
                      Rs {balance.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-black text-white">
                  SL
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="relative overflow-hidden px-5 py-7 lg:px-8 lg:py-10">
            <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-100/40 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                  <Wallet size={14} />
                  Secure digital wallet
                </div>

                <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Your SPOT-GO Wallet
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Manage your parking payments, refunds and wallet
                  balance from one secure place.
                </p>
              </motion.div>

              {/* Wallet hero */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-7 overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-2xl shadow-slate-900/15 sm:p-8"
              >
                {/* Decorations */}
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-2xl" />
                <div className="absolute -bottom-32 left-[35%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                        <Wallet size={24} />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                          Available balance
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white/70">
                          Ready to use for parking
                        </p>
                      </div>
                    </div>

                    <div className="mt-7">
                      <p className="text-4xl font-black tracking-tight sm:text-5xl">
                        Rs {balance.toLocaleString()}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15">
                          <Check size={12} />
                        </span>
                        Wallet is active
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setAddMoneyOpen(true)}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-black text-slate-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-50"
                  >
                    <Plus size={19} />
                    Add Money
                  </button>
                </div>

                {/* Bottom stats */}
                <div className="relative mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
                  <WalletStat
                    label="Money added"
                    value={`Rs ${totalCredits.toLocaleString()}`}
                    icon={<ArrowDownLeft size={15} />}
                  />

                  <WalletStat
                    label="Parking spent"
                    value={`Rs ${totalDebits.toLocaleString()}`}
                    icon={<ArrowUpRight size={15} />}
                  />

                  <div className="col-span-2 sm:col-span-1">
                    <WalletStat
                      label="Transactions"
                      value={transactions.length.toString()}
                      icon={<History size={15} />}
                    />
                  </div>
                </div>
              </motion.section>

              {/* Security strip */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mb-7 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-black text-slate-800">
                      Secure wallet payments
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Your wallet balance can be used for quick parking
                      reservations.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600">
                  <Check size={14} />
                  Protected
                </div>
              </motion.div>

              {/* Main grid */}
              <div className="grid gap-7 xl:grid-cols-[1fr_330px]">
                {/* Transactions */}
                <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 p-5 lg:p-6">
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-black text-slate-900">
                            Transaction History
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            Track your wallet activity
                          </p>
                        </div>

                        <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 sm:flex">
                          <History size={18} />
                        </div>
                      </div>

                      {/* Search */}
                      <div className="relative">
                        <Search
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          value={search}
                          onChange={(e) =>
                            setSearch(e.target.value)
                          }
                          placeholder="Search transactions..."
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>

                      {/* Filters */}
                      <div className="flex gap-2 overflow-x-auto">
                        {[
                          ["all", "All"],
                          ["credit", "Money in"],
                          ["debit", "Money out"],
                        ].map(([value, label]) => (
                          <button
                            key={value}
                            onClick={() =>
                              setActiveFilter(
                                value as
                                  | "all"
                                  | "credit"
                                  | "debit"
                              )
                            }
                            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                              activeFilter === value
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            }`}
                          >
                            {label}
                          </button>
                        ))}

                        <button className="ml-auto hidden items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500 sm:flex">
                          <Filter size={13} />
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5">
                    <AnimatePresence mode="popLayout">
                      {filteredTransactions.map(
                        (transaction, index) => (
                          <TransactionRow
                            key={transaction.id}
                            transaction={transaction}
                            index={index}
                          />
                        )
                      )}
                    </AnimatePresence>

                    {filteredTransactions.length === 0 && (
                      <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Search size={24} />
                        </div>

                        <h3 className="mt-4 text-sm font-black">
                          No transactions found
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another search or filter.
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Right side */}
                <aside className="space-y-5">
                  {/* Add money */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-black text-slate-900">
                          Add money
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Quickly top up your wallet
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Plus size={19} />
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {quickAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                            setAddMoneyOpen(true);
                          }}
                          className="rounded-xl border border-slate-200 px-3 py-3 text-xs font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                        >
                          + Rs {amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Payment method */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">
                        Payment method
                      </h3>

                      <button className="text-xs font-bold text-blue-600">
                        Manage
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                        <CreditCard size={19} />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-black text-slate-800">
                          Visa ending 4242
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Default payment method
                        </p>
                      </div>

                      <Check
                        size={16}
                        className="text-emerald-500"
                      />
                    </div>
                  </motion.div>

                  {/* Wallet tips */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                      <TrendingUp size={19} />
                    </div>

                    <h3 className="mt-4 text-sm font-black text-slate-900">
                      Wallet benefits
                    </h3>

                    <ul className="mt-3 space-y-2.5">
                      <Tip text="Faster parking checkout" />
                      <Tip text="Instant cancellation refunds" />
                      <Tip text="No need to enter payment every time" />
                    </ul>
                  </motion.div>
                </aside>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Money Modal */}
      <AnimatePresence>
        {addMoneyOpen && (
          <AddMoneyModal
            selectedAmount={selectedAmount}
            customAmount={customAmount}
            onAmountChange={setSelectedAmount}
            onCustomAmountChange={setCustomAmount}
            onClose={() => setAddMoneyOpen(false)}
            onConfirm={handleAddMoney}
          />
        )}
      </AnimatePresence>

      {/* Success */}
      <AnimatePresence>
        {success && (
          <SuccessToast
            onClose={() => setSuccess(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========================================================= */
/* WALLET STAT */
/* ========================================================= */

function WalletStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-2 text-white/50">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-black text-white">
        {value}
      </p>
    </div>
  );
}

/* ========================================================= */
/* TRANSACTION ROW */
/* ========================================================= */

function TransactionRow({
  transaction,
  index,
}: {
  transaction: Transaction;
  index: number;
}) {
  const isCredit = transaction.type === "credit";

  const icon =
    transaction.category === "refund" ? (
      <RefreshCcw size={18} />
    ) : transaction.category === "parking" ? (
      <Ticket size={18} />
    ) : (
      <Plus size={18} />
    );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.04 }}
      className="group mb-2 flex items-center gap-3 rounded-2xl border border-transparent p-3 transition hover:border-slate-100 hover:bg-slate-50 sm:gap-4 sm:p-4"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          isCredit
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <p className="truncate text-sm font-black text-slate-800">
            {transaction.title}
          </p>

          {transaction.category === "refund" && (
            <span className="mt-1 w-fit rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-black text-emerald-600 sm:mt-0">
              REFUND
            </span>
          )}
        </div>

        <p className="mt-1 truncate text-xs text-slate-400">
          {transaction.description}
        </p>

        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
          <CalendarDays size={11} />
          {transaction.date}
          <span>·</span>
          <Clock3 size={11} />
          {transaction.time}
        </div>
      </div>

      <div className="text-right">
        <p
          className={`text-sm font-black ${
            isCredit
              ? "text-emerald-600"
              : "text-slate-800"
          }`}
        >
          {isCredit ? "+" : "-"} Rs{" "}
          {transaction.amount.toLocaleString()}
        </p>

        <p className="mt-1 text-[9px] font-semibold text-slate-400">
          {transaction.id}
        </p>
      </div>

      <ChevronRight
        size={16}
        className="hidden text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500 sm:block"
      />
    </motion.div>
  );
}

/* ========================================================= */
/* ADD MONEY MODAL */
/* ========================================================= */

function AddMoneyModal({
  selectedAmount,
  customAmount,
  onAmountChange,
  onCustomAmountChange,
  onClose,
  onConfirm,
}: {
  selectedAmount: number;
  customAmount: string;
  onAmountChange: (amount: number) => void;
  onCustomAmountChange: (amount: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const finalAmount = customAmount
    ? Number(customAmount)
    : selectedAmount;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.97 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10" />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 transition hover:bg-white/25"
          >
            <X size={17} />
          </button>

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Wallet size={24} />
            </div>

            <h2 className="mt-4 text-2xl font-black">
              Add money
            </h2>

            <p className="mt-1 text-sm text-white/80">
              Add funds to your SPOT-GO wallet.
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Amount */}
          <p className="text-xs font-black text-slate-800">
            Select amount
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  onAmountChange(amount);
                  onCustomAmountChange("");
                }}
                className={`rounded-xl border px-4 py-3 text-sm font-black transition ${
                  selectedAmount === amount && !customAmount
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-slate-200 text-slate-600 hover:border-blue-200"
                }`}
              >
                Rs {amount.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom */}
          <div className="mt-5">
            <label className="text-xs font-black text-slate-800">
              Custom amount
            </label>

            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">
                Rs
              </span>

              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) =>
                  onCustomAmountChange(e.target.value)
                }
                placeholder="Enter amount"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="mt-5">
            <p className="text-xs font-black text-slate-800">
              Pay with
            </p>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                <CreditCard size={18} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-black text-slate-800">
                  Visa ending 4242
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Default payment method
                </p>
              </div>

              <Check
                size={17}
                className="text-blue-600"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Amount
              </span>

              <span className="font-black text-slate-800">
                Rs {Number(finalAmount || 0).toLocaleString()}
              </span>
            </div>

            <div className="mt-3 flex justify-between border-t border-slate-200 pt-3">
              <span className="font-black text-slate-700">
                Total
              </span>

              <span className="text-lg font-black text-blue-600">
                Rs {Number(finalAmount || 0).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              disabled={!finalAmount || finalAmount <= 0}
              onClick={onConfirm}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={17} />
              Add Rs {Number(finalAmount || 0).toLocaleString()}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ========================================================= */
/* TIP */
/* ========================================================= */

function Tip({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-xs font-semibold text-slate-600">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
        <Check size={9} />
      </span>

      {text}
    </li>
  );
}

/* ========================================================= */
/* SUCCESS TOAST */
/* ========================================================= */

function SuccessToast({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: 30 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-5 right-5 z-[70] w-[calc(100%-40px)] max-w-sm overflow-hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-2xl"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Check size={20} />
        </div>

        <div className="flex-1">
          <p className="text-sm font-black text-slate-900">
            Money added successfully
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Your wallet balance has been updated.
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}