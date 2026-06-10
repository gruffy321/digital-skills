const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedData() {
  console.log("Seeding fake analytics data...");
  try {
    const users = await prisma.user.findMany({ where: { role: 'STUDENT' } });
    if (users.length === 0) {
      console.log("No students found to seed data.");
      return;
    }

    const student = users[0]; // Just seed data for the first student

    // Fake deep analytics progress
    await prisma.progress.upsert({
      where: { userId_moduleId: { userId: student.id, moduleId: "11" } },
      update: {
        quizAttempts: 3,
        passedFirstTime: false,
        incorrectClicks: 5
      },
      create: {
        userId: student.id,
        moduleId: "11",
        status: "COMPLETED",
        quizAttempts: 3,
        passedFirstTime: false,
        incorrectClicks: 5
      }
    });

    await prisma.progress.upsert({
      where: { userId_moduleId: { userId: student.id, moduleId: "10" } },
      update: {
        quizAttempts: 1,
        passedFirstTime: true,
        incorrectClicks: 0
      },
      create: {
        userId: student.id,
        moduleId: "10",
        status: "COMPLETED",
        quizAttempts: 1,
        passedFirstTime: true,
        incorrectClicks: 0
      }
    });

    // Fake events to populate the Donut Chart and Activity feed
    const dummyEvents = [
      { actionType: 'quiz_completed', moduleId: '10' },
      { actionType: 'failed_quiz_attempt', moduleId: '11' },
      { actionType: 'failed_quiz_attempt', moduleId: '11' },
      { actionType: 'incorrect_click', moduleId: '11' },
      { actionType: 'incorrect_click', moduleId: '11' },
      { actionType: 'incorrect_click', moduleId: '11' },
      { actionType: 'quiz_completed', moduleId: '11' }
    ];

    for (const ev of dummyEvents) {
      await prisma.eventLog.create({
        data: {
          userId: student.id,
          moduleId: ev.moduleId,
          actionType: ev.actionType,
          timestamp: new Date()
        }
      });
    }

    // Update lastActive
    await prisma.user.update({
      where: { id: student.id },
      data: { lastActive: new Date() }
    });

    console.log(`Successfully seeded fake analytics data for student: ${student.email}`);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
