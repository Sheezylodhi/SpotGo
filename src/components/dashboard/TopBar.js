"use client";

import {
  Search,
  Bell,
  MapPin,
  Menu,
} from "lucide-react";

export default function TopBar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 h-[76px] border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LEFT */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl border border-slate-200
              bg-white text-slate-600
              transition
              hover:bg-slate-50
              hover:text-slate-900
              lg:hidden
            "
            aria-label="Open menu"
          >
            <Menu size={21} strokeWidth={2} />
          </button>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search
              size={18}
              strokeWidth={1.8}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search parking, bookings..."
              className="
                h-11 w-[280px]
                rounded-xl
                border border-slate-200
                bg-slate-50
                pl-10 pr-4
                text-sm text-slate-700
                outline-none
                transition-all
                placeholder:text-slate-400
                focus:border-blue-300
                focus:bg-white
                focus:ring-4
                focus:ring-blue-50
              "
            />
          </div>

          {/* Mobile Heading */}
          <div className="md:hidden">
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              Dashboard
            </h2>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Current Location */}
          <div
            className="
              hidden items-center gap-2
              rounded-xl bg-slate-50
              px-3 py-2
              lg:flex
            "
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <MapPin
                size={17}
                strokeWidth={2}
                className="text-blue-600"
              />
            </div>

            <div className="text-left">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Current Location
              </p>

              <p className="text-xs font-bold text-slate-700">
                Karachi, Pakistan
              </p>
            </div>
          </div>

          {/* Notification - Static */}
          <div
            className="
              relative flex h-10 w-10 sm:h-11 sm:w-11
              items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-500
            "
          >
            <Bell size={19} strokeWidth={1.8} />

            <span
              className="
                absolute right-[8px] top-[7px]
                h-2 w-2
                rounded-full
                border-2 border-white
                bg-blue-600
              "
            />
          </div>

          {/* User - Static */}
          <div
            className="
              flex items-center gap-2.5
              rounded-xl
              border border-slate-200
              bg-white
              px-2 py-1.5
            "
          >
            {/* Avatar */}
            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-lg
                bg-slate-900
                text-xs font-bold
                text-white
              "
            >
              MS
            </div>

            {/* User Info */}
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold text-slate-800">
                M
              </p>

              <p className="text-[10px] text-slate-400">
                Driver
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}