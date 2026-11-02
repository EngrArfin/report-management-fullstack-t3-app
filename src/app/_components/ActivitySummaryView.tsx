"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconRefresh, IconDownload, IconSearch, IconFilter } from "./Icons";

type PeriodOption =
  | "1_MONTH"
  | "3_MONTHS"
  | "6_MONTHS"
  | "1_YEAR"
  | "CUSTOM"
  | "ALL";

type ActivitySortBy =
  | "DEFAULT"
  | "MV_DESC"
  | "FINDING_DESC"
  | "LOC_DESC"
  | "DC_DESC"
  | "MESS_DESC";

export function ActivitySummaryView() {
  const { selectedYear, selectedMonth, selectedWeek, selectedZone, setSelectedZone } =
    useApp();

  const [periodOption, setPeriodOption] = useState<PeriodOption>("1_MONTH");
  const [fromDate, setFromDate] = useState<string>("2026-07-01");
  const [toDate, setToDate] = useState<string>("2026-09-30");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<ActivitySortBy>("DEFAULT");

  const { data, isLoading, refetch, isFetching } = api.report.getActivitySummary.useQuery({
    year: selectedYear,
    month: selectedMonth,
    week: selectedWeek,
    zone: selectedZone,
    period: periodOption,
    fromDate: periodOption === "CUSTOM" ? fromDate : undefined,
    toDate: periodOption === "CUSTOM" ? toDate : undefined,
  });

  // Unique zones
  const uniqueZones = Array.from(new Set(data?.map((r) => r.zone) ?? [])).sort();

  let filteredRows =
    data?.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.zone.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  // Sorting
  if (sortBy === "MV_DESC") {
    filteredRows = [...filteredRows].sort((a, b) => b.marketVisitQty - a.marketVisitQty);
  } else if (sortBy === "FINDING_DESC") {
    filteredRows = [...filteredRows].sort((a, b) => b.marketFinding - a.marketFinding);
  } else if (sortBy === "LOC_DESC") {
    filteredRows = [...filteredRows].sort((a, b) => b.locSubmittedQty - a.locSubmittedQty);
  } else if (sortBy === "DC_DESC") {
    filteredRows = [...filteredRows].sort((a, b) => b.dressCodeQty - a.dressCodeQty);
  } else if (sortBy === "MESS_DESC") {
    filteredRows = [...filteredRows].sort((a, b) => b.messVisitQty - a.messVisitQty);
  }

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
    <div className="space-y-5 pb-20 min-w-0">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Activity Summary & Operational Rollup
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Rollup across Market Visit, Location Tracking, Dress Code & Mess Visit with fixed identity columns
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition shadow-sm"
          >
            <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <a
            href={`/api/export/excel?year=${selectedYear}&month=${selectedMonth}&week=${selectedWeek}&zone=${selectedZone}`}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition shadow-sm"
          >
            <IconDownload className="h-3.5 w-3.5 text-emerald-400" />
            <span>Export Table</span>
          </a>
        </div>
      </div>

      {/* Period Quick Select & In-Table Filters */}
      <div className="glass-panel flex flex-col gap-3.5 rounded-2xl p-4 text-xs shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <span className="font-extrabold uppercase tracking-wider text-slate-400 text-[11px]">
            Aggregation Period Rollup:
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: "1_MONTH", label: "1 Month (Current)" },
                { id: "3_MONTHS", label: "3 Months (Quarter)" },
                { id: "6_MONTHS", label: "6 Months" },
                { id: "1_YEAR", label: "1 Year (Annual)" },
                { id: "ALL", label: "All Time" },
                { id: "CUSTOM", label: "Custom Dates" },
              ] as const
            ).map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriodOption(p.id)}
                className={`rounded-xl px-3 py-1.5 font-bold transition ${
                  periodOption === p.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date Range if Selected */}
        {periodOption === "CUSTOM" && (
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-3">
            <span className="text-[11px] font-bold text-indigo-300">Custom Date Range:</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">From:</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">To:</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* In-Table Toolbar: Search + Zone Filter + Metric Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative w-full sm:w-56">
              <IconSearch className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search OM, ID or Zone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* In-Table Zone Dropdown */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-xs">
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

            {/* In-Table Metric Sort */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as ActivitySortBy)}
                className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
                title="Sort Table By Metric"
              >
                <option value="DEFAULT" className="bg-slate-900 text-white">Default (Staff ID)</option>
                <option value="MV_DESC" className="bg-slate-900 text-white">Market Visits (High to Low)</option>
                <option value="FINDING_DESC" className="bg-slate-900 text-white">Market Findings (High to Low)</option>
                <option value="LOC_DESC" className="bg-slate-900 text-white">LOC Submitted (High to Low)</option>
                <option value="DC_DESC" className="bg-slate-900 text-white">Dress Code (High to Low)</option>
                <option value="MESS_DESC" className="bg-slate-900 text-white">Mess Visits (High to Low)</option>
              </select>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            Showing <strong className="text-white">{filteredRows.length}</strong> Office Managers
          </div>
        </div>
      </div>

      {/* Activity Summary Table with Fixed / Sticky Identification Columns */}
      <div className="glass-panel overflow-hidden rounded-2xl shadow-xl border border-slate-800">
        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-400">
                <th className="sticky left-0 z-20 bg-slate-900 py-3.5 px-3 font-bold text-slate-300 w-24">
                  Staff ID
                </th>
                <th className="sticky left-24 z-20 bg-slate-900 py-3.5 px-3 font-bold text-slate-300 border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)]">
                  Office Manager
                </th>
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
                  <td colSpan={14} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm font-semibold text-slate-300">
                        {selectedZone !== "ALL"
                          ? `No activity records found for zone "${selectedZone}"`
                          : "No activity data found for selected period."}
                      </span>
                      {selectedZone !== "ALL" && (
                        <button
                          onClick={() => setSelectedZone("ALL")}
                          className="mt-1 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-indigo-500 transition"
                        >
                          Show All Zones Activity Summary
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.userId} className="hover:bg-indigo-950/20 transition-colors group">
                    <td className="sticky left-0 z-10 bg-slate-950 group-hover:bg-slate-900 py-3 px-3 font-mono font-bold text-indigo-400 transition-colors">
                      <span className="rounded bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20">
                        {row.staffId}
                      </span>
                    </td>
                    <td className="sticky left-24 z-10 bg-slate-950 group-hover:bg-slate-900 py-3 px-3 text-white font-semibold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)] transition-colors">
                      {row.name}
                    </td>
                    <td className="py-3 px-2 text-slate-400">{row.designation}</td>
                    <td className="py-3 px-3 text-slate-300">
                      <span className="rounded-md bg-slate-800/60 px-2 py-0.5 text-slate-300 font-semibold border border-slate-700/60">
                        {row.zone}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-100">{row.marketVisitQty}</td>
                    <td className="py-3 px-3 text-right font-bold text-amber-400">{row.marketFinding}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-400">{row.solvedQty}</td>
                    <td className="py-3 px-3 text-right font-bold text-rose-400">{row.pendingQty}</td>
                    <td className="py-3 px-3 text-right font-bold text-purple-300">{row.locSubmittedQty}</td>
                    <td className="py-3 px-3 text-right font-medium text-slate-300">{row.locFindingDays}</td>
                    <td className="py-3 px-3 text-right font-bold text-teal-300">{row.dressCodeQty}</td>
                    <td className="py-3 px-3 text-right text-slate-300">{row.dressFinding}</td>
                    <td className="py-3 px-3 text-right font-bold text-rose-300">{row.messVisitQty}</td>
                    <td className="py-3 px-3 text-right text-slate-300">{row.messFinding}</td>
                  </tr>
                ))
              )}
            </tbody>
            {filteredRows.length > 0 && (
              <tfoot>
                <tr className="border-t-2 border-slate-700 bg-slate-900/95 font-bold text-slate-200">
                  <td
                    colSpan={2}
                    className="sticky left-0 z-10 bg-slate-900 py-3.5 px-3 text-left uppercase text-[11px] tracking-wider text-slate-400 border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)]"
                  >
                    Grand Total ({filteredRows.length} OMs)
                  </td>
                  <td className="py-3.5 px-2 text-slate-400">-</td>
                  <td className="py-3.5 px-3 text-slate-400">-</td>
                  <td className="py-3.5 px-3 text-right text-sky-400">{grandTotals.marketVisitQty}</td>
                  <td className="py-3.5 px-3 text-right text-amber-400">{grandTotals.marketFinding}</td>
                  <td className="py-3.5 px-3 text-right text-emerald-400">{grandTotals.solvedQty}</td>
                  <td className="py-3.5 px-3 text-right text-rose-400">{grandTotals.pendingQty}</td>
                  <td className="py-3.5 px-3 text-right text-purple-300">{grandTotals.locSubmittedQty}</td>
                  <td className="py-3.5 px-3 text-right text-slate-300">{grandTotals.locFindingDays}</td>
                  <td className="py-3.5 px-3 text-right text-teal-300">{grandTotals.dressCodeQty}</td>
                  <td className="py-3.5 px-3 text-right text-slate-300">{grandTotals.dressFinding}</td>
                  <td className="py-3.5 px-3 text-right text-rose-300">{grandTotals.messVisitQty}</td>
                  <td className="py-3.5 px-3 text-right text-slate-300">{grandTotals.messFinding}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}