import styles from "./page.module.css";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { createAccessCode, revokeAccessCode, gradeModule12Task } from "@/actions/admin";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";

import AdminDashboardClient from "./AdminDashboardClient";

const prisma = new PrismaClient();

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const session = await getSession();
  if (!session || !session.userId) redirect("/");

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user || user.role !== "ADMIN") redirect("/dashboard");

  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";

  const users = await prisma.user.findMany({
    where: { 
      role: "STUDENT",
      OR: search ? [
        { name: { contains: search } },
        { email: { contains: search } },
        { classCode: { contains: search } }
      ] : undefined
    },
    include: { progress: true },
    orderBy: { createdAt: 'desc' }
  });

  const accessCodes = await prisma.accessCode.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const eventLogs = await prisma.eventLog.findMany({
    include: { user: true, module: true },
    orderBy: { timestamp: 'desc' },
    take: 50,
  });

  return (
    <main className={styles.adminDashboard}>
      <header className={`glass-panel ${styles.header}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BrandLogo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/dashboard" className={styles.backBtn}>← Back to Dashboard</Link>
          <ThemeToggle />
        </div>
      </header>

      <AdminDashboardClient 
        initialUsers={users}
        accessCodes={accessCodes}
        eventLogs={eventLogs}
        createAccessCodeAction={async (formData: FormData) => {
          "use server";
          await createAccessCode(formData);
        }}
        revokeAccessCodeAction={async (id: string) => {
          "use server";
          await revokeAccessCode(id);
        }}
        gradeModule12TaskAction={async (studentId: string, taskId: string, action: 'approve' | 'deny') => {
          "use server";
          await gradeModule12Task(studentId, taskId, action);
        }}
      />
    </main>
  );
}
