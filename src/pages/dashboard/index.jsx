import { useEffect, useMemo, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import FeedbackStats from "@/components/dashboard/FeedbackStats";
import FeedbackTable from "@/components/dashboard/FeedbackTable";
import { getFeedbacks, updateStatus, deleteFeedback, } from "@/services/feedbackService";
import { useRouter } from "next/router";


function Index() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const previous = feedbacks;

    setUpdatingId(id);
    setFeedbacks((prev) =>
      prev.map((fb) =>
        fb.id === id ? { ...fb, status: newStatus } : fb
      )
    );

    try {
      await updateStatus(id, newStatus);
    } catch (error) {
      setFeedbacks(previous);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "آیا از حذف این فیدبک مطمئن هستید؟"
    );
    if (!confirmDelete) return;

    const previous = feedbacks;

    setDeletingId(id);
    setFeedbacks((prev) =>
      prev.filter((fb) => fb.id !== id)
    );

    try {
      await deleteFeedback(id);
    } catch (error) {
      setFeedbacks(previous);
    } finally {
      setDeletingId(null);
    }
  };

  const stats = useMemo(() => {
    return {
      total: feedbacks.length,
      submitted: feedbacks.filter((f) => f.status === "ثبت شده").length,
      reviewing: feedbacks.filter((f) => f.status === "درحال بررسی").length,
      resolved: feedbacks.filter((f) => f.status === "رسیدگی شده").length,
    };
  }, [feedbacks]);

  if (loading) {
    return (
      <div className="mx-auto my-24 max-w-6xl px-4 text-center">
        در حال بارگذاری...
      </div>
    );
  }

  const router = useRouter();
  const logout = async () => {

    await fetch("/api/logout", {
      method: "POST"
    });

    router.push("/login");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">
          مدیریت بازخوردها
        </h1>

        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
        >
          خروج
          <FiLogOut className="h-5 w-5" />
        </button>
      </div>

      <FeedbackStats stats={stats} />

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <FeedbackTable
          feedbacks={feedbacks}
          updatingId={updatingId}
          deletingId={deletingId}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>

  );
}
export default Index;