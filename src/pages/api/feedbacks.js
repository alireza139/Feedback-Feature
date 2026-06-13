import prisma from "../../lib/prisma";
import { FeedbackStatus } from "@prisma/client";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const feedbacks = await prisma.feedback.findMany({
                orderBy: { createdAt: "desc" },
            });

            return res.status(200).json({
                success: true,
                message: "فیدبک‌ها با موفقیت دریافت شدند",
                data: feedbacks,
            });
        }

        if (req.method === "POST") {
            const title = req.body?.title?.trim();
            const message = req.body?.message?.trim();

            if (!title || !message) {
                return res.status(400).json({
                    success: false,
                    message: "title و message الزامی هستند",
                });
            }

            const newFeedback = await prisma.feedback.create({
                data: {
                    title,
                    message,
                    status: FeedbackStatus.SUBMITTED,
                },
            });

            return res.status(201).json({
                success: true,
                message: "فیدبک با موفقیت ثبت شد",
                data: newFeedback,
            });
        }

        if (req.method === "PATCH") {
            const { id, status } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "شناسه الزامی است",
                });
            }

            if (!Object.values(FeedbackStatus).includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "status نامعتبر است",
                });
            }

            const updated = await prisma.feedback.update({
                where: { id: Number(id) },
                data: { status },
            });

            return res.status(200).json({
                success: true,
                message: "وضعیت فیدبک با موفقیت بروزرسانی شد",
                data: updated,
            });
        }

        if (req.method === "DELETE") {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "شناسه الزامی است",
                });
            }

            await prisma.feedback.delete({
                where: { id: Number(id) },
            });

            return res.status(200).json({
                success: true,
                message: "فیدبک با موفقیت حذف شد",
                data: null,
            });
        }

        return res.status(405).json({
            success: false,
            message: "متد درخواستی مجاز نیست",
        });
    } catch (error) {
        console.error("خطای سرور:", error);

        return res.status(500).json({
            success: false,
            message: "خطای داخلی سرور",
        });
    }
}