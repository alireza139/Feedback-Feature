import { useEffect, useMemo, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import FeedbackStats from "@/components/dashboard/FeedbackStats";
import FeedbackTable from "@/components/dashboard/FeedbackTable";
import { getFeedbacks, updateStatus, deleteFeedback } from "@/services/feedbackService";
import { logoutAdmin } from "@/services/authService";

function Index() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "خطا در دریافت بازخوردها");
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
      toast.success("وضعیت بازخورد با موفقیت تغییر کرد");
    } catch (error) {
      setFeedbacks(previous);
      toast.error(error.message || "خطا در تغییر وضعیت");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("آیا از حذف این فیدبک مطمئن هستید؟");
    if (!confirmDelete) return;

    const previous = feedbacks;

    setDeletingId(id);
    setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));

    try {
      await deleteFeedback(id);
      toast.success("بازخورد با موفقیت حذف شد");
    } catch (error) {
      setFeedbacks(previous);
      toast.error(error.message || "خطا در حذف بازخورد");
    } finally {
      setDeletingId(null);
    }
  };

  const stats = useMemo(() => {
    return {
      total: feedbacks?.length || 0,
      submitted: feedbacks?.filter((f) => f.status === "SUBMITTED").length || 0,
      reviewing: feedbacks?.filter((f) => f.status === "REVIEWING").length || 0,
      resolved: feedbacks?.filter((f) => f.status === "RESOLVED").length || 0,
    };
  }, [feedbacks]);

  const logout = async () => {
    const toastId = toast.loading("در حال خروج...");

    try {
      setLogoutLoading(true);
      const data = await logoutAdmin();

      toast.success(data.message || "با موفقیت خارج شدید", {
        id: toastId,
      });

      router.push("/login");
    } catch (error) {
      toast.error(error.message || "خطایی در هنگام خروج رخ داد", {
        id: toastId,
      });
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto my-24 max-w-6xl px-4 text-center">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">
          مدیریت بازخوردها
        </h1>

        <button
          onClick={logout}
          disabled={logoutLoading}
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {logoutLoading ? "در حال خروج..." : "خروج"}
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