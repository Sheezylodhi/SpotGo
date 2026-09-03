"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeDollarSign,
  Car,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  Info,
  MapPin,
  Plus,
  ReceiptText,
  Settings2,
  Sparkles,
  Timer,
  Trash2,
  X,
  Zap,
} from "lucide-react";

const locations = [
  {
    name: "Ocean Mall Parking",
    area: "Clifton, Karachi",
    type: "Shopping Mall",
    color: "blue",
  },
  {
    name: "Dolmen Mall Parking",
    area: "Tariq Road, Karachi",
    type: "Shopping Mall",
    color: "violet",
  },
  {
    name: "Business District Parking",
    area: "Shahrah-e-Faisal",
    type: "Commercial",
    color: "emerald",
  },
  {
    name: "City Center Parking",
    area: "Saddar, Karachi",
    type: "City Center",
    color: "orange",
  },
  {
    name: "Grand Avenue Parking",
    area: "Main Boulevard, Karachi",
    type: "Commercial",
    color: "cyan",
  },
];

const initialFeePlans = [
  {
    id: 1,
    location: "Ocean Mall Parking",
    area: "Clifton, Karachi",
    vehicle: "Car",
    firstHour: 100,
    additionalHour: 80,
    dailyMax: 700,
    overnight: 300,
    gracePeriod: 15,
    status: "Active",
    updated: "Today, 10:42 AM",
  },
  {
    id: 2,
    location: "Ocean Mall Parking",
    area: "Clifton, Karachi",
    vehicle: "Motorcycle",
    firstHour: 50,
    additionalHour: 40,
    dailyMax: 350,
    overnight: 150,
    gracePeriod: 15,
    status: "Active",
    updated: "Today, 10:42 AM",
  },
  {
    id: 3,
    location: "Dolmen Mall Parking",
    area: "Tariq Road, Karachi",
    vehicle: "Car",
    firstHour: 120,
    additionalHour: 90,
    dailyMax: 800,
    overnight: 350,
    gracePeriod: 15,
    status: "Active",
    updated: "Yesterday, 06:20 PM",
  },
  {
    id: 4,
    location: "Dolmen Mall Parking",
    area: "Tariq Road, Karachi",
    vehicle: "Motorcycle",
    firstHour: 60,
    additionalHour: 45,
    dailyMax: 400,
    overnight: 180,
    gracePeriod: 15,
    status: "Active",
    updated: "Yesterday, 06:20 PM",
  },
  {
    id: 5,
    location: "Business District Parking",
    area: "Shahrah-e-Faisal",
    vehicle: "Car",
    firstHour: 100,
    additionalHour: 75,
    dailyMax: 650,
    overnight: 300,
    gracePeriod: 10,
    status: "Active",
    updated: "Sep 02, 2026",
  },
  {
    id: 6,
    location: "Business District Parking",
    area: "Shahrah-e-Faisal",
    vehicle: "Motorcycle",
    firstHour: 40,
    additionalHour: 30,
    dailyMax: 280,
    overnight: 120,
    gracePeriod: 10,
    status: "Active",
    updated: "Sep 02, 2026",
  },
  {
    id: 7,
    location: "City Center Parking",
    area: "Saddar, Karachi",
    vehicle: "Car",
    firstHour: 80,
    additionalHour: 60,
    dailyMax: 550,
    overnight: 250,
    gracePeriod: 15,
    status: "Active",
    updated: "Aug 30, 2026",
  },
  {
    id: 8,
    location: "City Center Parking",
    area: "Saddar, Karachi",
    vehicle: "Motorcycle",
    firstHour: 40,
    additionalHour: 30,
    dailyMax: 250,
    overnight: 100,
    gracePeriod: 15,
    status: "Active",
    updated: "Aug 30, 2026",
  },
  {
    id: 9,
    location: "Grand Avenue Parking",
    area: "Main Boulevard, Karachi",
    vehicle: "Car",
    firstHour: 110,
    additionalHour: 85,
    dailyMax: 750,
    overnight: 320,
    gracePeriod: 15,
    status: "Active",
    updated: "Aug 28, 2026",
  },
  {
    id: 10,
    location: "Grand Avenue Parking",
    area: "Main Boulevard, Karachi",
    vehicle: "Motorcycle",
    firstHour: 50,
    additionalHour: 40,
    dailyMax: 320,
    overnight: 140,
    gracePeriod: 15,
    status: "Active",
    updated: "Aug 28, 2026",
  },
];

const initialAddOns = [
  {
    id: 1,
    name: "EV Charging",
    description: "Charging fee for electric vehicles",
    price: 150,
    unit: "per session",
    status: "Active",
  },
  {
    id: 2,
    name: "Valet Parking",
    description: "Premium valet parking service",
    price: 300,
    unit: "per vehicle",
    status: "Active",
  },
  {
    id: 3,
    name: "Lost Ticket",
    description: "Replacement fee for lost parking ticket",
    price: 500,
    unit: "per ticket",
    status: "Active",
  },
  {
    id: 4,
    name: "Overstay Penalty",
    description: "Applied after daily maximum limit",
    price: 200,
    unit: "per hour",
    status: "Inactive",
  },
];

function formatRs(value) {
  return `Rs ${Number(value).toLocaleString()}`;
}

function StatCard({ icon: Icon, label, value, helper, type }) {
  const styles = {
    revenue: {
      icon: "bg-emerald-100 text-emerald-600",
      line: "bg-emerald-500",
    },
    plans: {
      icon: "bg-blue-100 text-blue-600",
      line: "bg-blue-500",
    },
    average: {
      icon: "bg-violet-100 text-violet-600",
      line: "bg-violet-500",
    },
    addons: {
      icon: "bg-orange-100 text-orange-600",
      line: "bg-orange-500",
    },
  };

  const style = styles[type];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className={`absolute left-0 top-0 h-1 w-full ${style.line}`} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">{helper}</p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </motion.div>
  );
}

function FeeModal({ fee, onClose, onSave }) {
  const [form, setForm] = useState({
    ...fee,
  });

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <BadgeDollarSign size={19} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Edit Fee Plan
                </h3>

                <p className="text-xs text-slate-500">
                  Update parking pricing
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Parking Location
              </label>

              <select
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              >
                {locations.map((location) => (
                  <option key={location.name}>{location.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Vehicle Type
              </label>

              <select
                value={form.vehicle}
                onChange={(e) => update("vehicle", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              >
                <option>Car</option>
                <option>Motorcycle</option>
                <option>SUV</option>
                <option>Van</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center gap-2">
              <Timer size={16} className="text-slate-600" />

              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Hourly Pricing
                </h4>

                <p className="text-[11px] text-slate-400">
                  Configure standard parking rates
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MoneyInput
                label="First Hour"
                value={form.firstHour}
                onChange={(value) => update("firstHour", value)}
              />

              <MoneyInput
                label="Additional Hour"
                value={form.additionalHour}
                onChange={(value) => update("additionalHour", value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MoneyInput
              label="Daily Maximum"
              value={form.dailyMax}
              onChange={(value) => update("dailyMax", value)}
            />

            <MoneyInput
              label="Overnight"
              value={form.overnight}
              onChange={(value) => update("overnight", value)}
            />

            <NumberInput
              label="Grace Period"
              value={form.gracePeriod}
              suffix="min"
              onChange={(value) => update("gracePeriod", value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Plan Status
            </label>

            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex gap-3">
              <Info size={17} className="mt-0.5 shrink-0 text-blue-600" />

              <p className="text-xs leading-5 text-blue-700">
                Changes to this pricing plan will apply to new parking
                sessions. Existing active sessions will keep their current
                pricing.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(form)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Check size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MoneyInput({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100">
        <span className="flex items-center border-r border-slate-100 bg-slate-50 px-3 text-xs font-bold text-slate-500">
          Rs
        </span>

        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="min-w-0 flex-1 px-3 py-3 text-sm font-semibold text-slate-800 outline-none"
        />
      </div>
    </div>
  );
}

function NumberInput({ label, value, suffix, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="min-w-0 flex-1 px-3 py-3 text-sm font-semibold text-slate-800 outline-none"
        />

        <span className="flex items-center border-l border-slate-100 bg-slate-50 px-3 text-xs font-semibold text-slate-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}

function AddOnModal({ addOn, onClose, onSave }) {
  const [form, setForm] = useState(
    addOn || {
      name: "",
      description: "",
      price: 0,
      unit: "per session",
      status: "Active",
    }
  );

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {addOn ? "Edit Add-on" : "Add Fee Add-on"}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Configure additional parking charges
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Add-on Name
            </label>

            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. EV Charging"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              placeholder="Describe this additional charge..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MoneyInput
              label="Price"
              value={form.price}
              onChange={(value) => update("price", value)}
            />

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Billing Unit
              </label>

              <select
                value={form.unit}
                onChange={(e) => update("unit", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              >
                <option>per session</option>
                <option>per hour</option>
                <option>per ticket</option>
                <option>per vehicle</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(form)}
              disabled={!form.name.trim()}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={16} />
              Save Add-on
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ParkingFeesPage() {
  const [feePlans, setFeePlans] = useState(initialFeePlans);
  const [addOns, setAddOns] = useState(initialAddOns);

  const [selectedLocation, setSelectedLocation] =
    useState("All Locations");

  const [vehicleFilter, setVehicleFilter] = useState("All Vehicles");

  const [statusFilter, setStatusFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [editingFee, setEditingFee] = useState(null);
  const [editingAddOn, setEditingAddOn] = useState(null);

  const [showAddOnModal, setShowAddOnModal] = useState(false);

  const activePlans = feePlans.filter(
    (plan) => plan.status === "Active"
  ).length;

  const averageFirstHour = useMemo(() => {
    if (!feePlans.length) return 0;

    return Math.round(
      feePlans.reduce((sum, plan) => sum + plan.firstHour, 0) /
        feePlans.length
    );
  }, [feePlans]);

  const filteredPlans = useMemo(() => {
    return feePlans.filter((plan) => {
      const matchesLocation =
        selectedLocation === "All Locations" ||
        plan.location === selectedLocation;

      const matchesVehicle =
        vehicleFilter === "All Vehicles" ||
        plan.vehicle === vehicleFilter;

      const matchesStatus =
        statusFilter === "All" || plan.status === statusFilter;

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        plan.location.toLowerCase().includes(query) ||
        plan.area.toLowerCase().includes(query) ||
        plan.vehicle.toLowerCase().includes(query);

      return (
        matchesLocation &&
        matchesVehicle &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    feePlans,
    selectedLocation,
    vehicleFilter,
    statusFilter,
    search,
  ]);

  const saveFee = (updatedFee) => {
    setFeePlans((current) =>
      current.map((fee) =>
        fee.id === updatedFee.id ? updatedFee : fee
      )
    );

    setEditingFee(null);
  };

  const saveAddOn = (data) => {
    if (editingAddOn) {
      setAddOns((current) =>
        current.map((item) =>
          item.id === editingAddOn.id
            ? {
                ...item,
                ...data,
              }
            : item
        )
      );
    } else {
      setAddOns((current) => [
        {
          ...data,
          id: Date.now(),
        },
        ...current,
      ]);
    }

    setEditingAddOn(null);
    setShowAddOnModal(false);
  };

  const deleteAddOn = (id) => {
    setAddOns((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 text-[11px] font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              PRICING ACTIVE
            </span>

            <span className="text-xs text-slate-400">
              Rates synced across parking locations
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Parking Fees
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage parking rates, hourly pricing, daily limits and
            additional charges.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingAddOn(null);
            setShowAddOnModal(true);
          }}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
        >
          <Plus size={17} />
          Add Fee Add-on
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          icon={ReceiptText}
          label="Today's Revenue"
          value="Rs 48,620"
          helper="+11.8% from yesterday"
          type="revenue"
        />

        <StatCard
          icon={Settings2}
          label="Active Fee Plans"
          value={activePlans}
          helper="Across 5 locations"
          type="plans"
        />

        <StatCard
          icon={BadgeDollarSign}
          label="Average First Hour"
          value={formatRs(averageFirstHour)}
          helper="Standard vehicle rates"
          type="average"
        />

        <StatCard
          icon={Zap}
          label="Active Add-ons"
          value={addOns.filter((item) => item.status === "Active").length}
          helper={`${addOns.length} total configured`}
          type="addons"
        />
      </motion.div>

      {/* Location pricing cards */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <MapPin size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Location Pricing
              </h2>

              <p className="text-xs text-slate-400">
                Select a location to view its pricing structure
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-400">
            5 parking facilities
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          <button
            onClick={() => setSelectedLocation("All Locations")}
            className={`rounded-xl border p-4 text-left transition ${
              selectedLocation === "All Locations"
                ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <Settings2 size={16} />
              </div>

              <span
                className={`text-[10px] font-bold ${
                  selectedLocation === "All Locations"
                    ? "text-slate-300"
                    : "text-slate-400"
                }`}
              >
                GLOBAL
              </span>
            </div>

            <p className="mt-4 text-sm font-bold">All Locations</p>

            <p
              className={`mt-1 text-[11px] ${
                selectedLocation === "All Locations"
                  ? "text-slate-300"
                  : "text-slate-400"
              }`}
            >
              View all fee plans
            </p>
          </button>

          {locations.map((location) => {
            const active = selectedLocation === location.name;

            const planCount = feePlans.filter(
              (plan) => plan.location === location.name
            ).length;

            return (
              <button
                key={location.name}
                onClick={() => setSelectedLocation(location.name)}
                className={`rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <MapPin size={15} />
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                      active
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    ACTIVE
                  </span>
                </div>

                <p
                  className={`mt-4 text-sm font-bold ${
                    active ? "text-white" : "text-slate-900"
                  }`}
                >
                  {location.name}
                </p>

                <p
                  className={`mt-1 truncate text-[10px] ${
                    active ? "text-slate-300" : "text-slate-400"
                  }`}
                >
                  {location.area}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`text-[10px] ${
                      active ? "text-slate-300" : "text-slate-400"
                    }`}
                  >
                    Fee plans
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      active ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {planCount}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2">
            <Settings2 size={16} className="text-slate-400" />

            <span className="text-sm font-bold text-slate-800">
              Fee Plans
            </span>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
              {filteredPlans.length}
            </span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="h-10 appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-xs font-semibold text-slate-600 outline-none focus:border-slate-400"
              >
                <option>All Vehicles</option>
                <option>Car</option>
                <option>Motorcycle</option>
                <option>SUV</option>
                <option>Van</option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-xs font-semibold text-slate-600 outline-none focus:border-slate-400"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative sm:w-64">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search location..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fee table */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Location
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Vehicle
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  First Hour
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Additional Hour
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Daily Max
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Overnight
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Grace
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {filteredPlans.map((plan) => (
                  <motion.tr
                    key={plan.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {plan.location}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {plan.area}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                        {plan.vehicle === "Motorcycle" ? (
                          <Zap size={12} />
                        ) : (
                          <Car size={12} />
                        )}

                        {plan.vehicle}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-slate-900">
                        {formatRs(plan.firstHour)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-slate-700">
                        {formatRs(plan.additionalHour)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-slate-700">
                        {formatRs(plan.dailyMax)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-slate-700">
                        {formatRs(plan.overnight)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                        <Clock3 size={11} />
                        {plan.gracePeriod} min
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          plan.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            plan.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />

                        {plan.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setEditingFee(plan)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
                        title="Edit fee plan"
                      >
                        <Edit3 size={15} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredPlans.length === 0 && (
            <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <BadgeDollarSign size={21} />
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-800">
                No fee plans found
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your filters.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3 text-xs text-slate-400 sm:flex-row sm:items-center">
          <span>
            Showing {filteredPlans.length} of {feePlans.length} fee plans
          </span>

          <span>All prices are displayed in Pakistani Rupees</span>
        </div>
      </motion.section>

      {/* Add-ons */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Sparkles size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Additional Charges
              </h2>

              <p className="text-xs text-slate-400">
                Optional services and penalty fees
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingAddOn(null);
              setShowAddOnModal(true);
            }}
            className="flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Plus size={14} />
            Add Charge
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2 xl:grid-cols-4">
          {addOns.map((addOn) => (
            <motion.div
              key={addOn.id}
              whileHover={{ y: -2 }}
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition hover:border-slate-300 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                  {addOn.name === "EV Charging" ? (
                    <Zap size={16} />
                  ) : addOn.name === "Valet Parking" ? (
                    <Car size={16} />
                  ) : (
                    <ReceiptText size={16} />
                  )}
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                    addOn.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {addOn.status}
                </span>
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-900">
                {addOn.name}
              </h3>

              <p className="mt-1 min-h-[34px] text-[11px] leading-4 text-slate-400">
                {addOn.description}
              </p>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    {formatRs(addOn.price)}
                  </p>

                  <p className="text-[10px] text-slate-400">
                    {addOn.unit}
                  </p>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingAddOn(addOn);
                      setShowAddOnModal(true);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                  >
                    <Edit3 size={14} />
                  </button>

                  <button
                    onClick={() => deleteAddOn(addOn.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing rules */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-400">
                PRICING RULE
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Standard Parking Calculation
              </h3>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400">
                Customers are charged according to the first-hour rate,
                followed by the additional hourly rate until the daily
                maximum is reached.
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
              <BadgeDollarSign size={19} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                First Hour
              </p>

              <p className="mt-2 text-lg font-bold">Base Rate</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Every Extra Hour
              </p>

              <p className="mt-2 text-lg font-bold">Hourly Rate</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Maximum
              </p>

              <p className="mt-2 text-lg font-bold">Daily Cap</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <Info size={18} />
          </div>

          <h3 className="mt-4 text-sm font-bold text-blue-900">
            Grace Period
          </h3>

          <p className="mt-2 text-xs leading-5 text-blue-700">
            Customers can exit within the configured grace period without
            an additional parking charge.
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5">
            <Clock3 size={14} className="text-blue-500" />

            <span className="text-xs font-bold text-slate-700">
              10–15 minutes
            </span>
          </div>
        </div>
      </motion.section>

      {/* Modals */}
      <AnimatePresence>
        {editingFee && (
          <FeeModal
            key="fee-modal"
            fee={editingFee}
            onClose={() => setEditingFee(null)}
            onSave={saveFee}
          />
        )}

        {showAddOnModal && (
          <AddOnModal
            key="addon-modal"
            addOn={editingAddOn}
            onClose={() => {
              setShowAddOnModal(false);
              setEditingAddOn(null);
            }}
            onSave={saveAddOn}
          />
        )}
      </AnimatePresence>
    </div>
  );
}