import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "متد درخواست مجاز نیست",
    });
  }

  try {
    const { username, password } = req.body;

    const cleanUsername = username?.trim();
    const cleanPassword = password?.trim();

    if (!cleanUsername || !cleanPassword) {
      return res.status(400).json({
        success: false,
        message: "نام کاربری و رمز عبور الزامی هستند",
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { username: cleanUsername },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "نام کاربری یا رمز عبور اشتباه است",
      });
    }

    const valid = await bcrypt.compare(cleanPassword, admin.password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "نام کاربری یا رمز عبور اشتباه است",
      });
    }

    const cookie = serialize("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({
      success: true,
      message: "ورود با موفقیت انجام شد",
      data: {
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Login API Error:", error);

    return res.status(500).json({
      success: false,
      message: "خطایی در سرور رخ داد",
    });
  }
}