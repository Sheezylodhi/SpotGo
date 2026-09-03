"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Ban,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  Eye,
  Filter,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  UserCheck,
  UserPlus,
  Users as UsersIcon,
  UserX,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const initialUsers = [
  {
    id: "USR-1001",
    name: "Ahmed Khan",
    email: "ahmed.khan@email.com",
    phone: "+92 300 821 4521",
    avatar: "AK",
    role: "Customer",
    status: "Active",
    verified: true,
    joined: "Jan 12, 2026",
    lastActive: "2 min ago",
    bookings: 42,
    completed: 38,
    cancelled: 2,
    spent: 18450,
    vehicle: "Toyota Corolla",
    plate: "ABC-782",
    location: "Clifton, Karachi",
    rating: 4.9,
    wallet: 1250,
    membership: "Premium",
  },
  {
    id: "USR-1002",
    name: "Usman Ali",
    email: "usman.ali@email.com",
    phone: "+92 321 774 1902",
    avatar: "UA",
    role: "Customer",
    status: "Active",
    verified: true,
    joined: "Feb 03, 2026",
    lastActive: "8 min ago",
    bookings: 35,
    completed: 31,
    cancelled: 1,
    spent: 15320,
    vehicle: "Honda Civic",
    plate: "KHI-441",
    location: "PECHS, Karachi",
    rating: 4.8,
    wallet: 860,
    membership: "Premium",
  },
  {
    id: "USR-1003",
    name: "Hamza Shah",
    email: "hamza.shah@email.com",
    phone: "+92 333 118 6022",
    avatar: "HS",
    role: "Customer",
    status: "Active",
    verified: true,
    joined: "Feb 18, 2026",
    lastActive: "14 min ago",
    bookings: 29,
    completed: 26,
    cancelled: 2,
    spent: 12890,
    vehicle: "KIA Sportage",
    plate: "LEA-928",
    location: "Shahrah-e-Faisal",
    rating: 4.7,
    wallet: 420,
    membership: "Standard",
  },
  {
    id: "USR-1004",
    name: "Bilal Ahmed",
    email: "bilal.ahmed@email.com",
    phone: "+92 301 668 9241",
    avatar: "BA",
    role: "Customer",
    status: "Active",
    verified: true,
    joined: "Mar 01, 2026",
    lastActive: "27 min ago",
    bookings: 21,
    completed: 18,
    cancelled: 1,
    spent: 9840,
    vehicle: "Honda City",
    plate: "BIL-210",
    location: "Saddar, Karachi",
    rating: 4.6,
    wallet: 730,
    membership: "Standard",
  },
  {
    id: "USR-1005",
    name: "Saad Malik",
    email: "saad.malik@email.com",
    phone: "+92 322 915 7730",
    avatar: "SM",
    role: "Customer",
    status: "Active",
    verified: true,
    joined: "Mar 15, 2026",
    lastActive: "41 min ago",
    bookings: 18,
    completed: 17,
    cancelled: 0,
    spent: 8120,
    vehicle: "Toyota Yaris",
    plate: "SAD-510",
    location: "Main Boulevard",
    rating: 4.9,
    wallet: 1120,
    membership: "Premium",
  },
  {
    id: "USR-1006",
    name: "Ali Raza",
    email: "ali.raza@email.com",
    phone: "+92 300 552 8137",
    avatar: "AR",
    role: "Customer",
    status: "Active",
    verified: true,
    joined: "Apr 02, 2026",
    lastActive: "1 hour ago",
    bookings: 16,
    completed: 14,
    cancelled: 1,
    spent: 7210,
    vehicle: "Suzuki Swift",
    plate: "ALR-804",
    location: "Clifton, Karachi",
    rating: 4.5,
    wallet: 290,
    membership: "Standard",
  },
  {
    id: "USR-1007",
    name: "Fahad Iqbal",
    email: "fahad.iqbal@email.com",
    phone: "+92 334 401 9282",
    avatar: "FI",
    role: "Customer",
    status: "Inactive",
    verified: true,
    joined: "Apr 21, 2026",
    lastActive: "8 days ago",
    bookings: 12,
    completed: 9,
    cancelled: 2,
    spent: 5980,
    vehicle: "Hyundai Tucson",
    plate: "FAH-119",
    location: "Tariq Road",
    rating: 4.4,
    wallet: 0,
    membership: "Standard",
  },
  {
    id: "USR-1008",
    name: "Zain Ahmed",
    email: "zain.ahmed@email.com",
    phone: "+92 301 441 8821",
    avatar: "ZA",
    role: "Customer",
    status: "Active",
    verified: false,
    joined: "May 06, 2026",
    lastActive: "2 hours ago",
    bookings: 9,
    completed: 8,
    cancelled: 0,
    spent: 4210,
    vehicle: "Toyota Corolla",
    plate: "ZAI-330",
    location: "PECHS, Karachi",
    rating: 4.6,
    wallet: 540,
    membership: "Standard",
  },
  {
    id: "USR-1009",
    name: "Owais Hassan",
    email: "owais.hassan@email.com",
    phone: "+92 323 771 4490",
    avatar: "OH",
    role: "Customer",
    status: "Suspended",
    verified: true,
    joined: "May 19, 2026",
    lastActive: "3 days ago",
    bookings: 14,
    completed: 10,
    cancelled: 3,
    spent: 6340,
    vehicle: "Honda Civic",
    plate: "OWA-710",
    location: "Saddar, Karachi",
    rating: 3.8,
    wallet: 120,
    membership: "Standard",
  },
  {
    id: "USR-1010",
    name: "Adeel Hussain",
    email: "adeel.h@email.com",
    phone: "+92 311 555 7284",
    avatar: "AH",
    role: "Customer",
    status: "Active",
    verified: true,
    joined: "Jun 02, 2026",
    lastActive: "3 hours ago",
    bookings: 11,
    completed: 10,
    cancelled: 0,
    spent: 5160,
    vehicle: "KIA Sportage",
    plate: "ADE-665",
    location: "Main Boulevard",
    rating: 4.8,
    wallet: 910,
    membership: "Premium",
  },
  {
    id: "USR-1011",
    name: "Muneeb Khan",
    email: "muneeb.khan@email.com",
    phone: "+92 320 621 8832",
    avatar: "MK",
    role: "Customer",
    status: "Active",
    verified: true,
    joined: "Jun 18, 2026",
    lastActive: "5 hours ago",
    bookings: 8,
    completed: 7,
    cancelled: 0,
    spent: 3680,
    vehicle: "Suzuki Swift",
    plate: "MUN-280",
    location: "Clifton, Karachi",
    rating: 4.7,
    wallet: 350,
    membership: "Standard",
  },
  {
    id: "USR-1012",
    name: "Hassan Tariq",
    email: "hassan.t@email.com",
    phone: "+92 315 492 8210",
    avatar: "HT",
    role: "Customer",
    status: "Active",
    verified: false,
    joined: "Jul 04, 2026",
    lastActive: "6 hours ago",
    bookings: 5,
    completed: 4,
    cancelled: 0,
    spent: 2150,
    vehicle: "Toyota Vitz",
    plate: "HAS-812",
    location: "Tariq Road",
    rating: 4.3,
    wallet: 180,
    membership: "Standard",
  },
];

const roleOptions = ["Customer", "Manager", "Operator"];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Inactive: "bg-slate-100 text-slate-600 border-slate-200",
  Suspended: "bg-rose-50 text-rose-700 border-rose-100",
};

function money(value) {
  return new Intl.NumberFormat("en-PK").format(value);
}

function StatCard({ icon: Icon, label, value, helper, trend, accent }) {
  const styles = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      gradient: "from-blue-500/10",
    },
    violet: {
      bg: "bg-violet-50",
      text: "text-violet-600",
      gradient: "from-violet-500/10",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      gradient: "from-emerald-500/10",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      gradient: "from-orange-500/10",
    },
  };

  const style = styles[accent];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,.05)]"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${style.gradient} to-transparent`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-[27px] font-black tracking-tight text-slate-900">
            {value}
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            {trend && (
              <span className="flex items-center gap-0.5 text-[10px] font-black text-emerald-600">
                <ArrowUpRight size={11} />
                {trend}
              </span>
            )}

            <span className="text-[10px] font-medium text-slate-400">
              {helper}
            </span>
          </div>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${style.bg} ${style.text}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-black uppercase ${statusStyles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Active"
            ? "bg-emerald-500"
            : status === "Suspended"
            ? "bg-rose-500"
            : "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
}

function Modal({ children, onClose, wide = false }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          className={`max-h-[92vh] w-full overflow-y-auto rounded-[30px] border border-white/70 bg-white shadow-[0_30px_100px_rgba(15,23,42,.25)] ${
            wide ? "max-w-4xl" : "max-w-2xl"
          }`}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[.12em] text-slate-400">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
    </label>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-xs font-bold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function UserDetailsModal({ user, onClose, onEdit, onToggleStatus }) {
  return (
    <Modal onClose={onClose} wide>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0b1220] via-slate-900 to-blue-950 p-6 text-white sm:p-7">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black shadow-xl shadow-blue-500/20">
              {user.avatar}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={user.status} />

                {user.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-400/10 px-2.5 py-1 text-[9px] font-black uppercase text-blue-200">
                    <ShieldCheck size={10} />
                    Verified
                  </span>
                )}
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-tight">
                {user.name}
              </h2>

              <p className="mt-1 text-[11px] text-slate-400">
                {user.id} · {user.role}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/15"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-blue-600">
            Account Information
          </p>

          <div className="mt-4 space-y-3">
            <InfoItem
              icon={Mail}
              label="Email Address"
              value={user.email}
            />

            <InfoItem
              icon={Phone}
              label="Phone Number"
              value={user.phone}
            />

            <InfoItem
              icon={CalendarDays}
              label="Joined"
              value={user.joined}
            />

            <InfoItem
              icon={Activity}
              label="Last Active"
              value={user.lastActive}
            />

            <InfoItem
              icon={MapPin}
              label="Area"
              value={user.location}
            />

            <InfoItem
              icon={Car}
              label="Vehicle"
              value={`${user.vehicle} · ${user.plate}`}
            />
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-violet-600">
            User Performance
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Performance
              icon={CalendarDays}
              label="Total Bookings"
              value={user.bookings}
            />

            <Performance
              icon={Check}
              label="Completed"
              value={user.completed}
            />

            <Performance
              icon={Wallet}
              label="Total Spent"
              value={`Rs ${money(user.spent)}`}
            />

            <Performance
              icon={Zap}
              label="Wallet"
              value={`Rs ${money(user.wallet)}`}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Customer Rating
              </span>

              <span className="flex items-center gap-1 text-sm font-black text-slate-800">
                <Star
                  size={14}
                  fill="currentColor"
                  className="text-amber-400"
                />
                {user.rating}
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
                style={{ width: `${(user.rating / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-wider text-blue-500">
                Membership
              </p>

              <p className="mt-1 text-sm font-black text-slate-900">
                {user.membership}
              </p>
            </div>

            <div className="rounded-xl bg-white px-3 py-2 text-[9px] font-black uppercase text-blue-600 shadow-sm">
              SPOT-GO
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <button
          onClick={() => onToggleStatus(user)}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-black ${
            user.status === "Suspended"
              ? "border-emerald-100 text-emerald-600 hover:bg-emerald-50"
              : "border-rose-100 text-rose-600 hover:bg-rose-50"
          }`}
        >
          {user.status === "Suspended" ? (
            <>
              <UserCheck size={14} />
              Restore Account
            </>
          ) : (
            <>
              <Ban size={14} />
              Suspend Account
            </>
          )}
        </button>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600"
          >
            Close
          </button>

          <button
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-blue-500/20"
          >
            <Edit3 size={14} />
            Edit User
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Performance({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={15} />
      </div>

      <p className="mt-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-lg font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

function EditUserModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    membership: user.membership,
    vehicle: user.vehicle,
    plate: user.plate,
    location: user.location,
  });

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <Modal onClose={onClose}>
      <div className="border-b border-slate-100 p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-blue-600">
              <Edit3 size={10} />
              User Editor
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Edit User
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Update account and vehicle information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Full Name"
            value={form.name}
            onChange={(v) => update("name", v)}
          />

          <Field
            label="Phone"
            value={form.phone}
            onChange={(v) => update("phone", v)}
          />

          <Field
            label="Email"
            value={form.email}
            onChange={(v) => update("email", v)}
          />

          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-400">
              Role
            </span>

            <select
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none"
            >
              {roleOptions.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-400">
              Membership
            </span>

            <select
              value={form.membership}
              onChange={(e) => update("membership", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none"
            >
              <option>Standard</option>
              <option>Premium</option>
              <option>Corporate</option>
            </select>
          </label>

          <Field
            label="Area"
            value={form.location}
            onChange={(v) => update("location", v)}
          />

          <Field
            label="Vehicle"
            value={form.vehicle}
            onChange={(v) => update("vehicle", v)}
          />

          <Field
            label="Vehicle Plate"
            value={form.plate}
            onChange={(v) => update("plate", v)}
          />
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-center gap-2 text-blue-700">
            <ShieldCheck size={16} />
            <p className="text-xs font-black">Account Verification</p>
          </div>

          <p className="mt-1 text-[10px] leading-5 text-blue-600/70">
            Verification status is managed separately from profile details.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/20"
          >
            <Check size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}

function AddUserModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Customer",
    membership: "Standard",
    vehicle: "",
    plate: "",
    location: "",
  });

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <Modal onClose={onClose}>
      <div className="border-b border-slate-100 p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-600">
              <UserPlus size={10} />
              New Account
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Add New User
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Create a new SPOT-GO user account.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Full Name"
            placeholder="e.g. Muhammad Ali"
            value={form.name}
            onChange={(v) => update("name", v)}
          />

          <Field
            label="Phone"
            placeholder="+92 300 0000000"
            value={form.phone}
            onChange={(v) => update("phone", v)}
          />

          <Field
            label="Email"
            placeholder="user@email.com"
            value={form.email}
            onChange={(v) => update("email", v)}
          />

          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-400">
              Role
            </span>

            <select
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none"
            >
              {roleOptions.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-400">
              Membership
            </span>

            <select
              value={form.membership}
              onChange={(e) => update("membership", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold outline-none"
            >
              <option>Standard</option>
              <option>Premium</option>
              <option>Corporate</option>
            </select>
          </label>

          <Field
            label="Area"
            placeholder="Clifton, Karachi"
            value={form.location}
            onChange={(v) => update("location", v)}
          />

          <Field
            label="Vehicle"
            placeholder="Toyota Corolla"
            value={form.vehicle}
            onChange={(v) => update("vehicle", v)}
          />

          <Field
            label="Vehicle Plate"
            placeholder="ABC-123"
            value={form.plate}
            onChange={(v) => update("plate", v)}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600"
          >
            Cancel
          </button>

          <button
            disabled={!form.name || !form.email}
            onClick={() => onSave(form)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <UserPlus size={14} />
            Create User
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [membership, setMembership] = useState("All");
  const [role, setRole] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [view, setView] = useState("table");

  const activeUsers = users.filter((user) => user.status === "Active").length;

  const verifiedUsers = users.filter((user) => user.verified).length;

  const premiumUsers = users.filter(
    (user) => user.membership === "Premium"
  ).length;

  const totalSpent = users.reduce((sum, user) => sum + user.spent, 0);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query) ||
        user.plate.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || user.status === status;

      const matchesMembership =
        membership === "All" || user.membership === membership;

      const matchesRole = role === "All" || user.role === role;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMembership &&
        matchesRole
      );
    });
  }, [users, search, status, membership, role]);

  const toggleStatus = (user) => {
    setUsers((current) =>
      current.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status:
                item.status === "Suspended"
                  ? "Active"
                  : "Suspended",
            }
          : item
      )
    );

    setSelectedUser(null);
  };

  const saveUser = (data) => {
    setUsers((current) =>
      current.map((item) =>
        item.id === editUser.id
          ? {
              ...item,
              ...data,
            }
          : item
      )
    );

    setEditUser(null);
    setSelectedUser(null);
  };

  const addUser = (data) => {
    const id = `USR-${1000 + users.length + 1}`;

    const initials = data.name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newUser = {
      ...data,
      id,
      avatar: initials || "NU",
      status: "Active",
      verified: false,
      joined: "Sep 03, 2026",
      lastActive: "Just now",
      bookings: 0,
      completed: 0,
      cancelled: 0,
      spent: 0,
      rating: 5,
      wallet: 0,
    };

    setUsers((current) => [newUser, ...current]);
    setShowAdd(false);
  };

  const deleteUser = (user) => {
    setUsers((current) =>
      current.filter((item) => item.id !== user.id)
    );

    setSelectedUser(null);
  };

  return (
    <div className="mx-auto max-w-[1700px] space-y-6 pb-10">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[30px] bg-[#0b1220] shadow-[0_20px_70px_rgba(15,23,42,.14)]"
      >
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-150px] left-[35%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-9">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-blue-200">
              <UsersIcon size={12} />
              User Network Live
            </div>

            <h1 className="text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">
              User Management
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                Customer Intelligence
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Manage SPOT-GO customers, monitor account activity,
              memberships, bookings and user engagement from one
              centralized workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowAdd(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                <UserPlus size={15} />
                Add New User
              </button>

              <button
                onClick={() => setView("cards")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <UsersIcon size={15} />
                Customer Overview
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-blue-400/20" />
              <div className="absolute inset-5 rounded-full border border-violet-400/20" />
              <div className="absolute inset-10 flex items-center justify-center rounded-full bg-blue-500/10 shadow-[0_0_70px_rgba(59,130,246,.2)]">
                <UsersIcon size={45} className="text-cyan-300" />
              </div>

              <div className="absolute right-0 top-5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-black text-white backdrop-blur">
                {users.length} USERS
              </div>

              <div className="absolute bottom-2 left-0 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">
                <p className="text-[8px] uppercase tracking-wider text-slate-500">
                  Active Accounts
                </p>

                <p className="text-sm font-black text-white">
                  {activeUsers}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={UsersIcon}
          label="Total Users"
          value={users.length}
          trend="+12.8%"
          helper="this month"
          accent="blue"
        />

        <StatCard
          icon={UserCheck}
          label="Active Users"
          value={activeUsers}
          trend="+8.4%"
          helper="currently active"
          accent="emerald"
        />

        <StatCard
          icon={ShieldCheck}
          label="Verified Users"
          value={verifiedUsers}
          trend="+5.2%"
          helper="identity verified"
          accent="violet"
        />

        <StatCard
          icon={Wallet}
          label="Customer Spending"
          value={`Rs ${(totalSpent / 1000000).toFixed(2)}M`}
          trend="+14.6%"
          helper="total recorded"
          accent="orange"
        />
      </div>

      {/* USER INSIGHT STRIP */}
      <div className="grid gap-4 md:grid-cols-3">
        <Insight
          icon={Zap}
          title="Premium Members"
          value={premiumUsers}
          subtitle={`${Math.round(
            (premiumUsers / users.length) * 100
          )}% of customer base`}
          progress={(premiumUsers / users.length) * 100}
          type="blue"
        />

        <Insight
          icon={CalendarDays}
          title="Booking Engagement"
          value={Math.round(
            users.reduce((sum, user) => sum + user.bookings, 0) /
              users.length
          )}
          subtitle="average bookings / user"
          progress={72}
          type="violet"
        />

        <Insight
          icon={Activity}
          title="User Retention"
          value="86%"
          subtitle="30-day returning users"
          progress={86}
          type="emerald"
        />
      </div>

      {/* MANAGEMENT */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.16em] text-blue-600">
              Customer Directory
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              All Users
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Search and manage registered SPOT-GO accounts.
            </p>
          </div>

          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setView("table")}
              className={`rounded-lg px-3 py-2 text-[10px] font-black ${
                view === "table"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-400"
              }`}
            >
              Table
            </button>

            <button
              onClick={() => setView("cards")}
              className={`rounded-lg px-3 py-2 text-[10px] font-black ${
                view === "cards"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-400"
              }`}
            >
              Cards
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-6 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone, ID or vehicle plate..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <FilterSelect
            value={status}
            onChange={setStatus}
            options={[
              "All",
              "Active",
              "Inactive",
              "Suspended",
            ]}
          />

          <FilterSelect
            value={membership}
            onChange={setMembership}
            options={[
              "All",
              "Standard",
              "Premium",
              "Corporate",
            ]}
          />

          <FilterSelect
            value={role}
            onChange={setRole}
            options={[
              "All",
              "Customer",
              "Manager",
              "Operator",
            ]}
          />
        </div>

        {/* TABLE */}
        {view === "table" && (
          <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      User
                    </th>

                    <th className="px-4 py-4 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Contact
                    </th>

                    <th className="px-4 py-4 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Membership
                    </th>

                    <th className="px-4 py-4 text-center text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Bookings
                    </th>

                    <th className="px-4 py-4 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Spending
                    </th>

                    <th className="px-4 py-4 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <motion.tr
                      layout
                      key={user.id}
                      className="group transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-black text-white">
                            {user.avatar}

                            {user.status === "Active" && (
                              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="truncate text-xs font-black text-slate-800">
                                {user.name}
                              </p>

                              {user.verified && (
                                <ShieldCheck
                                  size={12}
                                  className="shrink-0 text-blue-500"
                                />
                              )}
                            </div>

                            <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                              {user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-[10px] font-bold text-slate-700">
                          {user.email}
                        </p>

                        <p className="mt-1 text-[9px] font-medium text-slate-400">
                          {user.phone}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-lg px-2.5 py-1 text-[9px] font-black ${
                            user.membership === "Premium"
                              ? "bg-violet-50 text-violet-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {user.membership}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <p className="text-xs font-black text-slate-800">
                          {user.bookings}
                        </p>

                        <p className="mt-0.5 text-[8px] font-bold text-emerald-500">
                          {user.completed} completed
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-black text-slate-800">
                          Rs {money(user.spent)}
                        </p>

                        <p className="mt-0.5 text-[8px] font-medium text-slate-400">
                          Wallet Rs {money(user.wallet)}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge status={user.status} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                            title="View"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            onClick={() => setEditUser(user)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                            title="Edit"
                          >
                            <Edit3 size={14} />
                          </button>

                          <button
                            onClick={() => deleteUser(user)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <EmptyState />
            )}
          </div>
        )}

        {/* CARDS */}
        {view === "cards" && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredUsers.map((user, index) => (
              <motion.div
                layout
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white transition hover:border-blue-200 hover:shadow-[0_15px_45px_rgba(15,23,42,.07)]"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-5 text-white">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-black shadow-lg">
                        {user.avatar}

                        {user.status === "Active" && (
                          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-800 bg-emerald-400" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="text-sm font-black">
                            {user.name}
                          </h3>

                          {user.verified && (
                            <ShieldCheck
                              size={12}
                              className="text-cyan-300"
                            />
                          )}
                        </div>

                        <p className="mt-1 text-[9px] text-slate-400">
                          {user.id}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={user.status} />
                  </div>

                  <div className="relative mt-5 grid grid-cols-3 gap-2">
                    <MiniStat
                      label="Bookings"
                      value={user.bookings}
                    />

                    <MiniStat
                      label="Spent"
                      value={`Rs ${(
                        user.spent / 1000
                      ).toFixed(1)}K`}
                    />

                    <MiniStat
                      label="Rating"
                      value={user.rating}
                    />
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                    <Mail size={13} className="text-slate-400" />
                    {user.email}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                    <Car size={13} className="text-slate-400" />
                    {user.vehicle} · {user.plate}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                    <MapPin size={13} className="text-slate-400" />
                    {user.location}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-[8px] font-black ${
                        user.membership === "Premium"
                          ? "bg-violet-50 text-violet-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {user.membership}
                    </span>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={13} />
                      </button>

                      <button
                        onClick={() => setEditUser(user)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        onClick={() => deleteUser(user)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {view === "cards" && filteredUsers.length === 0 && (
          <EmptyState />
        )}
      </section>

      {/* BOTTOM PANELS */}
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.15em] text-blue-600">
                Engagement
              </p>

              <h3 className="mt-1 text-xl font-black text-slate-900">
                Most Active Users
              </h3>
            </div>

            <Activity size={18} className="text-blue-500" />
          </div>

          <div className="mt-5 space-y-4">
            {[...users]
              .sort((a, b) => b.bookings - a.bookings)
              .slice(0, 5)
              .map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3"
                >
                  <span className="w-4 text-[10px] font-black text-slate-300">
                    0{index + 1}
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[9px] font-black text-blue-600">
                    {user.avatar}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-black text-slate-700">
                      {user.name}
                    </p>

                    <p className="text-[9px] text-slate-400">
                      {user.bookings} total bookings
                    </p>
                  </div>

                  <span className="text-[10px] font-black text-blue-600">
                    {user.bookings}
                  </span>
                </div>
              ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.15em] text-violet-600">
                Membership
              </p>

              <h3 className="mt-1 text-xl font-black text-slate-900">
                Customer Mix
              </h3>
            </div>

            <Star
              size={18}
              className="text-violet-500"
            />
          </div>

          <div className="mt-6 space-y-5">
            <MembershipBar
              label="Premium"
              count={
                users.filter(
                  (user) => user.membership === "Premium"
                ).length
              }
              total={users.length}
              type="violet"
            />

            <MembershipBar
              label="Standard"
              count={
                users.filter(
                  (user) => user.membership === "Standard"
                ).length
              }
              total={users.length}
              type="blue"
            />

            <MembershipBar
              label="Corporate"
              count={
                users.filter(
                  (user) => user.membership === "Corporate"
                ).length
              }
              total={users.length}
              type="emerald"
            />
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white shadow-[0_15px_45px_rgba(15,23,42,.12)]">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-500/15 blur-2xl" />

          <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[.15em] text-cyan-300">
              Account Health
            </p>

            <h3 className="mt-1 text-xl font-black">
              User Network Status
            </h3>

            <div className="mt-6 space-y-4">
              <HealthRow
                label="Active Accounts"
                value={`${activeUsers}/${users.length}`}
                percentage={(activeUsers / users.length) * 100}
              />

              <HealthRow
                label="Verified Accounts"
                value={`${verifiedUsers}/${users.length}`}
                percentage={(verifiedUsers / users.length) * 100}
              />

              <HealthRow
                label="Healthy Accounts"
                value={`${users.filter(
                  (u) => u.status !== "Suspended"
                ).length}/${users.length}`}
                percentage={
                  (users.filter(
                    (u) => u.status !== "Suspended"
                  ).length /
                    users.length) *
                  100
                }
              />
            </div>

            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              User services operational
            </div>
          </div>
        </section>
      </div>

      {/* DETAILS */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onEdit={() => {
            setEditUser(selectedUser);
            setSelectedUser(null);
          }}
          onToggleStatus={toggleStatus}
        />
      )}

      {/* EDIT */}
      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={saveUser}
        />
      )}

      {/* ADD */}
      {showAdd && (
        <AddUserModal
          onClose={() => setShowAdd(false)}
          onSave={addUser}
        />
      )}
    </div>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-9 text-xs font-bold text-slate-600 outline-none lg:w-[155px]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function Insight({
  icon: Icon,
  title,
  value,
  subtitle,
  progress,
  type,
}) {
  const styles = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      bar: "from-blue-500 to-cyan-400",
    },
    violet: {
      icon: "bg-violet-50 text-violet-600",
      bar: "from-violet-500 to-purple-400",
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      bar: "from-emerald-500 to-cyan-400",
    },
  };

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[.14em] text-slate-400">
            {title}
          </p>

          <p className="mt-1 text-2xl font-black text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[10px] font-medium text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[type].icon}`}
        >
          <Icon size={17} />
        </div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full rounded-full bg-gradient-to-r ${styles[type].bar}`}
        />
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xs font-black text-white">
        {value}
      </p>
    </div>
  );
}

function MembershipBar({ label, count, total, type }) {
  const gradients = {
    violet: "from-violet-500 to-purple-400",
    blue: "from-blue-500 to-cyan-400",
    emerald: "from-emerald-500 to-cyan-400",
  };

  const percentage = total
    ? Math.round((count / total) * 100)
    : 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black text-slate-700">
          {label}
        </span>

        <span className="text-[10px] font-bold text-slate-400">
          {count} · {percentage}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradients[type]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function HealthRow({ label, value, percentage }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-300">
          {label}
        </span>

        <span className="text-[10px] font-black text-white">
          {value}
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border-t border-slate-100 p-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Search size={20} />
      </div>

      <p className="mt-4 text-sm font-black text-slate-700">
        No users found
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Try changing your search or filters.
      </p>
    </div>
  );
}