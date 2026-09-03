"use client";

import {
  Bell,
  Menu,
  Search,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles = {
  "/admin/dashboard": {
    title: "Overview",
    description: "Monitor your parking system at a glance",
  },
  "/admin/slots": {
    title: "Parking Slots",
    description: "Manage and update parking slot availability",
  },
  "/admin/fees": {
    title: "Parking Fees",
    description: "Manage parking rates and pricing",
  },
  "/admin/reservations": {
    title: "Reservations",
    description: "View and manage parking reservations",
  },
  "/admin/parking-info": {
    title: "Parking Information",
    description: "Manage your parking facility information",
  },
  "/admin/parking-locations": {
    title: "Parking Locations",
    description: "Manage parking locations and facilities",
  },
  "/admin/users": {
    title: "Users",
    description: "Manage registered SPOT-GO users",
  },
  "/admin/reports": {
    title: "Reports & Analytics",
    description: "Track parking activity and performance",
  },
  "/admin/notifications": {
    title: "Notifications",
    description: "Manage system notifications and alerts",
  },
  "/admin/settings": {
    title: "Settings",
    description: "Manage your administrator preferences",
  },
};

export default function AdminTopBar({ onMenuClick }) {
  const pathname = usePathname();

  const currentPage =
    pageTitles[pathname] || pageTitles["/admin/dashboard"];

  return (
    <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">

      {/* =====================================================
          LEFT
      ====================================================== */}

      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            {currentPage.title}
          </h1>

          <p className="hidden truncate text-xs font-medium text-slate-400 sm:block">
            {currentPage.description}
          </p>
        </div>
      </div>

      {/* =====================================================
          RIGHT
      ====================================================== */}

      <div className="flex items-center gap-2 sm:gap-3">

        {/* Search */}
        <button
          type="button"
          className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-slate-400 transition hover:border-slate-300 hover:text-slate-600 md:flex"
        >
          <Search className="h-4 w-4" />

          <span className="text-xs font-medium">
            Search
          </span>

          <span className="ml-4 rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400">
            /
          </span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <Bell className="h-[18px] w-[18px]" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-cyan-500" />
        </button>

        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-transparent px-1.5 py-1.5 transition hover:bg-slate-50 sm:px-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50">
            <ShieldCheck className="h-[18px] w-[18px] text-cyan-500" />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-bold text-slate-800">
              Admin
            </p>

            <p className="text-[10px] font-medium text-slate-400">
              Administrator
            </p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
        </button>
      </div>
    </header>
  );
}