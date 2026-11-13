"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import {
  IconTarget,
  IconRefresh,
  IconSearch,
  IconTrendingUp,
  IconFilter,
} from "./Icons";

type LeaderboardSortBy =
  | "RANK_ASC"
  | "LOC_DESC"
  | "MESS_DESC"
  | "DRESS_DESC"
  | "NAME_ASC";

export function TargetManagementView() {
  const {
    selectedYear,
    selectedMonth,
    selectedZone,
    setSelectedZone,
    activeUser,
    showToast,
  } = useApp();

  const [locTarget, setLocTarget] = useState<number>(20);
  const [messTarget, setMessTarget] = useState<number>(10);
  const [dressTarget, setDressTarget] = useState<number>(5);
  const [selectedOmIds, setSelectedOmIds] = useState<string[]>([]);
  const [applyToAll, setApplyToAll] = useState<boolean>(true);
  const [leaderboardSearch, setLeaderboardSearch] = useState<string>("");
  const [leaderboardSortBy, setLeaderboardSortBy] =
    useState<LeaderboardSortBy>("RANK_ASC");

  // Month comparison state (Requirement #37)
  const compareYear1 = 2026;
  const compareMonth1 = 8; // August
  const compareYear2 = 2026;
  const compareMonth2 = 9; // September

  const utils = api.useUtils();

  const { data: achievementData, isLoading, refetch, isFetching } =
    api.target.getMonthlyAchievement.useQuery({
      year: selectedYear,
      month: selectedMonth,
      zone: selectedZone,
    });

  const { data: allOms } = api.om.getAll.useQuery();

  const { data: comparisonData } = api.target.compareMonths.useQuery({
    year1: compareYear1,
    month1: compareMonth1,
    year2: compareYear2,
    month2: compareMonth2,
  });

  const setTargetsMutation = api.target.setTargets.useMutation({
    onSuccess: () => {
      showToast("Targets configured and applied successfully!", "success");
      void utils.target.getMonthlyAchievement.invalidate();
      void utils.dashboard.getMetrics.invalidate();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  const handleSaveTargets = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allOms || allOms.length === 0) return;

    const userIds = applyToAll ? allOms.map((om) => om.id) : selectedOmIds;
    if (userIds.length === 0) {
      showToast("Please select at least one Office Manager.", "error");
      return;
    }

    setTargetsMutation.mutate({
      userIds,
      year: selectedYear,
      month: selectedMonth,
      locTarget,
      messVisitTarget: messTarget,
      dressCodeTarget: dressTarget,
    });
  };

  // Extract unique zones for inline table filter dropdown
  const uniqueZones = Array.from(
    new Set(achievementData?.rows.map((r) => r.zone) ?? [])
  ).sort();

  // Filter leaderboard rows by search query
  let processedRows =
    achievementData?.rows.filter(
      (r) =>
        r.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
        r.staffId.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
        r.zone.toLowerCase().includes(leaderboardSearch.toLowerCase())
    ) ?? [];

  // Apply sorting
  if (leaderboardSortBy === "LOC_DESC") {
    processedRows = [...processedRows].sort((a, b) => b.locPct - a.locPct);
  } else if (leaderboardSortBy === "MESS_DESC") {
    processedRows = [...processedRows].sort((a, b) => b.messPct - a.messPct);
  } else if (leaderboardSortBy === "DRESS_DESC") {
    processedRows = [...processedRows].sort((a, b) => b.dressPct - a.dressPct);
  } else if (leaderboardSortBy === "NAME_ASC") {
    processedRows = [...processedRows].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // RANK_ASC
    processedRows = [...processedRows].sort((a, b) => a.rank - b.rank);
  }

  // Summary statistics
  const avgOverall =
    processedRows.length > 0
      ? Number(
          (
            processedRows.reduce((sum, r) => sum + r.overallPct, 0) /
            processedRows.length
          ).toFixed(1)
        )
      : 0;

  const avgLoc =
    processedRows.length > 0
      ? Number(
          (
            processedRows.reduce((sum, r) => sum + r.locPct, 0) /
            processedRows.length
          ).toFixed(1)
        )
      : 0;

  const avgMess =
    processedRows.length > 0
      ? Number(
          (
            processedRows.reduce((sum, r) => sum + r.messPct, 0) /
            processedRows.length
          ).toFixed(1)
        )
      : 0;

  const avgDress =
    processedRows.length > 0
      ? Number(
          (
            processedRows.reduce((sum, r) => sum + r.dressPct, 0) /
            processedRows.length
          ).toFixed(1)
        )
      : 0;

  return (
    <div className="space-y-6 pb-20 min-w-0">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
              Target Management & Performance Governance
            </h2>
            <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
              {achievementData?.monthYear ?? `${selectedMonth}/${selectedYear}`}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure monthly activity quotas, monitor achievement rates, and rank field performance
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {selectedZone !== "ALL" && (
            <button
              onClick={() => setSelectedZone("ALL")}
              className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 transition"
            >
              Filter: {selectedZone} (Clear)
            </button>
          )}

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition shadow-sm"
          >
            <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>{isFetching ? "Syncing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* ADMIN TARGET CONFIGURATION PANEL (Requirement #32, #39) */}
      {activeUser.role === "ADMIN" && (
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-indigo-950/20 to-slate-950 p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                <IconTarget className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-white text-sm sm:text-base">
                Target Configuration
              </h3>
            </div>
            <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
              Admin
            </span>
          </div>

          <form onSubmit={handleSaveTargets} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* LOC Target */}
              <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300">Location Tracking (LOC)</span>
                  <span className="text-[10px] text-purple-400 font-semibold">Strictly Submitted Qty</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={locTarget}
                    onChange={(e) => setLocTarget(Number(e.target.value))}
                    className="w-full rounded-xl border border-purple-500/40 bg-slate-950/80 px-3 py-1.5 text-lg font-black text-white outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <span className="text-xs text-slate-400 font-medium">Qty/Mo</span>
                </div>
              </div>

              {/* Mess Visit Target */}
              <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300">Mess Visit</span>
                  <span className="text-[10px] text-rose-400 font-semibold">Accommodation Audit</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={messTarget}
                    onChange={(e) => setMessTarget(Number(e.target.value))}
                    className="w-full rounded-xl border border-rose-500/40 bg-slate-950/80 px-3 py-1.5 text-lg font-black text-white outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <span className="text-xs text-slate-400 font-medium">Visits/Mo</span>
                </div>
              </div>

              {/* Dress Code Target */}
              <div className="rounded-2xl border border-teal-500/30 bg-teal-950/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-300">Dress Code Inspection</span>
                  <span className="text-[10px] text-teal-400 font-semibold">Uniform Protocol</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={dressTarget}
                    onChange={(e) => setDressTarget(Number(e.target.value))}
                    className="w-full rounded-xl border border-teal-500/40 bg-slate-950/80 px-3 py-1.5 text-lg font-black text-white outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <span className="text-xs text-slate-400 font-medium">Audits/Mo</span>
                </div>
              </div>
            </div>

            {/* Scope Selection */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="targetScope"
                    checked={applyToAll}
                    onChange={() => setApplyToAll(true)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Apply uniform quota to ALL active Office Managers ({allOms?.length ?? 0})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="targetScope"
                    checked={!applyToAll}
                    onChange={() => setApplyToAll(false)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Select specific Office Managers</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={setTargetsMutation.isPending}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2 text-xs font-extrabold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition"
              >
                {setTargetsMutation.isPending ? "Applying Targets..." : "Save & Finalize Targets"}
              </button>
            </div>

            {/* Individual OM Checkboxes if selective mode */}
            {!applyToAll && (
              <div className="max-h-40 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs table-scrollbar">
                {allOms?.map((om) => (
                  <label key={om.id} className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOmIds.includes(om.id)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedOmIds([...selectedOmIds, om.id]);
                        else setSelectedOmIds(selectedOmIds.filter((id) => id !== om.id));
                      }}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>
                      {om.name} ({om.staffId} - {om.zone})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </form>
        </div>
      )}

      {/* LEADERBOARD & OM-WISE ACHIEVEMENT (FIXED STICKY COLUMNS + INLINE DROPDOWNS) */}
      <section className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Target Leaderboard
            </h3>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700">
              {achievementData?.monthYear ?? `${selectedMonth}/${selectedYear}`}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <IconSearch className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={leaderboardSearch}
                onChange={(e) => setLeaderboardSearch(e.target.value)}
                placeholder="Search OM, ID or Zone..."
                className="w-40 sm:w-52 rounded-xl border border-slate-700 bg-slate-950/80 py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* In-Table Zone Dropdown Filter */}
            {uniqueZones.length > 0 && (
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-xs">
                <IconFilter className="h-3 w-3 text-indigo-400" />
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
                  title="Filter Leaderboard Zone"
                >
                  <option value="ALL" className="bg-slate-900 text-white">All Zones</option>
                  {uniqueZones.map((z) => (
                    <option key={z} value={z} className="bg-slate-900 text-white">
                      {z}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* In-Table Sort Dropdown */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Sort:</span>
              <select
                value={leaderboardSortBy}
                onChange={(e) => setLeaderboardSortBy(e.target.value as LeaderboardSortBy)}
                className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
                title="Sort Leaderboard"
              >
                <option value="RANK_ASC" className="bg-slate-900 text-white">Overall Rank (1st to Last)</option>
                <option value="LOC_DESC" className="bg-slate-900 text-white">LOC Achievement %</option>
                <option value="MESS_DESC" className="bg-slate-900 text-white">Mess Visit %</option>
                <option value="DRESS_DESC" className="bg-slate-900 text-white">Dress Code %</option>
                <option value="NAME_ASC" className="bg-slate-900 text-white">OM Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Container with Sticky Rank & Office Manager Columns */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-inner">
          <div className="overflow-x-auto table-scrollbar">
            <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-300">
                  {/* Sticky Rank */}
                  <th className="sticky left-0 z-20 bg-slate-900 py-3.5 px-3 font-bold text-center w-14">
                    Rank
                  </th>
                  {/* Sticky Office Manager */}
                  <th className="sticky left-14 z-20 bg-slate-900 py-3.5 px-4 font-bold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)]">
                    Office Manager
                  </th>
                  <th className="py-3.5 px-3 font-bold">Zone</th>
                  <th className="py-3.5 px-3 font-bold text-center text-purple-300">LOC (Ach / Tgt)</th>
                  <th className="py-3.5 px-3 font-bold text-center text-purple-400">LOC %</th>
                  <th className="py-3.5 px-3 font-bold text-center text-rose-300">Mess (Ach / Tgt)</th>
                  <th className="py-3.5 px-3 font-bold text-center text-rose-400">Mess %</th>
                  <th className="py-3.5 px-3 font-bold text-center text-teal-300">Dress (Ach / Tgt)</th>
                  <th className="py-3.5 px-3 font-bold text-center text-teal-400">Dress %</th>
                  <th className="py-3.5 px-4 font-bold text-right text-indigo-300">Overall Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {isLoading ? (
                  <tr>
                    <td colSpan={10} className="py-16 text-center">
                      <div className="flex items-center justify-center">
                        <div className="h-7 w-7 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                      </div>
                    </td>
                  </tr>
                ) : processedRows.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2.5">
                        <span className="text-sm font-bold text-slate-300">
                          {selectedZone !== "ALL"
                            ? `No Office Managers stationed in zone "${selectedZone}"`
                            : `No matching Office Managers found for "${leaderboardSearch}"`}
                        </span>
                        {selectedZone !== "ALL" && (
                          <p className="text-xs text-slate-500 max-w-md">
                            Head Office is administrative. Active Office Managers are stationed across regional zones
                            (Mitford, Comilla, Cox&apos;s Bazar, Narayanganj).
                          </p>
                        )}
                        {selectedZone !== "ALL" && (
                          <button
                            onClick={() => setSelectedZone("ALL")}
                            className="mt-1.5 rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition"
                          >
                            Switch to All Zones Leaderboard
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  processedRows.map((row) => (
                    <tr key={row.userId} className="hover:bg-indigo-950/20 transition-colors group">
                      {/* Pinned Rank */}
                      <td className="sticky left-0 z-10 bg-slate-950 group-hover:bg-slate-900 py-3 px-3 text-center transition-colors">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-black shadow-md ${
                            row.rank === 1
                              ? "bg-amber-400 text-slate-950 shadow-amber-400/30 ring-2 ring-amber-400/40"
                              : row.rank === 2
                              ? "bg-slate-300 text-slate-950 ring-2 ring-slate-300/40"
                              : row.rank === 3
                              ? "bg-amber-700/80 text-amber-100 ring-2 ring-amber-700/40"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : row.rank}
                        </span>
                      </td>
                      {/* Pinned OM & Staff ID */}
                      <td className="sticky left-14 z-10 bg-slate-950 group-hover:bg-slate-900 py-3 px-4 text-white font-semibold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)] transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-indigo-400 rounded bg-indigo-500/10 px-1.5 py-0.5 border border-indigo-500/20">
                            {row.staffId}
                          </span>
                          <span className="truncate max-w-[140px] sm:max-w-none">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        <span className="rounded-md bg-slate-800/60 px-2 py-0.5 text-slate-300 font-semibold border border-slate-700/60">
                          {row.zone}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center text-slate-300">
                        {row.achievedLoc} / <span className="text-slate-500">{row.targetLoc}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-extrabold text-purple-400">
                        {row.locPct}%
                      </td>
                      <td className="py-3 px-3 text-center text-slate-300">
                        {row.achievedMess} / <span className="text-slate-500">{row.targetMess}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-extrabold text-rose-400">
                        {row.messPct}%
                      </td>
                      <td className="py-3 px-3 text-center text-slate-300">
                        {row.achievedDress} / <span className="text-slate-500">{row.targetDress}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-extrabold text-teal-400">
                        {row.dressPct}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <div className="hidden sm:block h-2 w-20 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className={`h-full ${
                                row.overallPct >= 90
                                  ? "bg-emerald-400"
                                  : row.overallPct >= 75
                                  ? "bg-indigo-400"
                                  : "bg-amber-400"
                              }`}
                              style={{ width: `${Math.min(100, row.overallPct)}%` }}
                            />
                          </div>
                          <span className="font-black text-white text-sm">{row.overallPct}%</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {processedRows.length > 0 && (
                <tfoot>
                  <tr className="border-t-2 border-slate-700 bg-slate-900/95 font-bold text-slate-200">
                    <td
                      colSpan={2}
                      className="sticky left-0 z-10 bg-slate-900 py-3.5 px-4 text-left uppercase text-[11px] tracking-wider text-slate-400 border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)]"
                    >
                      Average ({processedRows.length} Personnel)
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">-</td>
                    <td className="py-3.5 px-3 text-center text-slate-400">-</td>
                    <td className="py-3.5 px-3 text-center text-purple-400 font-extrabold">{avgLoc}%</td>
                    <td className="py-3.5 px-3 text-center text-slate-400">-</td>
                    <td className="py-3.5 px-3 text-center text-rose-400 font-extrabold">{avgMess}%</td>
                    <td className="py-3.5 px-3 text-center text-slate-400">-</td>
                    <td className="py-3.5 px-3 text-center text-teal-400 font-extrabold">{avgDress}%</td>
                    <td className="py-3.5 px-4 text-right text-indigo-300 font-black text-sm">{avgOverall}%</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </section>

      {/* MONTH-OVER-MONTH HISTORICAL COMPARISON */}
      <section className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <IconTrendingUp className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Month-over-Month Historical Performance Comparison
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Track performance improvement or decline between August 2026 and September 2026
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300 border border-slate-700">
              {comparisonData?.period1} vs {comparisonData?.period2}
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-inner">
          <div className="overflow-x-auto table-scrollbar">
            <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300">
                  <th className="sticky left-0 z-20 bg-slate-900 py-3 px-3 font-bold w-24">Staff ID</th>
                  <th className="sticky left-24 z-20 bg-slate-900 py-3 px-4 font-bold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)]">
                    Office Manager
                  </th>
                  <th className="py-3 px-3 font-bold">Zone</th>
                  <th className="py-3 px-4 font-bold text-center">
                    {comparisonData?.period1 ?? "August"} Overall
                  </th>
                  <th className="py-3 px-4 font-bold text-center text-indigo-300">
                    {comparisonData?.period2 ?? "September"} Overall
                  </th>
                  <th className="py-3 px-4 font-bold text-center">Net Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {comparisonData?.comparisons.map((comp) => (
                  <tr key={comp.userId} className="hover:bg-indigo-950/20 transition-colors group">
                    <td className="sticky left-0 z-10 bg-slate-950 group-hover:bg-slate-900 py-3 px-3 font-mono font-bold text-indigo-400 transition-colors">
                      <span className="rounded bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20">
                        {comp.staffId}
                      </span>
                    </td>
                    <td className="sticky left-24 z-10 bg-slate-950 group-hover:bg-slate-900 py-3 px-4 text-white font-semibold border-r border-slate-800 shadow-[4px_0_8px_rgba(0,0,0,0.5)] transition-colors">
                      {comp.name}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      <span className="rounded-md bg-slate-800/60 px-2 py-0.5 text-slate-300 font-semibold border border-slate-700/60">
                        {comp.zone}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-300">
                      {comp.month1.overallPct}%
                    </td>
                    <td className="py-3 px-4 text-center font-extrabold text-indigo-300">
                      {comp.month2.overallPct}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-black text-xs ${
                          comp.diffPct >= 0
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {comp.diffPct >= 0 ? `▲ +${comp.diffPct}%` : `▼ ${comp.diffPct}%`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}