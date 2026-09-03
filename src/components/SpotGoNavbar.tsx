"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  MapPin,
  Menu,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react";

export function SpotGoLogo() {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center"
      aria-label="SPOT GO Home"
    >
      <img
        src="/spotgo_logo.png"
        alt="SPOT GO"
        className="h-30 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </Link>
  );
}

export default function SpotGoNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Discover",
      href: "/#locations",
    },
    {
      label: "Live Map",
      href: "/#locations",
    },
    {
      label: "Parking",
      href: "/#parking",
    },
    {
      label: "How it works",
      href: "/#how-it-works",
    },
  ];

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* =====================================================
          TOP NETWORK BAR
      ====================================================== */}

      <div className="hidden border-b border-white/10 bg-slate-950 text-white lg:block">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-6 xl:px-8">
          {/* Left */}

          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/10">
              <Sparkles
                size={11}
                className="text-cyan-300"
              />
            </span>

            <span>
              Smart parking network is live across Karachi
            </span>
          </div>

          {/* Right */}

          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
            <span>
              1,240+ spots online
            </span>

            <span className="text-slate-700">
              •
            </span>

            <span>
              Real-time availability
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center px-5 sm:px-6 lg:px-8">

          {/* =================================================
              LOGO
          ================================================= */}

          <div className="flex min-w-0 flex-1 items-center">
            <SpotGoLogo />
          </div>

          {/* =================================================
              CENTER NAVIGATION
          ================================================= */}

          <nav className="hidden items-center gap-0.5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-1 lg:flex">
            {links.map((link, index) => {
              const isHome = index === 0;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`
                    group relative flex h-10 items-center
                    rounded-xl px-3.5 xl:px-4
                    text-[12px] font-bold
                    transition-all duration-300
                    ${
                      isHome
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:bg-white hover:text-slate-950 hover:shadow-sm"
                    }
                  `}
                >
                  <span className="relative z-10">
                    {link.label}
                  </span>

                  {/* Animated bottom line */}

                  <span
                    className={`
                      absolute bottom-1.5 left-1/2 h-[2px]
                      -translate-x-1/2 rounded-full
                      bg-cyan-500
                      transition-all duration-300
                      ${
                        isHome
                          ? "w-4"
                          : "w-0 group-hover:w-4"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="flex flex-1 items-center justify-end gap-2">

            {/* Location */}

            <button
              type="button"
              className="
                hidden items-center gap-2 rounded-xl
                border border-slate-200 bg-white
                px-3.5 py-2.5
                text-[11px] font-bold text-slate-700
                shadow-sm
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-slate-300
                hover:shadow-md
                xl:flex
              "
            >
              <MapPin
                size={14}
                strokeWidth={2.5}
                className="text-cyan-600"
              />

              <span>
                Karachi
              </span>

              <ChevronDown
                size={12}
                className="text-slate-400"
              />
            </button>

            {/* Notification */}

            <button
              type="button"
              aria-label="Notifications"
              className="
                relative hidden h-10 w-10
                items-center justify-center
                rounded-xl border border-slate-200
                bg-white text-slate-500
                shadow-sm
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-slate-300
                hover:text-slate-950
                hover:shadow-md
                lg:flex
              "
            >
              <Bell
                size={16}
                strokeWidth={2.2}
              />

              <span
                className="
                  absolute right-2.5 top-2.5
                  h-1.5 w-1.5 rounded-full
                  bg-cyan-500
                  ring-2 ring-white
                "
              />
            </button>

            {/* Divider */}

            <div className="mx-1 hidden h-7 w-px bg-slate-200 lg:block" />

            {/* Login */}

            <Link
              href="/login"
              className="
                group relative hidden h-10
                items-center justify-center
                rounded-xl px-3.5
                text-[11px] font-black text-slate-600
                transition-all duration-300
                hover:-translate-y-0.5
                hover:text-slate-950
                lg:flex
              "
            >
              <span>
                Login
              </span>

              <span
                className="
                  absolute bottom-1.5 left-1/2
                  h-[2px] w-0
                  -translate-x-1/2
                  rounded-full bg-cyan-500
                  transition-all duration-300
                  group-hover:w-6
                "
              />
            </Link>

            {/* Register */}

            <Link
              href="/register"
              className="
                group relative hidden h-10
                items-center gap-2
                overflow-hidden rounded-xl
                bg-slate-950 px-3.5
                text-[11px] font-black text-white
                shadow-[0_8px_20px_rgba(15,23,42,.12)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-slate-900
                hover:shadow-[0_12px_25px_rgba(6,182,212,.14)]
                lg:flex
              "
            >
              {/* Glow */}

              <span
                className="
                  absolute -right-5 -top-5
                  h-12 w-12 rounded-full
                  bg-cyan-400/20 blur-xl
                  transition-transform duration-500
                  group-hover:scale-[2.5]
                "
              />

              <span className="relative z-10">
                Register
              </span>

              <span
                className="
                  relative z-10
                  flex h-5 w-5 items-center justify-center
                  rounded-full bg-white/10
                  transition-all duration-300
                  group-hover:translate-x-0.5
                  group-hover:bg-cyan-400
                  group-hover:text-slate-950
                "
              >
                <ArrowRight
                  size={11}
                  strokeWidth={3}
                />
              </span>
            </Link>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen((value) => !value)
              }
              className="
                flex h-10 w-10 items-center
                justify-center rounded-xl
                border border-slate-200
                bg-white text-slate-700
                transition-all duration-300
                hover:border-slate-300
                hover:bg-slate-50
                lg:hidden
              "
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}

        {mobileOpen && (
          <div className="border-t border-slate-200/80 bg-white lg:hidden">
            <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-6">

              {/* Mobile Links */}

              <nav className="space-y-1">
                {links.map((link, index) => {
                  const isHome = index === 0;

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={closeMobile}
                      className={`
                        group flex items-center justify-between
                        rounded-xl px-4 py-3.5
                        text-sm font-bold
                        transition-all duration-200
                        ${
                          isHome
                            ? "bg-slate-950 text-white"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                        }
                      `}
                    >
                      <span>
                        {link.label}
                      </span>

                      <ArrowRight
                        size={15}
                        className={`
                          transition-transform duration-200
                          ${
                            isHome
                              ? "text-cyan-400"
                              : "text-slate-300 group-hover:translate-x-1 group-hover:text-cyan-500"
                          }
                        `}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Location */}

              <div className="mt-4 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="
                    flex w-full items-center justify-between
                    rounded-xl border border-slate-200
                    bg-slate-50 px-4 py-3.5
                    text-xs font-bold text-slate-700
                  "
                >
                  <span className="flex items-center gap-2">
                    <MapPin
                      size={15}
                      className="text-cyan-600"
                    />

                    Karachi
                  </span>

                  <ChevronDown
                    size={14}
                    className="text-slate-400"
                  />
                </button>
              </div>

              {/* Mobile Auth */}

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="
                    flex h-12 items-center
                    justify-center rounded-xl
                    border border-slate-200
                    bg-white
                    text-xs font-black text-slate-700
                    transition-all duration-300
                    hover:border-slate-300
                    hover:bg-slate-50
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMobile}
                  className="
                    group flex h-12 items-center
                    justify-center gap-2
                    rounded-xl bg-slate-950
                    text-xs font-black text-white
                    transition-all duration-300
                    hover:bg-slate-900
                  "
                >
                  Register

                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Mobile notification */}

              <button
                type="button"
                className="
                  mt-3 flex h-12 w-full
                  items-center justify-center gap-2
                  rounded-xl border border-slate-200
                  bg-white text-xs font-bold
                  text-slate-600
                  transition hover:bg-slate-50
                "
              >
                <Bell
                  size={15}
                  className="text-cyan-600"
                />

                Notifications

                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}