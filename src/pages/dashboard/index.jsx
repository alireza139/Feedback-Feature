import { useEffect, useMemo, useState } from "react";
import FeedbackStats from "@/components/dashboard/FeedbackStats";
import FeedbackTable from "@/components/dashboard/FeedbackTable";
import { getFeedbacks, updateStatus, deleteFeedback, } from "@/services/feedbackService";

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <FeedbackStats stats={stats} />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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