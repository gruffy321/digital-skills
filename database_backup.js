const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function backupDatabase() {
  console.log("Starting database backup...");
  
  try {
    const users = await prisma.user.findMany();
    const modules = await prisma.module.findMany();
    const progress = await prisma.progress.findMany();
    const events = await prisma.eventLog.findMany();
    const accessCodes = await prisma.accessCode.findMany();

    const backupData = {
      timestamp: new Date().toISOString(),
      users,
      modules,
      progress,
      events,
      accessCodes
    };

    const backupPath = path.join(__dirname, 'database_backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
    
    console.log(`Backup completed successfully! Saved to: ${backupPath}`);
    console.log(`Backed up:
    - ${users.length} Users
    - ${modules.length} Modules
    - ${progress.length} Progress records
    - ${events.length} Event logs
    - ${accessCodes.length} Access codes`);
  } catch (error) {
    console.error("Backup failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

backupDatabase();
