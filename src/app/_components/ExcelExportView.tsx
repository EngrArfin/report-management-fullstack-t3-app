"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconDownload, IconRefresh } from "./Icons";

export function ExcelExportView() {
  const { selectedYear, selectedMonth, selectedWeek, selectedZone } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const { data, isLoading, refetch, isFetching } = api.export.getData.useQuery({
    year: selectedYear,
    month: selectedMonth,
    week: selectedWeek,
    zone: selectedZone,
    status: statusFilter,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  const downloadUrl = `/api/export/excel?year=${selectedYear}&month=${selectedMonth}&week=${selectedWeek}&zone=${selectedZone}&status=${statusFilter}${
    fromDate ? `&fromDate=${fromDate}` : ""
  }${toDate ? `&toDate=${toDate}` : ""}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Official Excel Reporting & Export Center
          </h2>
          <p className="text-xs text-slate-400">
            Export standardized, audit-ready operational datasets with the exact 18 required columns (Requirement #47)
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
            href={downloadUrl}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-500"
          >
            <IconDownload className="h-4 w-4" />
            <span>Download Formatted Excel (.csv)</span>
          </a>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-slate-400">Additional Filters:</span>

          {/* Status filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted (On Time)</option>
              <option value="LATE_SUBMITTED">Late Submitted</option>
            </select>
          </div>

          {/* Date range filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400">From Date:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-white"
            />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-400">To Date:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-white"
            />
          </div>
        </div>

        <span className="text-xs text-indigo-300 font-semibold">
          Total Records Matching: {data?.length ?? 0}
        </span>
      </div>

      {/* Data Table with all 18 Columns (Requirement #47) */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/70 text-slate-400">
                <th className="py-3 px-3 font-semibold">1. Staff ID</th>
                <th className="py-3 px-3 font-semibold">2. Name</th>
                <th className="py-3 px-3 font-semibold">3. Designation</th>
                <th className="py-3 px-3 font-semibold">4. Zone</th>
                <th className="py-3 px-3 font-semibold">5. Month</th>
                <th className="py-3 px-3 font-semibold text-center">6. Week</th>
                <th className="py-3 px-3 font-semibold text-right">7. Market Visit Qty</th>
                <th className="py-3 px-3 font-semibold text-right">8. Market Finding</th>
                <th className="py-3 px-3 font-semibold text-right">9. Solved</th>
                <th className="py-3 px-3 font-semibold text-right">10. Pending</th>
                <th className="py-3 px-3 font-semibold text-right">11. LOC Submitted Qty</th>
                <th className="py-3 px-3 font-semibold text-right">12. LOC Finding Days</th>
                <th className="py-3 px-3 font-semibold text-right">13. Dress Code Qty</th>
                <th className="py-3 px-3 font-semibold text-right">14. Dress Finding</th>
                <th className="py-3 px-3 font-semibold text-right">15. Mess Visit Qty</th>
                <th className="py-3 px-3 font-semibold text-right">16. Mess Finding</th>
                <th className="py-3 px-3 font-semibold">17. Submission Date</th>
                <th className="py-3 px-3 font-semibold text-center">18. Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={18} className="py-8 text-center text-slate-400">
                    Preparing export records...
                  </td>
                </tr>
              ) : data?.length === 0 ? (
                <tr>
                  <td colSpan={18} className="py-8 text-center text-slate-400">
                    No reports match the selected criteria.
                  </td>
                </tr>
              ) : (
                data?.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition">
                    <td className="py-2.5 px-3 font-mono font-medium text-indigo-300">{row.staffId}</td>
                    <td className="py-2.5 px-3 font-medium text-white">{row.name}</td>
                    <td className="py-2.5 px-3 text-slate-400">{row.designation}</td>
                    <td className="py-2.5 px-3 text-slate-300">{row.zone}</td>
                    <td className="py-2.5 px-3 text-slate-300">{row.month}</td>
                    <td className="py-2.5 px-3 text-center text-slate-200">{row.week}</td>
                    <td className="py-2.5 px-3 text-right text-sky-300">{row.marketVisitQty}</td>
                    <td className="py-2.5 px-3 text-right text-amber-300 font-semibold">
                      {row.marketFinding}
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">
                      {row.solved}
                    </td>
                    <td className="py-2.5 px-3 text-right text-rose-400 font-semibold">
                      {row.pending}
                    </td>
                    <td className="py-2.5 px-3 text-right text-purple-300 font-semibold">
                      {row.locSubmittedQty}
                    </td>
                    <td className="py-2.5 px-3 text-right text-purple-400">{row.locFindingDays}</td>
                    <td className="py-2.5 px-3 text-right text-teal-300">{row.dressCodeQty}</td>
                    <td className="py-2.5 px-3 text-right text-amber-300">{row.dressFinding}</td>
                    <td className="py-2.5 px-3 text-right text-rose-300">{row.messVisitQty}</td>
                    <td className="py-2.5 px-3 text-right text-amber-300">{row.messFinding}</td>
                    <td className="py-2.5 px-3 text-slate-400">{row.submissionDate}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          row.status === "SUBMITTED"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
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
