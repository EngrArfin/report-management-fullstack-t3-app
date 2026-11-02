import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ReportService } from "~/server/services/reportService";
import { db } from "~/server/db";

export const reportRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        year: z.number().int().min(2020).max(2050),
        month: z.number().int().min(1).max(12),
        week: z.number().int().min(1).max(4),
        marketVisitQty: z.number().int().min(0),
        marketVisitFindingQty: z.number().int().min(0),
        solvedQty: z.number().int().min(0),
        pendingQty: z.number().int().min(0),
        locSubmittedQty: z.number().int().min(0),
        locFindingDayQty: z.number().min(0),
        dressCodeQty: z.number().int().min(0),
        dressCodeFindingQty: z.number().min(0),
        messVisitQty: z.number().int().min(0),
        messVisitFindingQty: z.number().min(0),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return ReportService.submitReport(input);
    }),

  updateFindingStatus: publicProcedure
    .input(
      z.object({
        reportId: z.string(),
        updatedById: z.string(),
        newSolved: z.number().int().min(0),
        newPending: z.number().int().min(0),
        remark: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return ReportService.updateFindingStatus(input);
    }),

  getSubmissionTracking: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(2020).max(2050),
        month: z.number().int().min(1).max(12),
        zone: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return ReportService.getSubmissionTracking(input.year, input.month, input.zone);
    }),

  getActivitySummary: publicProcedure
    .input(
      z.object({
        year: z.number().int().optional(),
        month: z.number().int().optional(),
        week: z.union([z.number().int(), z.literal("all")]).optional(),
        userId: z.string().optional(),
        zone: z.string().optional(),
        period: z.enum(["1_MONTH", "3_MONTHS", "6_MONTHS", "1_YEAR", "CUSTOM", "ALL"]).optional(),
        fromDate: z.string().optional(),
        toDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return ReportService.getActivitySummary(input);
    }),

  getReportById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return db.weeklyReport.findUnique({
        where: { id: input.id },
        include: {
          user: true,
          findingHistory: {
            include: {
              updatedBy: { select: { id: true, name: true, staffId: true } },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    }),

  getReportsByOm: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        year: z.number().int().optional(),
        month: z.number().int().optional(),
      })
    )
    .query(async ({ input }) => {
      const where: { userId: string; year?: number; month?: number } = {
        userId: input.userId,
      };
      if (input.year) where.year = input.year;
      if (input.month) where.month = input.month;

      return db.weeklyReport.findMany({
        where,
        include: {
          findingHistory: {
            include: { updatedBy: { select: { name: true, staffId: true } } },
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: [{ year: "desc" }, { month: "desc" }, { week: "asc" }],
      });
    }),
});

