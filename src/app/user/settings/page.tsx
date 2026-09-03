"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Car,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Globe2,
  KeyRound,
  LockKeyhole,
  LogOut,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

type ToggleProps = {
  enabled: boolean;
  onChange: () => void;
};

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={enabled}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function SettingCard({
  icon: Icon,
  iconClass = "bg-blue-50 text-blue-600",
  title,
  description,
  children,
}: {
  icon: any;
  iconClass?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
          >
            <Icon size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="font-black text-slate-900">{title}</h2>
            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              {description}
            </p>
          </div>
        </div>
      </div>

      {children && <div className="p-5">{children}</div>}
    </section>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
            isPassword ? "pr-11" : ""
          } ${
            disabled
              ? "cursor-not-allowed bg-slate-50 text-slate-400"
              : ""
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}

function PreferenceRow({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0 last:pb-0 first:pt-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-800">{title}</p>
          <p className="mt-0.5 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

function DeleteAccountModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.97 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Trash2 size={19} />
              </div>

              <div>
                <h2 className="font-black text-slate-900">
                  Delete account
                </h2>
                <p className="text-xs text-slate-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-slate-100"
            >
              <X size={17} />
            </button>
          </div>

          <div className="p-5">
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
              <p className="text-sm leading-6 text-rose-700">
                Deleting your account will permanently remove your SPOT-GO
                profile, booking history, wallet information and saved
                preferences.
              </p>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={onClose}
                className="rounded-xl bg-rose-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-rose-700"
              >
                Delete account
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState("Misbah Ashraf");
  const [email, setEmail] = useState("Misbah@example.com");
  const [phone, setPhone] = useState("+92 300 1234567");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [bookingAlerts, setBookingAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [parkingUpdates, setParkingUpdates] = useState(true);
  const [promotionalAlerts, setPromotionalAlerts] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const [locationServices, setLocationServices] = useState(true);
  const [rememberVehicle, setRememberVehicle] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [saved, setSaved] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="w-full min-w-0 text-slate-900">
      {/* PAGE HEADER */}
      <section className="mb-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <KeyRound size={15} />
              Account settings
            </div>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Settings
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm text-slate-500">
              Manage your profile, security, notifications and SPOT-GO
              preferences.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {saved ? <Check size={16} /> : <Save size={16} />}
            {saved ? "Changes saved" : "Save changes"}
          </button>
        </div>
      </section>

      {/* PROFILE HERO */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-8"
      >
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-2xl font-black shadow-inner ring-1 ring-white/20">
            MS
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black">Misbah Ashraf</h2>

              <span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold text-emerald-100">
                <Check size={11} />
                Verified
              </span>
            </div>

            <p className="mt-1 text-sm text-blue-100">
              Misbah@example.com
            </p>

            <p className="mt-2 text-xs text-blue-200">
              SPOT-GO member · Account active
            </p>
          </div>
        </div>
      </motion.section>

      {/* TWO COLUMN CONTENT */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <div className="space-y-6">
          {/* PERSONAL INFORMATION */}
          <SettingCard
            icon={UserRound}
            title="Personal information"
            description="Update your basic account information."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Full name"
                value={name}
                onChange={setName}
                placeholder="Enter your name"
              />

              <InputField
                label="Email address"
                value={email}
                onChange={setEmail}
                type="email"
                placeholder="Enter your email"
              />

              <InputField
                label="Phone number"
                value={phone}
                onChange={setPhone}
                placeholder="+92 300 1234567"
              />

              <InputField
                label="Account ID"
                value="SPG-USER-20481"
                disabled
              />
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-3">
              <ShieldCheck className="shrink-0 text-blue-600" size={17} />

              <p className="text-xs leading-5 text-blue-700">
                Your verified account information helps keep your bookings and
                wallet secure.
              </p>
            </div>
          </SettingCard>

          {/* PASSWORD */}
          <SettingCard
            icon={LockKeyhole}
            iconClass="bg-violet-50 text-violet-600"
            title="Password & security"
            description="Keep your SPOT-GO account protected."
          >
            <div className="grid gap-4">
              <InputField
                label="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                type="password"
                placeholder="Enter current password"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="New password"
                  value={newPassword}
                  onChange={setNewPassword}
                  type="password"
                  placeholder="Enter new password"
                />

                <InputField
                  label="Confirm new password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Strong password recommended
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-slate-400">
                    Use at least 8 characters with numbers and special
                    characters.
                  </p>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={
                  !currentPassword || !newPassword || !confirmPassword
                }
                className="shrink-0 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Update password
              </button>
            </div>
          </SettingCard>

          {/* NOTIFICATIONS */}
          <SettingCard
            icon={Bell}
            iconClass="bg-amber-50 text-amber-600"
            title="Notification preferences"
            description="Choose which updates you want to receive."
          >
            <div>
              <PreferenceRow
                icon={Bell}
                title="Booking alerts"
                description="Confirmation, cancellation and booking changes."
                enabled={bookingAlerts}
                onChange={() => setBookingAlerts((prev) => !prev)}
              />

              <PreferenceRow
                icon={CreditCardIcon}
                title="Payment alerts"
                description="Successful payments, failed payments and refunds."
                enabled={paymentAlerts}
                onChange={() => setPaymentAlerts((prev) => !prev)}
              />

              <PreferenceRow
                icon={Car}
                title="Parking updates"
                description="Availability and updates for your reserved spots."
                enabled={parkingUpdates}
                onChange={() => setParkingUpdates((prev) => !prev)}
              />

              <PreferenceRow
                icon={Globe2}
                title="Promotional notifications"
                description="Offers, discounts and SPOT-GO announcements."
                enabled={promotionalAlerts}
                onChange={() => setPromotionalAlerts((prev) => !prev)}
              />
            </div>
          </SettingCard>

          {/* DELIVERY METHODS */}
          <SettingCard
            icon={Smartphone}
            iconClass="bg-cyan-50 text-cyan-600"
            title="Notification channels"
            description="Control where SPOT-GO sends your notifications."
          >
            <PreferenceRow
              icon={Globe2}
              title="Email notifications"
              description="Receive important updates at your registered email."
              enabled={emailNotifications}
              onChange={() => setEmailNotifications((prev) => !prev)}
            />

            <PreferenceRow
              icon={Smartphone}
              title="SMS notifications"
              description="Receive booking and security alerts by SMS."
              enabled={smsNotifications}
              onChange={() => setSmsNotifications((prev) => !prev)}
            />
          </SettingCard>

          {/* PARKING PREFERENCES */}
          <SettingCard
            icon={Car}
            iconClass="bg-emerald-50 text-emerald-600"
            title="Parking preferences"
            description="Customize your parking experience."
          >
            <PreferenceRow
              icon={Globe2}
              title="Location services"
              description="Use your location to show nearby parking areas."
              enabled={locationServices}
              onChange={() => setLocationServices((prev) => !prev)}
            />

            <PreferenceRow
              icon={Car}
              title="Remember my vehicle"
              description="Keep your preferred vehicle information for future bookings."
              enabled={rememberVehicle}
              onChange={() => setRememberVehicle((prev) => !prev)}
            />
          </SettingCard>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* ACCOUNT STATUS */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h2 className="font-black text-slate-900">
                  Account security
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Your account is protected.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <SecurityItem
                title="Email verified"
                status="Verified"
              />

              <SecurityItem
                title="Phone verified"
                status="Verified"
              />

              <SecurityItem
                title="Password protection"
                status="Active"
              />

              <SecurityItem
                title="Last login"
                status="Today, 08:32 PM"
                neutral
              />
            </div>
          </section>

          {/* APPEARANCE */}
          <SettingCard
            icon={Palette}
            iconClass="bg-pink-50 text-pink-600"
            title="Appearance"
            description="Choose how SPOT-GO looks for you."
          >
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDarkMode(false)}
                className={`rounded-2xl border p-3 text-left transition ${
                  !darkMode
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="h-20 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                  <div className="h-2 w-10 rounded bg-blue-500" />
                  <div className="mt-2 h-2 w-full rounded bg-slate-100" />
                  <div className="mt-1.5 h-2 w-3/4 rounded bg-slate-100" />
                </div>

                <p className="mt-3 text-xs font-bold text-slate-800">
                  Light
                </p>

                {!darkMode && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-blue-600">
                    <Check size={11} />
                    Selected
                  </div>
                )}
              </button>

              <button
                onClick={() => setDarkMode(true)}
                className={`rounded-2xl border p-3 text-left transition ${
                  darkMode
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="h-20 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-sm">
                  <div className="h-2 w-10 rounded bg-blue-400" />
                  <div className="mt-2 h-2 w-full rounded bg-slate-700" />
                  <div className="mt-1.5 h-2 w-3/4 rounded bg-slate-700" />
                </div>

                <p className="mt-3 text-xs font-bold text-slate-800">
                  Dark
                </p>

                {darkMode && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-blue-600">
                    <Check size={11} />
                    Selected
                  </div>
                )}
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
              <Moon size={14} />
              Appearance is currently UI-only.
            </div>
          </SettingCard>

          {/* QUICK LINKS */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-black text-slate-900">Quick settings</h2>
              <p className="mt-1 text-xs text-slate-400">
                Frequently used account actions.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <QuickLink
                icon={ShieldCheck}
                title="Privacy & security"
                description="Review your account security"
              />

              <QuickLink
                icon={Bell}
                title="Notification center"
                description="Manage your latest alerts"
              />

              <QuickLink
                icon={LogOut}
                title="Sign out"
                description="Sign out from this device"
                danger
              />
            </div>
          </section>

          {/* DANGER ZONE */}
          <section className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <Trash2 size={18} />
              </div>

              <div>
                <h2 className="font-black text-rose-900">
                  Danger zone
                </h2>

                <p className="mt-1 text-xs leading-5 text-rose-700/70">
                  Permanently delete your SPOT-GO account and all associated
                  information.
                </p>
              </div>
            </div>

            <button
              onClick={() => setDeleteModal(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
            >
              <Trash2 size={15} />
              Delete account
            </button>
          </section>
        </div>
      </div>

      {/* BOTTOM SAVE BAR */}
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Save size={17} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-800">
              Keep your settings up to date
            </p>

            <p className="text-xs text-slate-400">
              Changes are currently stored for this demo session.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Saved successfully" : "Save changes"}
        </button>
      </div>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-slate-200 py-6">
        <div className="flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SPOT-GO. Smart parking made simple.</p>

          <div className="flex items-center gap-2">
            <ShieldCheck size={13} />
            Your account settings are private and secure.
          </div>
        </div>
      </footer>

      <DeleteAccountModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
      />
    </div>
  );
}

function SecurityItem({
  title,
  status,
  neutral = false,
}: {
  title: string;
  status: string;
  neutral?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-3">
      <p className="text-xs font-bold text-slate-600">{title}</p>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
          neutral
            ? "bg-slate-200 text-slate-600"
            : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {!neutral && <Check className="mr-1 inline" size={10} />}
        {status}
      </span>
    </div>
  );
}

function QuickLink({
  icon: Icon,
  title,
  description,
  danger = false,
}: {
  icon: any;
  title: string;
  description: string;
  danger?: boolean;
}) {
  return (
    <button className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          danger
            ? "bg-rose-50 text-rose-600"
            : "bg-slate-50 text-slate-500"
        }`}
      >
        <Icon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-bold ${
            danger ? "text-rose-600" : "text-slate-800"
          }`}
        >
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-400">{description}</p>
      </div>

      <ChevronRight size={16} className="shrink-0 text-slate-300" />
    </button>
  );
}

function CreditCardIcon(props: any) {
  return <span {...props}>💳</span>;
}