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
