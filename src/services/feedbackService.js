export const getFeedbacks = async () => {
  const res = await fetch("/api/feedbacks");
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "خطا در دریافت فیدبک‌ها");
  }

  return data.data;
};

export const updateStatus = async (id, status) => {
  const res = await fetch("/api/feedbacks", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "خطا در بروزرسانی وضعیت");
  }

  return data;
};

export const deleteFeedback = async (id) => {
  const res = await fetch("/api/feedbacks", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "خطا در حذف فیدبک");
  }

  return data;
};