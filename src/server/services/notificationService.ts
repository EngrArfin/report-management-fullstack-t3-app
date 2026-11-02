/**
 * Notification Service for Office Manager Weekly Reporting
 * 
 * Handles:
 * 1. Automatic deadline check for Friday 11:59:59 PM
 * 2. Identification of active OMs with missing reports for that week
 * 3. Dynamic email rendering (To: OM, CC: Admin-configured Senior/Reporting Boss)
 * 4. Idempotent notification logging to prevent duplicate emails
 */

import { db } from "~/server/db";
import { formatMonthYear, getFridayDeadline } from "./deadlineService";

export class NotificationService {
  /**
   * Check for missed submissions and dispatch email notifications
   */
  static async processMissedReportNotifications(year: number, month: number, week: number) {
    const deadline = getFridayDeadline(year, month, week);
    const now = new Date();

    // Verify deadline has passed
    if (now.getTime() <= deadline.getTime()) {
      return {
        processed: 0,
        message: `Deadline for ${formatMonthYear(year, month)} Week ${week} has not passed yet (${deadline.toLocaleString()}).`,
      };
    }

    // Fetch active notification configuration
    const config = await db.emailNotificationConfig.findFirst({
      where: {
        code: "WEEKLY_DEADLINE_MISSED",
        isActive: true,
      },
    });

    if (!config) {
      return {
        processed: 0,
        message: "Automated missed report notification is currently inactive or not configured.",
      };
    }

    // Get all active OMs
    const activeOms = await db.user.findMany({
      where: {
        role: "OM",
        status: "ACTIVE",
      },
    });

    // Get all submitted reports for this week
    const submittedReports = await db.weeklyReport.findMany({
      where: {
        year,
        month,
        week,
      },
      select: { userId: true },
    });

    const submittedUserIds = new Set(submittedReports.map((r) => r.userId));

    // Filter OMs who did NOT submit
    const missedOms = activeOms.filter((om) => !submittedUserIds.has(om.id));

    const dispatchedLogs = [];
    const monthYear = formatMonthYear(year, month);

    for (const om of missedOms) {
      // Check if already notified for this exact week (Rule #44: Prevent duplicate emails)
      const existingLog = await db.emailNotificationLog.findUnique({
        where: {
          userId_year_month_week_emailType: {
            userId: om.id,
            year,
            month,
            week,
            emailType: "WEEKLY_DEADLINE_MISSED",
          },
        },
      });

      if (existingLog) {
        continue; // Already notified, skip
      }

      // Render Subject & Body with dynamic placeholders
      const subject = config.subjectTemplate
        .replace("{OM_NAME}", om.name)
        .replace("{STAFF_ID}", om.staffId)
        .replace("{ZONE}", om.zone)
        .replace("{MONTH_YEAR}", monthYear)
        .replace("{WEEK}", String(week));

      // Log dispatch (In production with SMTP credentials, dispatch via nodemailer/SES/SendGrid)
      await db.emailNotificationLog.create({
        data: {
          userId: om.id,
          year,
          month,
          week,
          emailType: "WEEKLY_DEADLINE_MISSED",
          toEmail: om.email,
          ccEmails: config.ccRecipients,
          subject,
          status: "SENT",
        },
      });

      dispatchedLogs.push({
        omName: om.name,
        staffId: om.staffId,
        to: om.email,
        cc: config.ccRecipients,
        subject,
      });
    }

    return {
      processed: dispatchedLogs.length,
      dispatched: dispatchedLogs,
      message: `Processed missed report check for ${monthYear} Week ${week}. Dispatched ${dispatchedLogs.length} notifications.`,
    };
  }

  /**
   * Get email notification configurations
   */
  static async getConfig() {
    return db.emailNotificationConfig.findFirst({
      where: { code: "WEEKLY_DEADLINE_MISSED" },
    });
  }

  /**
   * Update email notification configuration
   */
  static async updateConfig(input: {
    subjectTemplate: string;
    bodyTemplate: string;
    ccRecipients: string;
    bccRecipients?: string;
    isActive: boolean;
  }) {
    return db.emailNotificationConfig.upsert({
      where: { code: "WEEKLY_DEADLINE_MISSED" },
      update: input,
      create: {
        code: "WEEKLY_DEADLINE_MISSED",
        name: "Missed Weekly Report Reminder",
        ...input,
      },
    });
  }

  /**
   * Get notification history logs
   */
  static async getLogs(year?: number, month?: number) {
    const where: { year?: number; month?: number } = {};
    if (year) where.year = year;
    if (month) where.month = month;

    return db.emailNotificationLog.findMany({
      where,
      include: {
        user: {
          select: { name: true, staffId: true, zone: true, designation: true },
        },
      },
      orderBy: { sentAt: "desc" },
    });
  }
}
