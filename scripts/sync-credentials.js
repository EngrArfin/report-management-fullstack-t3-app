// @ts-nocheck
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing real corporate credentials in Neon PostgreSQL database...");

  // Update Admin
  await prisma.user.updateMany({
    where: { staffId: "ADMIN001" },
    data: { password: "admin@123" },
  });

  // Update OMs
  const omStaffIds = ["572816", "451467", "362578", "512390", "489201"];
  for (const staffId of omStaffIds) {
    await prisma.user.updateMany({
      where: { staffId },
      data: { password: "om@123456" },
    });
  }

  const users = await prisma.user.findMany({
    select: { staffId: true, name: true, role: true, email: true, password: true },
  });

  console.log("Credentials synchronized successfully:");
  console.table(users);
}

main()
  .catch((e) => {
    console.error("Error updating credentials:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

