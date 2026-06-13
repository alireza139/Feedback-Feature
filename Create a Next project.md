# 🚀 Next.js + Prisma 6 + MySQL Project Setup Guide
## 1. Create a New Next.js Project
 ```bash
npx create-next-app@latest my-project
cd my-project
 ```
  
## 2. Install Prisma 6

```bash
npm i prisma@6 --save-dev
npm i @prisma/client@6
```
## 3. Initialize Prisma
This command creates two files: `.env` and `prisma/schema.prisma`
```bash
npx prisma init
``` 

## 4. Configure MySQL Connection(`.env`)
Open `.env` and set `DATABASE_URL`:

```
//with password
DATABASE_URL="mysql://root:password@localhost:3306/test_db"
```
```
//without password
DATABASE_URL="mysql://root:@localhost:3306/test_db"
```

## 5. Define Prisma Schema(`prisma/schema.prisma`)
Set up the `prisma/schema.prisma` file as follows:
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Feedback {
  id        Int      @id @default(autoincrement())
  title     String
  message   String   @db.Text
  status    String   @default("new")
  createdAt DateTime @default(now())
}
```
## 6.Run Prisma Migration (Sync Database & Generate Client)
This command:
- Applies schema changes to the database
- Creates migration history in prisma/migrations
- Automatically generates Prisma Client
```bash 
npx prisma migrate dev --name init
```
## 7. Create Prisma Client Helper
- Create the following file: `src/lib/prisma.js`
- and its content: 
```
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

 ```
 This prevents multiple database connections during development.


## 8. Create a Test API Route
Create the file: `src/pages/api/test.js`

Simple API example:
```
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const data = await prisma.feedback.findMany();
  res.status(200).json(data);
}
```
## 9. Run the Project
Run the project:
```bash
npm run dev
```

Test API: `http://localhost:3000/api/test`

## 10. Key Notes
- **How to run**
  - Run `npm install`
  - Create a `.env` file and set your `DATABASE_URL`
  - Run `npx prisma migrate dev` to sync database
  - Run `npm run dev` to start

- **Git Ignore**
   - Make sure the `.gitignore` file includes `.env`
- **Prisma Studio:** Prisma Studio is a visual interface for exploring and managing your database.
   - Run --> ```npx prisma studio```
   - Then open in your browser --> `http://localhost:5555`
   - With Prisma Studio you can:
     - View database tables
     - Edit or delete data
     - Insert new records




