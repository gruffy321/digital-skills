"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { setSession, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const accessCode = formData.get("accessCode") as string;

  if (!email || !password || !name || !accessCode) {
    return { error: "All fields are required." };
  }

  // 1. Verify Access Code
  let assignedRole: "STUDENT" | "ADMIN" = "STUDENT";

  if (accessCode === "ADMIN-0000") {
    assignedRole = "ADMIN";
  } else {
    const codeRecord = await prisma.accessCode.findUnique({
      where: { code: accessCode }
    });

    if (!codeRecord || !codeRecord.isActive) {
      return { error: "Invalid or expired access code." };
    }
  }

  // 2. Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "A user with this email already exists." };
  }

  // 3. Hash Password
  const passwordHash = await bcrypt.hash(password, 10);

  // 4. Create User
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: assignedRole,
      classCode: assignedRole === "STUDENT" ? accessCode : null,
    }
  });

  // 5. Create Session & Redirect
  await setSession(user.id, user.role);
  redirect("/dashboard");
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Invalid credentials." };
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    return { error: "Invalid credentials." };
  }

  await setSession(user.id, user.role);
  redirect("/dashboard");
}

export async function logoutUser() {
  await clearSession();
  redirect("/");
}
