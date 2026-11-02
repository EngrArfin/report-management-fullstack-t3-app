import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ExportService } from "~/server/services/exportService";

export const exportRouter = createTRPCRouter({
  getData: publicProcedure
    .input(
      z.object({
        year: z.number().int().optional(),
        month: z.number().int().optional(),
        week: z.union([z.number().int(), z.literal("all")]).optional(),
        userId: z.string().optional(),
        zone: z.string().optional(),
        status: z.string().optional(),
        fromDate: z.string().optional(),
        toDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return ExportService.getExportData(input);
    }),

  getCsv: publicProcedure
    .input(
      z.object({
        year: z.number().int().optional(),
        month: z.number().int().optional(),
        week: z.union([z.number().int(), z.literal("all")]).optional(),
        userId: z.string().optional(),
        zone: z.string().optional(),
        status: z.string().optional(),
        fromDate: z.string().optional(),
        toDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const data = await ExportService.getExportData(input);
      return ExportService.generateCsv(data);
    }),
});

