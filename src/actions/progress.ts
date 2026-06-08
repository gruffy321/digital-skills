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

export async function saveModuleState(moduleId: string, state: any) {
  const session = await getSession();
  if (!session || !session.userId) return;

  await prisma.module.upsert({
    where: { id: moduleId },
    update: {},
    create: {
      id: moduleId,
      title: `Module ${moduleId}`,
      sequenceNumber: parseInt(moduleId) || 1,
    }
  });

  // Save state as an EventLog instead of Progress to avoid schema generation locks on Windows
  await prisma.eventLog.create({
    data: {
      userId: session.userId,
      moduleId: moduleId,
      actionType: "m12_state_save",
      metadataJson: state,
    }
  });
}

export async function getModuleState(moduleId: string) {
  const session = await getSession();
  if (!session || !session.userId) return null;

  // Get the most recent state save
  const log = await prisma.eventLog.findFirst({
    where: {
      userId: session.userId,
      moduleId: moduleId,
      actionType: "m12_state_save",
    },
    orderBy: {
      timestamp: 'desc'
    }
  });

  return log?.metadataJson || null;
}
