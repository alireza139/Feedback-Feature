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