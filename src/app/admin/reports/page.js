"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Car,
  ChevronDown,
  Clock3,
  Download,
  Gauge,
  MapPin,
  MoreHorizontal,
  ParkingCircle,
  PieChart as PieChartIcon,
  RefreshCw,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

/* =========================================================
   MOCK DATA
========================================================= */

const locations = [
  {
    name: "Ocean Mall Parking",
    short: "Ocean Mall",
    area: "Clifton, Karachi",
    slots: 320,
    occupancy: 71,
    revenue: 148620,
    reservations: 486,
  },
  {
    name: "Dolmen Mall Parking",
    short: "Dolmen Mall",
    area: "Tariq Road, Karachi",
    slots: 280,
    occupancy: 78,
    revenue: 132840,
    reservations: 421,
  },
  {
    name: "Business District Parking",
    short: "Business District",
    area: "Shahrah-e-Faisal",
    slots: 240,
    occupancy: 66,
    revenue: 118420,
    reservations: 378,
  },
  {
    name: "City Center Parking",
    short: "City Center",
    area: "Saddar, Karachi",
    slots: 210,
    occupancy: 65,
    revenue: 94280,
    reservations: 311,
  },
  {
    name: "Grand Avenue Parking",
    short: "Grand Avenue",
    area: "Main Boulevard, Karachi",
    slots: 198,
    occupancy: 73,
    revenue: 108960,
    reservations: 346,
  },
];

const revenueData = [
  { day: "Aug 28", revenue: 38200, bookings: 138 },
  { day: "Aug 29", revenue: 42100, bookings: 152 },
  { day: "Aug 30", revenue: 39750, bookings: 146 },
  { day: "Aug 31", revenue: 46820, bookings: 171 },
  { day: "Sep 01", revenue: 45260, bookings: 164 },
  { day: "Sep 02", revenue: 51780, bookings: 188 },
  { day: "Sep 03", revenue: 48620, bookings: 184 },
];

const weeklyRevenue = [
  { week: "Week 1", revenue: 218400, bookings: 812 },
  { week: "Week 2", revenue: 241800, bookings: 876 },
  { week: "Week 3", revenue: 267400, bookings: 942 },
  { week: "Week 4", revenue: 302800, bookings: 1084 },
];

const occupancyData = [
  { time: "06 AM", occupancy: 18 },
  { time: "08 AM", occupancy: 31 },
  { time: "10 AM", occupancy: 48 },
  { time: "12 PM", occupancy: 62 },
  { time: "02 PM", occupancy: 69 },
  { time: "04 PM", occupancy: 74 },
  { time: "06 PM", occupancy: 82 },
  { time: "08 PM", occupancy: 88 },
  { time: "10 PM", occupancy: 71 },
  { time: "12 AM", occupancy: 42 },
];

const vehicleData = [
  { name: "Cars", value: 61 },
  { name: "SUVs", value: 24 },
  { name: "Motorcycles", value: 11 },
  { name: "Vans", value: 4 },
];

const paymentData = [
  { name: "Card", value: 44 },
  { name: "Wallet", value: 27 },
  { name: "Cash", value: 17 },
  { name: "Other", value: 12 },
];

const hourlyBookings = [
  { hour: "6 AM", bookings: 12 },
  { hour: "8 AM", bookings: 29 },
  { hour: "10 AM", bookings: 48 },
  { hour: "12 PM", bookings: 63 },
  { hour: "2 PM", bookings: 72 },
  { hour: "4 PM", bookings: 91 },
  { hour: "6 PM", bookings: 128 },
  { hour: "8 PM", bookings: 142 },
  { hour: "10 PM", bookings: 87 },
];

const userActivityData = [
  { day: "Mon", newUsers: 34, returning: 112 },
  { day: "Tue", newUsers: 41, returning: 128 },
  { day: "Wed", newUsers: 37, returning: 121 },
  { day: "Thu", newUsers: 52, returning: 139 },
  { day: "Fri", newUsers: 61, returning: 158 },
  { day: "Sat", newUsers: 73, returning: 184 },
  { day: "Sun", newUsers: 68, returning: 171 },
];

const reservationStatus = [
  { name: "Completed", value: 62 },
  { name: "Active", value: 17 },
  { name: "Reserved", value: 12 },
  { name: "Cancelled", value: 9 },
];

const colors = ["#2563eb", "#06b6d4", "#8b5cf6", "#f59e0b"];

const tooltipStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  boxShadow: "0 15px 40px rgba(15, 23, 42, 0.10)",
};

/* =========================================================
   HELPERS
========================================================= */

const money = (value) =>
  `Rs ${Number(value).toLocaleString("en-PK")}`;

const percent = (value) => `${value}%`;

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
  subtitle,
  iconClass = "bg-blue-50 text-blue-600",
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-50 transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {value}
          </h3>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                positive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {positive ? (
                <ArrowUpRight size={13} />
              ) : (
                <ArrowDownRight size={13} />
              )}
              {change}
            </span>

            <span className="text-xs text-slate-400">{subtitle}</span>
          </div>
        </div>

        <div
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={19} />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            {description}
          </p>
        </div>
      </div>

      {action}
    </div>
  );
}

function ProgressBar({ value, label, right }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-bold text-slate-900">{right}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500"
        />
      </div>
    </div>
  );
}

/* =========================================================
   CUSTOM TOOLTIP
========================================================= */

function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={tooltipStyle}
      className="min-w-[180px] p-3"
    >
      <p className="mb-2 text-xs font-semibold text-slate-500">{label}</p>

      <div className="space-y-1.5">
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center justify-between gap-5"
          >
            <span className="text-xs text-slate-500">
              {item.dataKey === "revenue" ? "Revenue" : "Bookings"}
            </span>

            <span className="text-sm font-bold text-slate-900">
              {item.dataKey === "revenue"
                ? money(item.value)
                : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ReportsPage() {
  const [range, setRange] = useState("Last 7 Days");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [reportType, setReportType] = useState("Revenue");

  const filteredLocations = useMemo(() => {
    if (locationFilter === "All Locations") return locations;

    return locations.filter(
      (location) => location.name === locationFilter
    );
  }, [locationFilter]);

  const totalRevenue = locations.reduce(
    (sum, location) => sum + location.revenue,
    0
  );

  const totalReservations = locations.reduce(
    (sum, location) => sum + location.reservations,
    0
  );

  const averageOccupancy = Math.round(
    locations.reduce(
      (sum, location) => sum + location.occupancy,
      0
    ) / locations.length
  );

  const bestLocation = [...locations].sort(
    (a, b) => b.revenue - a.revenue
  )[0];

  const highestOccupancy = [...locations].sort(
    (a, b) => b.occupancy - a.occupancy
  )[0];

  const handleExport = () => {
    const report = {
      generatedAt: "September 03, 2026",
      range,
      location:
        locationFilter === "All Locations"
          ? "All Locations"
          : locationFilter,
      totalRevenue,
      totalReservations,
      averageOccupancy,
      topLocation: bestLocation.name,
    };

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "spot-go-report.json";
    anchor.click();

    URL.revokeObjectURL(url);
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
        {/* Background decoration */}
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-1/3 top-1/2 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur">
                <Activity size={13} />
                LIVE ANALYTICS
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              </div>

              <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Reports &
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  {" "}
                  Analytics
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Understand parking demand, revenue performance,
                customer activity and location efficiency from one
                centralized analytics workspace.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Range */}
              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  className="h-11 appearance-none rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 text-sm font-medium text-white outline-none backdrop-blur transition hover:bg-white/10"
                >
                  <option className="text-slate-900">
                    Today
                  </option>
                  <option className="text-slate-900">
                    Last 7 Days
                  </option>
                  <option className="text-slate-900">
                    Last 30 Days
                  </option>
                  <option className="text-slate-900">
                    This Month
                  </option>
                  <option className="text-slate-900">
                    This Year
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <button
                onClick={handleExport}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                <Download size={16} />
                Export Report
              </button>
            </div>
          </div>

          {/* Mini hero stats */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Reporting Period
                </span>
                <CalendarDays size={15} className="text-cyan-300" />
              </div>

              <p className="mt-2 text-lg font-bold">
                {range}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  System Occupancy
                </span>
                <Gauge size={15} className="text-emerald-300" />
              </div>

              <p className="mt-2 text-lg font-bold">
                {averageOccupancy}%
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Top Location
                </span>
                <MapPin size={15} className="text-violet-300" />
              </div>

              <p className="mt-2 truncate text-lg font-bold">
                {bestLocation.short}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BarChart3 size={17} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              Analytics Filters
            </p>
            <p className="text-xs text-slate-500">
              Refine your report view
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <MapPin
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white sm:w-[220px]"
            >
              <option>All Locations</option>

              {locations.map((location) => (
                <option key={location.name}>
                  {location.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <button
            onClick={() => {
              setRange("Last 7 Days");
              setLocationFilter("All Locations");
            }}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <RefreshCw size={15} />
            Reset
          </button>
        </div>
      </motion.div>

      {/* =====================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="Total Revenue"
          value={money(totalRevenue)}
          change="+11.8%"
          subtitle="vs previous period"
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          icon={ParkingCircle}
          label="Total Reservations"
          value={totalReservations.toLocaleString()}
          change="+18.4%"
          subtitle="booking volume"
          iconClass="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          icon={Gauge}
          label="Average Occupancy"
          value={percent(averageOccupancy)}
          change="+6.2%"
          subtitle="system utilization"
          iconClass="bg-violet-50 text-violet-600"
        />

        <StatCard
          icon={Users}
          label="Active Customers"
          value="2,486"
          change="+14.7%"
          subtitle="this month"
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* =====================================================
          REVENUE + BOOKINGS
      ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        {/* Revenue chart */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <SectionHeader
            icon={TrendingUp}
            title="Revenue Performance"
            description="Daily revenue and booking volume"
            action={
              <div className="flex items-center gap-1 rounded-xl bg-slate-50 p-1">
                {["Revenue", "Bookings"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setReportType(item)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      reportType === item
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            }
          />

          <div className="h-[310px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {reportType === "Revenue" ? (
                <AreaChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 5,
                    left: -15,
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
                        stopColor="#2563eb"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor="#2563eb"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                    tickFormatter={(value) =>
                      `${Math.round(value / 1000)}k`
                    }
                  />

                  <Tooltip content={<RevenueTooltip />} />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    activeDot={{
                      r: 6,
                      strokeWidth: 3,
                      stroke: "#fff",
                    }}
                  />
                </AreaChart>
              ) : (
                <LineChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 5,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                  />

                  <Tooltip content={<RevenueTooltip />} />

                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4">
            <div>
              <p className="text-xs text-slate-400">
                Avg. Daily
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">
                Rs 44,647
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Best Day
              </p>
              <p className="mt-1 text-sm font-bold text-emerald-600">
                Sep 02
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Growth
              </p>
              <p className="mt-1 text-sm font-bold text-blue-600">
                +11.8%
              </p>
            </div>
          </div>
        </motion.section>

        {/* Occupancy */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <SectionHeader
            icon={Gauge}
            title="Occupancy Trend"
            description="Average parking utilization today"
          />

          <div className="relative mx-auto h-[245px] w-full max-w-[390px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={occupancyData}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="occupancyGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#8b5cf6"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor="#8b5cf6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [
                    `${value}%`,
                    "Occupancy",
                  ]}
                />

                <ReferenceLine
                  y={80}
                  stroke="#f59e0b"
                  strokeDasharray="5 5"
                />

                <Area
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#occupancyGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Peak Occupancy
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900">
                  88%
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                <Zap size={19} />
              </div>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Highest demand is typically between{" "}
              <span className="font-bold text-slate-700">
                6 PM – 10 PM
              </span>
              .
            </p>
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          LOCATION PERFORMANCE
      ====================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <SectionHeader
          icon={MapPin}
          title="Location Performance"
          description="Compare revenue, reservations and occupancy across all parking facilities"
          action={
            <button className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
              View Details
              <ArrowUpRight size={14} />
            </button>
          }
        />

        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_40px] gap-4 border-b border-slate-100 px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Location</span>
              <span>Occupancy</span>
              <span>Reservations</span>
              <span>Revenue</span>
              <span />
            </div>

            <div className="divide-y divide-slate-100">
              {filteredLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-[1.4fr_1fr_1fr_1fr_40px] items-center gap-4 px-3 py-4 transition hover:bg-slate-50/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600">
                      <ParkingCircle size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {location.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {location.area}
                      </p>
                    </div>
                  </div>

                  <div className="max-w-[150px]">
                    <div className="mb-1.5 flex justify-between">
                      <span className="text-xs text-slate-400">
                        Utilization
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        {location.occupancy}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                        style={{
                          width: `${location.occupancy}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {location.reservations}
                    </p>
                    <p className="text-xs text-emerald-500">
                      +12.4%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {money(location.revenue)}
                    </p>
                    <p className="text-xs text-slate-400">
                      monthly
                    </p>
                  </div>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                    <MoreHorizontal size={17} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          REVENUE BY LOCATION + RESERVATION STATUS
      ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Location Revenue */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <SectionHeader
            icon={Wallet}
            title="Revenue by Location"
            description="Current revenue contribution"
          />

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={locations}
                layout="vertical"
                margin={{
                  top: 0,
                  right: 10,
                  left: 15,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  horizontal={false}
                  stroke="#e5e7eb"
                />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                  tickFormatter={(value) =>
                    `${Math.round(value / 1000)}k`
                  }
                />

                <YAxis
                  type="category"
                  dataKey="short"
                  width={100}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#64748b",
                    fontSize: 10,
                  }}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [
                    money(value),
                    "Revenue",
                  ]}
                />

                <Bar
                  dataKey="revenue"
                  fill="#2563eb"
                  radius={[0, 8, 8, 0]}
                  barSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Reservation Status */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <SectionHeader
            icon={PieChartIcon}
            title="Reservation Status"
            description="Distribution of booking outcomes"
          />

          <div className="grid items-center gap-5 sm:grid-cols-2">
            <div className="relative h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reservationStatus}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {reservationStatus.map((_, index) => (
                      <Cell
                        key={`status-${index}`}
                        fill={colors[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [
                      `${value}%`,
                      "Reservations",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-black text-slate-900">
                    1,848
                  </p>
                  <p className="text-xs font-medium text-slate-400">
                    Total Bookings
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reservationStatus.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: colors[index],
                      }}
                    />

                    <span className="text-sm text-slate-600">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-slate-900">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          PEAK HOURS + VEHICLE MIX
      ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        {/* Peak Hours */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <SectionHeader
            icon={Clock3}
            title="Peak Booking Hours"
            description="When customers are most likely to reserve a slot"
            action={
              <div className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-600">
                Peak: 8 PM
              </div>
            }
          />

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hourlyBookings}
                margin={{
                  top: 10,
                  right: 5,
                  left: -15,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="hourGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#8b5cf6"
                    />
                    <stop
                      offset="100%"
                      stopColor="#2563eb"
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [
                    value,
                    "Bookings",
                  ]}
                />

                <ReferenceLine
                  y={100}
                  stroke="#f59e0b"
                  strokeDasharray="5 5"
                />

                <Bar
                  dataKey="bookings"
                  fill="url(#hourGradient)"
                  radius={[7, 7, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Vehicle Mix */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <SectionHeader
            icon={Car}
            title="Vehicle Mix"
            description="Vehicle types using SPOT-GO"
          />

          <div className="relative h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={4}
                  stroke="none"
                >
                  {vehicleData.map((_, index) => (
                    <Cell
                      key={`vehicle-${index}`}
                      fill={colors[index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [
                    `${value}%`,
                    "Share",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-black text-slate-900">
                  1.8K
                </p>
                <p className="text-xs text-slate-400">
                  Vehicles
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-3">
            {vehicleData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: colors[index],
                    }}
                  />

                  <span className="text-sm text-slate-600">
                    {item.name}
                  </span>
                </div>

                <span className="text-sm font-bold text-slate-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          USER ACTIVITY
      ====================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <SectionHeader
          icon={Users}
          title="Customer Activity"
          description="New versus returning customers throughout the week"
        />

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={userActivityData}
              margin={{
                top: 10,
                right: 5,
                left: -15,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />

              <Tooltip
                contentStyle={tooltipStyle}
              />

              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{
                  fontSize: 11,
                  paddingBottom: 20,
                }}
              />

              <Line
                type="monotone"
                dataKey="newUsers"
                name="New Users"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="returning"
                name="Returning Users"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* =====================================================
          INSIGHTS GRID
      ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top location */}
        <motion.div
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xl"
        >
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <MapPin size={19} />
              </div>

              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                Top Performer
              </span>
            </div>

            <p className="mt-6 text-sm text-blue-100">
              Highest Revenue Location
            </p>

            <h3 className="mt-1 text-xl font-black">
              {bestLocation.name}
            </h3>

            <p className="mt-2 text-sm text-blue-100">
              {money(bestLocation.revenue)} generated
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold">
              <ArrowUpRight size={14} />
              14.8% above average
            </div>
          </div>
        </motion.div>

        {/* Peak */}
        <motion.div
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={19} />
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600">
              Demand Alert
            </span>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Highest Demand Window
          </p>

          <h3 className="mt-1 text-2xl font-black text-slate-900">
            6 PM – 10 PM
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Average occupancy reaches{" "}
            <span className="font-bold text-slate-800">
              84%
            </span>{" "}
            during this period.
          </p>

          <div className="mt-5">
            <ProgressBar
              value={84}
              label="Peak utilization"
              right="84%"
            />
          </div>
        </motion.div>

        {/* Occupancy */}
        <motion.div
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Gauge size={19} />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Healthy
            </span>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Best Occupancy
          </p>

          <h3 className="mt-1 text-2xl font-black text-slate-900">
            {highestOccupancy.short}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Currently operating at{" "}
            <span className="font-bold text-violet-600">
              {highestOccupancy.occupancy}%
            </span>{" "}
            occupancy.
          </p>

          <div className="mt-5">
            <ProgressBar
              value={highestOccupancy.occupancy}
              label="Slot utilization"
              right={`${highestOccupancy.occupancy}%`}
            />
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          PAYMENT METHODS + MONTHLY SUMMARY
      ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Payments */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <SectionHeader
            icon={Wallet}
            title="Payment Method Distribution"
            description="How customers are paying for parking"
          />

          <div className="space-y-5">
            {paymentData.map((item, index) => (
              <ProgressBar
                key={item.name}
                value={item.value}
                label={item.name}
                right={`${item.value}%`}
              />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Digital Payments
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                71%
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs text-emerald-600">
                Success Rate
              </p>
              <p className="mt-1 text-xl font-black text-emerald-700">
                98.6%
              </p>
            </div>
          </div>
        </motion.section>

        {/* Monthly summary */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <SectionHeader
            icon={BarChart3}
            title="Monthly Performance"
            description="Revenue growth across the last four weeks"
          />

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyRevenue}
                margin={{
                  top: 10,
                  right: 5,
                  left: -15,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                  tickFormatter={(value) =>
                    `${Math.round(value / 1000)}k`
                  }
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value, name) => [
                    name === "revenue"
                      ? money(value)
                      : value,
                    name === "revenue"
                      ? "Revenue"
                      : "Bookings",
                  ]}
                />

                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: 11,
                    paddingBottom: 15,
                  }}
                />

                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#2563eb"
                  radius={[7, 7, 0, 0]}
                  barSize={30}
                />

                <Bar
                  dataKey="bookings"
                  name="Bookings"
                  fill="#06b6d4"
                  radius={[7, 7, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          REPORT FOOTER
      ====================================================== */}

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Activity size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              Analytics are up to date
            </p>

            <p className="text-xs text-slate-500">
              Last synchronized on Sep 03, 2026 at 06:42 PM
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <Download size={15} />
          Download Data
        </button>
      </div>
    </div>
  );
}