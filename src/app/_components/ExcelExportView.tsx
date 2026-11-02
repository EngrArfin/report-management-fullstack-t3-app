"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconDownload, IconRefresh, IconSearch } from "./Icons";

export function ExcelExportView() {
  const { selectedYear, selectedMonth, selectedWeek, selectedZone } = useApp();

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
    <div className="space-y-5 pb-16">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Official Excel Reporting & Export Center
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Standardized 18-column operational audit dataset (Requirement #47) ready for Microsoft Excel & Google Sheets
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
            href={downloadUrl}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-emerald-400 active:scale-95 transition"
          >
            <IconDownload className="h-4 w-4" />
            <span>Download Formatted Excel ({filteredData.length} Records)</span>
          </a>
        </div>
      </div>

      {/* Filter Row */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
          <div className="relative w-full sm:w-60">
            <IconSearch className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filter by OM or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-white text-xs outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted (On Time)</option>
              <option value="LATE_SUBMITTED">Late Submitted</option>
            </select>
          </div>

          {/* Date range filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">From:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-white text-xs outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">To:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-white text-xs outline-none"
            />
          </div>
        </div>

        <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300">
          Showing {filteredData.length} Records
        </span>
      </div>

      {/* 18-Column Formatted Table (Requirement #47) */}
      <div className="glass-panel overflow-hidden rounded-2xl shadow-xl border border-slate-800">
        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-400">
                <th className="py-3 px-3 font-bold text-slate-300">1. Staff ID</th>
                <th className="py-3 px-3 font-bold text-slate-300">2. Office Manager</th>
                <th className="py-3 px-2 font-bold text-slate-300">3. Desig.</th>
                <th className="py-3 px-3 font-bold text-slate-300">4. Zone</th>
                <th className="py-3 px-3 font-bold text-slate-300">5. Month</th>
                <th className="py-3 px-3 font-bold text-center text-slate-300">6. Week</th>
                <th className="py-3 px-3 font-bold text-right text-sky-400">7. Market Visit</th>
                <th className="py-3 px-3 font-bold text-right text-amber-400">8. Market Finding</th>
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
                  <td colSpan={18} className="py-10 text-center text-slate-400">
                    Preparing export records...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={18} className="py-10 text-center text-slate-400">
                    No reports match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-indigo-950/15 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-400">{row.staffId}</td>
                    <td className="py-2.5 px-3 text-white font-semibold">{row.name}</td>
                    <td className="py-2.5 px-2 text-slate-400">{row.designation}</td>
                    <td className="py-2.5 px-3 text-slate-300">{row.zone}</td>
                    <td className="py-2.5 px-3 text-slate-300">{row.month}</td>
                    <td className="py-2.5 px-3 text-center text-slate-200">{row.week}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-sky-400">{row.marketVisitQty}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-amber-400">{row.marketFinding}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400">{row.solved}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-rose-400">{row.pending}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-purple-400">{row.locSubmittedQty}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-purple-300">{row.locFindingDays}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-teal-400">{row.dressCodeQty}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-amber-300">{row.dressFinding}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-rose-400">{row.messVisitQty}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-amber-300">{row.messFinding}</td>
                    <td className="py-2.5 px-3 text-slate-400">{row.submissionDate}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          row.status === "SUBMITTED"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
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
