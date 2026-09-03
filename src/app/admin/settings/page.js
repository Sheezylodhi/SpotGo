"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Bell,
  BellRing,
  Car,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  Eye,
  EyeOff,
  Globe2,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Monitor,
  Moon,
  Palette,
  ParkingCircle,
  Save,
  Settings2,
  Shield,
  Smartphone,
  Trash2,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";

/* =========================================================
   TOGGLE
========================================================= */

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <motion.span
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ duration: 0.18 }}
        className="absolute left-0 top-1 h-4 w-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

/* =========================================================
   SETTING ROW
========================================================= */

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900">
            {title}
          </p>

          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0 sm:ml-6">{children}</div>
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-2 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={18} />
        </div>

        <div>
          <h2 className="text-base font-black text-slate-900 sm:text-lg">
            {title}
          </h2>

          <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-sm">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-3">{children}</div>
    </motion.section>
  );
}

/* =========================================================
   PASSWORD MODAL
========================================================= */

function PasswordModal({ onClose }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      onClose();
    }, 900);
  };

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
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <div className="relative overflow-hidden bg-slate-950 p-6 text-white">
            <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-blue-600/20 blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <KeyRound size={20} />
                </div>

                <h2 className="text-xl font-black">
                  Change Password
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Update your administrator account password.
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          <div className="space-y-4 p-6">
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Current Password
              </label>

              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-11 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

                <button
                  onClick={() =>
                    setShowCurrent(!showCurrent)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showCurrent ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-11 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

                <button
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showNew ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-700">
              Use at least 8 characters with a combination of
              letters, numbers and symbols.
            </div>

            <button
              onClick={handleSave}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              {saved ? (
                <>
                  <Check size={16} />
                  Password Updated
                </>
              ) : (
                <>
                  <Save size={16} />
                  Update Password
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    emailAlerts: true,
    reservationAlerts: true,
    paymentAlerts: true,
    parkingAlerts: true,
    maintenanceAlerts: true,
    weeklyReports: true,
    securityAlerts: true,
    sound: true,
    autoRefresh: true,
    compactMode: false,
    darkMode: false,
    twoFactor: true,
    loginAlerts: true,
    publicAvailability: true,
    allowAdvanceBooking: true,
    autoCancel: true,
    vehicleValidation: true,
  });

  const [profile, setProfile] = useState({
    firstName: "System",
    lastName: "Administrator",
    email: "admin@spotgo.com",
    phone: "+92 300 000 0000",
    role: "System Administrator",
    timezone: "Asia/Karachi",
    language: "English",
  });

  const toggle = (key) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  const tabs = [
    {
      name: "General",
      icon: Settings2,
    },
    {
      name: "Notifications",
      icon: Bell,
    },
    {
      name: "Parking",
      icon: ParkingCircle,
    },
    {
      name: "Security",
      icon: Shield,
    },
    {
      name: "Appearance",
      icon: Palette,
    },
  ];

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
        <div className="absolute -right-28 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-36 left-1/3 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur">
                <Settings2 size={13} />
                ADMIN CONTROL CENTER

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                System
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  {" "}
                  Settings
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Configure your SPOT-GO administrator profile,
                parking operations, notifications, security and
                system preferences.
              </p>
            </div>

            <button
              onClick={saveSettings}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              {saved ? (
                <>
                  <Check size={16} />
                  Changes Saved
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>

          {/* Hero status */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center gap-2">
                <Activity
                  size={15}
                  className="text-emerald-300"
                />

                <span className="text-xs text-slate-400">
                  System Status
                </span>
              </div>

              <p className="mt-2 text-lg font-black">
                Operational
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center gap-2">
                <Shield
                  size={15}
                  className="text-cyan-300"
                />

                <span className="text-xs text-slate-400">
                  Security
                </span>
              </div>

              <p className="mt-2 text-lg font-black">
                Protected
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center gap-2">
                <Clock3
                  size={15}
                  className="text-violet-300"
                />

                <span className="text-xs text-slate-400">
                  Last Updated
                </span>
              </div>

              <p className="mt-2 text-lg font-black">
                Just now
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          SETTINGS NAVIGATION
      ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.name;

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition last:mb-0 ${
                  active
                    ? "bg-slate-950 text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon size={17} />

                <span className="flex-1">
                  {tab.name}
                </span>

                {active && (
                  <ChevronRight size={15} />
                )}
              </button>
            );
          })}

          <div className="mt-3 border-t border-slate-100 pt-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 p-3">
              <div className="flex items-center gap-2">
                <Zap
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-xs font-bold text-slate-700">
                  SPOT-GO v1.0
                </span>
              </div>

              <p className="mt-1 text-[10px] leading-4 text-slate-500">
                Smart parking management platform
              </p>
            </div>
          </div>
        </motion.aside>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="space-y-6">
          {/* =================================================
              GENERAL
          ================================================== */}

          {activeTab === "General" && (
            <>
              <SettingsSection
                icon={User}
                title="Administrator Profile"
                description="Manage your administrator identity and contact information."
              >
                <div className="flex flex-col gap-6 py-4 sm:flex-row sm:items-center">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-2xl font-black text-white shadow-xl shadow-blue-600/20">
                      SA
                    </div>

                    <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-white bg-slate-900 text-white shadow-lg">
                      <Palette size={13} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      System Administrator
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Full system access
                    </p>

                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active Account
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      First Name
                    </label>

                    <input
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          firstName: e.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Last Name
                    </label>

                    <input
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          lastName: e.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            email: e.target.value,
                          })
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Phone Number
                    </label>

                    <div className="relative">
                      <Smartphone
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            phone: e.target.value,
                          })
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection
                icon={Globe2}
                title="Regional Preferences"
                description="Control language, timezone and regional display preferences."
              >
                <div className="grid gap-4 py-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Language
                    </label>

                    <select
                      value={profile.language}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          language: e.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white"
                    >
                      <option>English</option>
                      <option>Urdu</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Timezone
                    </label>

                    <select
                      value={profile.timezone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          timezone: e.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white"
                    >
                      <option>Asia/Karachi</option>
                      <option>Asia/Dubai</option>
                      <option>Asia/Riyadh</option>
                      <option>UTC</option>
                    </select>
                  </div>
                </div>
              </SettingsSection>
            </>
          )}

          {/* =================================================
              NOTIFICATIONS
          ================================================== */}

          {activeTab === "Notifications" && (
            <>
              <SettingsSection
                icon={BellRing}
                title="Notification Preferences"
                description="Choose which events should generate administrator notifications."
              >
                <SettingRow
                  icon={Bell}
                  title="Email Notifications"
                  description="Receive important system notifications through email."
                >
                  <Toggle
                    enabled={settings.emailAlerts}
                    onChange={() => toggle("emailAlerts")}
                  />
                </SettingRow>

                <SettingRow
                  icon={ParkingCircle}
                  title="Reservation Alerts"
                  description="Get notified whenever a new reservation is created, cancelled or completed."
                >
                  <Toggle
                    enabled={settings.reservationAlerts}
                    onChange={() =>
                      toggle("reservationAlerts")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={CreditCard}
                  title="Payment Alerts"
                  description="Receive notifications for successful, failed and refunded payments."
                >
                  <Toggle
                    enabled={settings.paymentAlerts}
                    onChange={() =>
                      toggle("paymentAlerts")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={MapPin}
                  title="Parking Capacity Alerts"
                  description="Notify when parking locations reach configured occupancy thresholds."
                >
                  <Toggle
                    enabled={settings.parkingAlerts}
                    onChange={() =>
                      toggle("parkingAlerts")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={Settings2}
                  title="Maintenance Alerts"
                  description="Receive alerts when parking slots or facilities require maintenance."
                >
                  <Toggle
                    enabled={settings.maintenanceAlerts}
                    onChange={() =>
                      toggle("maintenanceAlerts")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={Activity}
                  title="Weekly Analytics Reports"
                  description="Receive a weekly summary of revenue, reservations and parking performance."
                >
                  <Toggle
                    enabled={settings.weeklyReports}
                    onChange={() =>
                      toggle("weeklyReports")
                    }
                  />
                </SettingRow>
              </SettingsSection>

              <SettingsSection
                icon={Smartphone}
                title="Alert Delivery"
                description="Control how real-time notifications are delivered."
              >
                <SettingRow
                  icon={BellRing}
                  title="Notification Sound"
                  description="Play a sound when a new high-priority notification arrives."
                >
                  <Toggle
                    enabled={settings.sound}
                    onChange={() => toggle("sound")}
                  />
                </SettingRow>

                <SettingRow
                  icon={Shield}
                  title="Security Notifications"
                  description="Receive alerts for suspicious logins and security events."
                >
                  <Toggle
                    enabled={settings.securityAlerts}
                    onChange={() =>
                      toggle("securityAlerts")
                    }
                  />
                </SettingRow>
              </SettingsSection>
            </>
          )}

          {/* =================================================
              PARKING
          ================================================== */}

          {activeTab === "Parking" && (
            <>
              <SettingsSection
                icon={ParkingCircle}
                title="Parking Operations"
                description="Configure default behavior for SPOT-GO parking facilities."
              >
                <SettingRow
                  icon={Globe2}
                  title="Public Slot Availability"
                  description="Show real-time parking availability to customers."
                >
                  <Toggle
                    enabled={settings.publicAvailability}
                    onChange={() =>
                      toggle("publicAvailability")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={Clock3}
                  title="Advance Booking"
                  description="Allow customers to reserve parking slots before their arrival."
                >
                  <Toggle
                    enabled={settings.allowAdvanceBooking}
                    onChange={() =>
                      toggle("allowAdvanceBooking")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={Car}
                  title="Vehicle Validation"
                  description="Require vehicle information before confirming a parking reservation."
                >
                  <Toggle
                    enabled={settings.vehicleValidation}
                    onChange={() =>
                      toggle("vehicleValidation")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={Zap}
                  title="Auto Refresh Availability"
                  description="Automatically refresh parking slot availability in the admin dashboard."
                >
                  <Toggle
                    enabled={settings.autoRefresh}
                    onChange={() =>
                      toggle("autoRefresh")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={Clock3}
                  title="Automatic Reservation Cancellation"
                  description="Automatically cancel reservations that remain unpaid beyond the configured time."
                >
                  <Toggle
                    enabled={settings.autoCancel}
                    onChange={() =>
                      toggle("autoCancel")
                    }
                  />
                </SettingRow>
              </SettingsSection>

              <SettingsSection
                icon={MapPin}
                title="Default Parking Configuration"
                description="Default values used when creating new parking facilities."
              >
                <div className="grid gap-4 py-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Default Currency
                    </label>

                    <select className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white">
                      <option>PKR — Pakistani Rupee</option>
                      <option>USD — US Dollar</option>
                      <option>AED — UAE Dirham</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Default Slot Type
                    </label>

                    <select className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white">
                      <option>Standard</option>
                      <option>Premium</option>
                      <option>EV Charging</option>
                      <option>Accessible</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Reservation Window
                    </label>

                    <select className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                      <option>24 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Occupancy Alert Threshold
                    </label>

                    <select className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white">
                      <option>80%</option>
                      <option>85%</option>
                      <option>90%</option>
                      <option>95%</option>
                    </select>
                  </div>
                </div>
              </SettingsSection>

              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <ParkingCircle size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      Active Parking Network
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Your current SPOT-GO network contains{" "}
                      <span className="font-bold text-slate-700">
                        5 parking locations
                      </span>{" "}
                      with{" "}
                      <span className="font-bold text-slate-700">
                        1,248 total slots
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {[
                    "Ocean Mall",
                    "Dolmen Mall",
                    "Business District",
                    "City Center",
                    "Grand Avenue",
                  ].map((location) => (
                    <div
                      key={location}
                      className="rounded-xl border border-slate-200/70 bg-white/80 p-3"
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />

                      <p className="mt-2 text-[11px] font-bold leading-4 text-slate-700">
                        {location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* =================================================
              SECURITY
          ================================================== */}

          {activeTab === "Security" && (
            <>
              <SettingsSection
                icon={Shield}
                title="Account Security"
                description="Protect administrator access and monitor account activity."
              >
                <SettingRow
                  icon={Lock}
                  title="Two-Factor Authentication"
                  description="Require an additional verification step when signing into the admin panel."
                >
                  <div className="flex items-center gap-3">
                    <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 sm:inline-flex">
                      Enabled
                    </span>

                    <Toggle
                      enabled={settings.twoFactor}
                      onChange={() => toggle("twoFactor")}
                    />
                  </div>
                </SettingRow>

                <SettingRow
                  icon={Shield}
                  title="Login Alerts"
                  description="Get notified whenever the administrator account is accessed from a new device."
                >
                  <Toggle
                    enabled={settings.loginAlerts}
                    onChange={() =>
                      toggle("loginAlerts")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={KeyRound}
                  title="Administrator Password"
                  description="Change the password used to access the SPOT-GO admin panel."
                >
                  <button
                    onClick={() =>
                      setShowPasswordModal(true)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <KeyRound size={14} />
                    Change Password
                  </button>
                </SettingRow>
              </SettingsSection>

              <SettingsSection
                icon={Monitor}
                title="Active Sessions"
                description="Review devices that currently have access to this administrator account."
              >
                <div className="space-y-3 py-4">
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <Monitor size={18} />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-slate-800">
                          Windows • Chrome
                        </p>

                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600">
                          Current Session
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        Karachi, Pakistan • Active now
                      </p>
                    </div>

                    <div className="text-xs font-semibold text-emerald-600">
                      Online
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                      <Smartphone size={18} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">
                        Android • Chrome
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Karachi, Pakistan • 2 hours ago
                      </p>
                    </div>

                    <button className="text-xs font-bold text-red-500 hover:text-red-600">
                      Revoke
                    </button>
                  </div>
                </div>

                <button className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50">
                  Sign Out All Other Sessions
                </button>
              </SettingsSection>

              <div className="rounded-2xl border border-red-200 bg-red-50/60 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <Trash2 size={18} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-black text-red-900">
                      Danger Zone
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-red-700/70">
                      These actions can affect your administrator
                      access and system configuration. Use them
                      carefully.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <button className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50">
                        Reset Settings
                      </button>

                      <button className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-red-700">
                        Disable Admin Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* =================================================
              APPEARANCE
          ================================================== */}

          {activeTab === "Appearance" && (
            <>
              <SettingsSection
                icon={Palette}
                title="Dashboard Appearance"
                description="Customize how the SPOT-GO administrator dashboard looks and behaves."
              >
                <SettingRow
                  icon={Moon}
                  title="Dark Mode"
                  description="Use a darker interface across the administrator dashboard."
                >
                  <Toggle
                    enabled={settings.darkMode}
                    onChange={() => toggle("darkMode")}
                  />
                </SettingRow>

                <SettingRow
                  icon={Monitor}
                  title="Compact Mode"
                  description="Reduce spacing and card heights to display more information at once."
                >
                  <Toggle
                    enabled={settings.compactMode}
                    onChange={() =>
                      toggle("compactMode")
                    }
                  />
                </SettingRow>

                <SettingRow
                  icon={Zap}
                  title="Automatic Data Refresh"
                  description="Keep dashboard analytics and parking availability automatically updated."
                >
                  <Toggle
                    enabled={settings.autoRefresh}
                    onChange={() =>
                      toggle("autoRefresh")
                    }
                  />
                </SettingRow>
              </SettingsSection>

              <SettingsSection
                icon={Palette}
                title="Accent Color"
                description="Choose the primary visual accent used throughout the admin interface."
              >
                <div className="grid grid-cols-2 gap-3 py-4 sm:grid-cols-4">
                  {[
                    {
                      name: "Ocean Blue",
                      className:
                        "from-blue-600 to-cyan-500",
                    },
                    {
                      name: "Violet",
                      className:
                        "from-violet-600 to-purple-500",
                    },
                    {
                      name: "Emerald",
                      className:
                        "from-emerald-600 to-teal-500",
                    },
                    {
                      name: "Sunset",
                      className:
                        "from-orange-500 to-pink-500",
                    },
                  ].map((theme, index) => (
                    <button
                      key={theme.name}
                      className={`rounded-2xl border p-3 text-left transition ${
                        index === 0
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`h-12 rounded-xl bg-gradient-to-r ${theme.className}`}
                      />

                      <div className="mt-2 flex items-center gap-2">
                        {index === 0 && (
                          <Check
                            size={13}
                            className="text-blue-600"
                          />
                        )}

                        <span className="text-xs font-bold text-slate-700">
                          {theme.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </SettingsSection>

              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <Eye size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      Interface Preview
                    </h3>

                    <p className="text-xs text-slate-500">
                      Your current dashboard visual style
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="h-20 rounded-xl bg-slate-950 p-3">
                    <div className="h-2 w-16 rounded-full bg-white/30" />
                    <div className="mt-3 h-5 w-24 rounded bg-white/10" />
                  </div>

                  <div className="h-20 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="h-2 w-12 rounded-full bg-blue-100" />
                    <div className="mt-3 h-5 w-20 rounded bg-slate-100" />
                  </div>

                  <div className="h-20 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 p-3">
                    <div className="h-2 w-14 rounded-full bg-white/40" />
                    <div className="mt-3 h-5 w-24 rounded bg-white/20" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* =====================================================
          SAVE BAR
      ====================================================== */}

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-white shadow-2xl"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500">
              <Check size={16} />
            </div>

            <div>
              <p className="text-sm font-bold">
                Settings saved
              </p>

              <p className="text-[10px] text-slate-400">
                Your changes have been applied.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password modal */}
      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </div>
  );
}