"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  CalendarCheck2,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  X,
  Wallet,
  XCircle,
} from "lucide-react";

const mainLinks = [
  {
    label: "Overview",
    href: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Find Parking",
    href: "/#locations",
    icon: MapPin,
  },
  {
    label: "My Bookings",
    href: "/user/booking",
    icon: CalendarCheck2,
  },
  {
    label: "Booking History",
    href: "/user/bookinghistory",
    icon: CalendarCheck2,
  },
  {
    label: "Cancel Reservation",
    href: "/user/cancel-reservation",
    icon: XCircle,
  },
];

const accountLinks = [
  {
    label: "Wallet",
    href: "/user/wallet",
    icon: Wallet,
  },
  {
    label: "Payments",
    href: "/user/payments",
    icon: CreditCard,
  },
  {
    label: "Notifications",
    href: "/user/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    href: "/user/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  mobileOpen = false,
  onClose,
}) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/user/dashboard") {
      return pathname === "/user/dashboard";
    }

    if (href === "/#locations") {
      return false;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = () => {
    localStorage.removeItem("spotgo_user");
    sessionStorage.removeItem("spotgo_user");

    localStorage.removeItem("spotgo_pending_booking");
    sessionStorage.removeItem("spotgo_pending_booking");

    window.location.href = "/login";
  };

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileOpen && (
        <div
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-slate-950/40
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[270px] flex-col
          border-r border-slate-200
          bg-white
          shadow-xl shadow-slate-900/5
          transition-transform duration-300 ease-out

          lg:translate-x-0
          lg:shadow-none

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ===================================================
            LOGO
        ==================================================== */}

        <div className="flex h-[82px] items-center justify-between border-b border-slate-100 px-5">
          <Link
            href="/user/dashboard"
            onClick={onClose}
            className="flex min-w-0 items-center"
          >
            <div className="relative h-30 w-[175px]">
              <Image
                src="/spotgo_logo.png"
                alt="SPOT-GO"
                fill
                priority
                sizes="300px"
                className="object-contain object-left h-30"
              />
            </div>
          </Link>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              lg:hidden
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* ===================================================
            USER
        ==================================================== */}

        <div className="mx-4 mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#07111f] text-sm font-black text-white">
              SG
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-slate-900">
                My Account
              </div>

              <div className="mt-0.5 truncate text-[11px] text-slate-500">
                Parking member
              </div>
            </div>

            <div className="ml-auto h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {/* Main */}

          <div className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
            Main menu
          </div>

          <div className="space-y-1">
            {mainLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group flex h-11 items-center gap-3
                    rounded-xl px-3.5
                    text-sm font-semibold
                    transition-all

                    ${
                      active
                        ? "bg-[#07111f] text-white shadow-[0_8px_20px_rgba(7,17,31,.14)]"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={active ? 2.4 : 2}
                    className={
                      active
                        ? "text-cyan-400"
                        : "text-slate-400 group-hover:text-slate-700"
                    }
                  />

                  <span className="flex-1">
                    {item.label}
                  </span>

                  {active && (
                    <ChevronRight
                      size={15}
                      className="text-slate-500"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Account */}

          <div className="mb-3 mt-8 px-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
            Account
          </div>

          <div className="space-y-1">
            {accountLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group flex h-11 items-center gap-3
                    rounded-xl px-3.5
                    text-sm font-semibold
                    transition-all

                    ${
                      active
                        ? "bg-[#07111f] text-white shadow-[0_8px_20px_rgba(7,17,31,.14)]"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={active ? 2.4 : 2}
                    className={
                      active
                        ? "text-cyan-400"
                        : "text-slate-400 group-hover:text-slate-700"
                    }
                  />

                  <span className="flex-1">
                    {item.label}
                  </span>

                  {active && (
                    <ChevronRight
                      size={15}
                      className="text-slate-500"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* =================================================
              HELP
          ================================================== */}

          <div className="mt-8 rounded-2xl bg-[#07111f] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-400">
              <HelpCircle size={18} />
            </div>

            <div className="mt-3 text-sm font-bold text-white">
              Need help?
            </div>

            <p className="mt-1 text-[11px] leading-5 text-slate-400">
              Get assistance with bookings, parking or your account.
            </p>

            <button
              type="button"
              className="mt-3 flex items-center gap-1 text-[11px] font-bold text-cyan-400 transition hover:text-cyan-300"
            >
              Contact support
              <ChevronRight size={13} />
            </button>
          </div>
        </nav>

        {/* ===================================================
            LOGOUT
        ==================================================== */}

        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="
              group flex h-11 w-full
              items-center gap-3
              rounded-xl px-3.5
              text-sm font-semibold
              text-slate-500
              transition
              hover:bg-rose-50
              hover:text-rose-600
            "
          >
            <LogOut
              size={18}
              className="
                text-slate-400
                transition
                group-hover:text-rose-500
              "
            />

            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}