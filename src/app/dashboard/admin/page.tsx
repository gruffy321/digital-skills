import styles from "./page.module.css";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { createAccessCode, revokeAccessCode } from "@/actions/admin";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";

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

      <div className={styles.grid}>
        {/* Access Codes Section */}
        <section className={`glass-panel ${styles.panel}`}>
          <h3>Access Code Management</h3>
          <form action={createAccessCode} className={styles.createCodeForm}>
            <input type="text" name="code" placeholder="e.g. CLASS-2026" required className={styles.input} />
            <button type="submit" className={styles.submitBtn}>Generate Code</button>
          </form>
          <div className={styles.codeList}>
            {accessCodes.map(code => (
              <div key={code.id} className={styles.codeItem}>
                <span className={styles.codeText}>{code.code}</span>
                <span className={code.isActive ? styles.activeBadge : styles.inactiveBadge}>
                  {code.isActive ? "Active" : "Revoked"}
                </span>
                {code.isActive && (
                  <form action={revokeAccessCode.bind(null, code.id)}>
                    <button type="submit" className={styles.revokeBtn}>Revoke</button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Student Matrix Section */}
        <section className={`glass-panel ${styles.panel} ${styles.matrixPanel}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Student Progress Matrix</h3>
            <form method="GET" style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                name="search" 
                defaultValue={search} 
                placeholder="Search name, email, class code..." 
                className={styles.input}
                style={{ width: '250px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button type="submit" className={styles.submitBtn} style={{ padding: '0.5rem 1rem' }}>Search</button>
            </form>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.matrixTable}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  {[...Array(12)].map((_, i) => <th key={i}>M{i + 1}</th>)}
                </tr>
              </thead>
              <tbody>
                {users.map(student => (
                  <tr key={student.id}>
                    <td>{student.name || student.email}</td>
                    <td>{student.classCode || '-'}</td>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(modId => {
                      const prog = student.progress.find(p => p.moduleId === String(modId));
                      let statusIcon = "🔒";
                      if (prog?.status === "COMPLETED") statusIcon = "✅";
                      else if (prog?.status === "IN_PROGRESS" || (modId === 1 && !prog)) statusIcon = "🔄";
                      
                      return <td key={modId} title={prog?.status || "LOCKED"}>{statusIcon}</td>;
                    })}
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={14} style={{textAlign:'center', padding:'1rem'}}>No students found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Global Activity Feed */}
        <section className={`glass-panel ${styles.panel} ${styles.activityPanel}`}>
          <h3>Global Student Activity</h3>
          <div className={styles.activityList}>
            {eventLogs.map((log) => (
              <div key={log.id} className={styles.activityItem}>
                <div className={styles.activityTime}>
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className={styles.activityDetails}>
                  <strong>{log.user?.name || log.user?.email} </strong>
                  {log.actionType} in Module {log.module?.sequenceNumber || log.moduleId}
                </div>
              </div>
            ))}
            {eventLogs.length === 0 && <p>No activity yet.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
