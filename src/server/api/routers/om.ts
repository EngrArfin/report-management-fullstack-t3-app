import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";

export const omRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          zone: z.string().optional(),
          status: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const where: { role: string; zone?: string; status?: string } = {
        role: "OM",
      };
      if (input?.zone && input.zone !== "ALL") where.zone = input.zone;
      if (input?.status && input.status !== "ALL") where.status = input.status;

      return db.user.findMany({
        where,
        orderBy: [{ zone: "asc" }, { staffId: "asc" }],
      });
    }),

  getZones: publicProcedure.query(async () => {
    return db.zone.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        staffId: z.string().min(1, "Staff ID is required"),
        name: z.string().min(1, "Name is required"),
        designation: z.string().min(1, "Designation is required"),
        zone: z.string().min(1, "Zone is required"),
        email: z.string().email("Valid email is required"),
        mobile: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const existing = await db.user.findFirst({
        where: {
          OR: [{ staffId: input.staffId }, { email: input.email }],
        },
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An Office Manager with this Staff ID or Email already exists.",
        });
      }

      return db.user.create({
        data: {
          ...input,
          role: "OM",
          status: "ACTIVE",
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        designation: z.string().min(1),
        zone: z.string().min(1),
        email: z.string().email(),
        mobile: z.string().optional(),
        status: z.enum(["ACTIVE", "INACTIVE"]),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return db.user.update({
        where: { id },
        data,
      });
    }),

  toggleStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["ACTIVE", "INACTIVE"]),
      })
    )
    .mutation(async ({ input }) => {
      return db.user.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  createZone: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        code: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return db.zone.upsert({
        where: { name: input.name },
        update: { isActive: true },
        create: input,
      });
    }),
});

