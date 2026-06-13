import {
    FiMessageSquare,
    FiAlertCircle,
    FiClock,
    FiCheckCircle,
} from "react-icons/fi";

export default function FeedbackStats({ stats }) {
    const cards = [
        {
            label: "کل فیدبک‌ها",
            value: stats.total,
            icon: FiMessageSquare,
            color: "bg-sky-50 text-sky-600",
        },
        {
            label: "ثبت شده",
            value: stats.submitted,
            icon: FiAlertCircle,
            color: "bg-slate-100 text-slate-600",
        },
        {
            label: "درحال بررسی",
            value: stats.reviewing,
            icon: FiClock,
            color: "bg-amber-50 text-amber-600",
        },
        {
            label: "رسیدگی شده",
            value: stats.resolved,
            icon: FiCheckCircle,
            color: "bg-emerald-50 text-emerald-600",
        },
    ];

    return (
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div
                        key={index}
                        className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                        <div className="mb-3 flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
                            <div className={`rounded-2xl p-2 ${card.color}`}>
                                <Icon />
                            </div>
                            <span className="text-slate-500">{card.label}</span>
                        </div>
                        <div className="text-2xl text-slate-800">
                            {card.value}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}