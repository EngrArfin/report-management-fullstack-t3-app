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
} from "./Icons";

export function SubmissionTrackingView() {
  const {
    selectedYear,
    selectedMonth,
    selectedZone,
    setSelectedReportForFinding,
    setIsSubmitModalOpen,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, refetch, isFetching } = api.report.getSubmissionTracking.useQuery({
    year: selectedYear,
    month: selectedMonth,
    zone: selectedZone,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-slate-400 backdrop-blur-md">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent shadow-lg shadow-indigo-500/20" />
          <p className="text-xs font-semibold text-slate-300">Loading submission tracking matrix...</p>
        </div>
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

  // Filter rows by search query
  const filteredRows =
    data?.rows.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.zone.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  return (
    <div className="space-y-5 pb-16">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Submission Compliance & Tracking Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Operating Period: <span className="font-bold text-indigo-300">{data?.monthYear}</span> • Real-time
            status verification across Week 1 to Week 4 (Friday 11:59 PM Deadline)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <a
            href={`/api/export/excel?year=${selectedYear}&month=${selectedMonth}&week=all&zone=${selectedZone}`}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
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

      {/* Search & Legend Controls */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3 sm:p-4 text-xs">
        {/* Quick Search Input */}
        <div className="relative w-full sm:w-72">
          <IconSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by Staff ID, Name, or Zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
          />
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

      {/* Compliance Matrix Table (Requirement #18) */}
      <div className="glass-panel overflow-hidden rounded-2xl shadow-xl border border-slate-800">
        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400">
                <th className="py-3.5 px-4 font-bold text-slate-300">Staff ID</th>
                <th className="py-3.5 px-4 font-bold text-slate-300">Office Manager</th>
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
                  <td colSpan={9} className="py-10 text-center text-slate-400">
                    No Office Managers match the search query.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.userId} className="hover:bg-indigo-950/15 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">{row.staffId}</td>
                    <td className="py-3.5 px-4 text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-indigo-300">
                          {row.name.charAt(0)}
                        </div>
                        <span>{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">{row.designation}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">{row.zone}</td>
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
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
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
