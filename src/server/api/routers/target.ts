import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TargetService } from "~/server/services/targetService";
import { db } from "~/server/db";

export const targetRouter = createTRPCRouter({
  setTargets: publicProcedure
    .input(
      z.object({
        userIds: z.array(z.string()).min(1),
        year: z.number().int().min(2020).max(2050),
        month: z.number().int().min(1).max(12),
        locTarget: z.number().int().min(0),
        messVisitTarget: z.number().int().min(0),
        dressCodeTarget: z.number().int().min(0),
        isLocked: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return TargetService.setTargets(input);
    }),

  getMonthlyAchievement: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(2020).max(2050),
        month: z.number().int().min(1).max(12),
        zone: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return TargetService.getMonthlyAchievementSummary(input.year, input.month, input.zone);
    }),

  compareMonths: publicProcedure
    .input(
      z.object({
        year1: z.number().int(),
        month1: z.number().int(),
        year2: z.number().int(),
        month2: z.number().int(),
        userId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return TargetService.compareMonthsAchievement(
        input.year1,
        input.month1,
        input.year2,
        input.month2,
        input.userId
      );
    }),

  toggleLock: publicProcedure
    .input(
      z.object({
        targetId: z.string(),
        isLocked: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      return db.monthlyTarget.update({
        where: { id: input.targetId },
        data: { isLocked: input.isLocked },
      });
    }),
});

