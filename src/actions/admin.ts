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
