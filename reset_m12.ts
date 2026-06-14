import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function reset() {
  // Try to find by name or email
  let user = await prisma.user.findFirst({
    where: { name: { contains: "Gruff Wright" } }
  });
  
  if (!user) {
    user = await prisma.user.findFirst({
      where: { email: { contains: "ADMIN" } }
    });
  }

  if (!user) {
    console.log("User not found");
    return;
  }
  console.log("Found user:", user.email, user.name);

  // 1. Delete all teacher approval logs for this student's m12 tasks
  const deletedApprovals = await prisma.eventLog.deleteMany({
    where: {
      actionType: { startsWith: 'teacher_approved_m12' },
      metadataJson: { path: '$.studentId', equals: user.id }
    }
  });
  console.log("Deleted teacher approvals:", deletedApprovals.count);

  // 2. Revert m12_6 state to 'ready_for_review' in their latest m12_state_save log
  const stateLog = await prisma.eventLog.findFirst({
    where: { userId: user.id, actionType: 'm12_state_save' },
    orderBy: { timestamp: 'desc' }
  });

  if (stateLog && stateLog.metadataJson) {
    const state: any = stateLog.metadataJson;
    if (state['m12_6'] === 'approved') {
      state['m12_6'] = 'ready_for_review';
      await prisma.eventLog.update({
        where: { id: stateLog.id },
        data: { metadataJson: state }
      });
      console.log("Reverted m12_6 state back to 'ready_for_review'");
    }
  }

  // 3. Remove the overall 'COMPLETED' progress record for Module 12 so they aren't fully completed
  const deletedProgress = await prisma.progress.deleteMany({
    where: { userId: user.id, moduleId: "12" }
  });
  console.log("Deleted M12 overall progress record:", deletedProgress.count);
}

reset()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
