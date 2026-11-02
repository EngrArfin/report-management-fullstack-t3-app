/**
 * Target Service for Office Manager Weekly Reporting
 * Handles monthly target setting (single or bulk), Target vs Achievement calculations,
 * OM performance comparisons, rankings, and month-over-month trends.
 */

import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { formatMonthYear } from "./deadlineService";

export interface SetTargetInput {
  userIds: string[]; // Support single OM or bulk multiple OMs (#32, #39)
  year: number;
  month: number;
  locTarget: number;
  messVisitTarget: number;
  dressCodeTarget: number;
  isLocked?: boolean;
}

export class TargetService {
  /**
   * Set or update monthly targets for one or multiple OMs
   */
  static async setTargets(input: SetTargetInput) {
    if (input.locTarget < 0 || input.messVisitTarget < 0 || input.dressCodeTarget < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Target quantities cannot be negative.",
      });
    }

    const monthYear = formatMonthYear(input.year, input.month);
    const results = [];

    for (const userId of input.userIds) {
      // Check if target is locked (Rule #39: approved historical target preserved)
      const existing = await db.monthlyTarget.findUnique({
        where: {
          userId_year_month: {
            userId,
            year: input.year,
            month: input.month,
          },
        },
      });

      if (existing?.isLocked && input.isLocked === undefined) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `Target for ${monthYear} is approved and locked. Unlock before modifying.`,
        });
      }

      const saved = await db.monthlyTarget.upsert({
        where: {
          userId_year_month: {
            userId,
            year: input.year,
            month: input.month,
          },
        },
        update: {
          locTarget: input.locTarget,
          messVisitTarget: input.messVisitTarget,
          dressCodeTarget: input.dressCodeTarget,
          isLocked: input.isLocked ?? existing?.isLocked ?? false,
        },
        create: {
          userId,
          year: input.year,
          month: input.month,
          monthYear,
          locTarget: input.locTarget,
          messVisitTarget: input.messVisitTarget,
          dressCodeTarget: input.dressCodeTarget,
          isLocked: input.isLocked ?? false,
        },
      });
      results.push(saved);
    }

    return results;
  }

  /**
   * Calculate Target vs Achievement for a given month
   * Requirements #33, #34, #35
   */
  static async getMonthlyAchievementSummary(year: number, month: number, zone?: string) {
    const userWhere: { role: string; status: string; zone?: string } = {
      role: "OM",
      status: "ACTIVE",
    };
    if (zone && zone !== "ALL") {
      userWhere.zone = zone;
    }

    const oms = await db.user.findMany({
      where: userWhere,
      include: {
        targets: {
          where: { year, month },
        },
        reports: {
          where: { year, month },
        },
      },
      orderBy: [{ zone: "asc" }, { staffId: "asc" }],
    });

    const rows = oms.map((om) => {
      const target = om.targets[0];
      const reports = om.reports;

      // Sum of achieved quantities from weekly reports
      const achievedLoc = reports.reduce((s, r) => s + r.locSubmittedQty, 0);
      const achievedMess = reports.reduce((s, r) => s + r.messVisitQty, 0);
      const achievedDress = reports.reduce((s, r) => s + r.dressCodeQty, 0);

      const targetLoc = target?.locTarget ?? 0;
      const targetMess = target?.messVisitTarget ?? 0;
      const targetDress = target?.dressCodeTarget ?? 0;

      // Calculate percentage: (Achieved / Target) * 100
      const calcPct = (achieved: number, targetVal: number) => {
        if (!targetVal || targetVal <= 0) return achieved > 0 ? 100 : 0;
        return Number(((achieved / targetVal) * 100).toFixed(1));
      };

      const locPct = calcPct(achievedLoc, targetLoc);
      const messPct = calcPct(achievedMess, targetMess);
      const dressPct = calcPct(achievedDress, targetDress);

      // Overall Achievement = average of the 3 activity achievement percentages
      const overallPct = Number(((locPct + messPct + dressPct) / 3).toFixed(1));

      return {
        userId: om.id,
        staffId: om.staffId,
        name: om.name,
        designation: om.designation,
        zone: om.zone,
        hasTargetSet: !!target,
        isLocked: target?.isLocked ?? false,
        // LOC
        targetLoc,
        achievedLoc,
        locPct,
        // Mess Visit
        targetMess,
        achievedMess,
        messPct,
        // Dress Code
        targetDress,
        achievedDress,
        dressPct,
        // Overall
        overallPct,
      };
    });

    // Requirement #38: OM Performance Comparison / Ranking
    // Sort by overallPct descending and assign ranks
    const rankedRows = [...rows]
      .sort((a, b) => b.overallPct - a.overallPct)
      .map((row, index) => ({
        ...row,
        rank: index + 1,
      }));

    return {
      year,
      month,
      monthYear: formatMonthYear(year, month),
      rows: rankedRows,
    };
  }

  /**
   * Month-wise Achievement Comparison (Requirement #37)
   * e.g., compare Month 1 (August) vs Month 2 (September)
   */
  static async compareMonthsAchievement(
    year1: number,
    month1: number,
    year2: number,
    month2: number,
    userId?: string
  ) {
    const summary1 = await this.getMonthlyAchievementSummary(year1, month1);
    const summary2 = await this.getMonthlyAchievementSummary(year2, month2);

    const rows1 = userId ? summary1.rows.filter((r) => r.userId === userId) : summary1.rows;
    const rows2 = userId ? summary2.rows.filter((r) => r.userId === userId) : summary2.rows;

    const map2 = new Map(rows2.map((r) => [r.userId, r]));

    const comparisons = rows1.map((r1) => {
      const r2 = map2.get(r1.userId);
      return {
        userId: r1.userId,
        staffId: r1.staffId,
        name: r1.name,
        zone: r1.zone,
        month1: {
          label: summary1.monthYear,
          overallPct: r1.overallPct,
          locPct: r1.locPct,
          messPct: r1.messPct,
          dressPct: r1.dressPct,
        },
        month2: {
          label: summary2.monthYear,
          overallPct: r2?.overallPct ?? 0,
          locPct: r2?.locPct ?? 0,
          messPct: r2?.messPct ?? 0,
          dressPct: r2?.dressPct ?? 0,
        },
        diffPct: Number(((r2?.overallPct ?? 0) - r1.overallPct).toFixed(1)),
      };
    });

    return {
      period1: summary1.monthYear,
      period2: summary2.monthYear,
      comparisons,
    };
  }
}

