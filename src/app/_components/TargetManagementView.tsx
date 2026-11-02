"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconTarget, IconRefresh } from "./Icons";

export function TargetManagementView() {
  const { selectedYear, selectedMonth, selectedZone, activeUser, showToast } = useApp();

  const [locTarget, setLocTarget] = useState<number>(20);
  const [messTarget, setMessTarget] = useState<number>(10);
  const [dressTarget, setDressTarget] = useState<number>(5);
  const [selectedOmIds, setSelectedOmIds] = useState<string[]>([]);
  const [applyToAll, setApplyToAll] = useState<boolean>(true);

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

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Target Management & Performance Governance
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure monthly activity quotas, monitor achievement rates, and rank field performance
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* ADMIN TARGET CONFIGURATION PANEL (Requirement #32, #39) */}
      {activeUser.role === "ADMIN" && (
        <div className="glass-panel rounded-2xl p-5 sm:p-6 shadow-xl border border-indigo-500/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                <IconTarget className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm sm:text-base">
                  Admin Target Configuration Console — {achievementData?.monthYear}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Set baseline monthly quotas for field personnel
                </p>
              </div>
            </div>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-400">
              Admin Exclusive
            </span>
          </div>

          <form onSubmit={handleSaveTargets} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* LOC Target */}
              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-3.5">
                <label className="block text-xs font-bold text-purple-300 mb-1">
                  LOC Submitted Target (Qty)
                </label>
                <input
                  type="number"
                  min="0"
                  value={locTarget}
                  onChange={(e) => setLocTarget(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-purple-900/50 bg-slate-950 p-2 text-sm font-extrabold text-white focus:border-purple-500 outline-none"
                />
              </div>

              {/* Mess Visit Target */}
              <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3.5">
                <label className="block text-xs font-bold text-rose-300 mb-1">
                  Mess Visit Target (Qty)
                </label>
                <input
                  type="number"
                  min="0"
                  value={messTarget}
                  onChange={(e) => setMessTarget(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-rose-900/50 bg-slate-950 p-2 text-sm font-extrabold text-white focus:border-rose-500 outline-none"
                />
              </div>

              {/* Dress Code Target */}
              <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-3.5">
                <label className="block text-xs font-bold text-teal-300 mb-1">
                  Dress Code Target (Qty)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dressTarget}
                  onChange={(e) => setDressTarget(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-teal-900/50 bg-slate-950 p-2 text-sm font-extrabold text-white focus:border-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Distribution Rule Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-300">
                  <input
                    type="radio"
                    checked={applyToAll}
                    onChange={() => setApplyToAll(true)}
                    className="text-indigo-600"
                  />
                  <span>Apply target uniformly to ALL Active Office Managers</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-300">
                  <input
                    type="radio"
                    checked={!applyToAll}
                    onChange={() => setApplyToAll(false)}
                    className="text-indigo-600"
                  />
                  <span>Select specific OM</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={setTargetsMutation.isPending}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2 font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition disabled:opacity-50"
              >
                {setTargetsMutation.isPending ? "Applying Targets..." : "Save & Finalize Targets"}
              </button>
            </div>

            {/* Individual OM Checkboxes if selective mode */}
            {!applyToAll && (
              <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                {allOms?.map((om) => (
                  <label key={om.id} className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOmIds.includes(om.id)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedOmIds([...selectedOmIds, om.id]);
                        else setSelectedOmIds(selectedOmIds.filter((id) => id !== om.id));
                      }}
                      className="rounded text-indigo-600"
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

      {/* LEADERBOARD & OM-WISE ACHIEVEMENT (Requirement #34, #35, #38) */}
      <section className="glass-panel rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Office Manager Target Achievement Leaderboard ({achievementData?.monthYear})
            </h3>
            <p className="text-[11px] text-slate-400">
              Ranked in descending order by Overall Target Achievement Percentage
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70">
          <div className="overflow-x-auto table-scrollbar">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-400">
                  <th className="py-3.5 px-3 font-bold text-center text-slate-300">Rank</th>
                  <th className="py-3.5 px-4 font-bold text-slate-300">Staff ID</th>
                  <th className="py-3.5 px-4 font-bold text-slate-300">Office Manager</th>
                  <th className="py-3.5 px-3 font-bold text-slate-300">Zone</th>
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
                    <td colSpan={11} className="py-10 text-center text-slate-400">
                      Computing target achievement metrics...
                    </td>
                  </tr>
                ) : (
                  achievementData?.rows.map((row) => (
                    <tr key={row.userId} className="hover:bg-indigo-950/15 transition">
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-black shadow-md ${
                            row.rank === 1
                              ? "bg-amber-400 text-slate-950 shadow-amber-400/30"
                              : row.rank === 2
                              ? "bg-slate-300 text-slate-950"
                              : row.rank === 3
                              ? "bg-amber-700/80 text-amber-100"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : row.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-400">{row.staffId}</td>
                      <td className="py-3 px-4 text-white font-semibold">{row.name}</td>
                      <td className="py-3 px-3 text-slate-300">{row.zone}</td>
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
                          <div className="hidden sm:block h-2 w-24 overflow-hidden rounded-full bg-slate-800">
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
            </table>
          </div>
        </div>
      </section>

      {/* MONTH-OVER-MONTH PERFORMANCE COMPARISON (Requirement #37) */}
      <section className="glass-panel rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Month-over-Month Historical Performance Comparison
            </h3>
            <p className="text-[11px] text-slate-400">
              Track performance improvement or decline between August 2026 and September 2026
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-slate-300 font-bold border border-slate-700">
              {comparisonData?.period1}
            </span>
            <span className="text-slate-500">vs</span>
            <span className="rounded-lg bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-1 text-indigo-300 font-bold">
              {comparisonData?.period2}
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70">
          <div className="overflow-x-auto table-scrollbar">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-400">
                  <th className="py-3 px-4 font-bold text-slate-300">Staff ID</th>
                  <th className="py-3 px-4 font-bold text-slate-300">Office Manager</th>
                  <th className="py-3 px-3 font-bold text-slate-300">Zone</th>
                  <th className="py-3 px-4 font-bold text-center text-slate-300">
                    {comparisonData?.period1} Overall
                  </th>
                  <th className="py-3 px-4 font-bold text-center text-indigo-300">
                    {comparisonData?.period2} Overall
                  </th>
                  <th className="py-3 px-4 font-bold text-center text-slate-300">Net Improvement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {comparisonData?.comparisons.map((comp) => (
                  <tr key={comp.userId} className="hover:bg-indigo-950/15 transition">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-400">{comp.staffId}</td>
                    <td className="py-3 px-4 text-white font-semibold">{comp.name}</td>
                    <td className="py-3 px-3 text-slate-300">{comp.zone}</td>
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
