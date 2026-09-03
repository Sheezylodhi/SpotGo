"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BellRing,
  CalendarCheck2,
  Car,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  CreditCard,
  Info,
  MapPin,
  ParkingCircle,
  Search,
  ShieldCheck,
  Trash2,
  Wallet,
  X,
} from "lucide-react";

type NotificationType =
  | "booking"
  | "payment"
  | "reminder"
  | "parking"
  | "refund"
  | "system";

type NotificationItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  date: string;
  type: NotificationType;
  unread: boolean;
  bookingId?: string;
  location?: string;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Booking confirmed",
    description:
      "Your parking reservation at Ocean Mall Parking has been confirmed successfully.",
    time: "08:42 PM",
    date: "Today",
    type: "booking",
    unread: true,
    bookingId: "SPG-2026-09124",
    location: "Clifton, Karachi",
  },
  {
    id: 2,
    title: "Parking reminder",
    description:
      "Your parking reservation starts in 30 minutes. Please arrive on time.",
    time: "08:10 PM",
    date: "Today",
    type: "reminder",
    unread: true,
    bookingId: "SPG-2026-09124",
    location: "Ocean Mall Parking",
  },
  {
    id: 3,
    title: "Payment successful",
    description:
      "Your payment of Rs 240 for Ocean Mall Parking was completed successfully.",
    time: "07:15 PM",
    date: "Today",
    type: "payment",
    unread: true,
    bookingId: "SPG-2026-09124",
  },
  {
    id: 4,
    title: "Parking spot reserved",
    description:
      "Slot A-18 has been reserved for you. Your QR code is ready to use.",
    time: "07:13 PM",
    date: "Today",
    type: "parking",
    unread: false,
    bookingId: "SPG-2026-09124",
    location: "Ocean Mall Parking",
  },
  {
    id: 5,
    title: "Refund added to wallet",
    description:
      "Rs 240 has been refunded to your SPOT-GO wallet after cancellation.",
    time: "04:32 PM",
    date: "Yesterday",
    type: "refund",
    unread: false,
    bookingId: "SPG-2026-09018",
  },
  {
    id: 6,
    title: "Booking cancelled",
    description:
      "Your reservation at Dolmen Mall Parking has been cancelled successfully.",
    time: "03:18 PM",
    date: "Yesterday",
    type: "booking",
    unread: false,
    bookingId: "SPG-2026-08972",
    location: "Tariq Road, Karachi",
  },
  {
    id: 7,
    title: "Payment receipt available",
    description:
      "Your receipt for the recent parking payment is now available in Payments.",
    time: "06:40 PM",
    date: "Aug 31, 2026",
    type: "payment",
    unread: false,
    bookingId: "SPG-2026-08972",
  },
  {
    id: 8,
    title: "Parking availability updated",
    description:
      "More parking spaces are now available at Business District Parking.",
    time: "09:20 AM",
    date: "Aug 30, 2026",
    type: "parking",
    unread: false,
    location: "Shahrah-e-Faisal, Karachi",
  },
  {
    id: 9,
    title: "Welcome to SPOT-GO",
    description:
      "Your account is ready. Find, reserve and manage parking from one place.",
    time: "11:05 AM",
    date: "Aug 28, 2026",
    type: "system",
    unread: false,
  },
];

const typeConfig = {
  booking: {
    label: "Booking",
    icon: CalendarCheck2,
    iconClass: "bg-blue-50 text-blue-600",
    badgeClass: "bg-blue-50 text-blue-700",
  },
  payment: {
    label: "Payment",
    icon: CreditCard,
    iconClass: "bg-violet-50 text-violet-600",
    badgeClass: "bg-violet-50 text-violet-700",
  },
  reminder: {
    label: "Reminder",
    icon: Clock3,
    iconClass: "bg-amber-50 text-amber-600",
    badgeClass: "bg-amber-50 text-amber-700",
  },
  parking: {
    label: "Parking",
    icon: ParkingCircle,
    iconClass: "bg-emerald-50 text-emerald-600",
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
  refund: {
    label: "Refund",
    icon: Wallet,
    iconClass: "bg-cyan-50 text-cyan-600",
    badgeClass: "bg-cyan-50 text-cyan-700",
  },
  system: {
    label: "System",
    icon: Info,
    iconClass: "bg-slate-100 text-slate-600",
    badgeClass: "bg-slate-100 text-slate-700",
  },
};

function NotificationIcon({
  type,
  size = 20,
}: {
  type: NotificationType;
  size?: number;
}) {
  const Icon = typeConfig[type].icon;
  return <Icon size={size} />;
}

function NotificationCard({
  notification,
  onRead,
  onDelete,
  onView,
}: {
  notification: NotificationItem;
  onRead: () => void;
  onDelete: () => void;
  onView: () => void;
}) {
  const config = typeConfig[notification.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`group relative overflow-hidden rounded-2xl border p-4 transition sm:p-5 ${
        notification.unread
          ? "border-blue-100 bg-blue-50/40 shadow-sm shadow-blue-500/5"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      {notification.unread && (
        <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
      )}

      <div className="flex min-w-0 gap-3 sm:gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
        >
          <NotificationIcon type={notification.type} size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 pr-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className={`text-sm ${
                    notification.unread
                      ? "font-black text-slate-900"
                      : "font-bold text-slate-800"
                  }`}
                >
                  {notification.title}
                </h3>

                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-bold ${config.badgeClass}`}
                >
                  {config.label}
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-sm leading-5 text-slate-500">
                {notification.description}
              </p>
            </div>

            <div className="shrink-0 text-xs font-medium text-slate-400">
              {notification.date} · {notification.time}
            </div>
          </div>

          {(notification.bookingId || notification.location) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {notification.bookingId && (
                <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-500">
                  {notification.bookingId}
                </span>
              )}

              {notification.location && (
                <span className="flex max-w-full items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-500">
                  <MapPin size={11} />
                  <span className="truncate">{notification.location}</span>
                </span>
              )}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={onView}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              View details
              <ChevronRight size={14} />
            </button>

            {notification.unread && (
              <button
                onClick={onRead}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <Check size={14} />
                Mark as read
              </button>
            )}

            <button
              onClick={onDelete}
              className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-xs font-bold text-slate-400 transition hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NotificationDetailsModal({
  notification,
  onClose,
}: {
  notification: NotificationItem | null;
  onClose: () => void;
}) {
  if (!notification) return null;

  const config = typeConfig[notification.type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] w-full max-w-md overflow-y-auto overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <X size={18} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <NotificationIcon type={notification.type} size={24} />
            </div>

            <span className="mt-5 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">
              {config.label}
            </span>

            <h2 className="mt-3 pr-8 text-2xl font-black">
              {notification.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/60">
              {notification.date} · {notification.time}
            </p>
          </div>

          <div className="space-y-5 p-6">
            <p className="text-sm leading-6 text-slate-600">
              {notification.description}
            </p>

            {notification.bookingId && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Booking ID
                </p>

                <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                  {notification.bookingId}
                </p>
              </div>
            )}

            {notification.location && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <MapPin size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {notification.location}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Close notification
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function EmptyState({
  filtered,
  onReset,
}: {
  filtered: boolean;
  onReset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Bell size={24} />
      </div>

      <h3 className="mt-4 font-black text-slate-900">
        {filtered ? "No notifications found" : "You're all caught up"}
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-sm leading-5 text-slate-500">
        {filtered
          ? "Try changing your search or notification filter."
          : "New booking updates, payment alerts and parking reminders will appear here."}
      </p>

      {filtered && (
        <button
          onClick={onReset}
          className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  className,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: any;
  className: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs font-medium text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${className}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </motion.div>
  );
}

function PreferenceCard({
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

      <div className="min-w-0">
        <h3 className="font-bold text-slate-900">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "unread" | "booking" | "payment" | "parking" | "system"
  >("all");

  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const readCount = notifications.length - unreadCount;

  const filteredNotifications = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesSearch =
        !searchValue ||
        notification.title.toLowerCase().includes(searchValue) ||
        notification.description.toLowerCase().includes(searchValue) ||
        notification.location?.toLowerCase().includes(searchValue) ||
        notification.bookingId?.toLowerCase().includes(searchValue);

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "unread"
          ? notification.unread
          : notification.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );

    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const clearReadNotifications = () => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.unread)
    );
  };

  const resetFilters = () => {
    setSearch("");
    setFilter("all");
  };

  return (
    <div className="w-full min-w-0 text-slate-900">
      {/* PAGE HEADER
          TopBar is already provided by app/user/layout.js
      */}
      <section className="mb-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Bell size={15} />
              Notifications
            </div>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Stay up to date
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm text-slate-500">
              Manage your booking alerts, parking updates, payments and
              important SPOT-GO notifications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5 text-xs font-bold text-blue-700">
              <BellRing size={15} />
              {unreadCount} unread
            </div>

            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCheck size={16} />
              <span className="hidden sm:inline">Mark all read</span>
            </button>
          </div>
        </div>
      </section>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-8"
      >
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
              <Bell size={17} />
              SPOT-GO updates
            </div>

            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              Never miss an important parking update.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Get booking confirmations, payment updates, parking reminders
              and refund notifications in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur">
                <span className="text-blue-200">Unread</span> {unreadCount}
              </div>

              <div className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur">
                <span className="text-blue-200">Read</span> {readCount}
              </div>

              <div className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur">
                <span className="text-blue-200">Total</span>{" "}
                {notifications.length}
              </div>
            </div>
          </div>

          <div className="hidden h-40 w-40 items-center justify-center rounded-full border border-white/15 bg-white/10 lg:flex">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <Bell size={48} />

              {unreadCount > 0 && (
                <span className="absolute right-3 top-2 h-4 w-4 rounded-full border-2 border-blue-700 bg-red-400" />
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* SUMMARY */}
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Unread"
          value={unreadCount}
          subtitle="Need your attention"
          icon={BellRing}
          className="bg-blue-50 text-blue-600"
        />

        <SummaryCard
          title="Read"
          value={readCount}
          subtitle="Already reviewed"
          icon={CheckCheck}
          className="bg-emerald-50 text-emerald-600"
        />

        <SummaryCard
          title="Total"
          value={notifications.length}
          subtitle="All notifications"
          icon={Bell}
          className="bg-violet-50 text-violet-600"
        />
      </section>

      {/* CONTROLS */}
      <section className="mt-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              All notifications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your latest SPOT-GO activity and updates.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
            <div className="relative w-full sm:w-72">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <button
              onClick={clearReadNotifications}
              disabled={readCount === 0}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={15} />
              Clear read
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {[
            ["all", "All"],
            ["unread", "Unread"],
            ["booking", "Bookings"],
            ["payment", "Payments"],
            ["parking", "Parking"],
            ["system", "System"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() =>
                setFilter(
                  value as
                    | "all"
                    | "unread"
                    | "booking"
                    | "payment"
                    | "parking"
                    | "system"
                )
              }
              className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                filter === value
                  ? "bg-slate-900 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* NOTIFICATION LIST */}
      <section className="mt-5">
        {filteredNotifications.length > 0 ? (
          <motion.div layout className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onRead={() => markAsRead(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                  onView={() => {
                    setSelectedNotification(notification);
                    markAsRead(notification.id);
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            filtered={Boolean(search) || filter !== "all"}
            onReset={resetFilters}
          />
        )}
      </section>

      {/* PREFERENCES */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <PreferenceCard
          icon={ShieldCheck}
          title="Important alerts"
          description="Booking, payment and cancellation alerts are always shown."
        />

        <PreferenceCard
          icon={Car}
          title="Parking updates"
          description="Receive updates about availability and your reserved parking."
        />
      </section>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-slate-200 py-6">
        <div className="flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SPOT-GO. Smart parking made simple.</p>

          <div className="flex items-center gap-2">
            <ShieldCheck size={13} />
            Your notifications are private and secure.
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <NotificationDetailsModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    </div>
  );
}