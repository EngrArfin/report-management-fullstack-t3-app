"use client";

import React from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import {
  IconCheck,
  IconClock,
  IconAlert,
  IconRefresh,
  IconTarget,
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
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-slate-400 backdrop-blur-md">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent shadow-lg shadow-indigo-500/20" />
          <p className="text-xs font-semibold text-slate-300">Calculating real-time operational metrics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
        No dashboard metrics available for this period.
      </div>
    );
  }

  const { submission, activity, targetAchievement, omBreakdown, weeklyTrend } = data;

  return (
    <div className="space-y-6 pb-16">
      {/* SECTION 1: Submission Monitoring KPIs (Requirements #27, #54) */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Section 1 — Submission Compliance & Status
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Expected Total:</span>
            <span className="rounded-md bg-slate-800 px-2 py-0.5 font-bold text-slate-300">
              {submission.expectedSubmissions} reports
            </span>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-400 hover:text-white transition"
              title="Refresh Data"
            >
              <IconRefresh className={`h-3 w-3 ${isFetching ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Responsive KPI Grid: 1 col on mobile, 2 on sm, 3 on md, 5 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Total OM */}
          <div className="glass-card rounded-2xl p-4.5 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Total Registered OM</span>
              <span className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                Active
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {submission.totalOm}
              </span>
              <span className="text-xs text-slate-500">Personnel</span>
            </div>
            <span className="mt-2 block text-[11px] text-slate-500">
              Assigned across regional zones
            </span>
          </div>

          {/* Submitted On Time */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/60 to-slate-950 p-4.5 shadow-sm hover:border-emerald-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-300">Submitted On Time</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <IconCheck className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                {submission.submitted}
              </span>
              <span className="text-xs text-emerald-500/80">Submitted</span>
            </div>
            <span className="mt-2 block text-[11px] text-emerald-500/80">
              Before Friday 11:59 PM deadline
            </span>
          </div>

          {/* Late Submitted */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-slate-950 p-4.5 shadow-sm hover:border-amber-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300">Late Submitted</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                <IconClock className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400 tracking-tight">
                {submission.late}
              </span>
              <span className="text-xs text-amber-500/80">Late Submissions</span>
            </div>
            <span className="mt-2 block text-[11px] text-amber-500/80">
              Submitted past Friday 11:59 PM
            </span>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-950/30 via-slate-900/60 to-slate-950 p-4.5 shadow-sm hover:border-rose-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-300">Pending / Overdue</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400">
                <IconAlert className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-400 tracking-tight">
                {submission.pending}
              </span>
              <span className="text-xs text-rose-500/80">Unsubmitted</span>
            </div>
            <span className="mt-2 block text-[11px] text-rose-500/80">
              Triggered automated notification
            </span>
          </div>

          {/* Submission Rate % */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1 rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/40 via-slate-900/70 to-slate-950 p-4.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-300">Submission Rate</span>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                Rate %
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {submission.submissionRate}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-700"
                style={{ width: `${Math.min(100, submission.submissionRate)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Core Activity Breakdown (Requirements #28, #54) */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Section 2 — Core Weekly Activity Aggregations ({data.monthYear})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Market Visit Card */}
          <div className="glass-panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 text-xs font-bold">
                  MV
                </span>
                <span className="font-bold text-white text-sm">1. Market Visit</span>
              </div>
              <span className="text-[10px] font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                Activity
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400 font-medium">Total Market Visits:</span>
              <span className="text-2xl font-extrabold text-white">{activity.marketVisit}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Market Findings:</span>
              <span className="text-lg font-bold text-amber-400">{activity.marketFinding}</span>
            </div>

            {/* Solved vs Pending Meter */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 space-y-1.5">
              <div className="flex justify-between text-[11px] font-medium">
                <span className="text-emerald-400">Solved: {activity.solved}</span>
                <span className="text-rose-400">Pending: {activity.pendingFinding}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-rose-950/60">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${
                      activity.marketFinding > 0
                        ? (activity.solved / activity.marketFinding) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="text-[10px] text-slate-500 block text-center">
                Rule: Solved + Pending = Findings
              </span>
            </div>
          </div>

          {/* 2. Location Tracking (LOC) */}
          <div className="glass-panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 text-xs font-bold">
                  LOC
                </span>
                <span className="font-bold text-white text-sm">2. Location Tracking</span>
              </div>
              <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                GPS
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400 font-medium">LOC Submitted Qty:</span>
              <span className="text-2xl font-extrabold text-white">{activity.locSubmitted}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">LOC Finding Days:</span>
              <span className="text-lg font-bold text-purple-400">
                {activity.locFindingDays} days
              </span>
            </div>

            <div className="rounded-xl border border-purple-900/30 bg-purple-950/15 p-2.5 text-[11px] text-slate-400">
              <span className="font-semibold text-purple-300">Policy Adherence:</span> Strictly NO
              &ldquo;LOC Visit Qty&rdquo; field in system.
            </div>
          </div>

          {/* 3. Dress Code Card */}
          <div className="glass-panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 text-xs font-bold">
                  DC
                </span>
                <span className="font-bold text-white text-sm">3. Dress Code</span>
              </div>
              <span className="text-[10px] font-semibold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                Audit
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400 font-medium">Dress Code Qty:</span>
              <span className="text-2xl font-extrabold text-white">{activity.dressCode}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Dress Finding Qty:</span>
              <span className="text-lg font-bold text-amber-400">{activity.dressFinding}</span>
            </div>

            <div className="rounded-xl border border-teal-900/30 bg-teal-950/15 p-2.5 text-[11px] text-slate-400">
              Field attire compliance, ID badge inspection & uniform protocol.
            </div>
          </div>

          {/* 4. Mess Visit Card */}
          <div className="glass-panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 text-xs font-bold">
                  MV
                </span>
                <span className="font-bold text-white text-sm">4. Mess Visit</span>
              </div>
              <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                Facility
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400 font-medium">Mess Visit Qty:</span>
              <span className="text-2xl font-extrabold text-white">{activity.messVisit}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Mess Finding Qty:</span>
              <span className="text-lg font-bold text-amber-400">{activity.messFinding}</span>
            </div>

            <div className="rounded-xl border border-rose-900/30 bg-rose-950/15 p-2.5 text-[11px] text-slate-400">
              Staff accommodation maintenance, hygiene & safety review.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Monthly Target vs Achievement (Requirement #33-36, #54) */}
      <section className="glass-panel rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
              <IconTarget className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Section 3 — Target vs Achievement Governance
              </h3>
              <p className="text-[11px] text-slate-400">
                Formula: (Achieved Qty ÷ Target Qty) × 100 • Evaluated against finalized monthly quotas
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("target")}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
          >
            <span>Target Console & Leaderboard</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Achievement Dial */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 to-slate-900/60 p-5 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overall Achievement
            </span>
            <div className="my-3 text-4xl font-black text-indigo-300 tracking-tight">
              {targetAchievement.overallPct}%
            </div>
            <span className="inline-block rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
              Composite Target Rating
            </span>
          </div>

          {/* LOC Achievement Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">LOC Submitted</span>
              <span className="font-extrabold text-purple-400 text-sm">
                {targetAchievement.locPct}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-purple-500 transition-all duration-700"
                style={{ width: `${Math.min(100, targetAchievement.locPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span>Target: <strong className="text-white">{targetAchievement.locTarget}</strong></span>
              <span>Achieved: <strong className="text-purple-300">{targetAchievement.locAchieved}</strong></span>
            </div>
          </div>

          {/* Mess Visit Achievement Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">Mess Visit</span>
              <span className="font-extrabold text-rose-400 text-sm">
                {targetAchievement.messPct}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-rose-500 transition-all duration-700"
                style={{ width: `${Math.min(100, targetAchievement.messPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span>Target: <strong className="text-white">{targetAchievement.messTarget}</strong></span>
              <span>Achieved: <strong className="text-rose-300">{targetAchievement.messAchieved}</strong></span>
            </div>
          </div>

          {/* Dress Code Achievement Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">Dress Code</span>
              <span className="font-extrabold text-teal-400 text-sm">
                {targetAchievement.dressPct}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-teal-500 transition-all duration-700"
                style={{ width: `${Math.min(100, targetAchievement.dressPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span>Target: <strong className="text-white">{targetAchievement.dressTarget}</strong></span>
              <span>Achieved: <strong className="text-teal-300">{targetAchievement.dressAchieved}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OM-wise Performance Table (Requirement #29, #54) */}
      <section className="glass-panel rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Section 4 — Office Manager Individual Performance Roster
            </h3>
            <p className="text-[11px] text-slate-400">
              Submissions and breakdown submitted by each Office Manager for {data.monthYear}
            </p>
          </div>
          <button
            onClick={() => setActiveTab("activity")}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition"
          >
            Full Activity Summary →
          </button>
        </div>

        {/* Responsive Table Container with Custom Scrollbar */}
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70">
          <div className="overflow-x-auto table-scrollbar">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400">
                  <th className="py-3 px-4 font-bold text-slate-300">Staff ID</th>
                  <th className="py-3 px-4 font-bold text-slate-300">Office Manager</th>
                  <th className="py-3 px-4 font-bold text-slate-300">Zone</th>
                  <th className="py-3 px-3 font-bold text-center text-slate-300">Submissions</th>
                  <th className="py-3 px-3 font-bold text-right text-sky-400">Market Visit</th>
                  <th className="py-3 px-3 font-bold text-right text-amber-400">MV Finding</th>
                  <th className="py-3 px-3 font-bold text-right text-purple-400">LOC Submitted</th>
                  <th className="py-3 px-3 font-bold text-right text-purple-300">LOC Days</th>
                  <th className="py-3 px-3 font-bold text-right text-teal-400">Dress Code</th>
                  <th className="py-3 px-3 font-bold text-right text-rose-400">Mess Visit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {omBreakdown.map((om) => (
                  <tr key={om.userId} className="hover:bg-indigo-950/15 transition">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-400">{om.staffId}</td>
                    <td className="py-3 px-4 text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-indigo-300">
                          {om.name.charAt(0)}
                        </div>
                        <span>{om.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{om.zone}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-block rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700">
                        {om.submissionCount}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-slate-200">{om.marketVisit}</td>
                    <td className="py-3 px-3 text-right text-amber-400 font-bold">{om.marketFinding}</td>
                    <td className="py-3 px-3 text-right text-purple-300 font-bold">{om.loc}</td>
                    <td className="py-3 px-3 text-right text-slate-400">{om.locFindingDays}</td>
                    <td className="py-3 px-3 text-right text-teal-300">{om.dressCode}</td>
                    <td className="py-3 px-3 text-right text-rose-300">{om.messVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: Weekly Trend Progression (Requirement #54) */}
      <section className="glass-panel rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-sm sm:text-base font-extrabold text-white">
            Section 5 — Weekly Trend Progression ({data.monthYear})
          </h3>
          <span className="text-[11px] text-slate-400">Week 1 through Week 4 Rollup</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {weeklyTrend.map((t) => (
            <div
              key={t.week}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-indigo-500/40"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="font-extrabold text-indigo-300 text-sm">{t.week}</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                  {t.submittedCount} OMs Submitted
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Market Visits:</span>
                  <span className="font-bold text-white">{t.marketVisit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">LOC Submitted:</span>
                  <span className="font-bold text-purple-300">{t.locSubmitted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Dress Code:</span>
                  <span className="font-bold text-teal-300">{t.dressCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mess Visits:</span>
                  <span className="font-bold text-rose-300">{t.messVisit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
