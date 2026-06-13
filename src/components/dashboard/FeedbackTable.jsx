import { FiInbox, FiTrash2, FiCalendar } from "react-icons/fi";
import StatusSelect from "./StatusSelect";

const formatDate = (date) => new Date(date).toLocaleDateString("fa-IR");

export default function FeedbackTable({
    feedbacks,
    updatingId,
    deletingId,
    onStatusChange,
    onDelete,
}) {
    if (feedbacks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-500">
                    <FiInbox className="text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">
                    فیدبکی ثبت نشده
                </h3>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-right text-xs lg:text-sm">
                <thead className="bg-slate-50 text-sm text-slate-500">
                    <tr>
                        <th className="px-6 py-4 font-bold">عنوان</th>
                        <th className="px-6 py-4 font-bold">پیام</th>
                        <th className="px-6 py-4 font-bold">تاریخ ثبت</th>
                        <th className="px-6 py-4 font-bold">وضعیت</th>
                        <th className="px-6 py-4 font-bold text-center">عملیات</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {feedbacks.map((fb) => (
                        <tr key={fb.id} className="transition hover:bg-slate-50/70">
                            <td className="px-6 py-5 align-top">
                                <div className="max-w-[220px]">
                                    <p className="line-clamp-2 font-bold leading-7 text-slate-800">
                                        {fb.title}
                                    </p>
                                </div>
                            </td>

                            <td className="px-6 py-5 align-top">
                                <div className="max-w-[360px]">
                                    <p className="line-clamp-3 leading-7 text-slate-600">
                                        {fb.message}
                                    </p>
                                </div>
                            </td>

                            <td className="px-6 py-5 align-top whitespace-nowrap">
                                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                                    <FiCalendar />
                                    {new Date(fb.createdAt).toLocaleDateString("fa-IR")}
                                </div>
                            </td>

                            <td className="px-6 py-5 align-top">
                                <StatusSelect
                                    value={fb.status}
                                    loading={updatingId === fb.id}
                                    onChange={(status) => onStatusChange(fb.id, status)}
                                />
                            </td>

                            <td className="px-6 py-5 text-center">
                                <button
                                    onClick={() => onDelete(fb.id)}
                                    disabled={deletingId === fb.id}
                                    className="inline-flex items-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                                >
                                    <FiTrash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}