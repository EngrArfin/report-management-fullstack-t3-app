"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconRefresh, IconDownload, IconSearch } from "./Icons";

export function ActivitySummaryView() {
  const { selectedYear, selectedMonth, selectedWeek, selectedZone } = useApp();

  const [periodOption, setPeriodOption] = useState<
    "1_MONTH" | "3_MONTHS" | "6_MONTHS" | "1_YEAR" | "CUSTOM" | "ALL"
  >("1_MONTH");
  const [fromDate, setFromDate] = useState<string>("2026-07-01");
  const [toDate, setToDate] = useState<string>("2026-09-30");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, refetch, isFetching } = api.report.getActivitySummary.useQuery({
    year: selectedYear,
    month: selectedMonth,
    week: selectedWeek,
    zone: selectedZone,
    period: periodOption,
    fromDate: periodOption === "CUSTOM" ? fromDate : undefined,
    toDate: periodOption === "CUSTOM" ? toDate : undefined,
  });

  const filteredRows =
    data?.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.zone.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  // Calculate Grand Totals row for executive oversight
  const grandTotals = filteredRows.reduce(
    (acc, r) => ({
      marketVisitQty: acc.marketVisitQty + r.marketVisitQty,
      marketFinding: acc.marketFinding + r.marketFinding,
      solvedQty: acc.solvedQty + r.solvedQty,
      pendingQty: acc.pendingQty + r.pendingQty,
      locSubmittedQty: acc.locSubmittedQty + r.locSubmittedQty,
      locFindingDays: Number((acc.locFindingDays + r.locFindingDays).toFixed(1)),
      dressCodeQty: acc.dressCodeQty + r.dressCodeQty,
      dressFinding: acc.dressFinding + r.dressFinding,
      messVisitQty: acc.messVisitQty + r.messVisitQty,
      messFinding: acc.messFinding + r.messFinding,
    }),
    {
      marketVisitQty: 0,
      marketFinding: 0,
      solvedQty: 0,
      pendingQty: 0,
      locSubmittedQty: 0,
      locFindingDays: 0,
      dressCodeQty: 0,
      dressFinding: 0,
      messVisitQty: 0,
      messFinding: 0,
    }
  );

  return (
    <div className="space-y-5 pb-16">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Multi-Dimensional Activity Summary Rollup
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Auto-aggregated field metrics across Market Visit, Location Tracking, Dress Code & Mess Inspection
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <a
            href={`/api/export/excel?year=${selectedYear}&month=${selectedMonth}&week=${selectedWeek}&zone=${selectedZone}`}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-600/30 hover:from-emerald-500 hover:to-emerald-400 transition"
          >
            <IconDownload className="h-4 w-4" />
            <span>Export to Excel</span>
          </a>
        </div>
      </div>

      {/* Period Selector & Search Filter Bar (Requirements #23, #24) */}
      <div className="glass-panel rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Quick Period Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-slate-400 mr-1">Period:</span>
            {(["1_MONTH", "3_MONTHS", "6_MONTHS", "1_YEAR", "CUSTOM"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriodOption(p)}
                className={`rounded-xl px-3 py-1.5 font-bold transition ${
                  periodOption === p
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {p === "1_MONTH" && "1 Month"}
                {p === "3_MONTHS" && "3 Months"}
                {p === "6_MONTHS" && "6 Months"}
                {p === "1_YEAR" && "1 Year"}
                {p === "CUSTOM" && "Custom Range"}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <IconSearch className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search OM or Zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Custom Date Range Picker (Requirement #24) */}
        {periodOption === "CUSTOM" && (
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-800 pt-3 text-xs">
            <span className="font-bold text-indigo-400">Custom Date Range:</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">From:</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">To:</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Activity Summary Table (Requirement #19) */}
      <div className="glass-panel overflow-hidden rounded-2xl shadow-xl border border-slate-800">
        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-400">
                <th className="py-3 px-3 font-bold text-slate-300">Staff ID</th>
                <th className="py-3 px-3 font-bold text-slate-300">Office Manager</th>
                <th className="py-3 px-2 font-bold text-slate-300">Desig.</th>
                <th className="py-3 px-3 font-bold text-slate-300">Zone</th>
                <th className="py-3 px-3 font-bold text-right text-sky-400">Market Visit</th>
                <th className="py-3 px-3 font-bold text-right text-amber-400">Market Finding</th>
                <th className="py-3 px-3 font-bold text-right text-emerald-400">Solved</th>
                <th className="py-3 px-3 font-bold text-right text-rose-400">Pending</th>
                <th className="py-3 px-3 font-bold text-right text-purple-400">LOC Submitted</th>
                <th className="py-3 px-3 font-bold text-right text-purple-300">LOC Finding Days</th>
                <th className="py-3 px-3 font-bold text-right text-teal-400">Dress Code Qty</th>
                <th className="py-3 px-3 font-bold text-right text-amber-300">Dress Finding</th>
                <th className="py-3 px-3 font-bold text-right text-rose-400">Mess Visit Qty</th>
                <th className="py-3 px-3 font-bold text-right text-amber-300">Mess Finding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={14} className="py-10 text-center text-slate-400">
                    Aggregating summary records...
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={14} className="py-10 text-center text-slate-400">
                    No activity data found for selected period.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.userId} className="hover:bg-indigo-950/15 transition">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-400">{row.staffId}</td>
                    <td className="py-3 px-3 text-white font-semibold">{row.name}</td>
                    <td className="py-3 px-2 text-slate-400">{row.designation}</td>
                    <td className="py-3 px-3 text-slate-300">{row.zone}</td>
                    <td className="py-3 px-3 text-right font-extrabold text-sky-400">
                      {row.marketVisitQty}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-amber-400">
                      {row.marketFinding}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-400">
                      {row.solvedQty}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-rose-400">
                      {row.pendingQty}
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-purple-400">
                      {row.locSubmittedQty}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-purple-300">
                      {row.locFindingDays}
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-teal-400">
                      {row.dressCodeQty}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-amber-300">
                      {row.dressFinding}
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-rose-400">
                      {row.messVisitQty}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-amber-300">
                      {row.messFinding}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* Grand Totals Summary Footer */}
            {filteredRows.length > 0 && (
              <tfoot>
                <tr className="border-t-2 border-indigo-500/40 bg-indigo-950/30 text-white font-extrabold">
                  <td colSpan={4} className="py-3.5 px-3 text-indigo-300 font-bold uppercase tracking-wider">
                    Grand Totals ({filteredRows.length} OMs)
                  </td>
                  <td className="py-3.5 px-3 text-right text-sky-300">{grandTotals.marketVisitQty}</td>
                  <td className="py-3.5 px-3 text-right text-amber-300">{grandTotals.marketFinding}</td>
                  <td className="py-3.5 px-3 text-right text-emerald-300">{grandTotals.solvedQty}</td>
                  <td className="py-3.5 px-3 text-right text-rose-300">{grandTotals.pendingQty}</td>
                  <td className="py-3.5 px-3 text-right text-purple-300">{grandTotals.locSubmittedQty}</td>
                  <td className="py-3.5 px-3 text-right text-purple-300">{grandTotals.locFindingDays}</td>
                  <td className="py-3.5 px-3 text-right text-teal-300">{grandTotals.dressCodeQty}</td>
                  <td className="py-3.5 px-3 text-right text-amber-300">{grandTotals.dressFinding}</td>
                  <td className="py-3.5 px-3 text-right text-rose-300">{grandTotals.messVisitQty}</td>
                  <td className="py-3.5 px-3 text-right text-amber-300">{grandTotals.messFinding}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
