import { FiChevronDown } from "react-icons/fi";

const statuses = [
  { value: "SUBMITTED", label: "ثبت شده", color: "bg-slate-100 text-slate-700 border-slate-200" },
  { value: "REVIEWING", label: "در حال بررسی", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "RESOLVED", label: "رسیدگی شده", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

export default function StatusSelect({ value, loading, onChange }) {
  const currentStatus = statuses.find(s => s.value === value) || statuses[0];

  return (
    <div className="relative w-[150px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className={`w-full appearance-none cursor-pointer rounded-lg border px-4 py-2 text-xs font-bold outline-none transition ${currentStatus.color} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value} className="bg-white text-gray-800">
            {s.label}
          </option>
        ))}
      </select>

      <FiChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
    </div>
  );
}