import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { moduleId, actionType, metadataJson } = body;

    // MVP Hack: Ensure the module exists in the database so the foreign key doesn't fail
    await prisma.module.upsert({
      where: { id: moduleId },
      update: {},
      create: {
        id: moduleId,
        title: `Module ${moduleId}`,
        sequenceNumber: parseInt(moduleId) || 1,
      }
    });

    const event = await prisma.eventLog.create({
      data: {
        userId: session.userId,
        moduleId,
        actionType,
        metadataJson,
      },
    });

    // Update User lastActive
    await prisma.user.update({
      where: { id: session.userId },
      data: { lastActive: new Date() }
    });

    // Handle Deep Analytics for Progress
    if (actionType === 'failed_quiz_attempt' || actionType === 'quiz_completed' || actionType.includes('error') || actionType.includes('incorrect')) {
      const existingProgress = await prisma.progress.findUnique({
        where: { userId_moduleId: { userId: session.userId, moduleId } }
      });

      if (existingProgress) {
        if (actionType === 'failed_quiz_attempt') {
          await prisma.progress.update({
            where: { id: existingProgress.id },
            data: { quizAttempts: existingProgress.quizAttempts + 1 }
          });
        } else if (actionType === 'quiz_completed') {
          if (existingProgress.quizAttempts === 0) {
            await prisma.progress.update({
              where: { id: existingProgress.id },
              data: { passedFirstTime: true }
            });
          }
        } else if (actionType.includes('error') || actionType.includes('incorrect')) {
          await prisma.progress.update({
            where: { id: existingProgress.id },
            data: { incorrectClicks: existingProgress.incorrectClicks + 1 }
          });
        }
      }
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Error logging event:", error);
    return NextResponse.json({ success: false, error: "Failed to log event" }, { status: 500 });
  }
}
