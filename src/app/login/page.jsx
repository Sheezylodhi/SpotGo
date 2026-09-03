"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Car,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------------
  // BOOKING CONTEXT
  // ---------------------------------------------------------

  const [redirect, setRedirect] = useState("/user/dashboard");
  const [spot, setSpot] = useState("");
  const [area, setArea] = useState("");
  const [floor, setFloor] = useState("");
  const [locationId, setLocationId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [price, setPrice] = useState("120");

  // ---------------------------------------------------------
  // READ LOGIN / BOOKING QUERY
  // ---------------------------------------------------------

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const redirectParam = params.get("redirect");
    const spotParam = params.get("spot");
    const areaParam = params.get("area");
    const floorParam = params.get("floor");
    const locationIdParam = params.get("locationId");
    const locationNameParam = params.get("locationName");
    const priceParam = params.get("price");

    /*
     * Only booking is allowed as a special redirect.
     *
     * /login
     *       -> /user/dashboard
     *
     * /login?redirect=/user/booking...
     *       -> /user/booking
     */

    const safeRedirect =
      redirectParam === "/user/booking"
        ? "/user/booking"
        : "/user/dashboard";

    setRedirect(safeRedirect);
    setSpot(spotParam || "");
    setArea(areaParam || "");
    setFloor(floorParam || "");
    setLocationId(locationIdParam || "");
    setLocationName(locationNameParam || "");
    setPrice(priceParam || "120");
  }, []);

  // ---------------------------------------------------------
  // CHECK IF ALREADY LOGGED IN
  // ---------------------------------------------------------

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const redirectParam = params.get("redirect");
    const spotParam = params.get("spot");

    const localUser = localStorage.getItem("spotgo_user");
    const sessionUser = sessionStorage.getItem("spotgo_user");

    const existingUser = localUser || sessionUser;

    if (!existingUser) {
      return;
    }

    /*
     * USER CAME FROM:
     *
     * Select Spot
     *    ↓
     * Reserve this spot
     *    ↓
     * Login
     *
     * Since user is already logged in,
     * directly continue to booking.
     */

    if (
      redirectParam === "/user/booking" &&
      spotParam
    ) {
      const pendingBooking = {
        spot: spotParam,
        area: params.get("area") || "",
        floor: params.get("floor") || "",
        locationId: params.get("locationId") || "",
        locationName: params.get("locationName") || "",
        price: params.get("price") || "120",
        redirect: "/user/booking",
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem(
        "spotgo_pending_booking",
        JSON.stringify(pendingBooking)
      );

      router.replace("/user/booking");

      return;
    }

    /*
     * NORMAL LOGIN PAGE
     *
     * Already logged-in user goes to dashboard.
     */

    router.replace("/user/dashboard");
  }, [router]);

  // ---------------------------------------------------------
  // LOGIN SUBMIT
  // ---------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    /*
     * -------------------------------------------------------
     * FRONTEND DEMO AUTH
     * -------------------------------------------------------
     *
     * Later replace this with your real API.
     *
     * Password is NEVER stored.
     */

    const user = {
      id: `user_${Date.now()}`,
      name: email.trim().split("@")[0],
      email: email.trim(),
      loggedIn: true,
      loginAt: new Date().toISOString(),
    };

    // ---------------------------------------------------------
    // SAVE LOGIN
    // ---------------------------------------------------------

    if (remember) {
      localStorage.setItem(
        "spotgo_user",
        JSON.stringify(user)
      );

      sessionStorage.removeItem("spotgo_user");
    } else {
      sessionStorage.setItem(
        "spotgo_user",
        JSON.stringify(user)
      );

      localStorage.removeItem("spotgo_user");
    }

    // ---------------------------------------------------------
    // BOOKING LOGIN FLOW
    // ---------------------------------------------------------

    /*
     * If login came from:
     *
     * Parking
     *   ↓
     * Select Spot
     *   ↓
     * Reserve this spot
     *   ↓
     * Login
     *
     * then preserve the booking and go to:
     *
     * /user/booking
     */

    if (
      redirect === "/user/booking" &&
      spot
    ) {
      const pendingBooking = {
        spot,
        area,
        floor,
        locationId,
        locationName,
        price,
        redirect: "/user/booking",
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem(
        "spotgo_pending_booking",
        JSON.stringify(pendingBooking)
      );

      /*
       * Give the UI a small moment to show
       * "Signing in..."
       */

      setTimeout(() => {
        router.replace("/user/booking");
      }, 400);

      return;
    }

    // ---------------------------------------------------------
    // NORMAL LOGIN FLOW
    // ---------------------------------------------------------

    /*
     * If user simply opened:
     *
     * /login
     *
     * then ALWAYS go to:
     *
     * /user/dashboard
     */

    setTimeout(() => {
      router.replace("/user/dashboard");
    }, 400);
  };

  // ---------------------------------------------------------
  // REGISTER URL
  // ---------------------------------------------------------

  const registerParams = new URLSearchParams();

  if (redirect === "/user/booking") {
    registerParams.set(
      "redirect",
      "/user/booking"
    );

    if (spot) {
      registerParams.set("spot", spot);
    }

    if (area) {
      registerParams.set("area", area);
    }

    if (floor) {
      registerParams.set("floor", floor);
    }

    if (locationId) {
      registerParams.set(
        "locationId",
        locationId
      );
    }

    if (locationName) {
      registerParams.set(
        "locationName",
        locationName
      );
    }

    if (price) {
      registerParams.set("price", price);
    }
  }

  const registerUrl =
    redirect === "/user/booking"
      ? `/register?${registerParams.toString()}`
      : "/register";

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">

        {/* =====================================================
            LEFT — BRAND EXPERIENCE
        ====================================================== */}

        <section className="relative hidden overflow-hidden bg-[#07111f] lg:flex">

          <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

            {/* Logo */}

            <Link
              href="/"
              className="flex w-fit items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#07111f] shadow-xl">
                <Car
                  size={21}
                  strokeWidth={2.4}
                />
              </div>

              <div>
                <div className="text-[18px] font-black tracking-[0.18em] text-white">
                  SPOT
                  <span className="text-cyan-400">
                    GO
                  </span>
                </div>

                <div className="text-[10px] font-medium tracking-[0.16em] text-slate-400">
                  SMART PARKING
                </div>
              </div>
            </Link>

            {/* Main */}

            <div className="max-w-xl">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-slate-300 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.9)]" />
                Parking made effortless
              </div>

              <h1 className="text-5xl font-black leading-[1.03] tracking-[-0.045em] text-white xl:text-6xl">
                Your parking.
                <br />

                <span className="text-cyan-400">
                  Your way.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-[16px] leading-7 text-slate-400">
                Find available parking, choose your exact spot
                and reserve it before you even reach your
                destination.
              </p>

              {/* Features */}

              <div className="mt-10 grid max-w-lg gap-3 sm:grid-cols-3">

                <Feature
                  icon={<MapPin size={17} />}
                  title="Find"
                  text="Nearby spots"
                />

                <Feature
                  icon={<Car size={17} />}
                  title="Choose"
                  text="Exact spot"
                />

                <Feature
                  icon={<ShieldCheck size={17} />}
                  title="Reserve"
                  text="Securely"
                />

              </div>

              {/* Parking Visual */}

              <div className="relative mt-12 max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">

                <div className="mb-5 flex items-center justify-between">

                  <div>
                    <div className="text-sm font-bold text-white">
                      Live parking
                    </div>

                    <div className="mt-0.5 text-xs text-slate-500">
                      Karachi parking network
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    LIVE

                  </div>

                </div>

                <div className="grid grid-cols-6 gap-2">

                  {Array.from({ length: 24 }).map(
                    (_, index) => {

                      const occupied = [
                        2,
                        5,
                        7,
                        10,
                        14,
                        18,
                        21,
                        23,
                      ].includes(index);

                      return (
                        <div
                          key={index}
                          className={`flex aspect-[1.25] items-center justify-center rounded-lg border text-[9px] font-bold ${
                            occupied
                              ? "border-slate-700 bg-slate-800/80 text-slate-600"
                              : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                          }`}
                        >
                          {occupied ? "—" : "P"}
                        </div>
                      );
                    }
                  )}

                </div>

                <div className="mt-4 flex items-center justify-between text-[11px]">

                  <span className="text-slate-500">
                    16 spots available
                  </span>

                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Sparkles size={12} />
                    Real-time availability
                  </span>

                </div>

              </div>
            </div>

            {/* Bottom */}

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <LockKeyhole size={13} />

              Your account and bookings are protected.
            </div>

          </div>
        </section>

        {/* =====================================================
            RIGHT — LOGIN
        ====================================================== */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">

          <div className="w-full max-w-[470px]">

            {/* Mobile Logo */}

            <div className="mb-10 flex lg:hidden">

              <Link
                href="/"
                className="flex items-center gap-3"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#07111f] text-white">
                  <Car size={21} />
                </div>

                <div>

                  <div className="text-[18px] font-black tracking-[0.18em]">
                    SPOT
                    <span className="text-cyan-500">
                      GO
                    </span>
                  </div>

                  <div className="text-[10px] font-medium tracking-[0.16em] text-slate-400">
                    SMART PARKING
                  </div>

                </div>

              </Link>

            </div>

            {/* Heading */}

            <div>

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <LockKeyhole size={20} />
              </div>

              <h2 className="text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-[36px]">
                Welcome back
              </h2>

              <p className="mt-2.5 text-sm leading-6 text-slate-500">
                Sign in to manage your parking and reservations.
              </p>

            </div>

            {/* Selected Spot */}

            {spot && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-white">
                  <Car size={16} />
                </div>

                <div className="min-w-0">

                  <p className="text-[9px] font-black uppercase tracking-wider text-cyan-700">
                    Reservation waiting
                  </p>

                  <p className="mt-0.5 truncate text-xs font-bold text-slate-800">

                    Spot {spot}

                    {area
                      ? ` • ${area}`
                      : ""}

                    {floor
                      ? ` • Floor ${floor}`
                      : ""}

                  </p>

                </div>

              </div>
            )}

            {/* Error */}

            {error && (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">
                {error}
              </div>
            )}

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-[13px] font-bold text-slate-700"
                >
                  Email address
                </label>

                <div className="group relative">

                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-cyan-500"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-[54px] w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-[13px] font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-bold text-cyan-600 transition hover:text-cyan-700"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="group relative">

                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-cyan-500"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-[54px] w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>

              {/* Remember */}

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(
                      e.target.checked
                    )
                  }
                  className="peer sr-only"
                />

                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-cyan-500 peer-checked:bg-cyan-500">

                  <Check
                    size={13}
                    strokeWidth={3}
                  />

                </span>

                <span className="text-xs font-semibold text-slate-500">
                  Keep me signed in
                </span>

              </label>

              {/* Login */}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-[#07111f] text-sm font-bold text-white shadow-[0_12px_30px_rgba(7,17,31,.16)] transition hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-[0_16px_36px_rgba(7,17,31,.22)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

            </form>

            {/* Divider */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                or continue with
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>

            {/* Google */}

            <button
              type="button"
              className="flex h-[54px] w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm font-black">
                G
              </span>

              Continue with Google

            </button>

            {/* Register */}

            <p className="mt-8 text-center text-sm text-slate-500">

              Don't have an account?{" "}

              <Link
                href={registerUrl}
                className="font-bold text-cyan-600 transition hover:text-cyan-700"
              >
                Create one
              </Link>

            </p>

            {/* Security */}

            <div className="mt-9 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
              <ShieldCheck size={14} />
              Secure account access
            </div>

          </div>

        </section>
      </div>
    </main>
  );
}

// =============================================================
// FEATURE CARD
// =============================================================

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur">

      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <div className="text-xs font-bold text-white">
        {title}
      </div>

      <div className="mt-1 text-[10px] text-slate-500">
        {text}
      </div>

    </div>
  );
}