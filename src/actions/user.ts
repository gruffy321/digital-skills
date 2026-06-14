"use server";

import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function getCurrentUserProfile() {
  const session = await getSession();
  if (!session || !session.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      name: true,
      email: true,
      classCode: true,
    }
  });

  return user;
}

export async function getCertificateDetails() {
  const session = await getSession();
  if (!session || !session.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, classCode: true }
  });

  if (!user) return null;

  // Find who approved task m12_6 for this student
  const approvalLog = await prisma.eventLog.findFirst({
    where: {
      actionType: 'teacher_approved_m12_6',
      metadataJson: {
        path: '$.studentId',
        equals: user.id
      }
    },
    include: {
      user: { select: { name: true, email: true } }
    },
    orderBy: { timestamp: 'desc' }
  });

  let approverName = "System Admin";
  if (approvalLog && approvalLog.user) {
    approverName = approvalLog.user.name || approvalLog.user.email;
  } else {
    // Fallback: find any admin
    const anyAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: { name: true, email: true }
    });
    if (anyAdmin) approverName = anyAdmin.name || anyAdmin.email;
  }

  return {
    studentName: user.name || user.email,
    classCode: user.classCode || "General",
    approverName
  };
}
