// Database Seeder for Office Manager (OM) Weekly Report Management System
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Office Manager Reporting System database...");

  // 1. Clear existing data
  await prisma.findingHistory.deleteMany();
  await prisma.emailNotificationLog.deleteMany();
  await prisma.weeklyReport.deleteMany();
  await prisma.monthlyTarget.deleteMany();
  await prisma.emailNotificationConfig.deleteMany();
  await prisma.user.deleteMany();
  await prisma.zone.deleteMany();

  // 2. Create Zones
  const zonesData = [
    { name: "D.M-01/Mitford", code: "DM01" },
    { name: "Comilla", code: "CML" },
    { name: "Cox's Bazar", code: "CXB" },
    { name: "Chittagong-01", code: "CTG1" },
    { name: "Sylhet", code: "SYL" },
    { name: "Rajshahi", code: "RAJ" },
    { name: "Khulna", code: "KHL" },
    { name: "Barisal", code: "BAR" },
    { name: "Head Office", code: "HO" },
  ];

  for (const z of zonesData) {
    await prisma.zone.create({ data: z });
  }

  // 3. Create Users (Admin + OMs from user's requirements)
  const admin = await prisma.user.create({
    data: {
      staffId: "ADMIN001",
      name: "Head Office Admin",
      designation: "Operations Head",
      zone: "Head Office",
      email: "admin@company.com",
      mobile: "+8801700000000",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const om1 = await prisma.user.create({
    data: {
      staffId: "572816",
      name: "Md. Benajir Alam",
      designation: "TE",
      zone: "D.M-01/Mitford",
      email: "benajir@company.com",
      mobile: "+8801711000001",
      role: "OM",
      status: "ACTIVE",
    },
  });

  const om2 = await prisma.user.create({
    data: {
      staffId: "451467",
      name: "Md. Jashim Uddin",
      designation: "Jex",
      zone: "Comilla",
      email: "jashim@company.com",
      mobile: "+8801711000002",
      role: "OM",
      status: "ACTIVE",
    },
  });

  const om3 = await prisma.user.create({
    data: {
      staffId: "362578",
      name: "Anath Chandra Pal",
      designation: "TE",
      zone: "Cox's Bazar",
      email: "anath@company.com",
      mobile: "+8801711000003",
      role: "OM",
      status: "ACTIVE",
    },
  });

  const om4 = await prisma.user.create({
    data: {
      staffId: "512390",
      name: "Md. Rafiqul Islam",
      designation: "TE",
      zone: "Chittagong-01",
      email: "rafiq@company.com",
      mobile: "+8801711000004",
      role: "OM",
      status: "ACTIVE",
    },
  });

  const om5 = await prisma.user.create({
    data: {
      staffId: "489201",
      name: "S.M. Kamrul Hasan",
      designation: "Jex",
      zone: "Sylhet",
      email: "kamrul@company.com",
      mobile: "+8801711000005",
      role: "OM",
      status: "ACTIVE",
    },
  });

  console.log("Users and Zones created successfully.");

  // 4. Create Monthly Targets for September 2026 (Requirements #31-35)
  // Targets: LOC Target = 20, Mess Visit Target = 10, Dress Code Target = 5
  const activeOms = [om1, om2, om3, om4, om5];
  for (const om of activeOms) {
    await prisma.monthlyTarget.create({
      data: {
        userId: om.id,
        year: 2026,
        month: 9,
        monthYear: "September 2026",
        locTarget: 20,
        messVisitTarget: 10,
        dressCodeTarget: 5,
        isLocked: false,
      },
    });

    // August targets for comparison (#37)
    await prisma.monthlyTarget.create({
      data: {
        userId: om.id,
        year: 2026,
        month: 8,
        monthYear: "August 2026",
        locTarget: 20,
        messVisitTarget: 10,
        dressCodeTarget: 5,
        isLocked: true,
      },
    });
  }

  // 5. Create Reports for September 2026 matching user's exact specification
  // Friday deadline date references for Sep 2026:
  // Week 1: Sep 4, 2026 23:59:59
  // Week 2: Sep 11, 2026 23:59:59
  // Week 3: Sep 18, 2026 23:59:59
  // Week 4: Sep 25, 2026 23:59:59
  const d1 = new Date("2026-09-04T23:59:59.000Z");
  const d2 = new Date("2026-09-11T23:59:59.000Z");
  const d3 = new Date("2026-09-18T23:59:59.000Z");
  const d4 = new Date("2026-09-25T23:59:59.000Z");

  // OM 1: Md. Benajir Alam (572816)
  // Week 1: MV=1, MV Finding=4 (Solved=3, Pending=1), LOC=5, LOC Days=2, Dress=10 (Finding=3), Mess=2 (Finding=1)
  const repBenajirW1 = await prisma.weeklyReport.create({
    data: {
      userId: om1.id,
      monthYear: "September 2026",
      year: 2026,
      month: 9,
      week: 1,
      marketVisitQty: 1,
      marketVisitFindingQty: 4,
      solvedQty: 3,
      pendingQty: 1,
      locSubmittedQty: 5,
      locFindingDayQty: 2.0,
      dressCodeQty: 10,
      dressCodeFindingQty: 3,
      messVisitQty: 2,
      messVisitFindingQty: 1,
      status: "SUBMITTED",
      deadline: d1,
      submittedAt: new Date("2026-09-03T16:00:00.000Z"),
      notes: "Mitford zone comprehensive inspection done.",
    },
  });

  // Finding status update audit test (#11)
  await prisma.findingHistory.create({
    data: {
      reportId: repBenajirW1.id,
      updatedById: om1.id,
      previousSolved: 2,
      newSolved: 3,
      previousPending: 2,
      newPending: 1,
      remark: "Followed up on warehouse safety issue, solved 1 pending finding.",
    },
  });

  // Week 2: MV=0, Finding=0, LOC=6, Days=3, Dress=8, Finding=2, Mess=3, Finding=1 (Zero Activity Rule #15)
  await prisma.weeklyReport.create({
    data: {
      userId: om1.id,
      monthYear: "September 2026",
      year: 2026,
      month: 9,
      week: 2,
      marketVisitQty: 0,
      marketVisitFindingQty: 0,
      solvedQty: 0,
      pendingQty: 0,
      locSubmittedQty: 6,
      locFindingDayQty: 3.0,
      dressCodeQty: 8,
      dressCodeFindingQty: 2,
      messVisitQty: 3,
      messVisitFindingQty: 1,
      status: "SUBMITTED",
      deadline: d2,
      submittedAt: new Date("2026-09-10T14:30:00.000Z"),
      notes: "No market visits this week due to inventory audit.",
    },
  });

  // Week 4: Submitted (Week 3 was Pending, see Tracking table #18)
  await prisma.weeklyReport.create({
    data: {
      userId: om1.id,
      monthYear: "September 2026",
      year: 2026,
      month: 9,
      week: 4,
      marketVisitQty: 3,
      marketVisitFindingQty: 1,
      solvedQty: 1,
      pendingQty: 0,
      locSubmittedQty: 9,
      locFindingDayQty: 0.0,
      dressCodeQty: 2,
      dressCodeFindingQty: 0,
      messVisitQty: 0,
      messVisitFindingQty: 0,
      status: "SUBMITTED",
      deadline: d4,
      submittedAt: new Date("2026-09-24T18:00:00.000Z"),
    },
  });

  // OM 2: Md. Jashim Uddin (451467)
  // Activity summary table #19 totals: MV=4, Finding=4, LOC=4, LOC Days=0, Dress=12, Dress Finding=3.5 (or 4), Mess=1, Mess Finding=1
  await prisma.weeklyReport.create({
    data: {
      userId: om2.id,
      monthYear: "September 2026",
      year: 2026,
      month: 9,
      week: 1,
      marketVisitQty: 2,
      marketVisitFindingQty: 2,
      solvedQty: 2,
      pendingQty: 0,
      locSubmittedQty: 2,
      locFindingDayQty: 0.0,
      dressCodeQty: 6,
      dressCodeFindingQty: 2,
      messVisitQty: 1,
      messVisitFindingQty: 1,
      status: "SUBMITTED",
      deadline: d1,
      submittedAt: new Date("2026-09-04T11:00:00.000Z"),
    },
  });

  await prisma.weeklyReport.create({
    data: {
      userId: om2.id,
      monthYear: "September 2026",
      year: 2026,
      month: 9,
      week: 3,
      marketVisitQty: 1,
      marketVisitFindingQty: 1,
      solvedQty: 1,
      pendingQty: 0,
      locSubmittedQty: 1,
      locFindingDayQty: 0.0,
      dressCodeQty: 3,
      dressCodeFindingQty: 1,
      messVisitQty: 0,
      messVisitFindingQty: 0,
      status: "SUBMITTED",
      deadline: d3,
      submittedAt: new Date("2026-09-17T12:00:00.000Z"),
    },
  });

  // Week 4 submitted Late (#45)
  await prisma.weeklyReport.create({
    data: {
      userId: om2.id,
      monthYear: "September 2026",
      year: 2026,
      month: 9,
      week: 4,
      marketVisitQty: 1,
      marketVisitFindingQty: 1,
      solvedQty: 1,
      pendingQty: 0,
      locSubmittedQty: 1,
      locFindingDayQty: 0.0,
      dressCodeQty: 3,
      dressCodeFindingQty: 0.5,
      messVisitQty: 0,
      messVisitFindingQty: 0,
      status: "LATE_SUBMITTED",
      deadline: d4,
      submittedAt: new Date("2026-09-26T10:30:00.000Z"), // Saturday 10:30 AM
      notes: "Submitted on Saturday due to network outage in Comilla office.",
    },
  });

  // OM 3: Anath Chandra Pal (362578) - Cox's Bazar
  // MV=4, Finding=5, LOC=1, Finding Days=0, Dress=5, Dress Finding=0, Mess=0, Mess Finding=0
  await prisma.weeklyReport.create({
    data: {
      userId: om3.id,
      monthYear: "September 2026",
      year: 2026,
      month: 9,
      week: 1,
      marketVisitQty: 2,
      marketVisitFindingQty: 3,
      solvedQty: 2,
      pendingQty: 1,
      locSubmittedQty: 1,
      locFindingDayQty: 0.0,
      dressCodeQty: 3,
      dressCodeFindingQty: 0,
      messVisitQty: 0,
      messVisitFindingQty: 0,
      status: "SUBMITTED",
      deadline: d1,
      submittedAt: new Date("2026-09-04T09:00:00.000Z"),
    },
  });

  await prisma.weeklyReport.create({
    data: {
      userId: om3.id,
      monthYear: "September 2026",
      year: 2026,
      month: 9,
      week: 2,
      marketVisitQty: 2,
      marketVisitFindingQty: 2,
      solvedQty: 2,
      pendingQty: 0,
      locSubmittedQty: 0,
      locFindingDayQty: 0.0,
      dressCodeQty: 2,
      dressCodeFindingQty: 0,
      messVisitQty: 0,
      messVisitFindingQty: 0,
      status: "SUBMITTED",
      deadline: d2,
      submittedAt: new Date("2026-09-11T15:00:00.000Z"),
    },
  });

  // 6. Create Email Notification Configuration (#42-44)
  await prisma.emailNotificationConfig.create({
    data: {
      code: "WEEKLY_DEADLINE_MISSED",
      name: "Weekly Missed Report Automated Alert",
      description: "Triggered automatically when an OM misses the Friday 11:59 PM deadline",
      subjectTemplate: "[ACTION REQUIRED] Missed Weekly Report Submission - {OM_NAME} ({MONTH_YEAR} Week {WEEK})",
      bodyTemplate: `<p>Dear <strong>{OM_NAME}</strong> (Staff ID: {STAFF_ID}, Zone: {ZONE}),</p>
<p>Our centralized management system has identified that your weekly report submission for <strong>{MONTH_YEAR} - Week {WEEK}</strong> was not completed before the Friday 11:59 PM deadline.</p>
<p><strong>Official Deadline:</strong> {DEADLINE}<br/>
<strong>Current Status:</strong> Pending / Overdue</p>
<p>Please log into the OM Report Management portal immediately to enter your weekly activity data.</p>
<hr/>
<p style="font-size: 12px; color: #666;">This automated notice was dispatched with copy to Senior Reporting Management.</p>`,
      ccRecipients: "senior.reporting@company.com, head.operations@company.com, zheadoffice@company.com",
      bccRecipients: "audit.log@company.com",
      isActive: true,
    },
  });

  // 7. Seed sample email notification log (#44)
  await prisma.emailNotificationLog.create({
    data: {
      userId: om1.id,
      year: 2026,
      month: 9,
      week: 3,
      emailType: "WEEKLY_DEADLINE_MISSED",
      toEmail: om1.email,
      ccEmails: "senior.reporting@company.com, head.operations@company.com",
      subject: "[ACTION REQUIRED] Missed Weekly Report Submission - Md. Benajir Alam (September 2026 Week 3)",
      status: "SENT",
      sentAt: new Date("2026-09-19T00:05:00.000Z"),
    },
  });

  console.log("Database seeded successfully with all initial data!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

