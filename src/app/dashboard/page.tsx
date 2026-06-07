import styles from "./page.module.css";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutUser } from "@/actions/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session || !session.userId) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  if (!user) {
    redirect("/");
  }

  const isAdmin = user.role === "ADMIN";

  const userProgress = await prisma.progress.findMany({
    where: { userId: user.id }
  });

  const baseModules = [
    { id: 1, title: "Introduction to Digital Skills" },
    { id: 2, title: "File Management Essentials" },
    { id: 3, title: "Internet & Online Research" },
    { id: 4, title: "Digital Citizenship & Social Media" },
    { id: 5, title: "Professional Email & Outlook" },
    { id: 6, title: "Word Processing Basics" },
    { id: 7, title: "Intermediate Word Processing" },
    { id: 8, title: "Presentation Skills" },
    { id: 9, title: "Spreadsheet Basics" },
    { id: 10, title: "Cloud Storage & Collaboration" },
    { id: 11, title: "Problem Solving & Troubleshooting" },
    { id: 12, title: "Final Digital Skills Project" },
  ];

  const modules = baseModules.map((mod, index) => {
    const progressRecord = userProgress.find(p => p.moduleId === String(mod.id));
    let status = "LOCKED";

    if (progressRecord) {
      status = progressRecord.status; // COMPLETED or IN_PROGRESS
    } else if (index === 0) {
      status = "IN_PROGRESS"; // First module is always available
    } else {
      // Check if previous module is COMPLETED
      const prevProgress = userProgress.find(p => p.moduleId === String(baseModules[index - 1].id));
      if (prevProgress && prevProgress.status === "COMPLETED") {
        status = "IN_PROGRESS";
      }
    }

    return { ...mod, status };
  });

  return (
    <DashboardClient initialUser={{ name: user.name, isAdmin }} modules={modules} logoutUser={logoutUser} />
  );
}
