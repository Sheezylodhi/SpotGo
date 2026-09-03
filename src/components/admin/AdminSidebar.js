"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  ParkingSquare,
  DollarSign,
  CalendarCheck,
  MapPinned,
  MapPin,
  Users,
  BarChart3,
  Bell,
  Settings,
  X,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Power,
} from "lucide-react";

const mainMenu = [
  {
    label: "Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Parking Slots",
    href: "/admin/slots",
    icon: ParkingSquare,
  },
  {
    label: "Parking Fees",
    href: "/admin/fees",
    icon: DollarSign,
  },
  {
    label: "Reservations",
    href: "/admin/reservations",
    icon: CalendarCheck,
  },
  {
    label: "Parking Information",
    href: "/admin/parking-info",
    icon: MapPinned,
  },
  {
    label: "Parking Locations",
    href: "/admin/parking-locations",
    icon: MapPin,
  },
];

const managementMenu = [
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Reports & Analytics",
    href: "/admin/reports",
    icon: BarChart3,
  },
];

const accountMenu = [
  {
    label: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({ mobileOpen, onClose }) {
  const pathname = usePathname();

  const [showLogout, setShowLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // =========================================================
  // ACTIVE MENU
  // =========================================================

  const isActive = (href) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  // =========================================================
  // SIGN OUT
  // =========================================================

  const handleLogout = () => {
    setLoggingOut(true);

    // Remove login information
    localStorage.removeItem("spotgo_user");
    sessionStorage.removeItem("spotgo_user");

    // Also remove any pending booking/session data
    sessionStorage.removeItem("spotgo_pending_booking");

    // Small delay so the button shows signing out state
    setTimeout(() => {
      setShowLogout(false);

      // Redirect to login page
      window.location.href = "/login";
    }, 350);
  };

  // =========================================================
  // MENU RENDER
  // =========================================================

  const renderMenu = (items) => {
    return items.map((item) => {
      const Icon = item.icon;
      const active = isActive(item.href);

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className={`group relative flex min-h-[48px] items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
            active
              ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          {/* Active indicator */}
          {active && (
            <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-white/90" />
          )}

          <Icon
            className={`h-[19px] w-[19px] shrink-0 transition-transform duration-200 group-hover:scale-105 ${
              active
                ? "text-white"
                : "text-slate-400 group-hover:text-slate-600"
            }`}
            strokeWidth={active ? 2.3 : 2}
          />

          <span className="truncate">
            {item.label}
          </span>

          {active && (
            <ChevronRight
              className="ml-auto h-4 w-4 shrink-0 text-white/80"
              strokeWidth={2.3}
            />
          )}
        </Link>
      );
    });
  };

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-[9990] bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`fixed left-0 top-0 z-[9991] flex h-[100dvh] w-[285px] max-w-[88vw] flex-col border-r border-slate-100 bg-white shadow-2xl shadow-slate-950/10 transition-transform duration-300 ease-out lg:w-[270px] lg:translate-x-0 lg:shadow-none ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* ===================================================
            LOGO HEADER
        ==================================================== */}

        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-100 px-5 sm:px-6">
          <Link
            href="/admin/dashboard"
            onClick={onClose}
            className="group flex min-w-0 items-center"
          >
            <div className="flex h-12 max-w-[190px] items-center">
              <img
                src="/spotgo_logo.png"
                alt="SPOT-GO"
                className="block max-h-30 w-auto max-w-[190px] object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X
              className="h-5 w-5"
              strokeWidth={2.2}
            />
          </button>
        </div>

        {/* ===================================================
            ADMIN PROFILE
        ==================================================== */}

        <div className="shrink-0 px-4 pt-5">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-3">
            {/* Decorative glow */}
            <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-cyan-300/20 blur-2xl" />

            <div className="relative flex items-center gap-3">
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-cyan-100">
                <ShieldCheck
                  className="h-5 w-5 text-cyan-500"
                  strokeWidth={2.3}
                />
              </div>

              {/* Information */}
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  System Administrator
                </p>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>

                  <p className="text-[11px] font-semibold text-slate-400">
                    Full Access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}

        <nav className="mt-5 flex-1 overflow-y-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* =================================================
              MAIN MENU
          ================================================== */}

          <div>
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Main Menu
            </p>

            <div className="space-y-1">
              {renderMenu(mainMenu)}
            </div>
          </div>

          {/* =================================================
              MANAGEMENT
          ================================================== */}

          <div className="mt-6">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Management
            </p>

            <div className="space-y-1">
              {renderMenu(managementMenu)}
            </div>
          </div>

          {/* =================================================
              ACCOUNT
          ================================================== */}

          <div className="mt-6">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Account
            </p>

            <div className="space-y-1">
              {renderMenu(accountMenu)}
            </div>
          </div>
        </nav>

        {/* ===================================================
            BOTTOM SECTION
        ==================================================== */}

        <div className="shrink-0 border-t border-slate-100 bg-white p-4">
          {/* =================================================
              SYSTEM STATUS
          ================================================== */}

          <div className="mb-3 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <div className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-700">
                System Online
              </p>

              <p className="truncate text-[10px] text-slate-400">
                All services operational
              </p>
            </div>
          </div>

          {/* =================================================
              SIGN OUT BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left transition-all duration-200 hover:border-red-100 hover:bg-red-50 active:scale-[0.99]"
          >
            {/* Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-colors duration-200 group-hover:bg-red-100">
              <LogOut
                className="h-[17px] w-[17px] text-slate-400 transition-colors duration-200 group-hover:text-red-500"
                strokeWidth={2.2}
              />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-700 transition-colors group-hover:text-red-600">
                Sign Out
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                End admin session
              </p>
            </div>

            <Power
              className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-red-400"
              strokeWidth={2}
            />
          </button>
        </div>
      </aside>

      {/* =====================================================
          SIGN OUT CONFIRMATION MODAL
      ====================================================== */}

      {showLogout && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[410px] overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-2xl shadow-slate-950/25">
            {/* =================================================
                MODAL HEADER
            ================================================== */}

            <div className="relative overflow-hidden border-b border-slate-100 px-6 py-6">
              {/* Background decorations */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-100/70 blur-2xl" />

              <div className="absolute -bottom-12 left-20 h-24 w-24 rounded-full bg-orange-100/50 blur-2xl" />

              <div className="relative flex items-start gap-4">
                {/* Logout icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
                  <LogOut
                    className="h-5 w-5 text-red-500"
                    strokeWidth={2.3}
                  />
                </div>

                {/* Heading */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-black tracking-tight text-slate-900">
                    Sign out?
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Are you sure you want to end your admin session?
                  </p>
                </div>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setShowLogout(false)}
                  disabled={loggingOut}
                  aria-label="Close sign out dialog"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  <X
                    className="h-4 w-4"
                    strokeWidth={2.2}
                  />
                </button>
              </div>
            </div>

            {/* =================================================
                MODAL BODY
            ================================================== */}

            <div className="px-6 py-5">
              <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                    <ShieldCheck
                      className="h-3.5 w-3.5 text-amber-600"
                      strokeWidth={2.3}
                    />
                  </div>

                  <p className="text-xs leading-5 text-amber-700">
                    Your current admin session will be cleared and you will
                    need to sign in again to access the admin panel.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                MODAL ACTIONS
            ================================================== */}

            <div className="flex gap-3 px-6 pb-6">
              <button
                type="button"
                onClick={() => setShowLogout(false)}
                disabled={loggingOut}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loggingOut ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut
                      className="h-4 w-4"
                      strokeWidth={2.2}
                    />
                    Sign Out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

