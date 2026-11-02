"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconRefresh, IconDownload } from "./Icons";

export function ActivitySummaryView() {
  const { selectedYear, selectedMonth, selectedWeek, selectedZone } = useApp();

  const [periodOption, setPeriodOption] = useState<
    "1_MONTH" | "3_MONTHS" | "6_MONTHS" | "1_YEAR" | "CUSTOM" | "ALL"
  >("1_MONTH");
  const [fromDate, setFromDate] = useState<string>("2026-07-01");
  const [toDate, setToDate] = useState<string>("2026-09-30");

  const { data, isLoading, refetch, isFetching } = api.report.getActivitySummary.useQuery({
    year: selectedYear,
    month: selectedMonth,
    week: selectedWeek,
    zone: selectedZone,
    period: periodOption,
    fromDate: periodOption === "CUSTOM" ? fromDate : undefined,
    toDate: periodOption === "CUSTOM" ? toDate : undefined,
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Activity Summary Table
          </h2>
          <p className="text-xs text-slate-400">
            Real-time multi-dimensional rollup across Market Visit, LOC, Dress Code, and Mess Visit
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
          <a
            href={`/api/export/excel?year=${selectedYear}&month=${selectedMonth}&week=${selectedWeek}&zone=${selectedZone}`}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition"
          >
            <IconDownload className="h-4 w-4" />
            <span>Export to Excel</span>
          </a>
        </div>
      </div>

      {/* Period Quick Filter Bar (Requirement #23, #24) */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-400">Quick Period:</span>
          {(["1_MONTH", "3_MONTHS", "6_MONTHS", "1_YEAR", "CUSTOM"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriodOption(p)}
              className={`rounded-md px-3 py-1 font-medium transition ${
                periodOption === p
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {p === "1_MONTH" && "1 Month (Current)"}
              {p === "3_MONTHS" && "3 Months"}
              {p === "6_MONTHS" && "6 Months"}
              {p === "1_YEAR" && "1 Year"}
              {p === "CUSTOM" && "Custom Date Range"}
            </button>
          ))}
        </div>

        {/* Custom Date Inputs if CUSTOM selected */}
        {periodOption === "CUSTOM" && (
          <div className="flex flex-wrap items-center gap-2 border-l border-slate-800 pl-3">
            <span className="text-slate-400">From:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white"
            />
            <span className="text-slate-400">To:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white"
            />
          </div>
        )}
      </div>

      {/* Table matching Requirement #19 */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/70 text-slate-400">
                <th className="py-3 px-3 font-semibold">Staff ID</th>
                <th className="py-3 px-3 font-semibold">Name</th>
                <th className="py-3 px-3 font-semibold">Designation</th>
                <th className="py-3 px-3 font-semibold">Zone</th>
                <th className="py-3 px-3 font-semibold text-right text-sky-300">Market Visit</th>
                <th className="py-3 px-3 font-semibold text-right text-amber-300">Market Finding</th>
                <th className="py-3 px-3 font-semibold text-right text-emerald-300">Solved</th>
                <th className="py-3 px-3 font-semibold text-right text-rose-300">Pending</th>
                <th className="py-3 px-3 font-semibold text-right text-purple-300">LOC Submitted</th>
                <th className="py-3 px-3 font-semibold text-right text-purple-300">LOC Finding Days</th>
                <th className="py-3 px-3 font-semibold text-right text-teal-300">Dress Code Qty</th>
                <th className="py-3 px-3 font-semibold text-right text-amber-300">Dress Finding</th>
                <th className="py-3 px-3 font-semibold text-right text-rose-300">Mess Visit Qty</th>
                <th className="py-3 px-3 font-semibold text-right text-amber-300">Mess Finding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={14} className="py-8 text-center text-slate-400">
                    Aggregating summary records...
                  </td>
                </tr>
              ) : data?.length === 0 ? (
                <tr>
                  <td colSpan={14} className="py-8 text-center text-slate-400">
                    No activity data found for selected period.
                  </td>
                </tr>
              ) : (
                data?.map((row) => (
                  <tr key={row.userId} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-3 font-mono font-medium text-indigo-300">{row.staffId}</td>
                    <td className="py-3 px-3 font-medium text-white">{row.name}</td>
                    <td className="py-3 px-3 text-slate-400">{row.designation}</td>
                    <td className="py-3 px-3 text-slate-300">{row.zone}</td>
                    <td className="py-3 px-3 text-right font-semibold text-sky-300">
                      {row.marketVisitQty}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-amber-300">
                      {row.marketFinding}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-emerald-400">
                      {row.solvedQty}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-rose-400">
                      {row.pendingQty}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-purple-300">
                      {row.locSubmittedQty}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-purple-400">
                      {row.locFindingDays}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-teal-300">
                      {row.dressCodeQty}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-amber-300">
                      {row.dressFinding}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-rose-300">
                      {row.messVisitQty}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-amber-300">
                      {row.messFinding}
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
