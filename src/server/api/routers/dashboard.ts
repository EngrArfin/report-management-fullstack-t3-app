import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { formatMonthYear } from "~/server/services/deadlineService";

export const dashboardRouter = createTRPCRouter({
  getMetrics: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(2020).max(2050),
        month: z.number().int().min(1).max(12),
        week: z.union([z.number().int().min(1).max(4), z.literal("all")]),
        zone: z.string().optional(),
        period: z.enum(["1_MONTH", "3_MONTHS", "6_MONTHS", "1_YEAR", "CUSTOM", "ALL"]).optional(),
        fromDate: z.string().optional(),
        toDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const userWhere: { role: string; status: string; zone?: string } = {
        role: "OM",
        status: "ACTIVE",
      };
      if (input.zone && input.zone !== "ALL") {
        userWhere.zone = input.zone;
      }

      // Total active OMs
      const totalOmCount = await db.user.count({ where: userWhere });
      const activeOms = await db.user.findMany({
        where: userWhere,
        select: { id: true, staffId: true, name: true, zone: true },
      });

      // Filter reports
      const reportWhere: Record<string, unknown> = {
        user: userWhere,
      };

      if (input.period === "CUSTOM" && input.fromDate && input.toDate) {
        reportWhere.submittedAt = {
          gte: new Date(input.fromDate),
          lte: new Date(`${input.toDate}T23:59:59.999Z`),
        };
      } else if (input.period === "3_MONTHS") {
        const startMonth = Math.max(1, input.month - 2);
        reportWhere.year = input.year;
        reportWhere.month = { gte: startMonth, lte: input.month };
      } else if (input.period === "6_MONTHS") {
        const startMonth = Math.max(1, input.month - 5);
        reportWhere.year = input.year;
        reportWhere.month = { gte: startMonth, lte: input.month };
      } else if (input.period === "1_YEAR") {
        reportWhere.year = input.year;
      } else {
        reportWhere.year = input.year;
        reportWhere.month = input.month;
        if (input.week !== "all") {
          reportWhere.week = Number(input.week);
        }
      }

      const reports = await db.weeklyReport.findMany({
        where: reportWhere,
        include: { user: true },
      });

      // Section 1: Submission KPIs (Requirement #27, #54)
      const submittedReportsCount = reports.filter((r) => r.status === "SUBMITTED").length;
      const lateReportsCount = reports.filter((r) => r.status === "LATE_SUBMITTED").length;
      const totalSubmittedCount = submittedReportsCount + lateReportsCount;

      // Expected total submissions
      const weeksMultiplier = input.week === "all" ? 4 : 1;
      const expectedSubmissions = totalOmCount * weeksMultiplier;
      const pendingCount = Math.max(0, expectedSubmissions - totalSubmittedCount);
      const submissionRate =
        expectedSubmissions > 0
          ? Number(((totalSubmittedCount / expectedSubmissions) * 100).toFixed(1))
          : 0;

      // Section 2: Activity Summary KPIs (Requirement #28, #54)
      const totalMarketVisit = reports.reduce((s, r) => s + r.marketVisitQty, 0);
      const totalMarketFinding = reports.reduce((s, r) => s + r.marketVisitFindingQty, 0);
      const totalSolved = reports.reduce((s, r) => s + r.solvedQty, 0);
      const totalPendingFinding = reports.reduce((s, r) => s + r.pendingQty, 0);

      const totalLocSubmitted = reports.reduce((s, r) => s + r.locSubmittedQty, 0);
      const totalLocFindingDays = Number(
        reports.reduce((s, r) => s + r.locFindingDayQty, 0).toFixed(1)
      );

      const totalDressCode = reports.reduce((s, r) => s + r.dressCodeQty, 0);
      const totalDressFinding = reports.reduce((s, r) => s + r.dressCodeFindingQty, 0);

      const totalMessVisit = reports.reduce((s, r) => s + r.messVisitQty, 0);
      const totalMessFinding = reports.reduce((s, r) => s + r.messVisitFindingQty, 0);

      // Section 3: Target Achievement overview for this month
      const targets = await db.monthlyTarget.findMany({
        where: {
          year: input.year,
          month: input.month,
          user: userWhere,
        },
      });

      const totalLocTarget = targets.reduce((s, t) => s + t.locTarget, 0);
      const totalMessTarget = targets.reduce((s, t) => s + t.messVisitTarget, 0);
      const totalDressTarget = targets.reduce((s, t) => s + t.dressCodeTarget, 0);

      const calcPct = (achieved: number, target: number) =>
        target > 0 ? Number(((achieved / target) * 100).toFixed(1)) : 0;

      const locAchievementPct = calcPct(totalLocSubmitted, totalLocTarget);
      const messAchievementPct = calcPct(totalMessVisit, totalMessTarget);
      const dressAchievementPct = calcPct(totalDressCode, totalDressTarget);
      const overallAchievementPct = Number(
        ((locAchievementPct + messAchievementPct + dressAchievementPct) / 3).toFixed(1)
      );

      // Section 4: OM-wise breakdown (Requirement #29)
      const userReportsMap = new Map<string, typeof reports>();
      for (const r of reports) {
        const list = userReportsMap.get(r.userId) ?? [];
        list.push(r);
        userReportsMap.set(r.userId, list);
      }

      const omBreakdown = activeOms.map((om) => {
        const omReps = userReportsMap.get(om.id) ?? [];
        const mv = omReps.reduce((s, r) => s + r.marketVisitQty, 0);
        const mf = omReps.reduce((s, r) => s + r.marketVisitFindingQty, 0);
        const loc = omReps.reduce((s, r) => s + r.locSubmittedQty, 0);
        const locDays = omReps.reduce((s, r) => s + r.locFindingDayQty, 0);
        const dress = omReps.reduce((s, r) => s + r.dressCodeQty, 0);
        const mess = omReps.reduce((s, r) => s + r.messVisitQty, 0);

        return {
          userId: om.id,
          staffId: om.staffId,
          name: om.name,
          zone: om.zone,
          submissionCount: omReps.length,
          marketVisit: mv,
          marketFinding: mf,
          loc,
          locFindingDays: locDays,
          dressCode: dress,
          messVisit: mess,
        };
      });

      // Section 5: Week-by-Week Trend (Requirement #54)
      const weeklyTrend = [1, 2, 3, 4].map((w) => {
        const weekReps = reports.filter((r) => r.week === w);
        return {
          week: `Week ${w}`,
          submittedCount: weekReps.length,
          marketVisit: weekReps.reduce((s, r) => s + r.marketVisitQty, 0),
          locSubmitted: weekReps.reduce((s, r) => s + r.locSubmittedQty, 0),
          dressCode: weekReps.reduce((s, r) => s + r.dressCodeQty, 0),
          messVisit: weekReps.reduce((s, r) => s + r.messVisitQty, 0),
        };
      });

      return {
        monthYear: formatMonthYear(input.year, input.month),
        // Section 1
        submission: {
          totalOm: totalOmCount,
          expectedSubmissions,
          submitted: submittedReportsCount,
          late: lateReportsCount,
          totalSubmitted: totalSubmittedCount,
          pending: pendingCount,
          submissionRate,
        },
        // Section 2
        activity: {
          marketVisit: totalMarketVisit,
          marketFinding: totalMarketFinding,
          solved: totalSolved,
          pendingFinding: totalPendingFinding,
          locSubmitted: totalLocSubmitted,
          locFindingDays: totalLocFindingDays,
          dressCode: totalDressCode,
          dressFinding: totalDressFinding,
          messVisit: totalMessVisit,
          messFinding: totalMessFinding,
        },
        // Section 3
        targetAchievement: {
          locTarget: totalLocTarget,
          locAchieved: totalLocSubmitted,
          locPct: locAchievementPct,
          messTarget: totalMessTarget,
          messAchieved: totalMessVisit,
          messPct: messAchievementPct,
          dressTarget: totalDressTarget,
          dressAchieved: totalDressCode,
          dressPct: dressAchievementPct,
          overallPct: overallAchievementPct,
        },
        // Section 4
        omBreakdown,
        // Section 5
        weeklyTrend,
      };
    }),
});
