import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const feedbacks = await prisma.feedback.findMany({
                orderBy: { createdAt: 'desc' },
            });
            return res.status(200).json(feedbacks);
        }

        if (req.method === 'POST') {
            const { title, message } = req.body;

            console.log("در حال ثبت دیتای جدید:", { title, message });

            const newFeedback = await prisma.feedback.create({
                data: {
                    title: title,
                    message: message,
                    status: "ثبت شده"
                },
            });

            return res.status(201).json(newFeedback);
        }

        if (req.method === 'PATCH') {
            const { id, status } = req.body;
            const updated = await prisma.feedback.update({
                where: { id: parseInt(id) },
                data: { status: status },
            });
            return res.status(200).json(updated);
        }

        if (req.method === "DELETE") {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ message: "شناسه الزامی است" });
            }

            await prisma.feedback.delete({
                where: { id: Number(id) },
            });

            return res.status(200).json({ message: "فیدبک حذف شد" });
        }

        return res.status(405).json({ message: 'Method not allowed' });

    } catch (error) {
        console.error("خطای سرور:", error);
        return res.status(500).json({ error: error.message });
    }
}
