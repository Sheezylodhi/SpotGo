"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Car,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoader />}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  /*
   * Preserve booking context.
   */

  const redirect =
    searchParams.get("redirect") || "/dashboard";

  const spot = searchParams.get("spot") || "";
  const area = searchParams.get("area") || "";
  const floor = searchParams.get("floor") || "";

  /*
   * If already logged in, go to dashboard.
   */

  useEffect(() => {
    const existingUser =
      localStorage.getItem("spotgo_user");

    if (existingUser) {
      router.replace("/dashboard");
    }
  }, [router]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  };

  const passwordChecks = useMemo(
    () => ({
      length: form.password.length >= 8,
      number: /\d/.test(form.password),
      letter: /[A-Za-z]/.test(form.password),
    }),
    [form.password]
  );

  const passwordScore =
    Object.values(passwordChecks).filter(Boolean).length;

  const passwordsMatch =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    passwordChecks.length &&
    passwordChecks.number &&
    passwordChecks.letter &&
    passwordsMatch &&
    form.terms;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!canSubmit) {
      setError(
        "Please complete all required fields correctly."
      );
      return;
    }

    setLoading(true);

    /*
     * FRONTEND DEMO REGISTRATION
     */

    const user = {
      id: `user_${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      loggedIn: true,
      createdAt: new Date().toISOString(),
    };

    /*
     * Save current user.
     */

    localStorage.setItem(
      "spotgo_user",
      JSON.stringify(user)
    );

    /*
     * Preserve selected parking spot.
     */

    if (spot) {
      localStorage.setItem(
        "spotgo_pending_booking",
        JSON.stringify({
          spot,
          area,
          floor,
          redirect,
          createdAt: new Date().toISOString(),
        })
      );
    }

    /*
     * Go to user portal.
     */

    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const loginUrl = `/login?redirect=${encodeURIComponent(
    redirect
  )}&spot=${encodeURIComponent(
    spot
  )}&area=${encodeURIComponent(
    area
  )}&floor=${encodeURIComponent(floor)}`;

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">

        {/* =========================================================
            LEFT — REGISTER FORM
        ========================================================== */}

        <section className="order-2 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:order-1 lg:px-12 xl:px-20">

          <div className="w-full max-w-[500px]">

            {/* Mobile logo */}

            <div className="mb-9 flex lg:hidden">

             <Link
  href="/"
  className="flex w-fit items-center gap-3"
>
  {/* LOGO */}
  <div className="flex h-20 w-20 shrink-0 items-center justify-center">
    <img
      src="/spotgo_logo.png"
      alt="SPOT-GO"
      className="h-full w-full object-contain"
    />
  </div>

  {/* BRAND TEXT */}
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

            </div>

            {/* Heading */}

            <div>

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <UserRound size={20} />
              </div>

              <h1 className="text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-[36px]">
                Create your account
              </h1>

              <p className="mt-2.5 max-w-md text-sm leading-6 text-slate-500">
                Join SPOT GO and make your next parking
                experience effortless.
              </p>

            </div>

            {/* Selected spot */}

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
                    {area ? ` • ${area}` : ""}
                    {floor ? ` • Floor ${floor}` : ""}
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
              className="mt-8 space-y-4"
            >

              {/* Name */}

              <Field
                id="name"
                label="Full name"
                icon={<UserRound size={17} />}
                placeholder="Your full name"
                value={form.name}
                onChange={(value) =>
                  updateField("name", value)
                }
                autoComplete="name"
              />

              {/* Email */}

              <Field
                id="email"
                label="Email address"
                icon={<Mail size={17} />}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(value) =>
                  updateField("email", value)
                }
                autoComplete="email"
              />

              {/* Phone */}

              <Field
                id="phone"
                label="Phone number"
                icon={<Phone size={17} />}
                type="tel"
                placeholder="+92 300 1234567"
                value={form.phone}
                onChange={(value) =>
                  updateField("phone", value)
                }
                autoComplete="tel"
              />

              {/* Password */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-[13px] font-bold text-slate-700"
                >
                  Password
                </label>

                <div className="group relative">

                  <LockKeyhole
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-cyan-500"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={(e) =>
                      updateField(
                        "password",
                        e.target.value
                      )
                    }
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                    className="h-[53px] w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
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
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

                {/* Password strength */}

                {form.password.length > 0 && (
                  <div className="mt-3">

                    <div className="mb-2 flex gap-1.5">

                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition ${
                            passwordScore >= level
                              ? "bg-cyan-500"
                              : "bg-slate-200"
                          }`}
                        />
                      ))}

                    </div>

                    <div className="grid grid-cols-3 gap-2">

                      <PasswordRule
                        active={passwordChecks.length}
                        text="8+ characters"
                      />

                      <PasswordRule
                        active={passwordChecks.letter}
                        text="A letter"
                      />

                      <PasswordRule
                        active={passwordChecks.number}
                        text="A number"
                      />

                    </div>

                  </div>
                )}

              </div>

              {/* Confirm password */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-[13px] font-bold text-slate-700"
                >
                  Confirm password
                </label>

                <div className="group relative">

                  <LockKeyhole
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-cyan-500"
                  />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={form.confirmPassword}
                    onChange={(e) =>
                      updateField(
                        "confirmPassword",
                        e.target.value
                      )
                    }
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    required
                    className={`h-[53px] w-full rounded-2xl border bg-white pl-11 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      form.confirmPassword.length > 0
                        ? passwordsMatch
                          ? "border-emerald-300 focus:border-emerald-400 focus:ring-emerald-400/10"
                          : "border-rose-300 focus:border-rose-400 focus:ring-rose-400/10"
                        : "border-slate-200 hover:border-slate-300 focus:border-cyan-400 focus:ring-cyan-400/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (value) => !value
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

                {form.confirmPassword.length > 0 && (
                  <div
                    className={`mt-2 flex items-center gap-1.5 text-[11px] font-semibold ${
                      passwordsMatch
                        ? "text-emerald-600"
                        : "text-rose-500"
                    }`}
                  >
                    <CheckCircle2 size={13} />

                    {passwordsMatch
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </div>
                )}

              </div>

              {/* Terms */}

              <label className="flex cursor-pointer items-start gap-3 pt-1">

                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) =>
                    updateField(
                      "terms",
                      e.target.checked
                    )
                  }
                  className="peer sr-only"
                />

                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-cyan-500 peer-checked:bg-cyan-500">
                  <Check
                    size={13}
                    strokeWidth={3}
                  />
                </span>

                <span className="text-xs leading-5 text-slate-500">
                  I agree to SPOT GO&apos;s{" "}

                  <button
                    type="button"
                    className="font-bold text-slate-700 hover:text-cyan-600"
                  >
                    Terms of Service
                  </button>{" "}

                  and{" "}

                  <button
                    type="button"
                    className="font-bold text-slate-700 hover:text-cyan-600"
                  >
                    Privacy Policy
                  </button>
                  .
                </span>

              </label>

              {/* Submit */}

              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="group mt-2 flex h-[55px] w-full items-center justify-center gap-2 rounded-2xl bg-[#07111f] text-sm font-bold text-white shadow-[0_12px_30px_rgba(7,17,31,.14)] transition hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-[0_16px_36px_rgba(7,17,31,.2)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

            </form>

            {/* Login */}

            <p className="mt-7 text-center text-sm text-slate-500">

              Already have an account?{" "}

              <Link
                href={loginUrl}
                className="font-bold text-cyan-600 transition hover:text-cyan-700"
              >
                Sign in
              </Link>

            </p>

            {/* Security */}

            <div className="mt-7 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
              <ShieldCheck size={14} />
              Your information is securely handled
            </div>

          </div>

        </section>

        {/* =========================================================
            RIGHT — BRAND EXPERIENCE
        ========================================================== */}

        <section className="relative order-1 hidden overflow-hidden bg-[#07111f] lg:order-2 lg:flex">

          <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />

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
              {/* LOGO */}
              <div className="flex h-30 w-30 shrink-0 items-center justify-center">
                <img
                  src="/spotgo_logo.png"
                  alt="SPOT-GO"
                  className="h-full w-full object-contain"
                />
              </div>
            
              {/* BRAND TEXT */}
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

            {/* Content */}

            <div className="max-w-xl">

              <div className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-400">

                <span className="h-px w-8 bg-cyan-400" />

                One account. Everything connected.

              </div>

              <h2 className="text-5xl font-black leading-[1.03] tracking-[-0.045em] text-white xl:text-6xl">

                Park smarter.
                <br />

                <span className="text-cyan-400">
                  Move faster.
                </span>

              </h2>

              <p className="mt-6 max-w-lg text-[16px] leading-7 text-slate-400">
                Your SPOT GO account keeps your reservations,
                parking history and favorite locations in one
                simple place.
              </p>

              {/* Benefits */}

              <div className="mt-10 space-y-3">

                <Benefit
                  title="Reserve exact parking spots"
                  text="See the parking layout before you arrive."
                />

                <Benefit
                  title="Manage every booking"
                  text="Keep upcoming and previous reservations together."
                />

                <Benefit
                  title="Faster future checkouts"
                  text="Your details stay ready for your next booking."
                />

              </div>

              {/* Parking card */}

              <div className="relative mt-12 max-w-lg rounded-[28px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <MapPin
                        size={15}
                        className="text-cyan-400"
                      />
                      Ocean Mall
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      Clifton, Karachi
                    </div>

                  </div>

                  <div className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                    42 SPOTS
                  </div>

                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-[#091625] p-4">

                  <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    <span>Entrance</span>
                    <span>Floor B1</span>
                    <span>Exit</span>
                  </div>

                  <div className="grid grid-cols-6 gap-2">

                    {Array.from({ length: 18 }).map(
                      (_, index) => {

                        const booked =
                          [1, 4, 6, 9, 12, 16].includes(
                            index
                          );

                        return (
                          <div
                            key={index}
                            className={`aspect-[1.25] rounded-lg border ${
                              booked
                                ? "border-slate-700 bg-slate-800"
                                : "border-cyan-400/20 bg-cyan-400/10"
                            }`}
                          />
                        );
                      }
                    )}

                  </div>

                  <div className="mt-4 flex items-center gap-4 text-[10px]">

                    <span className="flex items-center gap-1.5 text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      Available
                    </span>

                    <span className="flex items-center gap-1.5 text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-slate-700" />
                      Booked
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Bottom */}

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={13} />
              Smart parking built around your journey.
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

/* ===============================================================
   INPUT FIELD
================================================================ */

function Field({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div>

      <label
        htmlFor={id}
        className="mb-2 block text-[13px] font-bold text-slate-700"
      >
        {label}
      </label>

      <div className="group relative">

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-cyan-500">
          {icon}
        </span>

        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-[53px] w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
        />

      </div>

    </div>
  );
}

/* ===============================================================
   PASSWORD RULE
================================================================ */

function PasswordRule({ active, text }) {
  return (
    <div
      className={`flex items-center gap-1 text-[10px] font-semibold ${
        active
          ? "text-emerald-600"
          : "text-slate-400"
      }`}
    >
      <CheckCircle2 size={11} />
      {text}
    </div>
  );
}

/* ===============================================================
   BENEFIT
================================================================ */

function Benefit({ title, text }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur">

      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
        <Check
          size={15}
          strokeWidth={3}
        />
      </div>

      <div>

        <div className="text-sm font-bold text-white">
          {title}
        </div>

        <div className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </div>

      </div>

    </div>
  );
}

/* ===============================================================
   REGISTER LOADER
================================================================ */

function RegisterLoader() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f8fb]">
      <div className="flex flex-col items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#07111f] text-white">
          <Car size={22} />
        </div>

        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-500" />

      </div>
    </main>
  );
}