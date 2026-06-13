const { PrismaClient, FeedbackStatus } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Start seeding...");

    // ---------- Admin ----------
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";

    const existingAdmin = await prisma.admin.findUnique({
        where: { username },
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.admin.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        console.log("✅ Admin created");
    } else {
        console.log("ℹ Admin already exists");
    }

    // ---------- Feedback ----------
    const feedbackCount = await prisma.feedback.count();

    if (feedbackCount === 0) {
        await prisma.feedback.createMany({
            data: [
                {
                    title: "بهبود رابط کاربری",
                    message: "اگر بخش فیلترها اضافه شود استفاده از سیستم راحت‌تر می‌شود.",
                    status: FeedbackStatus.SUBMITTED,
                },
                {
                    title: "سرعت سایت",
                    message: "در موبایل کمی کند لود می‌شود.",
                    status: FeedbackStatus.REVIEWING,
                },
                {
                    title: "پیشنهاد ویژگی جدید",
                    message: "امکان رأی دادن به فیدبک‌ها اضافه شود عالی می‌شود.",
                    status: FeedbackStatus.SUBMITTED,
                },
                {
                    title: "امکان جستجو بین فیدبک‌ها",
                    message: "اگر قابلیت جستجو بر اساس عنوان یا متن اضافه شود مدیریت درخواست‌ها خیلی سریع‌تر می‌شود.",
                    status: FeedbackStatus.SUBMITTED,
                },
                {
                    title: "حالت تاریک (Dark Mode)",
                    message: "اضافه شدن دارک مود باعث می‌شود استفاده در شب راحت‌تر باشد.",
                    status: FeedbackStatus.REVIEWING,
                },
                {
                    title: "نمایش تاریخ ثبت فیدبک",
                    message: "اگر تاریخ ثبت کنار هر فیدبک نمایش داده شود پیگیری آن ساده‌تر خواهد شد.",
                    status: FeedbackStatus.RESOLVED,
                },
                {
                    title: "مرتب‌سازی بر اساس وضعیت",
                    message: "امکان فیلتر یا مرتب‌سازی بر اساس وضعیت فیدبک‌ها اضافه شود.",
                    status: FeedbackStatus.SUBMITTED,
                },
                {
                    title: "بهبود تجربه موبایل",
                    message: "در صفحه داشبورد جدول در موبایل اسکرول افقی سختی دارد و بهتر است واکنش‌گرا‌تر شود.",
                    status: FeedbackStatus.REVIEWING,
                }
            ],
        });

        console.log("✅ Feedback seeded");
    } else {
        console.log("ℹ Feedback already exists");
    }

    console.log("🌱 Seeding finished");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
