import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { NotificationService } from "~/server/services/notificationService";

export const notificationRouter = createTRPCRouter({
  getConfig: publicProcedure.query(async () => {
    return NotificationService.getConfig();
  }),

  updateConfig: publicProcedure
    .input(
      z.object({
        subjectTemplate: z.string().min(1),
        bodyTemplate: z.string().min(1),
        ccRecipients: z.string(),
        bccRecipients: z.string().optional(),
        isActive: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      return NotificationService.updateConfig(input);
    }),

  getLogs: publicProcedure
    .input(
      z
        .object({
          year: z.number().int().optional(),
          month: z.number().int().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return NotificationService.getLogs(input?.year, input?.month);
    }),

  triggerDeadlineCheck: publicProcedure
    .input(
      z.object({
        year: z.number().int(),
        month: z.number().int(),
        week: z.number().int().min(1).max(4),
      })
    )
    .mutation(async ({ input }) => {
      return NotificationService.processMissedReportNotifications(
        input.year,
        input.month,
        input.week
      );
    }),
});

