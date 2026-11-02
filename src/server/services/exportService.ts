/**
 * Export Service for Office Manager Weekly Reporting
 * 
 * Generates official Excel/CSV data structure with the exact 18 columns
 * specified in Requirement #47.
 */

import { db } from "~/server/db";

export interface ExportFilterInput {
  year?: number;
  month?: number;
  week?: number | "all";
  userId?: string;
  zone?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export class ExportService {
  /**
   * Fetch and format reports according to Requirement #47 columns
   */
  static async getExportData(filter: ExportFilterInput) {
    const where: Record<string, unknown> = {};

    if (filter.year) where.year = filter.year;
    if (filter.month) where.month = filter.month;
    if (filter.week && filter.week !== "all") {
      where.week = Number(filter.week);
    }
    if (filter.status && filter.status !== "ALL") {
      where.status = filter.status;
    }

    if (filter.fromDate && filter.toDate) {
      where.submittedAt = {
        gte: new Date(filter.fromDate),
        lte: new Date(`${filter.toDate}T23:59:59.999Z`),
      };
    }

    const userWhere: Record<string, unknown> = {
      role: "OM",
    };
    if (filter.zone && filter.zone !== "ALL") {
      userWhere.zone = filter.zone;
    }
    if (filter.userId && filter.userId !== "ALL") {
      userWhere.id = filter.userId;
    }

    where.user = userWhere;

    const reports = await db.weeklyReport.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: [
        { year: "desc" },
        { month: "desc" },
        { week: "asc" },
        { user: { zone: "asc" } },
        { user: { staffId: "asc" } },
      ],
    });

    // Exact 18 columns format
    const rows = reports.map((r) => ({
      staffId: r.user.staffId,
      name: r.user.name,
      designation: r.user.designation,
      zone: r.user.zone,
      month: r.monthYear,
      week: `Week ${r.week}`,
      marketVisitQty: r.marketVisitQty,
      marketFinding: r.marketVisitFindingQty,
      solved: r.solvedQty,
      pending: r.pendingQty,
      locSubmittedQty: r.locSubmittedQty,
      locFindingDays: r.locFindingDayQty,
      dressCodeQty: r.dressCodeQty,
      dressFinding: r.dressCodeFindingQty,
      messVisitQty: r.messVisitQty,
      messFinding: r.messVisitFindingQty,
      submissionDate: r.submittedAt.toISOString().split("T")[0],
      submissionTime: r.submittedAt.toLocaleTimeString(),
      status: r.status,
    }));

    return rows;
  }

  /**
   * Generate CSV format string ready for download
   */
  static generateCsv(rows: Awaited<ReturnType<typeof this.getExportData>>): string {
    const headers = [
      "Staff ID",
      "Name",
      "Designation",
      "Zone",
      "Month",
      "Week",
      "Market Visit Qty",
      "Market Finding",
      "Solved",
      "Pending",
      "LOC Submitted Qty",
      "LOC Finding Days",
      "Dress Code Qty",
      "Dress Code Finding",
      "Mess Visit Qty",
      "Mess Finding",
      "Submission Date",
      "Status",
    ];

    const escape = (val: string | number | null | undefined) => {
      if (val === null || val === undefined) return '""';
      const str = (typeof val === "string" ? val : String(val)).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvLines = [headers.map(escape).join(",")];

    for (const r of rows) {
      csvLines.push(
        [
          r.staffId,
          r.name,
          r.designation,
          r.zone,
          r.month,
          r.week,
          r.marketVisitQty,
          r.marketFinding,
          r.solved,
          r.pending,
          r.locSubmittedQty,
          r.locFindingDays,
          r.dressCodeQty,
          r.dressFinding,
          r.messVisitQty,
          r.messFinding,
          r.submissionDate,
          r.status,
        ]
          .map(escape)
          .join(",")
      );
    }

    return csvLines.join("\r\n");
  }
}
