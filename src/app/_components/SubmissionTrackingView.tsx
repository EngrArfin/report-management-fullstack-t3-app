"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import {
  IconCheck,
  IconClock,
  IconAlert,
  IconRefresh,
  IconSearch,
  IconDownload,
  IconFilter,
} from "./Icons";

type SubmissionStatusFilter = "ALL" | "COMPLETE_4" | "HAS_LATE" | "HAS_PENDING";

export function SubmissionTrackingView() {
  const {
    selectedYear,
    selectedMonth,
    selectedZone,
    setSelectedZone,
    setSelectedReportForFinding,
    setIsSubmitModalOpen,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<SubmissionStatusFilter>("ALL");

  const { data, isLoading, refetch, isFetching } = api.report.getSubmissionTracking.useQuery({
    year: selectedYear,
    month: selectedMonth,
    zone: selectedZone,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  const renderStatusBadge = (weekData?: { status: string; reportId?: string; submittedAt?: Date }) => {
    if (!weekData) return <span className="text-slate-500">-</span>;
    switch (weekData.status) {
      case "SUBMITTED":
        return (
          <button
            onClick={() => weekData.reportId && setSelectedReportForFinding(weekData.reportId)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-400 hover:bg-emerald-500/25 transition cursor-pointer shadow-sm active:scale-95"
            title="Click to view details or update findings"
          >
            <IconCheck className="h-3 w-3 shrink-0" />
            <span>Submitted</span>
          </button>
        );
      case "LATE_SUBMITTED":
        return (
          <button
            onClick={() => weekData.reportId && setSelectedReportForFinding(weekData.reportId)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs font-bold text-amber-400 hover:bg-amber-500/25 transition cursor-pointer shadow-sm active:scale-95"
            title="Submitted after Friday 11:59 PM deadline"
          >
            <IconClock className="h-3 w-3 shrink-0" />
            <span>Late Submitted</span>
          </button>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 px-2.5 py-1 text-xs font-bold text-rose-400 shadow-sm">
            <IconAlert className="h-3 w-3 shrink-0" />
            <span>Pending</span>
          </span>
        );
      case "NOT_YET_DUE":
        return (
          <span className="inline-flex items-center rounded-lg bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
            Upcoming
          </span>
        );
      default:
        return <span className="text-slate-500">-</span>;
    }
  };

  // Extract unique zones
  const uniqueZones = Array.from(new Set(data?.rows.map((r) => r.zone) ?? [])).sort();

  // Filter rows by search query
  let filteredRows =
    data?.rows.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.zone.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  // Filter by status dropdown
  if (statusFilter === "COMPLETE_4") {
    filteredRows = filteredRows.filter((r) => r.totalSubmitted === 4);
  } else if (statusFilter === "HAS_LATE") {
    filteredRows = filteredRows.filter(
      (r) =>
        r.week1?.status === "LATE_SUBMITTED" ||
        r.week2?.status === "LATE_SUBMITTED" ||
        r.week3?.status === "LATE_SUBMITTED" ||
        r.week4?.status === "LATE_SUBMITTED"
    );
  } else if (statusFilter === "HAS_PENDING") {
    filteredRows = filteredRows.filter(
      (r) =>
        r.week1?.status === "PENDING" ||
        r.week2?.status === "PENDING" ||
        r.week3?.status === "PENDING" ||
        r.week4?.status === "PENDING"
    );
  }

  return (
    <div className="space-y-5 pb-20 min-w-0">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Submission Tracking
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {data?.monthYear} • Week 1 to 4 Compliance
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition shadow-sm"
          >
            <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <a
            href={`/api/export/excel?year=${selectedYear}&month=${selectedMonth}&week=all&zone=${selectedZone}`}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition shadow-sm"
          >
            <IconDownload className="h-3.5 w-3.5 text-emerald-400" />
            <span>Export Table</span>
          </a>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 transition"
          >
            + New Weekly Report
          </button>
        </div>
      </div>

      {/* Search, Filter Dropdowns & Legend Controls */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 text-xs shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search Input */}
          <div className="relative w-full sm:w-60">
            <IconSearch className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search OM, ID or Zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* In-Table Zone Filter Dropdown */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1.5 text-xs">
            <IconFilter className="h-3.5 w-3.5 text-indigo-400" />
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

          {/* In-Table Status Filter Dropdown */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1.5 text-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as SubmissionStatusFilter)}
              className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
              title="Filter by Filing Status"
            >
              <option value="ALL" className="bg-slate-900 text-white">All Statuses</option>
              <option value="COMPLETE_4" className="bg-slate-900 text-white">All 4 Weeks Filed (100%)</option>
              <option value="HAS_LATE" className="bg-slate-900 text-white">Has Late Submissions</option>
              <option value="HAS_PENDING" className="bg-slate-900 text-white">Has Pending / Missing</option>
            </select>
          </div>
        </div>

        {/* Legend Pills */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
          <span className="font-bold text-slate-400">Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>Submitted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            <span>Late Submitted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.8)]" />
            <span>Pending (Overdue)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            <span>Upcoming</span>
          </div>
        </div>
      </div>

      {/* Compliance Matrix Table with Sticky Columns */}
      <div className="glass-panel overflow-hidden rounded-2xl shadow-xl border border-slate-800">
        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-300">
                <th className="sticky left-0 z-20 bg-slate-900 py-3.5 px-3 font-bold w-24">Staff ID</th>
                <th className="sticky left-24 z-20 bg-slate-900 py-3.5 px-4 font-bold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)]">
                  Office Manager
                </th>
                <th className="py-3.5 px-3 font-bold text-slate-300">Designation</th>
                <th className="py-3.5 px-4 font-bold text-slate-300">Assigned Zone</th>
                <th className="py-3.5 px-4 font-bold text-center text-slate-300">Week 1</th>
                <th className="py-3.5 px-4 font-bold text-center text-slate-300">Week 2</th>
                <th className="py-3.5 px-4 font-bold text-center text-slate-300">Week 3</th>
                <th className="py-3.5 px-4 font-bold text-center text-slate-300">Week 4</th>
                <th className="py-3.5 px-4 font-bold text-center text-indigo-300">Total Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm font-semibold text-slate-300">
                        {selectedZone !== "ALL"
                          ? `No Office Managers found for zone "${selectedZone}"`
                          : `No Office Managers match "${searchQuery}"`}
                      </span>
                      {selectedZone !== "ALL" && (
                        <button
                          onClick={() => setSelectedZone("ALL")}
                          className="mt-1 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-indigo-500 transition"
                        >
                          Show All Zones Matrix
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.userId} className="hover:bg-indigo-950/20 transition-colors group">
                    <td className="sticky left-0 z-10 bg-slate-950 group-hover:bg-slate-900 py-3.5 px-3 font-mono font-bold text-indigo-400 transition-colors">
                      <span className="rounded bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20">
                        {row.staffId}
                      </span>
                    </td>
                    <td className="sticky left-24 z-10 bg-slate-950 group-hover:bg-slate-900 py-3.5 px-4 text-white font-semibold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)] transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-indigo-300">
                          {row.name.charAt(0)}
                        </div>
                        <span>{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">{row.designation}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      <span className="rounded-md bg-slate-800/60 px-2 py-0.5 text-slate-300 font-semibold border border-slate-700/60">
                        {row.zone}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">{renderStatusBadge(row.week1)}</td>
                    <td className="py-3.5 px-4 text-center">{renderStatusBadge(row.week2)}</td>
                    <td className="py-3.5 px-4 text-center">{renderStatusBadge(row.week3)}</td>
                    <td className="py-3.5 px-4 text-center">{renderStatusBadge(row.week4)}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block min-w-8 rounded-full py-0.5 px-2.5 font-black text-xs ${
                          row.totalSubmitted === 4
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : row.totalSubmitted > 0
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {row.totalSubmitted} / 4
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}