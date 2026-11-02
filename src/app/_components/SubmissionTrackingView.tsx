"use client";

import React from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconCheck, IconClock, IconAlert, IconRefresh } from "./Icons";

export function SubmissionTrackingView() {
  const {
    selectedYear,
    selectedMonth,
    selectedZone,
    setSelectedReportForFinding,
    setIsSubmitModalOpen,
  } = useApp();

  const { data, isLoading, refetch, isFetching } = api.report.getSubmissionTracking.useQuery({
    year: selectedYear,
    month: selectedMonth,
    zone: selectedZone,
  });

  if (isLoading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-xs">Loading submission matrix...</p>
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
            className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/25 transition cursor-pointer"
            title="Click to view details or update findings"
          >
            <IconCheck className="h-3 w-3" />
            <span>Submitted</span>
          </button>
        );
      case "LATE_SUBMITTED":
        return (
          <button
            onClick={() => weekData.reportId && setSelectedReportForFinding(weekData.reportId)}
            className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-400 hover:bg-amber-500/25 transition cursor-pointer"
            title="Submitted after Friday 11:59 PM deadline"
          >
            <IconClock className="h-3 w-3" />
            <span>Late Submitted</span>
          </button>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-400">
            <IconAlert className="h-3 w-3" />
            <span>Pending</span>
          </span>
        );
      case "NOT_YET_DUE":
        return (
          <span className="inline-flex items-center rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-400">
            Upcoming
          </span>
        );
      default:
        return <span className="text-slate-500">-</span>;
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Title & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Submission Tracking Matrix
          </h2>
          <p className="text-xs text-slate-400">
            Month: <span className="font-semibold text-indigo-300">{data?.monthYear}</span> • Real-time
            submission status for all active Office Managers across Week 1 to Week 4
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
          >
            <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
          >
            + New Submission
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-300">
        <span className="font-semibold text-slate-400">Status Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>Submitted (On Time)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span>Late Submitted (After Friday 11:59 PM)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span>Pending (Overdue Deadline)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-500" />
          <span>Upcoming (Future Deadline)</span>
        </div>
      </div>

      {/* Table matching Requirement #18 */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/60 text-slate-400">
                <th className="py-3 px-4 font-semibold">Staff ID</th>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Designation</th>
                <th className="py-3 px-4 font-semibold">Zone</th>
                <th className="py-3 px-4 font-semibold text-center">Week 1</th>
                <th className="py-3 px-4 font-semibold text-center">Week 2</th>
                <th className="py-3 px-4 font-semibold text-center">Week 3</th>
                <th className="py-3 px-4 font-semibold text-center">Week 4</th>
                <th className="py-3 px-4 font-semibold text-center">Total Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {data?.rows.map((row) => (
                <tr key={row.userId} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 font-mono font-medium text-indigo-300">{row.staffId}</td>
                  <td className="py-3 px-4 font-medium text-white">{row.name}</td>
                  <td className="py-3 px-4 text-slate-400">{row.designation}</td>
                  <td className="py-3 px-4 text-slate-300">{row.zone}</td>
                  <td className="py-3 px-4 text-center">{renderStatusBadge(row.week1)}</td>
                  <td className="py-3 px-4 text-center">{renderStatusBadge(row.week2)}</td>
                  <td className="py-3 px-4 text-center">{renderStatusBadge(row.week3)}</td>
                  <td className="py-3 px-4 text-center">{renderStatusBadge(row.week4)}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block min-w-7 rounded-full py-0.5 px-2 font-bold ${
                        row.totalSubmitted === 4
                          ? "bg-emerald-500/20 text-emerald-400"
                          : row.totalSubmitted > 0
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {row.totalSubmitted} / 4
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
