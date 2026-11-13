"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import {
  IconCheck,
  IconClock,
  IconAlert,
  IconRefresh,
  IconTarget,
  IconForm,
  IconSearch,
  IconTrendingUp,
  IconShield,
  IconUsers,
  IconFilter,
} from "./Icons";

type DashboardSortBy =
  | "DEFAULT"
  | "VISITS_DESC"
  | "FINDINGS_DESC"
  | "LOC_DESC"
  | "SUBMISSIONS_DESC";

export function DashboardView() {
  const {
    selectedYear,
    selectedMonth,
    selectedWeek,
    selectedZone,
    setSelectedZone,
    setActiveTab,
    setIsSubmitModalOpen,
  } = useApp();

  const [omSearchQuery, setOmSearchQuery] = useState("");
  const [tableSortBy, setTableSortBy] = useState<DashboardSortBy>("DEFAULT");

  const { data, isLoading, refetch, isFetching } = api.dashboard.getMetrics.useQuery({
    year: selectedYear,
    month: selectedMonth,
    week: selectedWeek,
    zone: selectedZone,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[460px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
        No dashboard metrics available for this period.
      </div>
    );
  }

  const { submission, activity, targetAchievement, omBreakdown, weeklyTrend } = data;

  // Extract unique zones for inline table filter dropdown
  const uniqueZones = Array.from(new Set(omBreakdown.map((om) => om.zone))).sort();

  // Filter OM breakdown by search query
  let processedOms = omBreakdown.filter(
    (om) =>
      om.name.toLowerCase().includes(omSearchQuery.toLowerCase()) ||
      om.staffId.toLowerCase().includes(omSearchQuery.toLowerCase()) ||
      om.zone.toLowerCase().includes(omSearchQuery.toLowerCase())
  );

  // Apply in-table sorting
  if (tableSortBy === "VISITS_DESC") {
    processedOms = [...processedOms].sort((a, b) => b.marketVisit - a.marketVisit);
  } else if (tableSortBy === "FINDINGS_DESC") {
    processedOms = [...processedOms].sort((a, b) => b.marketFinding - a.marketFinding);
  } else if (tableSortBy === "LOC_DESC") {
    processedOms = [...processedOms].sort((a, b) => b.loc - a.loc);
  } else if (tableSortBy === "SUBMISSIONS_DESC") {
    processedOms = [...processedOms].sort((a, b) => b.submissionCount - a.submissionCount);
  }

  // Compute table totals
  const totalOmVisits = processedOms.reduce((sum, o) => sum + o.marketVisit, 0);
  const totalOmFindings = processedOms.reduce((sum, o) => sum + o.marketFinding, 0);
  const totalOmLoc = processedOms.reduce((sum, o) => sum + o.loc, 0);
  const totalOmLocDays = processedOms.reduce((sum, o) => sum + o.locFindingDays, 0);
  const totalOmDress = processedOms.reduce((sum, o) => sum + o.dressCode, 0);
  const totalOmMess = processedOms.reduce((sum, o) => sum + o.messVisit, 0);

  return (
    <div className="space-y-6 pb-20 min-w-0">
      {/* ================================================================= */}
      {/* COMMAND CENTER HERO BANNER */}
      {/* ================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-900/40 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-950 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 h-48 w-48 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Command Center
              </span>
              <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-bold text-slate-300 border border-slate-700/80">
                {data.monthYear}
              </span>
              <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-bold text-slate-300 border border-slate-700/80">
                {selectedWeek === "all" ? "All Weeks (Combined)" : `Week ${selectedWeek}`}
              </span>
              {selectedZone !== "ALL" && (
                <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-300">
                  Zone: {selectedZone}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Executive Dashboard
            </h2>
          </div>

          {/* Quick Hero Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-3.5 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition shadow-sm"
              title="Refresh Dashboard Data"
            >
              <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
              <span>{isFetching ? "Syncing..." : "Sync Data"}</span>
            </button>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-500 px-4 py-2 text-xs font-extrabold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition"
            >
              <IconForm className="h-4 w-4" />
              <span>Submit Weekly Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SECTION 1: Submission Monitoring KPIs */}
      {/* ================================================================= */}
      <section className="space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <IconShield className="h-3.5 w-3.5" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Section 1 — Submission Compliance & Status Monitoring
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Expected Filings:</span>
            <span className="rounded-lg bg-slate-800 px-2.5 py-0.5 font-bold text-white border border-slate-700">
              {submission.expectedSubmissions} reports
            </span>
          </div>
        </div>

        {/* 5-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Total OM */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-4.5 shadow-lg backdrop-blur-md transition-all hover:border-slate-700 hover:shadow-indigo-500/5 group">
            <div className="h-1 w-full absolute top-0 left-0 bg-slate-600 group-hover:bg-indigo-500 transition-colors" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Total Registered OM</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                <IconUsers className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight">
                {submission.totalOm}
              </span>
              <span className="text-xs font-semibold text-slate-400">Personnel</span>
            </div>
            <span className="mt-2 block text-[11px] text-slate-400">
              Assigned across regional zones
            </span>
          </div>

          {/* Submitted On Time */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/80 to-slate-950 p-4.5 shadow-lg backdrop-blur-md hover:border-emerald-500/50 transition-all group">
            <div className="h-1 w-full absolute top-0 left-0 bg-emerald-500" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300">Submitted On Time</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/20">
                <IconCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400 tracking-tight">
                {submission.submitted}
              </span>
              <span className="text-xs font-semibold text-emerald-500/80">On Time</span>
            </div>
            <span className="mt-2 block text-[11px] text-emerald-400/90 font-medium">
              ✓ Before Friday 11:59 PM deadline
            </span>
          </div>

          {/* Late Submitted */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900/80 to-slate-950 p-4.5 shadow-lg backdrop-blur-md hover:border-amber-500/50 transition-all group">
            <div className="h-1 w-full absolute top-0 left-0 bg-amber-500" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">Late Submitted</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 shadow-sm shadow-amber-500/20">
                <IconClock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-400 tracking-tight">
                {submission.late}
              </span>
              <span className="text-xs font-semibold text-amber-500/80">Late Reports</span>
            </div>
            <span className="mt-2 block text-[11px] text-amber-400/90 font-medium">
              Submitted past Friday cutoff
            </span>
          </div>

          {/* Pending / Overdue */}
          <div className="relative overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-950/30 via-slate-900/80 to-slate-950 p-4.5 shadow-lg backdrop-blur-md hover:border-rose-500/50 transition-all group">
            <div className="h-1 w-full absolute top-0 left-0 bg-rose-500" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-300">Pending / Overdue</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 shadow-sm shadow-rose-500/20">
                <IconAlert className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-rose-400 tracking-tight">
                {submission.pending}
              </span>
              <span className="text-xs font-semibold text-rose-500/80">Missing</span>
            </div>
            <span className="mt-2 block text-[11px] text-rose-400/90 font-medium">
              Triggered automated email alert
            </span>
          </div>

          {/* Submission Rate % */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1 relative overflow-hidden rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950 p-4.5 shadow-lg backdrop-blur-md group">
            <div className="h-1 w-full absolute top-0 left-0 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300">Submission Rate</span>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-black text-indigo-300 border border-indigo-500/30">
                {submission.submissionRate >= 100 ? "100% Complete" : "In Progress"}
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight">
                {submission.submissionRate}%
              </span>
              <span className="text-xs font-medium text-slate-400">Compliance</span>
            </div>
            {/* Visual Progress Bar */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-700"
                style={{ width: `${Math.min(100, submission.submissionRate)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2: Core 4 Activities Aggregation */}
      {/* ================================================================= */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Section 2 — Core Weekly Activities ({data.monthYear})
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Zero-Activity Rule Supported</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Market Visit Card */}
          <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-b from-sky-950/20 via-slate-900/80 to-slate-950 p-5 shadow-xl space-y-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 text-xs font-black border border-sky-500/30">
                  MV
                </span>
                <span className="font-extrabold text-white text-sm">1. Market Visit</span>
              </div>
              <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                Core
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400 font-medium">Total Market Visits:</span>
              <span className="text-2xl font-black text-white">{activity.marketVisit}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Market Findings:</span>
              <span className="text-lg font-bold text-amber-400">{activity.marketFinding}</span>
            </div>

            {/* Solved vs Pending Ratio Meter */}
            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/90 p-3 space-y-2">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-emerald-400">Solved: {activity.solved}</span>
                <span className="text-rose-400">Pending: {activity.pendingFinding}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-rose-950/70">
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
              <span className="text-[10px] text-slate-400 block text-center font-medium">
                Rule: Solved ({activity.solved}) + Pending ({activity.pendingFinding}) = Findings ({activity.marketFinding})
              </span>
            </div>
          </div>

          {/* 2. Location Tracking (LOC) */}
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-950/20 via-slate-900/80 to-slate-950 p-5 shadow-xl space-y-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 text-xs font-black border border-purple-500/30">
                  LOC
                </span>
                <span className="font-extrabold text-white text-sm">2. Location Tracking</span>
              </div>
              <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                GPS
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400 font-medium">LOC Submitted Qty:</span>
              <span className="text-2xl font-black text-white">{activity.locSubmitted}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">LOC Finding Days:</span>
              <span className="text-lg font-bold text-purple-400">
                {activity.locFindingDays} days
              </span>
            </div>

            <div className="rounded-2xl border border-purple-900/40 bg-purple-950/20 p-3 text-[11px] text-slate-300 leading-tight">
              <span className="font-bold text-purple-300">Policy Strictness:</span> Strictly NO
              &ldquo;LOC Visit Qty&rdquo; exists anywhere in database or UI.
            </div>
          </div>

          {/* 3. Dress Code Card */}
          <div className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-b from-teal-950/20 via-slate-900/80 to-slate-950 p-5 shadow-xl space-y-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 text-xs font-black border border-teal-500/30">
                  DC
                </span>
                <span className="font-extrabold text-white text-sm">3. Dress Code</span>
              </div>
              <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                Attire
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400 font-medium">Dress Code Qty:</span>
              <span className="text-2xl font-black text-white">{activity.dressCode}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Dress Finding Qty:</span>
              <span className="text-lg font-bold text-amber-400">{activity.dressFinding}</span>
            </div>

            <div className="rounded-2xl border border-teal-900/40 bg-teal-950/20 p-3 text-[11px] text-slate-300 leading-tight">
              Field personnel ID badges, corporate attire compliance & safety gear review.
            </div>
          </div>

          {/* 4. Mess Visit Card */}
          <div className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-950/20 via-slate-900/80 to-slate-950 p-5 shadow-xl space-y-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 text-xs font-black border border-rose-500/30">
                  MV
                </span>
                <span className="font-extrabold text-white text-sm">4. Mess Visit</span>
              </div>
              <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                Facility
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400 font-medium">Mess Visit Qty:</span>
              <span className="text-2xl font-black text-white">{activity.messVisit}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Mess Finding Qty:</span>
              <span className="text-lg font-bold text-amber-400">{activity.messFinding}</span>
            </div>

            <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-3 text-[11px] text-slate-300 leading-tight">
              Accommodation hygiene, catering cleanliness & living standard inspection.
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3: Monthly Target vs Achievement */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <IconTarget className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Section 3 — Monthly Target vs Achievement Governance
              </h3>
              <p className="text-[11px] text-slate-400">
                Formula: (Achieved Qty ÷ Target Qty) × 100 • Evaluated against finalized monthly quotas
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("target")}
            className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 transition flex items-center gap-1.5"
          >
            <span>Target Console & Leaderboard</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Achievement Dial */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-950 p-5 text-center shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overall Composite Rating
            </span>
            <div className="my-2.5 text-4xl font-black text-indigo-300 tracking-tight">
              {targetAchievement.overallPct}%
            </div>
            <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-0.5 text-[10px] font-black text-indigo-300 border border-indigo-500/30">
              System Wide Achievement
            </span>
          </div>

          {/* LOC Achievement Bar */}
          <div className="rounded-2xl border border-purple-500/20 bg-slate-900/70 p-4 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">LOC Submitted</span>
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
          <div className="rounded-2xl border border-rose-500/20 bg-slate-900/70 p-4 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">Mess Visit</span>
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
          <div className="rounded-2xl border border-teal-500/20 bg-slate-900/70 p-4 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">Dress Code</span>
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

      {/* ================================================================= */}
      {/* SECTION 4: OM-wise Performance Table (FIXED STICKY COLUMNS + INLINE DROPDOWNS) */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
        {/* Table Toolbar Header with In-Table Dropdowns */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Section 4 — Office Manager Individual Performance Roster
            </h3>
            <p className="text-[11px] text-slate-400">
              Activity breakdown submitted by each Office Manager • Pinned identification columns
            </p>
          </div>

          {/* Controls: Search + In-Table Zone Dropdown + In-Table Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search OM */}
            <div className="relative">
              <IconSearch className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={omSearchQuery}
                onChange={(e) => setOmSearchQuery(e.target.value)}
                placeholder="Search OM, ID or Zone..."
                className="w-44 sm:w-52 rounded-xl border border-slate-700 bg-slate-950/80 py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* In-Table Zone Dropdown Filter */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-xs">
              <IconFilter className="h-3 w-3 text-indigo-400" />
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
                title="Filter by Zone"
              >
                <option value="ALL" className="bg-slate-900 text-white">All Zones</option>
                {uniqueZones.map((z) => (
                  <option key={z} value={z} className="bg-slate-900 text-white">
                    {z}
                  </option>
                ))}
              </select>
            </div>

            {/* In-Table Sort Dropdown */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Sort:</span>
              <select
                value={tableSortBy}
                onChange={(e) => setTableSortBy(e.target.value as DashboardSortBy)}
                className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
                title="Sort Roster Table"
              >
                <option value="DEFAULT" className="bg-slate-900 text-white">Staff ID (Default)</option>
                <option value="VISITS_DESC" className="bg-slate-900 text-white">Market Visits (High to Low)</option>
                <option value="FINDINGS_DESC" className="bg-slate-900 text-white">Findings (High to Low)</option>
                <option value="LOC_DESC" className="bg-slate-900 text-white">LOC Submitted (High to Low)</option>
                <option value="SUBMISSIONS_DESC" className="bg-slate-900 text-white">Submissions (High to Low)</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab("activity")}
              className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 transition whitespace-nowrap"
            >
              Full Rollup →
            </button>
          </div>
        </div>

        {/* Responsive Table Container with Pinned / Sticky Left Columns */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-inner">
          <div className="overflow-x-auto table-scrollbar">
            <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-300">
                  {/* Sticky Column: Staff ID */}
                  <th className="sticky left-0 z-20 bg-slate-900 py-3 px-3 font-bold w-24">
                    Staff ID
                  </th>
                  {/* Sticky Column: Office Manager */}
                  <th className="sticky left-24 z-20 bg-slate-900 py-3 px-4 font-bold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)]">
                    Office Manager
                  </th>
                  <th className="py-3 px-3 font-bold">Zone</th>
                  <th className="py-3 px-3 font-bold text-center">Submissions</th>
                  <th className="py-3 px-3 font-bold text-right text-sky-400">Market Visit</th>
                  <th className="py-3 px-3 font-bold text-right text-amber-400">MV Finding</th>
                  <th className="py-3 px-3 font-bold text-right text-purple-400">LOC Submitted</th>
                  <th className="py-3 px-3 font-bold text-right text-purple-300">LOC Days</th>
                  <th className="py-3 px-3 font-bold text-right text-teal-400">Dress Code</th>
                  <th className="py-3 px-3 font-bold text-right text-rose-400">Mess Visit</th>
                  <th className="py-3 px-3 font-bold text-center text-slate-400">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {processedOms.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-10 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-bold text-slate-300">
                          {selectedZone !== "ALL"
                            ? `No Office Managers found for zone "${selectedZone}"`
                            : `No matching Office Managers for "${omSearchQuery}"`}
                        </span>
                        {selectedZone !== "ALL" && (
                          <button
                            onClick={() => setSelectedZone("ALL")}
                            className="mt-1 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-indigo-500 transition"
                          >
                            Show All Zones Roster
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  processedOms.map((om) => (
                    <tr key={om.userId} className="hover:bg-indigo-950/20 transition-colors group">
                      {/* Pinned Staff ID */}
                      <td className="sticky left-0 z-10 bg-slate-950 group-hover:bg-slate-900 py-3 px-3 font-mono font-bold text-indigo-400 transition-colors">
                        <span className="rounded bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20">
                          {om.staffId}
                        </span>
                      </td>
                      {/* Pinned Office Manager Name */}
                      <td className="sticky left-24 z-10 bg-slate-950 group-hover:bg-slate-900 py-3 px-4 text-white font-semibold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)] transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-[10px] font-black text-indigo-300 border border-slate-700">
                            {om.name.charAt(0)}
                          </div>
                          <span>{om.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        <span className="rounded-md bg-slate-800/60 px-2 py-0.5 text-slate-300 font-semibold border border-slate-700/60">
                          {om.zone}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-block rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700">
                          {om.submissionCount}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-100 font-semibold">{om.marketVisit}</td>
                      <td className="py-3 px-3 text-right text-amber-400 font-bold">{om.marketFinding}</td>
                      <td className="py-3 px-3 text-right text-purple-300 font-bold">{om.loc}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{om.locFindingDays}</td>
                      <td className="py-3 px-3 text-right text-teal-300">{om.dressCode}</td>
                      <td className="py-3 px-3 text-right text-rose-300">{om.messVisit}</td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => setIsSubmitModalOpen(true)}
                          className="rounded-lg border border-slate-700 bg-slate-800/90 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:border-indigo-500 hover:text-white transition"
                        >
                          + File
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {processedOms.length > 0 && (
                <tfoot>
                  <tr className="border-t-2 border-slate-700 bg-slate-900/95 font-bold text-slate-200">
                    {/* Sticky Footer Staff ID & OM Name */}
                    <td
                      colSpan={2}
                      className="sticky left-0 z-10 bg-slate-900 py-3.5 px-4 text-left uppercase text-[11px] tracking-wider text-slate-400 border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)]"
                    >
                      Total ({processedOms.length} OMs)
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">-</td>
                    <td className="py-3.5 px-3 text-center text-slate-300">
                      {processedOms.reduce((sum, o) => sum + o.submissionCount, 0)}
                    </td>
                    <td className="py-3.5 px-3 text-right text-sky-400">{totalOmVisits}</td>
                    <td className="py-3.5 px-3 text-right text-amber-400">{totalOmFindings}</td>
                    <td className="py-3.5 px-3 text-right text-purple-300">{totalOmLoc}</td>
                    <td className="py-3.5 px-3 text-right text-slate-300">{totalOmLocDays}</td>
                    <td className="py-3.5 px-3 text-right text-teal-300">{totalOmDress}</td>
                    <td className="py-3.5 px-3 text-right text-rose-300">{totalOmMess}</td>
                    <td className="py-3.5 px-3 text-center text-slate-400">-</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5: Weekly Trend Progression */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <IconTrendingUp className="h-4 w-4 text-indigo-400" />
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Section 5 — Weekly Trend Progression ({data.monthYear})
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Week 1 through Week 4 Rollup</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {weeklyTrend.map((t) => (
            <div
              key={t.week}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4.5 transition-all hover:border-indigo-500/40 hover:bg-slate-900/80 shadow-md"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-black text-indigo-300 text-sm tracking-wide">{t.week}</span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                  {t.submittedCount} OMs Filed
                </span>
              </div>

              <div className="mt-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Market Visits:</span>
                  <span className="font-extrabold text-white">{t.marketVisit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">LOC Submitted:</span>
                  <span className="font-extrabold text-purple-300">{t.locSubmitted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Dress Code:</span>
                  <span className="font-extrabold text-teal-300">{t.dressCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mess Visits:</span>
                  <span className="font-extrabold text-rose-300">{t.messVisit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}