import { useState } from "react";
import toast from "react-hot-toast";
import {
    FiMessageSquare,
    FiType,
    FiEdit3,
    FiSend,
} from "react-icons/fi";

function FeedbackForm() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanTitle = title.trim();
        const cleanMessage = message.trim();

        if (!cleanTitle || !cleanMessage) {
            toast.error("عنوان و پیام نباید خالی باشند");
            return;
        }

        const toastId = toast.loading("در حال ارسال...");

        try {
            setLoading(true);

            const res = await fetch("/api/feedbacks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: cleanTitle,
                    message: cleanMessage,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "خطایی رخ داد");
            }

            setTitle("");
            setMessage("");

            toast.success(data.message || "فیدبک با موفقیت ثبت شد", {
                id: toastId,
            });
        } catch (error) {
            toast.error(error.message || "ارتباط با سرور برقرار نشد", {
                id: toastId,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center pt-8 mb-2 px-2">
            <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500 p-2 lg:px-8 lg:py-3 text-white">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                            <FiMessageSquare className="text-xl lg:text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-xl lg:text-2xl font-extrabold">
                                ثبت فیدبک جدید
                            </h1>
                            <p className="text-xs lg:text-sm text-white/85 mt-1">
                                نظرات، پیشنهادات و انتقادات شما به ما کمک می‌کند بهتر شویم.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-2 lg:px-8 my-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-xs lg:text-sm font-bold text-slate-700">
                                عنوان بازخورد
                            </label>

                            <div className="relative">
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 lg:pr-4 text-slate-400">
                                    <FiType className="text-sm lg:text-lg" />
                                </span>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="مثلاً: پیشنهاد برای بهبود رابط کاربری"
                                    className="block w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-8 lg:pr-12 pl-4 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                                />
                            </div>

                            <span className="mt-2 text-xs text-slate-500">
                                عنوان کوتاه و شفاف وارد کنید.
                            </span>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="mb-2 block text-xs lg:text-sm font-bold text-slate-700">
                                متن پیام
                            </label>

                            <div className="relative">
                                <span className="absolute top-4 right-0 pr-4 text-slate-400">
                                    <FiEdit3 className="text-sm lg:text-lg" />
                                </span>

                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    placeholder="توضیحات کامل خود را اینجا بنویسید..."
                                    className="block w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-8 lg:pr-12 pl-4 text-sm text-slate-700 outline-none transition resize-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                                />
                            </div>

                            <span className="mt-2 text-xs text-slate-500">
                                هرچه توضیح دقیق‌تر باشد، بهتر است.
                            </span>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? "در حال ارسال..." : "ارسال فیدبک"}
                                <FiSend className="text-lg" />
                            </button>
                        </div>

                    </form>

                    <div className="border-t border-slate-100 pt-4">
                        <p className="text-center text-xs leading-6 text-slate-500">
                            از زمانی که می‌گذارید، سپاس گزاریم.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedbackForm;