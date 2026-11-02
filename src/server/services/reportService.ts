/**
 * Report Service for Office Manager Weekly Reporting
 * Handles data validation, submissions, status transitions, finding updates,
 * and comprehensive summary aggregations.
 */

import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { formatMonthYear, getFridayDeadline, isLateSubmission } from "./deadlineService";

export interface SubmitReportInput {
  userId: string;
  year: number;
  month: number;
  week: number;
  marketVisitQty: number;
  marketVisitFindingQty: number;
  solvedQty: number;
  pendingQty: number;
  locSubmittedQty: number;
  locFindingDayQty: number;
  dressCodeQty: number;
  dressCodeFindingQty: number;
  messVisitQty: number;
  messVisitFindingQty: number;
  notes?: string;
}

export interface UpdateFindingStatusInput {
  reportId: string;
  updatedById: string;
  newSolved: number;
  newPending: number;
  remark?: string;
}

export interface ActivityFilterInput {
  year?: number;
  month?: number;
  week?: number | "all";
  userId?: string;
  zone?: string;
  period?: "1_MONTH" | "3_MONTHS" | "6_MONTHS" | "1_YEAR" | "CUSTOM" | "ALL";
  fromDate?: string;
  toDate?: string;
}

export class ReportService {
  /**
   * Validate submission inputs according to business rules:
   * Rule #10: Solved Qty + Pending Qty = Market Visit Finding Qty
   * Rule #12: Strictly NO LOC Visit Qty
   * Rule #15: Zero activity values are completely allowed
   */
  static validateReportInput(input: SubmitReportInput) {
    if (input.marketVisitQty < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Market Visit Quantity cannot be negative.",
      });
    }
    if (input.marketVisitFindingQty < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Market Visit Finding Quantity cannot be negative.",
      });
    }
    if (input.solvedQty < 0 || input.pendingQty < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Solved and Pending quantities cannot be negative.",
      });
    }

    // Solved + Pending must equal Finding Qty
    if (input.solvedQty + input.pendingQty !== input.marketVisitFindingQty) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Validation Failed: Solved Qty (${input.solvedQty}) + Pending Qty (${input.pendingQty}) must equal Market Visit Finding Qty (${input.marketVisitFindingQty}).`,
      });
    }

    if (input.locSubmittedQty < 0 || input.locFindingDayQty < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "LOC Submitted and LOC Finding Days cannot be negative.",
      });
    }

    if (input.dressCodeQty < 0 || input.dressCodeFindingQty < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Dress Code quantities cannot be negative.",
      });
    }

    if (input.messVisitQty < 0 || input.messVisitFindingQty < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Mess Visit quantities cannot be negative.",
      });
    }
  }

  /**
   * Submit or update weekly report
   */
  static async submitReport(input: SubmitReportInput) {
    this.validateReportInput(input);

    const user = await db.user.findUnique({
      where: { id: input.userId },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Office Manager user not found." });
    }

    const deadline = getFridayDeadline(input.year, input.month, input.week);
    const now = new Date();
    const isLate = isLateSubmission(now, deadline);
    const status = isLate ? "LATE_SUBMITTED" : "SUBMITTED";
    const monthYear = formatMonthYear(input.year, input.month);

    const report = await db.weeklyReport.upsert({
      where: {
        userId_year_month_week: {
          userId: input.userId,
          year: input.year,
          month: input.month,
          week: input.week,
        },
      },
      update: {
        marketVisitQty: input.marketVisitQty,
        marketVisitFindingQty: input.marketVisitFindingQty,
        solvedQty: input.solvedQty,
        pendingQty: input.pendingQty,
        locSubmittedQty: input.locSubmittedQty,
        locFindingDayQty: input.locFindingDayQty,
        dressCodeQty: input.dressCodeQty,
        dressCodeFindingQty: input.dressCodeFindingQty,
        messVisitQty: input.messVisitQty,
        messVisitFindingQty: input.messVisitFindingQty,
        notes: input.notes,
        status,
        submittedAt: now,
      },
      create: {
        userId: input.userId,
        year: input.year,
        month: input.month,
        week: input.week,
        monthYear,
        marketVisitQty: input.marketVisitQty,
        marketVisitFindingQty: input.marketVisitFindingQty,
        solvedQty: input.solvedQty,
        pendingQty: input.pendingQty,
        locSubmittedQty: input.locSubmittedQty,
        locFindingDayQty: input.locFindingDayQty,
        dressCodeQty: input.dressCodeQty,
        dressCodeFindingQty: input.dressCodeFindingQty,
        messVisitQty: input.messVisitQty,
        messVisitFindingQty: input.messVisitFindingQty,
        deadline,
        status,
        notes: input.notes,
        submittedAt: now,
      },
    });

    return report;
  }

  /**
   * Market Visit Finding Status Update (Requirement #11)
   * OM/Admin updates Solved and Pending quantities as findings get resolved.
   * Tracks audit history: Previous Status, New Status, Updated By, Timestamp.
   */
  static async updateFindingStatus(input: UpdateFindingStatusInput) {
    const report = await db.weeklyReport.findUnique({
      where: { id: input.reportId },
    });

    if (!report) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Weekly report not found." });
    }

    if (input.newSolved < 0 || input.newPending < 0) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Quantities cannot be negative." });
    }

    if (input.newSolved + input.newPending !== report.marketVisitFindingQty) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Validation Error: Solved (${input.newSolved}) + Pending (${input.newPending}) must equal Total Finding Qty (${report.marketVisitFindingQty}).`,
      });
    }

    // Record audit history
    await db.findingHistory.create({
      data: {
        reportId: report.id,
        updatedById: input.updatedById,
        previousSolved: report.solvedQty,
        newSolved: input.newSolved,
        previousPending: report.pendingQty,
        newPending: input.newPending,
        remark: input.remark,
      },
    });

    // Update report record
    const updated = await db.weeklyReport.update({
      where: { id: report.id },
      data: {
        solvedQty: input.newSolved,
        pendingQty: input.newPending,
      },
      include: {
        findingHistory: {
          include: {
            updatedBy: {
              select: { id: true, name: true, staffId: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return updated;
  }

  /**
   * Submission Tracking Matrix (Requirement #18)
   * Columns: Staff ID | Name | Zone | Week 1 | Week 2 | Week 3 | Week 4 | Total Submitted
   */
  static async getSubmissionTracking(year: number, month: number, zone?: string) {
    const whereUser: { role: string; status: string; zone?: string } = {
      role: "OM",
      status: "ACTIVE",
    };
    if (zone && zone !== "ALL") {
      whereUser.zone = zone;
    }

    const oms = await db.user.findMany({
      where: whereUser,
      orderBy: [{ zone: "asc" }, { staffId: "asc" }],
    });

    const reports = await db.weeklyReport.findMany({
      where: {
        year,
        month,
        user: whereUser,
      },
    });

    const reportMap = new Map<string, (typeof reports)[number]>();
    for (const r of reports) {
      reportMap.set(`${r.userId}_${r.week}`, r);
    }

    const now = new Date();
    const rows = oms.map((om) => {
      const weekStatuses: Record<number, { status: string; reportId?: string; submittedAt?: Date }> = {};
      let totalSubmitted = 0;

      for (let w = 1; w <= 4; w++) {
        const key = `${om.id}_${w}`;
        const rep = reportMap.get(key);
        const deadline = getFridayDeadline(year, month, w);

        if (rep) {
          weekStatuses[w] = {
            status: rep.status, // "SUBMITTED" | "LATE_SUBMITTED"
            reportId: rep.id,
            submittedAt: rep.submittedAt,
          };
          totalSubmitted++;
        } else {
          // No report entered yet
          const isPassed = now.getTime() > deadline.getTime();
          weekStatuses[w] = {
            status: isPassed ? "PENDING" : "NOT_YET_DUE",
          };
        }
      }

      return {
        userId: om.id,
        staffId: om.staffId,
        name: om.name,
        designation: om.designation,
        zone: om.zone,
        week1: weekStatuses[1],
        week2: weekStatuses[2],
        week3: weekStatuses[3],
        week4: weekStatuses[4],
        totalSubmitted,
      };
    });

    return {
      year,
      month,
      monthYear: formatMonthYear(year, month),
      rows,
    };
  }

  /**
   * Activity Summary Table (Requirements #19, #20, #21, #23, #24)
   * Aggregates activity quantities by selected filters and periods.
   */
  static async getActivitySummary(filter: ActivityFilterInput) {
    const userWhere: { role: string; zone?: string; id?: string } = {
      role: "OM",
    };
    if (filter.zone && filter.zone !== "ALL") {
      userWhere.zone = filter.zone;
    }
    if (filter.userId && filter.userId !== "ALL") {
      userWhere.id = filter.userId;
    }

    const oms = await db.user.findMany({
      where: userWhere,
      orderBy: [{ zone: "asc" }, { staffId: "asc" }],
    });

    // Build report where conditions based on period or month/week
    const reportWhere: Record<string, unknown> = {};

    if (filter.period === "CUSTOM" && filter.fromDate && filter.toDate) {
      reportWhere.submittedAt = {
        gte: new Date(filter.fromDate),
        lte: new Date(`${filter.toDate}T23:59:59.999Z`),
      };
    } else if (filter.period === "3_MONTHS" && filter.year && filter.month) {
      // 3 Months ending at filter.month
      const startMonth = Math.max(1, filter.month - 2);
      reportWhere.year = filter.year;
      reportWhere.month = { gte: startMonth, lte: filter.month };
    } else if (filter.period === "6_MONTHS" && filter.year && filter.month) {
      const startMonth = Math.max(1, filter.month - 5);
      reportWhere.year = filter.year;
      reportWhere.month = { gte: startMonth, lte: filter.month };
    } else if (filter.period === "1_YEAR" && filter.year) {
      reportWhere.year = filter.year;
    } else {
      // Standard Month + Week filtering
      if (filter.year) reportWhere.year = filter.year;
      if (filter.month) reportWhere.month = filter.month;
      if (filter.week && filter.week !== "all") {
        reportWhere.week = Number(filter.week);
      }
    }

    const reports = await db.weeklyReport.findMany({
      where: reportWhere,
    });

    // Group reports by userId
    const userReportsMap = new Map<string, typeof reports>();
    for (const r of reports) {
      const existing = userReportsMap.get(r.userId) ?? [];
      existing.push(r);
      userReportsMap.set(r.userId, existing);
    }

    const rows = oms.map((om) => {
      const omReports = userReportsMap.get(om.id) ?? [];

      const totalMarketVisit = omReports.reduce((sum, r) => sum + r.marketVisitQty, 0);
      const totalMarketFinding = omReports.reduce((sum, r) => sum + r.marketVisitFindingQty, 0);
      const totalSolved = omReports.reduce((sum, r) => sum + r.solvedQty, 0);
      const totalPending = omReports.reduce((sum, r) => sum + r.pendingQty, 0);

      const totalLocSubmitted = omReports.reduce((sum, r) => sum + r.locSubmittedQty, 0);
      const totalLocFindingDays = omReports.reduce((sum, r) => sum + r.locFindingDayQty, 0);

      const totalDressCode = omReports.reduce((sum, r) => sum + r.dressCodeQty, 0);
      const totalDressFinding = omReports.reduce((sum, r) => sum + r.dressCodeFindingQty, 0);

      const totalMessVisit = omReports.reduce((sum, r) => sum + r.messVisitQty, 0);
      const totalMessFinding = omReports.reduce((sum, r) => sum + r.messVisitFindingQty, 0);

      return {
        userId: om.id,
        staffId: om.staffId,
        name: om.name,
        designation: om.designation,
        zone: om.zone,
        submissionCount: omReports.length,
        marketVisitQty: totalMarketVisit,
        marketFinding: totalMarketFinding,
        solvedQty: totalSolved,
        pendingQty: totalPending,
        locSubmittedQty: totalLocSubmitted,
        locFindingDays: Number(totalLocFindingDays.toFixed(1)),
        dressCodeQty: totalDressCode,
        dressFinding: totalDressFinding,
        messVisitQty: totalMessVisit,
        messFinding: totalMessFinding,
      };
    });

    return rows;
  }
}
