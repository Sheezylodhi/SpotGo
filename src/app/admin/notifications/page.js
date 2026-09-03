"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Bell,
  BellRing,
  Check,
  CheckCheck,
  ChevronDown,
  Clock3,
  CreditCard,
  Info,
  MapPin,
  MoreHorizontal,
  ParkingCircle,
  Search,
  Settings2,
  ShieldAlert,
  Trash2,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";

/* =========================================================
   MOCK NOTIFICATIONS
========================================================= */

const initialNotifications = [
  {
    id: 1,
    title: "Parking capacity is getting high",
    message:
      "Dolmen Mall Parking has reached 92% occupancy. Consider monitoring the location during peak hours.",
    category: "Parking",
    priority: "High",
    time: "2 min ago",
    date: "Sep 03, 2026",
    location: "Dolmen Mall Parking",
    read: false,
    icon: ParkingCircle,
  },
  {
    id: 2,
    title: "New reservation received",
    message:
      "Ahmed Khan has successfully reserved parking slot A-18 at Ocean Mall Parking.",
    category: "Reservation",
    priority: "Normal",
    time: "8 min ago",
    date: "Sep 03, 2026",
    location: "Ocean Mall Parking",
    read: false,
    icon: BellRing,
  },
  {
    id: 3,
    title: "Payment successfully received",
    message:
      "Payment of Rs 340 has been received for reservation SPG-2026-09124.",
    category: "Payment",
    priority: "Normal",
    time: "14 min ago",
    date: "Sep 03, 2026",
    location: "Ocean Mall Parking",
    read: false,
    icon: CreditCard,
  },
  {
    id: 4,
    title: "New customer registered",
    message:
      "Zain Ahmed has created a new SPOT-GO customer account.",
    category: "Users",
    priority: "Low",
    time: "28 min ago",
    date: "Sep 03, 2026",
    location: "System",
    read: true,
    icon: UserPlus,
  },
  {
    id: 5,
    title: "Parking slot maintenance required",
    message:
      "Slot B-31 at Business District Parking has been marked for maintenance.",
    category: "Maintenance",
    priority: "High",
    time: "41 min ago",
    date: "Sep 03, 2026",
    location: "Business District Parking",
    read: false,
    icon: Settings2,
  },
  {
    id: 6,
    title: "Daily revenue target achieved",
    message:
      "SPOT-GO has crossed today's revenue target with Rs 48,620 in total revenue.",
    category: "System",
    priority: "Low",
    time: "1 hour ago",
    date: "Sep 03, 2026",
    location: "System",
    read: true,
    icon: Zap,
  },
  {
    id: 7,
    title: "High booking activity detected",
    message:
      "Booking activity is 24% higher than the usual average for this time.",
    category: "Analytics",
    priority: "Normal",
    time: "1 hour ago",
    date: "Sep 03, 2026",
    location: "System",
    read: true,
    icon: Activity,
  },
  {
    id: 8,
    title: "Reservation cancelled",
    message:
      "Owais Hassan cancelled reservation SPG-2026-08991. The payment has been refunded.",
    category: "Reservation",
    priority: "Normal",
    time: "2 hours ago",
    date: "Sep 03, 2026",
    location: "City Center Parking",
    read: false,
    icon: AlertTriangle,
  },
  {
    id: 9,
    title: "System health check completed",
    message:
      "All SPOT-GO parking services are currently operational.",
    category: "System",
    priority: "Low",
    time: "3 hours ago",
    date: "Sep 03, 2026",
    location: "System",
    read: true,
    icon: CheckCheck,
  },
  {
    id: 10,
    title: "Parking occupancy warning",
    message:
      "Grand Avenue Parking has crossed the 85% occupancy threshold.",
    category: "Parking",
    priority: "High",
    time: "4 hours ago",
    date: "Sep 03, 2026",
    location: "Grand Avenue Parking",
    read: true,
    icon: ShieldAlert,
  },
  {
    id: 11,
    title: "New user verification pending",
    message:
      "Two newly registered customers have not completed their email verification.",
    category: "Users",
    priority: "Normal",
    time: "5 hours ago",
    date: "Sep 03, 2026",
    location: "System",
    read: true,
    icon: Users,
  },
  {
    id: 12,
    title: "Parking information updated",
    message:
      "Parking information for City Center Parking was updated by the administrator.",
    category: "System",
    priority: "Low",
    time: "Yesterday",
    date: "Sep 02, 2026",
    location: "City Center Parking",
    read: true,
    icon: Info,
  },
];

/* =========================================================
   STYLES
========================================================= */

const categoryStyles = {
  Parking: {
    icon: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
  },
  Reservation: {
    icon: "bg-violet-50 text-violet-600",
    dot: "bg-violet-500",
  },
  Payment: {
    icon: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-500",
  },
  Users: {
    icon: "bg-cyan-50 text-cyan-600",
    dot: "bg-cyan-500",
  },
  Maintenance: {
    icon: "bg-orange-50 text-orange-600",
    dot: "bg-orange-500",
  },
  Analytics: {
    icon: "bg-indigo-50 text-indigo-600",
    dot: "bg-indigo-500",
  },
  System: {
    icon: "bg-slate-100 text-slate-600",
    dot: "bg-slate-500",
  },
};

const priorityStyles = {
  High: "bg-red-50 text-red-600 border-red-100",
  Normal: "bg-blue-50 text-blue-600 border-blue-100",
  Low: "bg-slate-50 text-slate-500 border-slate-200",
};

/* =========================================================
   NOTIFICATION ITEM
========================================================= */

function NotificationItem({
  notification,
  onRead,
  onDelete,
  onOpen,
}) {
  const Icon = notification.icon;

  const style =
    categoryStyles[notification.category] ||
    categoryStyles.System;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        x: 30,
        height: 0,
        marginBottom: 0,
      }}
      className={`group relative overflow-hidden border-b border-slate-100 p-4 transition sm:p-5 ${
        notification.read
          ? "bg-white"
          : "bg-blue-50/30"
      } hover:bg-slate-50`}
    >
      {!notification.read && (
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-blue-600" />
      )}

      <div className="flex gap-3 sm:gap-4">
        {/* Icon */}
        <button
          onClick={() => onOpen(notification)}
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon} transition group-hover:scale-105 sm:h-12 sm:w-12`}
        >
          <Icon size={19} />

          {!notification.read && (
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-600" />
          )}
        </button>

        {/* Content */}
        <div
          className="min-w-0 flex-1 cursor-pointer"
          onClick={() => onOpen(notification)}
        >
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className={`text-sm ${
                    notification.read
                      ? "font-semibold text-slate-800"
                      : "font-bold text-slate-950"
                  }`}
                >
                  {notification.title}
                </h3>

                {!notification.read && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700">
                    New
                  </span>
                )}
              </div>

              <p className="mt-1.5 max-w-3xl text-xs leading-5 text-slate-500 sm:text-sm">
                {notification.message}
              </p>
            </div>

            <span className="shrink-0 text-[11px] font-medium text-slate-400">
              {notification.time}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
              {notification.category}
            </span>

            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${priorityStyles[notification.priority]}`}
            >
              {notification.priority} Priority
            </span>

            {notification.location !== "System" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400">
                <MapPin size={11} />
                {notification.location}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-start gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          {!notification.read && (
            <button
              onClick={() => onRead(notification.id)}
              title="Mark as read"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
            >
              <Check size={15} />
            </button>
          )}

          <button
            onClick={() => onDelete(notification.id)}
            title="Delete"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   DETAIL MODAL
========================================================= */

function NotificationModal({
  notification,
  onClose,
  onRead,
}) {
  if (!notification) return null;

  const Icon = notification.icon;

  const style =
    categoryStyles[notification.category] ||
    categoryStyles.System;

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
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          {/* Modal header */}
          <div className="relative overflow-hidden bg-slate-950 p-6 text-white">
            <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />
            <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.icon}`}
                >
                  <Icon size={21} />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Notification Details
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    {notification.category}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/15 hover:text-white"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Modal content */}
          <div className="p-6">
            <h2 className="text-xl font-black tracking-tight text-slate-900">
              {notification.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {notification.message}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Priority
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${priorityStyles[notification.priority]}`}
                >
                  {notification.priority}
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Received
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-sm font-bold text-slate-700">
                  <Clock3 size={14} />
                  {notification.time}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-slate-50 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Location
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <MapPin size={15} className="text-blue-600" />
                {notification.location}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {!notification.read && (
                <button
                  onClick={() => {
                    onRead(notification.id);
                    onClose();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  <Check size={16} />
                  Mark as Read
                </button>
              )}

              <button
                onClick={onClose}
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [priority, setPriority] = useState("All Priorities");
  const [selectedNotification, setSelectedNotification] =
    useState(null);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const highPriorityCount = notifications.filter(
    (item) => item.priority === "High" && !item.read
  ).length;

  const todayCount = notifications.filter(
    (item) => item.date === "Sep 03, 2026"
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.message
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All"
          ? true
          : activeTab === "Unread"
          ? !item.read
          : activeTab === "Read"
          ? item.read
          : item.category === activeTab;

      const matchesPriority =
        priority === "All Priorities"
          ? true
          : item.priority === priority;

      return (
        matchesSearch &&
        matchesTab &&
        matchesPriority
      );
    });
  }, [
    notifications,
    search,
    activeTab,
    priority,
  ]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter((item) => item.id !== id)
    );

    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const clearRead = () => {
    setNotifications((current) =>
      current.filter((item) => !item.read)
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {/* =====================================================
          HERO
      ====================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-2xl sm:p-8"
      >
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur">
                <BellRing size={13} />
                SYSTEM NOTIFICATIONS

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Notification
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  {" "}
                  Center
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Stay on top of parking activity, reservations,
                payments, system alerts and important customer
                events from one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CheckCheck size={16} />
                Mark All Read
              </button>

              <button
                onClick={clearRead}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
              >
                <Trash2 size={16} />
                Clear Read
              </button>
            </div>
          </div>

          {/* Hero metrics */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Unread
                </span>

                <Bell size={15} className="text-blue-300" />
              </div>

              <p className="mt-2 text-2xl font-black">
                {unreadCount}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  High Priority
                </span>

                <ShieldAlert
                  size={15}
                  className="text-red-300"
                />
              </div>

              <p className="mt-2 text-2xl font-black">
                {highPriorityCount}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Today's Alerts
                </span>

                <Activity
                  size={15}
                  className="text-emerald-300"
                />
              </div>

              <p className="mt-2 text-2xl font-black">
                {todayCount}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          QUICK STATS
      ====================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Bell size={20} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
              LIVE
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Total Notifications
          </p>

          <p className="mt-1 text-3xl font-black text-slate-900">
            {notifications.length}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <BellRing size={20} />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Unread Alerts
          </p>

          <p className="mt-1 text-3xl font-black text-slate-900">
            {unreadCount}
          </p>

          <p className="mt-2 text-xs font-semibold text-blue-600">
            Requires attention
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle size={20} />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Critical Alerts
          </p>

          <p className="mt-1 text-3xl font-black text-slate-900">
            {highPriorityCount}
          </p>

          <p className="mt-2 text-xs font-semibold text-red-600">
            High priority
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCheck size={20} />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Read Notifications
          </p>

          <p className="mt-1 text-3xl font-black text-slate-900">
            {notifications.length - unreadCount}
          </p>

          <p className="mt-2 text-xs font-semibold text-emerald-600">
            All caught up
          </p>
        </motion.div>
      </div>

      {/* =====================================================
          MAIN NOTIFICATION CENTER
      ====================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Toolbar */}
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-4">
            {/* Search + filters */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search notifications..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-9 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-400 focus:bg-white sm:w-[170px]"
                  >
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Normal</option>
                    <option>Low</option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                  <MoreHorizontal size={16} />
                  More
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {[
                "All",
                "Unread",
                "Read",
                "Parking",
                "Reservation",
                "Payment",
                "Users",
                "System",
              ].map((tab) => {
                const count =
                  tab === "Unread"
                    ? unreadCount
                    : tab === "All"
                    ? notifications.length
                    : tab === "Read"
                    ? notifications.length -
                      unreadCount
                    : notifications.filter(
                        (item) =>
                          item.category === tab
                      ).length;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      activeTab === tab
                        ? "bg-slate-950 text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                  >
                    {tab}

                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[9px] ${
                        activeTab === tab
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* List header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />

            <p className="text-xs font-bold text-slate-600">
              {filteredNotifications.length} notifications
            </p>
          </div>

          <p className="hidden text-xs text-slate-400 sm:block">
            Click a notification to view details
          </p>
        </div>

        {/* Notification list */}
        <div>
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                    onDelete={deleteNotification}
                    onOpen={setSelectedNotification}
                  />
                )
              )
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-[330px] flex-col items-center justify-center px-5 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Bell size={27} />
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900">
                  No notifications found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  Try changing your filters or search
                  terms to find other notifications.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveTab("All");
                    setPriority("All Priorities");
                  }}
                  className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* =====================================================
          BOTTOM INSIGHTS
      ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Alert health */}
        <motion.div
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl"
        >
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <Activity size={20} />
              </div>

              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                Healthy
              </span>
            </div>

            <p className="mt-6 text-sm text-blue-100">
              Notification Health
            </p>

            <h3 className="mt-1 text-3xl font-black">
              96.4%
            </h3>

            <p className="mt-2 text-xs leading-5 text-blue-100">
              Most system alerts are being reviewed within
              the expected response window.
            </p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: "96.4%" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Most active category */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ParkingCircle size={20} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Most Active
            </span>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Most Active Category
          </p>

          <h3 className="mt-1 text-2xl font-black text-slate-900">
            Parking
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Parking capacity and occupancy alerts are
            currently the most frequent.
          </p>

          <div className="mt-5 flex items-center gap-2">
            <span className="text-sm font-bold text-blue-600">
              2 active alerts
            </span>

            <ArrowUpRightIcon />
          </div>
        </motion.div>

        {/* System status */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCheck size={20} />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Operational
            </span>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            System Notification Status
          </p>

          <h3 className="mt-1 text-2xl font-black text-slate-900">
            All Services Online
          </h3>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-emerald-600">
              Last checked 2 minutes ago
            </span>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <NotificationModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onRead={markAsRead}
      />
    </div>
  );
}

/* =========================================================
   SMALL ICON
========================================================= */

function ArrowUpRightIcon() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M3 9L9 3M4 3H9V8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}