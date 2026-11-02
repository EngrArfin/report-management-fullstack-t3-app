"use client";

import React from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import {
  IconCheck,
  IconClock,
  IconAlert,
  IconRefresh,
} from "./Icons";

export function DashboardView() {
  const { selectedYear, selectedMonth, selectedWeek, selectedZone, setActiveTab } =
    useApp();

  const { data, isLoading, refetch, isFetching } = api.dashboard.getMetrics.useQuery({
    year: selectedYear,
    month: selectedMonth,
    week: selectedWeek,
    zone: selectedZone,
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-sm">Calculating real-time report metrics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="p-8 text-center text-slate-400">No dashboard data available.</div>;
  }

  const { submission, activity, targetAchievement, omBreakdown, weeklyTrend } = data;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Executive Operations Dashboard
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            Period: <span className="font-semibold text-indigo-300">{data.monthYear}</span> • Week:{" "}
            <span className="font-semibold text-indigo-300">
              {selectedWeek === "all" ? "All Weeks (Combined)" : `Week ${selectedWeek}`}
            </span>{" "}
            • Zone:{" "}
            <span className="font-semibold text-indigo-300">
              {selectedZone === "ALL" ? "All Zones" : selectedZone}
            </span>
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* SECTION 1: Submission Status KPIs (Requirements #27, #54) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Section 1 — Submission Monitoring
          </h3>
          <span className="text-xs text-slate-500">
            Expected: {submission.expectedSubmissions} submissions
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {/* Total OM */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <span className="text-xs font-medium text-slate-400">Total OM</span>
            <div className="mt-2 text-2xl font-bold text-white">{submission.totalOm}</div>
            <span className="text-[11px] text-slate-500">Registered Office Managers</span>
          </div>

          {/* Submitted On Time */}
          <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-400">On Time</span>
              <IconCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-400">
              {submission.submitted}
            </div>
            <span className="text-[11px] text-emerald-500/80">Submitted before Friday 11:59 PM</span>
          </div>

          {/* Late Submitted */}
          <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-400">Late Submitted</span>
              <IconClock className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-400">{submission.late}</div>
            <span className="text-[11px] text-amber-500/80">After Friday deadline</span>
          </div>

          {/* Pending */}
          <div className="rounded-xl border border-rose-900/30 bg-rose-950/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-rose-400">Pending</span>
              <IconAlert className="h-4 w-4 text-rose-400" />
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-400">{submission.pending}</div>
            <span className="text-[11px] text-rose-500/80">Missing / Overdue</span>
          </div>

          {/* Submission Rate */}
          <div className="col-span-2 rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-4 sm:col-span-1">
            <span className="text-xs font-medium text-indigo-300">Submission Rate</span>
            <div className="mt-2 text-2xl font-bold text-indigo-300">
              {submission.submissionRate}%
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${Math.min(100, submission.submissionRate)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Activity Summary (Requirement #28, #54) */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Section 2 — Core Activity Breakdown
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Market Visit */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-semibold text-white">1. Market Visit</span>
              <span className="rounded bg-sky-500/10 px-2 py-0.5 text-xs font-bold text-sky-400">
                MV
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Total Visits:</span>
              <span className="text-xl font-bold text-white">{activity.marketVisit}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Findings Discovered:</span>
              <span className="text-base font-semibold text-amber-400">
                {activity.marketFinding}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-2 text-xs">
              <div className="rounded bg-emerald-950/30 p-1.5 text-center text-emerald-400">
                <span className="block text-[10px] text-slate-400">Solved</span>
                <span className="font-bold">{activity.solved}</span>
              </div>
              <div className="rounded bg-rose-950/30 p-1.5 text-center text-rose-400">
                <span className="block text-[10px] text-slate-400">Pending</span>
                <span className="font-bold">{activity.pendingFinding}</span>
              </div>
            </div>
          </div>

          {/* Location Tracking (LOC) */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-semibold text-white">2. Location Tracking</span>
              <span className="rounded bg-purple-500/10 px-2 py-0.5 text-xs font-bold text-purple-400">
                LOC
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">LOC Submitted Qty:</span>
              <span className="text-xl font-bold text-white">{activity.locSubmitted}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">LOC Finding Days:</span>
              <span className="text-base font-semibold text-purple-400">
                {activity.locFindingDays} days
              </span>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              * Per standard spec: LOC Visit field is strictly excluded.
            </p>
          </div>

          {/* Dress Code */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-semibold text-white">3. Dress Code</span>
              <span className="rounded bg-teal-500/10 px-2 py-0.5 text-xs font-bold text-teal-400">
                DC
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Dress Code Qty:</span>
              <span className="text-xl font-bold text-white">{activity.dressCode}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Dress Finding Qty:</span>
              <span className="text-base font-semibold text-amber-400">
                {activity.dressFinding}
              </span>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              Uniform and field appearance compliance monitoring.
            </p>
          </div>

          {/* Mess Visit */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-semibold text-white">4. Mess Visit</span>
              <span className="rounded bg-rose-500/10 px-2 py-0.5 text-xs font-bold text-rose-400">
                MV
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Mess Visit Qty:</span>
              <span className="text-xl font-bold text-white">{activity.messVisit}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Mess Finding Qty:</span>
              <span className="text-base font-semibold text-amber-400">
                {activity.messFinding}
              </span>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              Staff accommodation inspection & issue tracking.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Target vs Achievement (Requirement #33-36, #54) */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Section 3 — Monthly Target vs Achievement
            </h3>
            <p className="text-xs text-slate-400">
              Auto-calculated formula: (Achieved Qty ÷ Target Qty) × 100
            </p>
          </div>
          <button
            onClick={() => setActiveTab("target")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Manage Targets & Rankings →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {/* Overall Achievement Gauge */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-slate-800/40 p-4 text-center">
            <span className="text-xs font-medium text-slate-400">Overall Achievement</span>
            <div className="my-2 text-3xl font-extrabold text-indigo-400">
              {targetAchievement.overallPct}%
            </div>
            <span className="text-[11px] text-slate-500">Cumulative Target Weight</span>
          </div>

          {/* LOC Progress */}
          <div className="rounded-xl bg-slate-800/40 p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">LOC Submitted</span>
              <span className="font-bold text-purple-400">{targetAchievement.locPct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${Math.min(100, targetAchievement.locPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Target: {targetAchievement.locTarget}</span>
              <span>Achieved: {targetAchievement.locAchieved}</span>
            </div>
          </div>

          {/* Mess Visit Progress */}
          <div className="rounded-xl bg-slate-800/40 p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">Mess Visit</span>
              <span className="font-bold text-rose-400">{targetAchievement.messPct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full bg-rose-500"
                style={{ width: `${Math.min(100, targetAchievement.messPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Target: {targetAchievement.messTarget}</span>
              <span>Achieved: {targetAchievement.messAchieved}</span>
            </div>
          </div>

          {/* Dress Code Progress */}
          <div className="rounded-xl bg-slate-800/40 p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">Dress Code</span>
              <span className="font-bold text-teal-400">{targetAchievement.dressPct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full bg-teal-500"
                style={{ width: `${Math.min(100, targetAchievement.dressPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Target: {targetAchievement.dressTarget}</span>
              <span>Achieved: {targetAchievement.dressAchieved}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OM-wise Performance Table (Requirement #29, #54) */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Section 4 — OM-wise Performance</h3>
            <p className="text-xs text-slate-400">
              Activity quantity submitted by each Office Manager for current filter
            </p>
          </div>
          <button
            onClick={() => setActiveTab("activity")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            View Full Activity Summary →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Staff ID</th>
                <th className="py-2.5 px-3 font-semibold">Name</th>
                <th className="py-2.5 px-3 font-semibold">Zone</th>
                <th className="py-2.5 px-3 font-semibold text-center">Submissions</th>
                <th className="py-2.5 px-3 font-semibold text-right">Market Visit</th>
                <th className="py-2.5 px-3 font-semibold text-right">MV Finding</th>
                <th className="py-2.5 px-3 font-semibold text-right">LOC Submitted</th>
                <th className="py-2.5 px-3 font-semibold text-right">LOC Finding Days</th>
                <th className="py-2.5 px-3 font-semibold text-right">Dress Code</th>
                <th className="py-2.5 px-3 font-semibold text-right">Mess Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {omBreakdown.map((om) => (
                <tr key={om.userId} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-mono text-indigo-300">{om.staffId}</td>
                  <td className="py-2.5 px-3 font-medium text-white">{om.name}</td>
                  <td className="py-2.5 px-3 text-slate-400">{om.zone}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                      {om.submissionCount}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-200">{om.marketVisit}</td>
                  <td className="py-2.5 px-3 text-right text-amber-400 font-medium">
                    {om.marketFinding}
                  </td>
                  <td className="py-2.5 px-3 text-right text-purple-300 font-medium">{om.loc}</td>
                  <td className="py-2.5 px-3 text-right text-slate-400">{om.locFindingDays}</td>
                  <td className="py-2.5 px-3 text-right text-teal-300">{om.dressCode}</td>
                  <td className="py-2.5 px-3 text-right text-rose-300">{om.messVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: Weekly Trend (Requirement #54) */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-4">
        <h3 className="text-base font-bold text-white">
          Section 5 — Weekly Trend Progression ({data.monthYear})
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          {weeklyTrend.map((t) => (
            <div key={t.week} className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <span className="font-bold text-indigo-300">{t.week}</span>
                <span className="text-[11px] text-slate-400">
                  {t.submittedCount} OM Submitted
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Market Visits:</span>
                  <span className="font-semibold">{t.marketVisit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">LOC Submitted:</span>
                  <span className="font-semibold text-purple-300">{t.locSubmitted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dress Code:</span>
                  <span className="font-semibold text-teal-300">{t.dressCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mess Visits:</span>
                  <span className="font-semibold text-rose-300">{t.messVisit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
