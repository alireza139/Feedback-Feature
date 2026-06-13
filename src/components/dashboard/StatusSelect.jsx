import { FiChevronDown, FiAlertCircle, FiClock, FiCheckCircle } from "react-icons/fi";

const statuses = ["ثبت شده", "درحال بررسی", "رسیدگی شده"];

const statusConfig = {
  "ثبت شده": {
    icon: FiAlertCircle,
    selectClass:
      "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100",
    iconClass: "text-slate-500",
  },
  "درحال بررسی": {
    icon: FiClock,
    selectClass:
      "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
    iconClass: "text-amber-600",
  },
  "رسیدگی شده": {
    icon: FiCheckCircle,
    selectClass:
      "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100",
    iconClass: "text-emerald-600",
  },
};

export default function StatusSelect({ value, loading, onChange }) {
  const config = statusConfig[value];
  const Icon = config.icon;

  return (
    <div className="relative w-[170px] group">
      <div
        className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${config.iconClass}`}
      >
        <Icon className="text-sm" />
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className={`w-full appearance-none cursor-pointer rounded-xl border px-9 py-2 text-xs font-bold outline-none transition disabled:cursor-not-allowed disabled:opacity-50 ${config.selectClass}`}
      >
        {statuses.map((status) => (
          <option key={status} value={status} className="bg-white text-slate-800">
            {status}
          </option>
        ))}
      </select>

      <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-600" />
    </div>
  );
}