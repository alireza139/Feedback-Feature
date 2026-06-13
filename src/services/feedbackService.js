export const getFeedbacks = async () => {
    const res = await fetch("/api/feedbacks");
    if (!res.ok) throw new Error("خطا در دریافت فیدبک‌ها");
    return res.json();
};

export const updateStatus = async (id, status) => {
    const res = await fetch("/api/feedbacks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
    });

    if (!res.ok) throw new Error("خطا در بروزرسانی وضعیت");
};

export const deleteFeedback = async (id) => {
    const res = await fetch("/api/feedbacks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });

    if (!res.ok) throw new Error("خطا در حذف فیدبک");
};
