"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconDownload, IconRefresh, IconSearch, IconFilter } from "./Icons";

export function ExcelExportView() {
  const {
    selectedYear,
    selectedMonth,
    selectedWeek,
    setSelectedWeek,
    selectedZone,
    setSelectedZone,
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, refetch, isFetching } = api.export.getData.useQuery({
    year: selectedYear,
    month: selectedMonth,
    week: selectedWeek,
    zone: selectedZone,
    status: statusFilter,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  const uniqueZones = Array.from(new Set(data?.map((r) => r.zone) ?? [])).sort();

  const filteredData =
    data?.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.zone.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  const downloadUrl = `/api/export/excel?year=${selectedYear}&month=${selectedMonth}&week=${selectedWeek}&zone=${selectedZone}&status=${statusFilter}${
    fromDate ? `&fromDate=${fromDate}` : ""
  }${toDate ? `&toDate=${toDate}` : ""}`;

  return (
    <div className="space-y-5 pb-20 min-w-0">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Excel Export Center
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            18-Column Standard Dataset
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition shadow-sm"
          >
            <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <a
            href={downloadUrl}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-emerald-400 active:scale-95 transition"
          >
            <IconDownload className="h-4 w-4" />
            <span>Download Formatted Excel ({filteredData.length} Records)</span>
          </a>
        </div>
      </div>

      {/* Filter Row with Dropdowns */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-3.5 rounded-2xl p-4 text-xs shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
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

          {/* In-Table Zone Filter */}
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

          {/* In-Table Status Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1.5 text-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900 text-white">All Statuses</option>
              <option value="SUBMITTED" className="bg-slate-900 text-white">Submitted On Time</option>
              <option value="LATE_SUBMITTED" className="bg-slate-900 text-white">Late Submitted</option>
              <option value="PENDING" className="bg-slate-900 text-white">Pending / Missing</option>
            </select>
          </div>

          {/* In-Table Week Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1.5 text-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Week:</span>
            <select
              value={selectedWeek}
              onChange={(e) => {
                const val = e.target.value === "all" ? "all" : Number(e.target.value);
                setSelectedWeek(val);
              }}
              className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">All Weeks</option>
              <option value={1} className="bg-slate-900 text-white">Week 1</option>
              <option value={2} className="bg-slate-900 text-white">Week 2</option>
              <option value={3} className="bg-slate-900 text-white">Week 3</option>
              <option value={4} className="bg-slate-900 text-white">Week 4</option>
            </select>
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400">Date Range:</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-white"
          />
          <span className="text-slate-500">to</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-white"
          />
        </div>
      </div>

      {/* 18-Column Preview Table with Fixed / Sticky Identification Columns */}
      <div className="glass-panel overflow-hidden rounded-2xl shadow-xl border border-slate-800">
        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-400">
                <th className="sticky left-0 z-20 bg-slate-900 py-3 px-3 font-bold text-slate-300 w-24">
                  1. Staff ID
                </th>
                <th className="sticky left-24 z-20 bg-slate-900 py-3 px-3 font-bold text-slate-300 border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)]">
                  2. Office Manager
                </th>
                <th className="py-3 px-2 font-bold text-slate-300">3. Desig.</th>
                <th className="py-3 px-3 font-bold text-slate-300">4. Zone</th>
                <th className="py-3 px-3 font-bold text-slate-300">5. Month</th>
                <th className="py-3 px-3 font-bold text-center text-slate-300">6. Week</th>
                <th className="py-3 px-3 font-bold text-right text-sky-400">7. Market Visit</th>
                <th className="py-3 px-3 font-bold text-right text-amber-400">8. MV Finding</th>
                <th className="py-3 px-3 font-bold text-right text-emerald-400">9. Solved</th>
                <th className="py-3 px-3 font-bold text-right text-rose-400">10. Pending</th>
                <th className="py-3 px-3 font-bold text-right text-purple-400">11. LOC Submitted</th>
                <th className="py-3 px-3 font-bold text-right text-purple-300">12. LOC Days</th>
                <th className="py-3 px-3 font-bold text-right text-teal-400">13. Dress Code</th>
                <th className="py-3 px-3 font-bold text-right text-amber-300">14. Dress Finding</th>
                <th className="py-3 px-3 font-bold text-right text-rose-400">15. Mess Visit</th>
                <th className="py-3 px-3 font-bold text-right text-amber-300">16. Mess Finding</th>
                <th className="py-3 px-3 font-bold text-slate-300">17. Submission Date</th>
                <th className="py-3 px-3 font-bold text-center text-slate-300">18. Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={18} className="py-16 text-center">
                    <div className="flex items-center justify-center">
                      <div className="h-7 w-7 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={18} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm font-semibold text-slate-300">
                        {selectedZone !== "ALL"
                          ? `No exportable reports found for zone "${selectedZone}"`
                          : "No reports match the selected criteria."}
                      </span>
                      {selectedZone !== "ALL" && (
                        <button
                          onClick={() => setSelectedZone("ALL")}
                          className="mt-1 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-indigo-500 transition"
                        >
                          Show All Zones
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-indigo-950/20 transition-colors group">
                    <td className="sticky left-0 z-10 bg-slate-950 group-hover:bg-slate-900 py-2.5 px-3 font-mono font-bold text-indigo-400 transition-colors">
                      <span className="rounded bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20">
                        {row.staffId}
                      </span>
                    </td>
                    <td className="sticky left-24 z-10 bg-slate-950 group-hover:bg-slate-900 py-2.5 px-3 text-white font-semibold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)] transition-colors">
                      {row.name}
                    </td>
                    <td className="py-2.5 px-2 text-slate-400">{row.designation}</td>
                    <td className="py-2.5 px-3 text-slate-300">
                      <span className="rounded-md bg-slate-800/60 px-2 py-0.5 text-slate-300 font-semibold border border-slate-700/60">
                        {row.zone}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{row.month}</td>
                    <td className="py-2.5 px-3 text-center text-slate-200">{row.week}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-sky-400">{row.marketVisitQty}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-amber-400">{row.marketFinding}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400">{row.solved}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-rose-400">{row.pending}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-purple-400">{row.locSubmittedQty}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-purple-300">{row.locFindingDays}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-teal-400">{row.dressCodeQty}</td>
                    <td className="py-2.5 px-3 text-right text-slate-300">{row.dressFinding}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-rose-400">{row.messVisitQty}</td>
                    <td className="py-2.5 px-3 text-right text-slate-300">{row.messFinding}</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">{row.submissionDate}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                          row.status === "SUBMITTED"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : row.status === "LATE_SUBMITTED"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {row.status}
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