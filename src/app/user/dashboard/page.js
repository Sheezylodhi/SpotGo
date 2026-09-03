"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Car,
  ChevronDown,
  ChevronRight,
  CreditCard,
  LocateFixed,
  MapPin,
  ParkingCircle,
  Sparkles,
  TrendingUp,
  WalletCards,
  Clock3,
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
    type: "Parking",
  },
  {
    title: "Spot reservation",
    location: "Dolmen Mall Clifton",
    time: "Aug 31, 6:15 PM",
    amount: "Rs. 150",
    type: "Reservation",
  },
  {
    title: "Payment completed",
    location: "Ocean Mall Parking",
    time: "Aug 29, 9:10 PM",
    amount: "Rs. 360",
    type: "Payment",
  },
  {
    title: "Parking session completed",
    location: "Dolmen Mall Tariq Road",
    time: "Aug 27, 7:25 PM",
    amount: "Rs. 200",
    type: "Parking",
  },
];

const weeklyData = [
  { day: "Mon", hours: 1.8, spend: 220 },
  { day: "Tue", hours: 2.4, spend: 280 },
  { day: "Wed", hours: 1.2, spend: 150 },
  { day: "Thu", hours: 3.1, spend: 390 },
  { day: "Fri", hours: 2.2, spend: 260 },
  { day: "Sat", hours: 3.8, spend: 460 },
  { day: "Sun", hours: 2.7, spend: 330 },
];

const monthlySpend = [
  { month: "Mar", value: 4200 },
  { month: "Apr", value: 5100 },
  { month: "May", value: 4700 },
  { month: "Jun", value: 6200 },
  { month: "Jul", value: 5800 },
  { month: "Aug", value: 7140 },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const localUser = localStorage.getItem("spotgo_user");
      const sessionUser = sessionStorage.getItem("spotgo_user");

      const savedUser = localUser || sessionUser;

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("SPOT GO dashboard error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <DashboardLoader />;
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <OverviewDashboard user={user} />
    </main>
  );
}

/* =========================================================
   OVERVIEW DASHBOARD
========================================================= */

function OverviewDashboard({ user }) {
  const firstName = user?.name?.split(" ")?.[0] || "there";

  const totalHours = useMemo(() => {
    return weeklyData.reduce((sum, item) => sum + item.hours, 0);
  }, []);

  const totalSpend = useMemo(() => {
    return weeklyData.reduce((sum, item) => sum + item.spend, 0);
  }, []);

  return (
    <div className="mx-auto max-w-[1550px] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-cyan-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            SMART PARKING
          </div>

          <h1 className="text-[30px] font-black tracking-[-0.045em] text-slate-950 sm:text-[38px]">
            Good evening, {firstName}.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening with your parking activity.
          </p>
        </div>

        <Link
          href="/#locations"
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

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Clock3 size={19} />}
          label="Parking hours"
          value={`${totalHours.toFixed(1)}h`}
          detail="This week"
          trend="+12.8%"
          trendUp
        />

        <StatCard
          icon={<WalletCards size={19} />}
          label="Total spent"
          value={`Rs. ${totalSpend}`}
          detail="This week"
          trend="+8.4%"
          trendUp
        />

        <StatCard
          icon={<MapPin size={19} />}
          label="Saved locations"
          value="4"
          detail="Frequently visited"
          trend="2 new"
          trendUp
        />

        <StatCard
          icon={<Sparkles size={19} />}
          label="SPOTGO rewards"
          value="420"
          detail="Points available"
          trend="+60 pts"
          trendUp
        />
      </div>

      {/* =====================================================
          ANALYTICS
      ===================================================== */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.85fr]">
        <ParkingAnalytics />
        <SpendingOverview />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <MonthlyChart />
        <ParkingInsights />
      </div>

      {/* =====================================================
          NEARBY PARKING
      ===================================================== */}

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
            <ParkingCard
              key={parking.id}
              parking={parking}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          RECENT ACTIVITY
      ===================================================== */}

      <section className="mt-7 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,.05)]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-[15px] font-black">
              Recent activity
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Your latest parking activity
            </p>
          </div>

          <Link
            href="/user/dashboard/history"
            className="flex items-center gap-1 text-xs font-bold text-cyan-600"
          >
            View history
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {activity.map((item, index) => (
            <ActivityRow
              key={index}
              item={item}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   PARKING ANALYTICS
========================================================= */

function ParkingAnalytics() {
  const maxHours = Math.max(
    ...weeklyData.map((item) => item.hours)
  );

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.05)]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <BarChart3 size={17} />
            </div>

            <div>
              <h2 className="text-[15px] font-black">
                Parking activity
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Hours parked during the week
              </p>
            </div>
          </div>
        </div>

        <button className="flex h-9 items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600">
          This week
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="mt-8 flex h-[245px] gap-4">
        <div className="flex flex-col justify-between pb-7 text-[9px] font-semibold text-slate-300">
          <span>4h</span>
          <span>3h</span>
          <span>2h</span>
          <span>1h</span>
          <span>0</span>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-0 flex flex-col justify-between pb-7">
            {[0, 1, 2, 3, 4].map((line) => (
              <div
                key={line}
                className="h-px w-full bg-slate-100"
              />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-7 top-0 flex items-end justify-between gap-2 px-1">
            {weeklyData.map((item) => {
              const height =
                (item.hours / maxHours) * 100;

              return (
                <div
                  key={item.day}
                  className="group relative flex h-full flex-1 items-end justify-center"
                >
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-lg bg-[#07111f] px-2.5 py-1.5 text-[9px] font-bold text-white opacity-0 shadow-xl transition group-hover:opacity-100">
                    {item.hours}h
                  </div>

                  <div
                    style={{ height: `${height}%` }}
                    className="relative w-full max-w-[38px] overflow-hidden rounded-t-xl bg-slate-100 transition-all duration-500 group-hover:bg-cyan-100"
                  >
                    <div
                      style={{
                        height: `${Math.min(
                          100,
                          item.hours * 24
                        )}%`,
                      }}
                      className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-cyan-500 transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between px-1">
            {weeklyData.map((item) => (
              <span
                key={item.day}
                className="flex-1 text-center text-[9px] font-bold text-slate-400"
              >
                {item.day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SPENDING OVERVIEW
========================================================= */

function SpendingOverview() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.05)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <CreditCard size={17} />
            </div>

            <div>
              <h2 className="text-[15px] font-black">
                Spending overview
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Current month
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-emerald-600">
          <ArrowDownRight size={11} />
          8.4%
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400">
              Total spent
            </div>

            <div className="mt-1 text-[31px] font-black tracking-[-0.045em]">
              Rs. 7,140
            </div>
          </div>

          <div className="text-right">
            <div className="text-[9px] font-bold text-slate-400">
              vs last month
            </div>

            <div className="mt-1 text-xs font-black text-emerald-600">
              -Rs. 620
            </div>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
            <span>Monthly budget</span>
            <span>Rs. 10,000</span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-cyan-500"
              style={{ width: "71.4%" }}
            />
          </div>

          <div className="mt-2 text-[9px] font-semibold text-slate-400">
            Rs. 2,860 remaining this month
          </div>
        </div>

        <div className="mt-7 space-y-3">
          <SpendRow
            label="Parking sessions"
            value="Rs. 5,640"
            percent="79%"
          />

          <SpendRow
            label="Reservations"
            value="Rs. 1,050"
            percent="15%"
          />

          <SpendRow
            label="Other fees"
            value="Rs. 450"
            percent="6%"
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MONTHLY CHART
========================================================= */

function MonthlyChart() {
  const maxValue = Math.max(
    ...monthlySpend.map((item) => item.value)
  );

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.05)]">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[15px] font-black">
            Monthly spending
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            Your parking spend over the last 6 months
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <TrendingUp size={17} />
        </div>
      </div>

      <div className="mt-8 flex h-[220px] items-end gap-3 sm:gap-5">
        {monthlySpend.map((item) => {
          const height =
            (item.value / maxValue) * 100;

          return (
            <div
              key={item.month}
              className="group flex h-full flex-1 flex-col items-center justify-end"
            >
              <div className="relative flex w-full flex-1 items-end justify-center">
                <div className="pointer-events-none absolute bottom-full mb-2 rounded-lg bg-[#07111f] px-2 py-1.5 text-[9px] font-bold text-white opacity-0 transition group-hover:opacity-100">
                  Rs. {item.value}
                </div>

                <div
                  style={{ height: `${height}%` }}
                  className="w-full max-w-[48px] rounded-t-xl bg-slate-100 transition-all duration-500 group-hover:bg-cyan-100"
                >
                  <div
                    className="h-full w-full rounded-t-xl bg-cyan-500"
                    style={{
                      opacity:
                        item.month === "Aug" ? 1 : 0.45,
                    }}
                  />
                </div>
              </div>

              <div className="mt-3 text-[9px] font-bold text-slate-400">
                {item.month}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   PARKING INSIGHTS
========================================================= */

function ParkingInsights() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.05)]">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[15px] font-black">
            Parking insights
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            Your usage patterns
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <ParkingCircle size={17} />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <InsightRow
          icon={<Clock3 size={16} />}
          title="Peak parking time"
          value="7:00 PM – 9:00 PM"
          detail="Most frequent"
        />

        <InsightRow
          icon={<MapPin size={16} />}
          title="Favorite location"
          value="Ocean Mall Parking"
          detail="12 visits"
        />

        <InsightRow
          icon={<Car size={16} />}
          title="Primary vehicle"
          value="Toyota Corolla"
          detail="KHI-1234"
        />

        <InsightRow
          icon={<CalendarDays size={16} />}
          title="Average session"
          value="2.4 hours"
          detail="+0.3h this month"
        />
      </div>

      <Link
        href="/user/dashboard/history"
        className="mt-5 flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
      >
        View detailed history
        <ArrowRight size={13} />
      </Link>
    </section>
  );
}

/* =========================================================
   PARKING CARD
========================================================= */

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

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
  detail,
  trend,
  trendUp,
}) {
  return (
    <div className="rounded-[23px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,.04)]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
          {icon}
        </div>

        <div
          className={`flex items-center gap-0.5 rounded-full px-2 py-1 text-[9px] font-black ${
            trendUp
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {trendUp ? (
            <ArrowUpRight size={11} />
          ) : (
            <ArrowDownRight size={11} />
          )}
          {trend}
        </div>
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

/* =========================================================
   SPENDING ROW
========================================================= */

function SpendRow({ label, value, percent }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-500">
          {label}
        </span>

        <span className="text-[10px] font-black text-slate-800">
          {value}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-400"
            style={{ width: percent }}
          />
        </div>

        <span className="w-7 text-right text-[9px] font-bold text-slate-400">
          {percent}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   INSIGHT ROW
========================================================= */

function InsightRow({
  icon,
  title,
  value,
  detail,
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-bold text-slate-400">
          {title}
        </div>

        <div className="mt-0.5 truncate text-xs font-black text-slate-800">
          {value}
        </div>
      </div>

      <div className="text-right text-[8px] font-bold text-slate-400">
        {detail}
      </div>
    </div>
  );
}

/* =========================================================
   ACTIVITY ROW
========================================================= */

function ActivityRow({ item }) {
  const icon =
    item.type === "Payment" ? (
      <CreditCard size={17} />
    ) : item.type === "Reservation" ? (
      <CalendarDays size={17} />
    ) : (
      <ParkingCircle size={17} />
    );

  return (
    <div className="flex items-center gap-4 px-6 py-4 transition hover:bg-slate-50/70">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-slate-800">
          {item.title}
        </div>

        <div className="mt-1 truncate text-[11px] text-slate-400">
          {item.location} · {item.time}
        </div>
      </div>

      <div className="hidden text-right sm:block">
        <div className="text-[9px] font-bold text-slate-400">
          {item.type}
        </div>

        <div className="mt-1 text-xs font-black text-slate-700">
          {item.amount}
        </div>
      </div>

      <ChevronRight
        size={15}
        className="text-slate-300"
      />
    </div>
  );
}

/* =========================================================
   LOADER
========================================================= */

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