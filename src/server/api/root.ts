import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { reportRouter } from "~/server/api/routers/report";
import { targetRouter } from "~/server/api/routers/target";
import { omRouter } from "~/server/api/routers/om";
import { dashboardRouter } from "~/server/api/routers/dashboard";
import { notificationRouter } from "~/server/api/routers/notification";
import { exportRouter } from "~/server/api/routers/export";

/**
 * Primary tRPC router for Office Manager (OM) Weekly Report Management System.
 */
export const appRouter = createTRPCRouter({
  report: reportRouter,
  target: targetRouter,
  om: omRouter,
  dashboard: dashboardRouter,
  notification: notificationRouter,
  export: exportRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Server-side caller factory
 */
export const createCaller = createCallerFactory(appRouter);
