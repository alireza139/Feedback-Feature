import { serialize } from "cookie";

export default function handler(req, res) {

    // حذف کوکی با تاریخ منقضی
    const cookie = serialize("admin_session", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0),
    });

    res.setHeader("Set-Cookie", cookie);

    res.status(200).json({ message: "Logged out" });
}