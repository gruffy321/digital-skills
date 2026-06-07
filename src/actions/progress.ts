"use server";

import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function markModuleCompleted(moduleId: string) {
  const session = await getSession();
  if (!session || !session.userId) return;

  // Ensure module exists in DB
  await prisma.module.upsert({
    where: { id: moduleId },
    update: {},
    create: {
      id: moduleId,
      title: `Module ${moduleId}`,
      sequenceNumber: parseInt(moduleId) || 1,
    }
  });

  // Mark as completed
  await prisma.progress.upsert({
    where: {
      userId_moduleId: {
        userId: session.userId,
        moduleId: moduleId,
      }
    },
    update: { status: "COMPLETED" },
    create: {
      userId: session.userId,
      moduleId: moduleId,
      status: "COMPLETED",
    }
  });
}
