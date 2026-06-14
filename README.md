# Feedback Management System
<div dir="rtl">
یک سیستم مدیریت فیدبک که با Next.js، Prisma و MySQL پیاده‌سازی شده است.

کاربران می‌توانند فیدبک خود را ثبت کنند و ادمین از طریق داشبورد مدیریت می‌تواند آن‌ها را مشاهده، تغییر وضعیت یا حذف کند.
</div>

## 🚀 تکنولوژی‌های استفاده شده
- Next.js 
- API Routes 
- Prisma ORM 
- MySQL 
- TailwindCSS 
## ⚙️ راهنمای اجرای پروژه در سیستم لوکال
1. دریافت پروژه

ابتدا پروژه را clone کنید:
```bash
git clone https://github.com/alireza139/Feedback-Feature.git
```
سپس وارد پوشه پروژه شوید:

```bash
cd feedback-feature
```
2. نصب وابستگی‌ها

```bash
npm install
```
3. تنظیم متغیرهای محیطی

 ابتدا فایل `env.` را از روی فایل نمونه`env.example.` ایجاد کنید:
 ```bash
 cp .env.example .env
```
سپس مقادیر داخل فایل `env.` را مطابق تنظیمات سیستم خود ویرایش کنید:

```
DATABASE_URL="mysql://username:password@localhost:3306/feedback_db"

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```
1. اجرای Migration دیتابیس
```bash
npx prisma migrate dev
```

1. اجرای Seed اولیه

برای ایجاد داده‌های اولیه (مانند ادمین اولیه):
```bash
npm run seed
```
6. اجرای پروژه
```bash
npm run dev
```
سپس پروژه در آدرس زیر قابل دسترسی خواهد بود:

```
http://localhost:3000
```
## 🧠 تصمیمات فنی

- استفاده از Next.js:

<div dir="rtl">
Next.js انتخاب شد زیرا امکان ساخت یک اپلیکیشن full‑stack را فراهم می‌کند.

در این پروژه از API Routes برای پیاده‌سازی منطق سرور و عملیات CRUD استفاده شده است.
</div>

- استفاده از Prisma:

 کار با دیتابیس را ساده می‌کند
  چون migration و مدیریت schema را آسان می‌کند
- استفاده از MySQL
  
دیتابیس MySQL به عنوان یک دیتابیس رابطه‌ای پایدار و رایج برای ذخیره داده‌های پروژه استفاده شده است.

- استفاده از API Routes

برای پیاده‌سازی عملیات CRUD و احراز هویت از API Routes در Next.js استفاده شده است تا منطق سمت سرور در همان پروژه مدیریت شود.

## 🔐 احراز هویت (Authentication)
در این پروژه از یک سیستم احراز هویت سفارشی (Custom Auth) استفاده شده است.

ویژگی‌های آن:
- ورود ادمین از طریق API
- هش شدن پسوردها با bcrypt
- ذخیره سشن کاربر در cookie
- محافظت از مسیر داشبورد با proxy
- این روش برای پروژه‌های کوچک و متوسط ساده و قابل کنترل است.

## 📂 ساختار پوشه‌های پروژه
```
src
├── components
│   ├── dashboard
│   │   ├── FeedbackStats.jsx
│   │   ├── FeedbackTable.jsx
│   │   └── StatusSelect.jsx
│   ├── FeedbackForm.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── NavLink.jsx
├── lib
│   └── prisma.js
├── pages
│   ├── api
│   │   ├── auth
│   │   │   ├── login.js
│   │   │   └── logout.js
│   │   └── feedbacks.js
│   ├── dashboard
│   │   └── index.jsx
│   ├── login
│   │   └── index.jsx
│   ├── _app.js
│   └── index.js
├── proxy.js
├── services
│   ├── authService.js
│   └── feedbackService.js
└── styles
    └── globals.css
```

## 📸 تصاویر

### صفحه اصلی:
![Home](./screenshots/home.png)

### صفحه لاگین:
![Login](./screenshots/login.png)

### داشبورد:
![Dashboard](./screenshots/dashboard.png)
