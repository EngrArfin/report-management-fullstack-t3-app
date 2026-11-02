import { db } from "~/server/db";
import { AppProvider } from "./_components/AppContext";
import { MainApp } from "./_components/MainApp";
import type { ActiveUser } from "./_components/AppContext";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const users = await db.user.findMany({
    orderBy: [
      { role: "asc" }, // ADMIN first
      { zone: "asc" },
      { staffId: "asc" },
    ],
  });

  const zones = await db.zone.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  const activeUsers: ActiveUser[] = users.map((u) => ({
    id: u.id,
    staffId: u.staffId,
    name: u.name,
    designation: u.designation,
    zone: u.zone,
    email: u.email,
    role: u.role as "ADMIN" | "OM",
  }));

  return (
    <AppProvider initialUsers={activeUsers}>
      <MainApp allUsers={activeUsers} allZones={zones} />
    </AppProvider>
  );
}
