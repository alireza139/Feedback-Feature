import { serialize } from "cookie";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "متد درخواست مجاز نیست",
        });
    }

    try {
        const cookie = serialize("admin_session", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(0),
        });

        res.setHeader("Set-Cookie", cookie);

        return res.status(200).json({
            success: true,
            message: "خروج با موفقیت انجام شد",
            data: null,
        });
    } catch (error) {
        console.error("Logout API Error:", error);

        return res.status(500).json({
            success: false,
            message: "خطایی در سرور رخ داد",
        });
    }
}