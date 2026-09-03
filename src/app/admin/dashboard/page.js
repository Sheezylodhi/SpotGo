"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CarFront,
  ParkingSquare,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  Activity,
  MapPinned,
  Settings2,
  Wrench,
  CircleDollarSign,
  CalendarClock,
  Gauge,
  ChevronRight,
  MoreHorizontal,
  RefreshCw,
  CircleCheck,
  CircleAlert,
  Timer,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/* =============================================================
   CHART DATA
============================================================= */

const revenueData = [
  { day: "Mon", revenue: 38200 },
  { day: "Tue", revenue: 42100 },
  { day: "Wed", revenue: 39700 },
  { day: "Thu", revenue: 48620 },
  { day: "Fri", revenue: 52900 },
  { day: "Sat", revenue: 61800 },
  { day: "Sun", revenue: 57400 },
];

const reservationData = [
  { day: "Mon", reservations: 128 },
  { day: "Tue", reservations: 146 },
  { day: "Wed", reservations: 139 },
  { day: "Thu", reservations: 184 },
  { day: "Fri", reservations: 207 },
  { day: "Sat", reservations: 231 },
  { day: "Sun", reservations: 198 },
];

const occupancyData = [
  {
    name: "Occupied",
    value: 862,
  },
  {
    name: "Available",
    value: 386,
  },
];

const slotStatusData = [
  {
    name: "Available",
    value: 386,
  },
  {
    name: "Occupied",
    value: 704,
  },
  {
    name: "Reserved",
    value: 112,
  },
  {
    name: "Maintenance",
    value: 46,
  },
];

const locationChartData = [
  {
    name: "Ocean Mall",
    occupancy: 71,
  },
  {
    name: "Dolmen Mall",
    occupancy: 78,
  },
  {
    name: "Business District",
    occupancy: 66,
  },
  {
    name: "City Center",
    occupancy: 65,
  },
  {
    name: "Grand Avenue",
    occupancy: 73,
  },
];

/* =============================================================
   DASHBOARD DATA
============================================================= */

const stats = [
  {
    title: "Total Parking Slots",
    value: "1,248",
    change: "+12",
    changeText: "this month",
    icon: ParkingSquare,
    type: "blue",
  },
  {
    title: "Available Slots",
    value: "386",
    change: "30.9%",
    changeText: "currently available",
    icon: CarFront,
    type: "green",
  },
  {
    title: "Today's Reservations",
    value: "184",
    change: "+18.4%",
    changeText: "vs yesterday",
    icon: CalendarCheck,
    type: "purple",
  },
  {
    title: "Today's Revenue",
    value: "Rs 48,620",
    change: "+11.8%",
    changeText: "vs yesterday",
    icon: DollarSign,
    type: "orange",
  },
];

const reservations = [
  {
    id: "SPG-2026-09124",
    customer: "Ahmed Khan",
    location: "Ocean Mall Parking",
    slot: "A-18",
    time: "07:15 PM",
    status: "Active",
  },
  {
    id: "SPG-2026-09118",
    customer: "Usman Ali",
    location: "Dolmen Mall Parking",
    slot: "B-07",
    time: "06:40 PM",
    status: "Active",
  },
  {
    id: "SPG-2026-09096",
    customer: "Hamza Shah",
    location: "Business District",
    slot: "D-14",
    time: "05:50 PM",
    status: "Completed",
  },
  {
    id: "SPG-2026-09084",
    customer: "Bilal Ahmed",
    location: "City Center Parking",
    slot: "C-09",
    time: "04:30 PM",
    status: "Pending",
  },
  {
    id: "SPG-2026-09072",
    customer: "Saad Malik",
    location: "Grand Avenue Parking",
    slot: "A-04",
    time: "03:15 PM",
    status: "Completed",
  },
];

const locations = [
  {
    name: "Ocean Mall Parking",
    area: "Clifton, Karachi",
    total: 320,
    available: 94,
    occupancy: 71,
    status: "Healthy",
  },
  {
    name: "Dolmen Mall Parking",
    area: "Tariq Road, Karachi",
    total: 280,
    available: 61,
    occupancy: 78,
    status: "Busy",
  },
  {
    name: "Business District Parking",
    area: "Shahrah-e-Faisal",
    total: 240,
    available: 82,
    occupancy: 66,
    status: "Healthy",
  },
  {
    name: "City Center Parking",
    area: "Saddar, Karachi",
    total: 210,
    available: 73,
    occupancy: 65,
    status: "Healthy",
  },
];

const typeStyles = {
  blue: {
    bg: "bg-cyan-50",
    icon: "text-cyan-500",
    trend: "text-cyan-600",
    gradient: "from-cyan-500/10",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "text-emerald-500",
    trend: "text-emerald-600",
    gradient: "from-emerald-500/10",
  },
  purple: {
    bg: "bg-violet-50",
    icon: "text-violet-500",
    trend: "text-violet-600",
    gradient: "from-violet-500/10",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-500",
    trend: "text-orange-600",
    gradient: "from-orange-500/10",
  },
};

const quickActions = [
  {
    href: "/admin/slots",
    icon: ParkingSquare,
    title: "Update Slots",
    description: "Manage availability",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
  {
    href: "/admin/fees",
    icon: CircleDollarSign,
    title: "Update Fees",
    description: "Manage parking rates",
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    href: "/admin/reservations",
    icon: CalendarCheck,
    title: "Reservations",
    description: "View all bookings",
    bg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    href: "/admin/parking-info",
    icon: MapPinned,
    title: "Parking Information",
    description: "Manage facility details",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
];

/* =============================================================
   CHART TOOLTIP
============================================================= */

function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-slate-900">
        Rs {Number(payload[0].value).toLocaleString()}
      </p>
    </div>
  );
}

function ReservationTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-slate-900">
        {payload[0].value} reservations
      </p>
    </div>
  );
}

/* =============================================================
   MAIN DASHBOARD
============================================================= */

export default function AdminDashboard() {
  return (
    <div className="w-full text-slate-900">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              System Online
            </p>
          </div>

          <p className="mb-1 text-sm font-semibold text-cyan-500">
            Thursday, September 3, 2026
          </p>

          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Parking System Overview
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor your parking network, reservations, slot availability,
            revenue and system activity from one powerful dashboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/reports"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:text-cyan-600"
          >
            <Gauge className="h-4 w-4" />
            Reports
          </Link>

          <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10">
            <Activity className="h-4 w-4" />

            Live System

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const style = typeStyles[stat.type];

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${style.gradient} to-transparent blur-2xl`}
              />

              <div className="relative flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.bg}`}
                >
                  <Icon className={`h-5 w-5 ${style.icon}`} />
                </div>

                <div
                  className={`flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-[10px] font-black ${style.trend}`}
                >
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>

              <div className="relative mt-5">
                <p className="text-xs font-semibold text-slate-400">
                  {stat.title}
                </p>

                <div className="mt-1 flex items-end justify-between gap-2">
                  <h2 className="text-2xl font-black tracking-tight text-slate-900">
                    {stat.value}
                  </h2>

                  <span className="mb-1 text-[9px] font-medium text-slate-400">
                    {stat.changeText}
                  </span>
                </div>
              </div>

              <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    stat.type === "blue"
                      ? "w-[74%] bg-cyan-500"
                      : stat.type === "green"
                      ? "w-[31%] bg-emerald-500"
                      : stat.type === "purple"
                      ? "w-[82%] bg-violet-500"
                      : "w-[76%] bg-orange-500"
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =====================================================
          QUICK CONTROL CENTER
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
      >
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-cyan-500" />

              <h3 className="font-bold text-slate-900">
                Admin Control Center
              </h3>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Quick access to your most important parking operations.
            </p>
          </div>

          <span className="w-fit rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500">
            4 management tools
          </span>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition duration-200 hover:-translate-y-1 hover:border-cyan-100 hover:bg-white hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.bg}`}
                >
                  <Icon className={`h-5 w-5 ${action.iconColor}`} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-slate-800">
                    {action.title}
                  </p>

                  <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                    {action.description}
                  </p>
                </div>

                <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-cyan-500" />
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* =====================================================
          REVENUE + OCCUPANCY
      ====================================================== */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">

        {/* REVENUE CHART */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Revenue Overview
                  </h3>

                  <p className="text-[10px] text-slate-400">
                    Parking revenue for the current week
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-emerald-50 px-3 py-2">
              <p className="text-[9px] font-semibold text-emerald-600">
                Weekly revenue
              </p>

              <p className="mt-0.5 text-sm font-black text-emerald-700">
                Rs 340,720
              </p>
            </div>
          </div>

          <div className="mt-6 h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#06b6d4"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="100%"
                      stopColor="#06b6d4"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eef2f6"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#94a3b8",
                    fontWeight: 600,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#94a3b8",
                    fontWeight: 600,
                  }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />

                <Tooltip
                  content={<RevenueTooltip />}
                  cursor={{
                    stroke: "#cbd5e1",
                    strokeDasharray: "4 4",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  dot={{
                    r: 3,
                    fill: "#06b6d4",
                    strokeWidth: 2,
                    stroke: "#ffffff",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-[10px] font-medium text-slate-400">
                Average daily revenue
              </p>

              <p className="mt-0.5 text-sm font-black text-slate-800">
                Rs 48,674
              </p>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              11.8% growth
            </div>
          </div>
        </motion.div>

        {/* OCCUPANCY DONUT */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50">
                  <CarFront className="h-4 w-4 text-cyan-500" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Parking Occupancy
                  </h3>

                  <p className="text-[10px] text-slate-400">
                    Current network occupancy
                  </p>
                </div>
              </div>
            </div>

            <button className="rounded-lg p-1.5 text-slate-300 transition hover:bg-slate-50 hover:text-slate-500">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mt-3 h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={92}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={8}
                >
                  <Cell fill="#06b6d4" />
                  <Cell fill="#e2e8f0" />
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `${value} slots`,
                    "Status",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black tracking-tight text-slate-900">
                69.1%
              </span>

              <span className="mt-1 text-[10px] font-semibold text-slate-400">
                Occupied
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-cyan-50 p-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />

                <span className="text-[10px] font-bold text-slate-500">
                  Occupied
                </span>
              </div>

              <p className="mt-1 text-lg font-black text-slate-900">
                862
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-300" />

                <span className="text-[10px] font-bold text-slate-500">
                  Available
                </span>
              </div>

              <p className="mt-1 text-lg font-black text-slate-900">
                386
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          RESERVATIONS + SLOT STATUS
      ====================================================== */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">

        {/* RESERVATIONS BAR CHART */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48 }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
                  <CalendarCheck className="h-4 w-4 text-violet-500" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Reservation Activity
                  </h3>

                  <p className="text-[10px] text-slate-400">
                    Booking volume during the week
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-violet-50 px-3 py-2">
              <p className="text-[9px] font-semibold text-violet-600">
                This week
              </p>

              <p className="mt-0.5 text-sm font-black text-violet-700">
                1,233 bookings
              </p>
            </div>
          </div>

          <div className="mt-6 h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reservationData}
                margin={{
                  top: 10,
                  right: 5,
                  left: -25,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eef2f6"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#94a3b8",
                    fontWeight: 600,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#94a3b8",
                    fontWeight: 600,
                  }}
                />

                <Tooltip
                  content={<ReservationTooltip />}
                  cursor={{
                    fill: "#f8fafc",
                  }}
                />

                <Bar
                  dataKey="reservations"
                  fill="#8b5cf6"
                  radius={[7, 7, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* SLOT STATUS */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54 }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
                  <ParkingSquare className="h-4 w-4 text-orange-500" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Slot Status
                  </h3>

                  <p className="text-[10px] text-slate-400">
                    Current slot distribution
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/admin/slots"
              className="text-[10px] font-bold text-cyan-500 hover:text-cyan-600"
            >
              Manage
            </Link>
          </div>

          <div className="relative mt-3 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slotStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={6}
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#06b6d4" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#f59e0b" />
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `${value} slots`,
                    "Status",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900">
                1,248
              </span>

              <span className="text-[9px] font-semibold text-slate-400">
                Total slots
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <SlotLegend
              color="bg-emerald-500"
              label="Available"
              value="386"
            />

            <SlotLegend
              color="bg-cyan-500"
              label="Occupied"
              value="704"
            />

            <SlotLegend
              color="bg-violet-500"
              label="Reserved"
              value="112"
            />

            <SlotLegend
              color="bg-amber-400"
              label="Maintenance"
              value="46"
            />
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          LOCATION OCCUPANCY
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58 }}
        className="mt-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50">
                <MapPinned className="h-4 w-4 text-cyan-500" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Location Performance
                </h3>

                <p className="text-[10px] text-slate-400">
                  Compare occupancy across parking facilities
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/admin/parking-locations"
            className="flex items-center gap-1 text-[10px] font-bold text-cyan-500 hover:text-cyan-600"
          >
            Manage locations
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-6 h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={locationChartData}
              layout="vertical"
              margin={{
                top: 0,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#eef2f6"
              />

              <XAxis
                type="number"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10,
                  fill: "#94a3b8",
                  fontWeight: 600,
                }}
                tickFormatter={(value) => `${value}%`}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={100}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10,
                  fill: "#64748b",
                  fontWeight: 700,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `${value}%`,
                  "Occupancy",
                ]}
                cursor={{
                  fill: "#f8fafc",
                }}
              />

              <Bar
                dataKey="occupancy"
                fill="#06b6d4"
                radius={[0, 8, 8, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* =====================================================
          RECENT RESERVATIONS + SYSTEM STATUS
      ====================================================== */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">

        {/* RECENT RESERVATIONS */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62 }}
          className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
            <div>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-violet-500" />

                <h3 className="font-bold text-slate-900">
                  Recent Reservations
                </h3>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Latest booking activity across your network
              </p>
            </div>

            <Link
              href="/admin/reservations"
              className="flex items-center gap-1.5 text-xs font-bold text-cyan-500 hover:text-cyan-600"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Reservation
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Location
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Slot
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Time
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {reservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                  >
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-800">
                        {reservation.customer}
                      </p>

                      <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                        {reservation.id}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-slate-700">
                        {reservation.location}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-600">
                        {reservation.slot}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Clock3 className="h-3.5 w-3.5" />
                        {reservation.time}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={reservation.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-slate-100 md:hidden">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {reservation.customer}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {reservation.id}
                    </p>
                  </div>

                  <StatusBadge status={reservation.status} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-medium text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-700">
                      {reservation.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-slate-400">
                      Slot / Time
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-700">
                      {reservation.slot} · {reservation.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SYSTEM STATUS */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68 }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" />

                <h3 className="font-bold text-slate-900">
                  System Status
                </h3>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Current platform health
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

              <span className="text-[10px] font-bold text-emerald-600">
                Operational
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <SystemItem
              title="Parking Management"
              description="All parking facilities"
            />

            <SystemItem
              title="Reservation System"
              description="Booking services"
            />

            <SystemItem
              title="Payment Processing"
              description="Payment services"
            />

            <SystemItem
              title="Notifications"
              description="Push & system alerts"
            />
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Server uptime
              </span>

              <span className="text-xs font-black text-slate-900">
                99.98%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[99.98%] rounded-full bg-emerald-500" />
            </div>
          </div>

          <Link
            href="/admin/settings"
            className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:border-cyan-100 hover:bg-cyan-50/40 hover:text-cyan-600"
          >
            System settings

            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>

      {/* =====================================================
          PARKING LOCATIONS
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.74 }}
        className="mt-6 rounded-3xl border border-slate-100 bg-white shadow-sm"
      >
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <MapPinned className="h-4 w-4 text-cyan-500" />

              <h3 className="font-bold text-slate-900">
                Parking Locations
              </h3>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Current availability across your parking facilities
            </p>
          </div>

          <Link
            href="/admin/parking-locations"
            className="flex w-fit items-center gap-1.5 text-xs font-bold text-cyan-500 hover:text-cyan-600"
          >
            Manage locations
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
          {locations.map((location) => {
            const occupied = location.total - location.available;

            return (
              <div
                key={location.name}
                className="group rounded-2xl border border-slate-100 p-4 transition hover:-translate-y-1 hover:border-cyan-100 hover:bg-cyan-50/20 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50">
                    <MapPin className="h-4 w-4 text-cyan-500" />
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                      location.status === "Busy"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {location.status}
                  </span>
                </div>

                <h4 className="mt-4 text-sm font-bold text-slate-800">
                  {location.name}
                </h4>

                <p className="mt-1 text-[10px] font-medium text-slate-400">
                  {location.area}
                </p>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400">
                      Occupancy
                    </p>

                    <p className="mt-0.5 text-lg font-black text-slate-900">
                      {location.occupancy}%
                    </p>
                  </div>

                  <p className="text-[10px] font-bold text-emerald-600">
                    {location.available} available
                  </p>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      location.occupancy >= 75
                        ? "bg-amber-400"
                        : "bg-cyan-500"
                    }`}
                    style={{
                      width: `${location.occupancy}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] font-medium text-slate-400">
                  <span>{location.total} total</span>

                  <span>{occupied} occupied</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* =====================================================
          BOTTOM ANALYTICS
      ====================================================== */}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        {/* MAINTENANCE */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78 }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Wrench className="h-4 w-4 text-amber-500" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Maintenance
              </h3>

              <p className="text-[10px] text-slate-400">
                Parking facility alerts
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-amber-50/70 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />

              <div>
                <p className="text-xs font-bold text-slate-800">
                  3 slots require attention
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  Some parking slots have been marked for maintenance.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/admin/slots"
            className="mt-4 flex items-center justify-between text-xs font-bold text-cyan-500 hover:text-cyan-600"
          >
            Review slots
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* USER ACTIVITY */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.82 }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
              <Users className="h-4 w-4 text-violet-500" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                User Activity
              </h3>

              <p className="text-[10px] text-slate-400">
                Today's platform activity
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <MiniMetric
              value="842"
              label="Active users"
            />

            <MiniMetric
              value="126"
              label="New today"
            />

            <MiniMetric
              value="96"
              label="Online now"
            />

            <MiniMetric
              value="18"
              label="Support cases"
            />
          </div>

          <Link
            href="/admin/users"
            className="mt-4 flex items-center justify-between text-xs font-bold text-cyan-500 hover:text-cyan-600"
          >
            Manage users
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* REVENUE SNAPSHOT */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.86 }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Revenue Snapshot
              </h3>

              <p className="text-[10px] text-slate-400">
                Current financial performance
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-semibold text-slate-400">
              Today's revenue
            </p>

            <div className="mt-1 flex items-end justify-between">
              <p className="text-2xl font-black text-slate-900">
                Rs 48,620
              </p>

              <span className="mb-1 flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                11.8%
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[76%] rounded-full bg-emerald-500" />
            </div>

            <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400">
              <span>Daily target</span>
              <span>Rs 64,000</span>
            </div>
          </div>

          <Link
            href="/admin/reports"
            className="mt-4 flex items-center justify-between text-xs font-bold text-cyan-500 hover:text-cyan-600"
          >
            View analytics
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>

      {/* =====================================================
          FOOTER STATUS
      ====================================================== */}

      <div className="mt-6 flex flex-col items-center justify-between gap-2 rounded-2xl border border-slate-100 bg-white px-5 py-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <p className="text-xs font-semibold text-slate-500">
            SPOT-GO admin system is operating normally.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
          <RefreshCw className="h-3 w-3" />
          Last system check: just now
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({ status }) {
  const styles = {
    Active: {
      className: "bg-cyan-50 text-cyan-600",
      icon: CircleCheck,
    },
    Completed: {
      className: "bg-emerald-50 text-emerald-600",
      icon: CheckCircle2,
    },
    Pending: {
      className: "bg-amber-50 text-amber-600",
      icon: Timer,
    },
  };

  const style = styles[status] || {
    className: "bg-slate-50 text-slate-500",
    icon: CircleAlert,
  };

  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${style.className}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

/* =============================================================
   SYSTEM ITEM
============================================================= */

function SystemItem({ title, description }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </div>

        <div>
          <p className="text-xs font-bold text-slate-700">
            {title}
          </p>

          <p className="mt-0.5 text-[10px] text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <span className="text-[10px] font-bold text-emerald-500">
        Operational
      </span>
    </div>
  );
}

/* =============================================================
   SLOT LEGEND
============================================================= */

function SlotLegend({ color, label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />

        <span className="text-[10px] font-semibold text-slate-500">
          {label}
        </span>
      </div>

      <span className="text-xs font-black text-slate-800">
        {value}
      </span>
    </div>
  );
}

/* =============================================================
   MINI METRIC
============================================================= */

function MiniMetric({ value, label }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 transition hover:bg-slate-100">
      <p className="text-base font-black text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-[9px] font-medium text-slate-400">
        {label}
      </p>
    </div>
  );
}