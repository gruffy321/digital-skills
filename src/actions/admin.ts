"use server";

import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

async function ensureAdmin() {
  const session = await getSession();
  if (!session || !session.userId) return false;

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  return user?.role === "ADMIN";
}

export async function createAccessCode(formData: FormData) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  const code = formData.get("code") as string;
  if (!code || code.trim() === "") return { error: "Code cannot be empty" };

  try {
    await prisma.accessCode.create({
      data: { code: code.trim(), isActive: true }
    });
    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (e: any) {
    if (e.code === 'P2002') {
      return { error: "This access code already exists." };
    }
    return { error: "Failed to create access code." };
  }
}

export async function revokeAccessCode(id: string) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  await prisma.accessCode.update({
    where: { id },
    data: { isActive: false }
  });
  revalidatePath("/dashboard/admin");
}

export async function gradeModule12Task(studentId: string, taskId: string, action: 'approve' | 'deny') {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  // Fetch the latest state
  const log = await prisma.eventLog.findFirst({
    where: {
      userId: studentId,
      moduleId: "12",
      actionType: "m12_state_save",
    },
    orderBy: {
      timestamp: 'desc'
    }
  });

  const CHECKLIST_ITEMS = [
    "m12_1", "m12_2", "m12_3", "m12_4", "m12_5", "m12_6"
  ];

  let state: Record<string, string> = (log?.metadataJson as Record<string, string>) || {
    "m12_1": "in_progress",
    "m12_2": "locked",
    "m12_3": "locked",
    "m12_4": "locked",
    "m12_5": "locked",
    "m12_6": "locked",
  };

  if (action === 'approve') {
    state[taskId] = "approved";
    // Unlock next
    const currentIndex = CHECKLIST_ITEMS.indexOf(taskId);
    if (currentIndex !== -1 && currentIndex + 1 < CHECKLIST_ITEMS.length) {
      const nextId = CHECKLIST_ITEMS[currentIndex + 1];
      state[nextId] = "in_progress";
    }
  } else if (action === 'deny') {
    state[taskId] = "needs_revision";
  }

  await prisma.eventLog.create({
    data: {
      userId: studentId,
      moduleId: "12",
      actionType: "m12_state_save",
      metadataJson: state,
    }
  });

  const session = await getSession();
  if (session && session.userId) {
    await prisma.eventLog.create({
      data: {
        userId: session.userId,
        moduleId: "12",
        actionType: `teacher_${action}d_${taskId}`,
        metadataJson: { studentId },
      }
    });
  }

  revalidatePath("/dashboard/admin");
}
