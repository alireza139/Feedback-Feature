# Custom Auth (JWT or Cookie Session)
## 1️⃣ نصب پکیج‌های لازم
```bash
npm install bcrypt cookie
```
1. Password hashing --> `bcrypt `
2. Creating and reading cookies --> `cookie`

## 2️⃣ اضافه کردن مدل Admin به Prisma

در فایل:

`prisma/schema.prisma`


مدل زیر را اضافه کن:



```
model Admin {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String
  createdAt DateTime @default(now())
}
```
## 3️⃣ اجرای migration
برای ایجاد جدول در دیتابیس:


```bash
npx prisma migrate dev --name add_admin_table
```
## 4️⃣ ساخت اولین admin
یک فایل موقت در روت پروژه بساز:

`scripts/createAdmin.js`

محتوای فایل:

```
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {

  const hash = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      username: "admin",
      password: hash
    }
  });

  console.log("Admin created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

اجرا کن:

```bash
node scripts/createAdmin.js
```

ادمین ساخته می‌شود:

```
username: admin
password: admin123
```

## 5️⃣ ساخت صفحه Login
فایل:

`src/pages/login/index.jsx`

فرم خیلی ساده:

```
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {

  const router = useRouter();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  // اگر قبلاً لاگین کرده باشد، مستقیم به داشبورد می‌رود
  useEffect(()=>{
    if(document.cookie.includes("admin_session")){
      router.push("/dashboard");
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ username,password })
    });

    if(res.ok){
      router.push("/dashboard");
    }else{
      alert("Invalid credentials");
    }
  };

  return (

    <div style={{maxWidth:300,margin:"100px auto"}}>

      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Login</button>

      </form>

    </div>
  );
}
```
## 6️⃣ ساخت API login/logout
فایل:

`src/pages/api/login.js`

محتوای فایل:
```
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

export default async function handler(req,res){

  if(req.method !== "POST"){
    return res.status(405).json({message:"Method not allowed"});
  }

  const { username,password } = req.body;

  const admin = await prisma.admin.findUnique({
    where:{ username }
  });

  if(!admin){
    return res.status(401).json({message:"Invalid credentials"});
  }

  const valid = await bcrypt.compare(password,admin.password);

  if(!valid){
    return res.status(401).json({message:"Invalid credentials"});
  }

  const cookie = serialize("admin_session","true",{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"lax",
    path:"/",
    maxAge:60*60*24
  });

  res.setHeader("Set-Cookie",cookie);

  res.status(200).json({message:"Logged in"});
}
```

فایل:

`src/pages/api/logout.js`

محتوای فایل:
```
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
```
## 7️⃣ محافظت از داشبورد با proxy
فایل جدید را بساز:

`src/proxy.js`

محتوای فایل:

```
import { NextResponse } from "next/server";

export function proxy(req) {

  const cookie = req.cookies.get("admin_session")?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
```
## 8️⃣ ساخت صفحه داشبورد
مثلا:

`src/pages/dashboard/index.jsx`

یک داشبورد ساده:
```
import { useRouter } from "next/router";

export default function Dashboard(){

  const router = useRouter();

  const logout = async () => {

    await fetch("/api/logout", {
      method: "POST"
    });

    router.push("/login");
  };

  return (
    <div>

      <h1>Admin Dashboard</h1>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}
```
## 9️⃣ تست سیستم
پروژه را اجرا کن:

```bash
npm run dev
```
برو به:

`http://localhost:3000/login`

لاگین کن:

```
username: admin
password: admin123
```

بعد میروی به:

`/dashboard`