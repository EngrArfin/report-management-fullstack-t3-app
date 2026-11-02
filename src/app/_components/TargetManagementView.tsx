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
      showToast("Targets configured successfully!", "success");
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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Target Management & Achievement Module
          </h2>
          <p className="text-xs text-slate-400">
            Configure monthly activity quotas, monitor achievement rates, and rank field performance
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
        >
          <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* ADMIN TARGET CONFIGURATION PANEL (Requirement #32, #39) */}
      {activeUser.role === "ADMIN" && (
        <div className="rounded-xl border border-indigo-900/40 bg-indigo-950/15 p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-900/30 pb-3">
            <div className="flex items-center gap-2">
              <IconTarget className="h-5 w-5 text-indigo-400" />
              <h3 className="font-bold text-white">
                Admin Target Setting Console — {achievementData?.monthYear}
              </h3>
            </div>
            <span className="text-xs text-indigo-300 font-medium">
              Flexible Target Distribution Rule
            </span>
          </div>

          <form onSubmit={handleSaveTargets} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* LOC Target */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <label className="block text-xs font-semibold text-purple-300 mb-1">
                  LOC Submitted Target (Qty)
                </label>
                <input
                  type="number"
                  min="0"
                  value={locTarget}
                  onChange={(e) => setLocTarget(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-sm font-bold text-white"
                />
              </div>

              {/* Mess Visit Target */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Mess Visit Target (Qty)
                </label>
                <input
                  type="number"
                  min="0"
                  value={messTarget}
                  onChange={(e) => setMessTarget(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-sm font-bold text-white"
                />
              </div>

              {/* Dress Code Target */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <label className="block text-xs font-semibold text-teal-300 mb-1">
                  Dress Code Target (Qty)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dressTarget}
                  onChange={(e) => setDressTarget(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-sm font-bold text-white"
                />
              </div>
            </div>

            {/* Target Distribution Mode */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
                  <input
                    type="radio"
                    checked={applyToAll}
                    onChange={() => setApplyToAll(true)}
                    className="text-indigo-600 focus:ring-0"
                  />
                  <span>Apply target uniformly to ALL Active Office Managers</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
                  <input
                    type="radio"
                    checked={!applyToAll}
                    onChange={() => setApplyToAll(false)}
                    className="text-indigo-600 focus:ring-0"
                  />
                  <span>Select specific OM</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={setTargetsMutation.isPending}
                className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-50"
              >
                {setTargetsMutation.isPending ? "Applying..." : "Save Monthly Targets"}
              </button>
            </div>

            {/* Individual OM Selectors if applyToAll is false */}
            {!applyToAll && (
              <div className="max-h-36 overflow-y-auto rounded-lg border border-slate-800 bg-slate-900 p-3 grid grid-cols-2 gap-2 text-xs">
                {allOms?.map((om) => (
                  <label key={om.id} className="flex items-center gap-2 text-slate-300">
                    <input
                      type="checkbox"
                      checked={selectedOmIds.includes(om.id)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedOmIds([...selectedOmIds, om.id]);
                        else setSelectedOmIds(selectedOmIds.filter((id) => id !== om.id));
                      }}
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
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">
              OM Performance Ranking & Achievement Dashboard ({achievementData?.monthYear})
            </h3>
            <p className="text-xs text-slate-400">
              Ranked by Overall Target Achievement Percentage
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/60 text-slate-400">
                <th className="py-3 px-3 font-semibold text-center">Rank</th>
                <th className="py-3 px-3 font-semibold">Staff ID</th>
                <th className="py-3 px-3 font-semibold">Name</th>
                <th className="py-3 px-3 font-semibold">Zone</th>
                <th className="py-3 px-3 font-semibold text-center">LOC (Ach/Tgt)</th>
                <th className="py-3 px-3 font-semibold text-center">LOC %</th>
                <th className="py-3 px-3 font-semibold text-center">Mess (Ach/Tgt)</th>
                <th className="py-3 px-3 font-semibold text-center">Mess %</th>
                <th className="py-3 px-3 font-semibold text-center">Dress (Ach/Tgt)</th>
                <th className="py-3 px-3 font-semibold text-center">Dress %</th>
                <th className="py-3 px-4 font-semibold text-right">Overall Achievement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-400">
                    Computing achievement metrics...
                  </td>
                </tr>
              ) : (
                achievementData?.rows.map((row) => (
                  <tr key={row.userId} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          row.rank === 1
                            ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30"
                            : row.rank === 2
                            ? "bg-slate-300 text-slate-950"
                            : row.rank === 3
                            ? "bg-amber-700/60 text-amber-200"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-medium text-indigo-300">{row.staffId}</td>
                    <td className="py-3 px-3 font-medium text-white">{row.name}</td>
                    <td className="py-3 px-3 text-slate-400">{row.zone}</td>
                    <td className="py-3 px-3 text-center text-slate-300">
                      {row.achievedLoc} / {row.targetLoc}
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-purple-300">
                      {row.locPct}%
                    </td>
                    <td className="py-3 px-3 text-center text-slate-300">
                      {row.achievedMess} / {row.targetMess}
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-rose-300">
                      {row.messPct}%
                    </td>
                    <td className="py-3 px-3 text-center text-slate-300">
                      {row.achievedDress} / {row.targetDress}
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-teal-300">
                      {row.dressPct}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="hidden sm:block h-2 w-20 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className={`h-full ${
                              row.overallPct >= 90
                                ? "bg-emerald-500"
                                : row.overallPct >= 70
                                ? "bg-indigo-500"
                                : "bg-amber-500"
                            }`}
                            style={{ width: `${Math.min(100, row.overallPct)}%` }}
                          />
                        </div>
                        <span className="font-bold text-white text-sm">{row.overallPct}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MONTH-OVER-MONTH PERFORMANCE COMPARISON (Requirement #37) */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Month-over-Month Historical Performance Comparison
            </h3>
            <p className="text-xs text-slate-400">
              Compare target achievement progress between two distinct operating months
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Period 1:</span>
            <span className="rounded bg-slate-800 px-2 py-1 text-slate-200 font-semibold">
              August 2026
            </span>
            <span className="text-slate-400">vs Period 2:</span>
            <span className="rounded bg-indigo-900/50 px-2 py-1 text-indigo-300 font-semibold">
              September 2026
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/60 text-slate-400">
                <th className="py-3 px-3 font-semibold">Staff ID</th>
                <th className="py-3 px-3 font-semibold">Name</th>
                <th className="py-3 px-3 font-semibold">Zone</th>
                <th className="py-3 px-3 font-semibold text-center">{comparisonData?.period1} Overall</th>
                <th className="py-3 px-3 font-semibold text-center">{comparisonData?.period2} Overall</th>
                <th className="py-3 px-3 font-semibold text-center">Net Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonData?.comparisons.map((comp) => (
                <tr key={comp.userId} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-mono text-indigo-300">{comp.staffId}</td>
                  <td className="py-3 px-3 font-medium text-white">{comp.name}</td>
                  <td className="py-3 px-3 text-slate-400">{comp.zone}</td>
                  <td className="py-3 px-3 text-center font-medium text-slate-300">
                    {comp.month1.overallPct}%
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-indigo-300">
                    {comp.month2.overallPct}%
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
                        comp.diffPct >= 0
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {comp.diffPct >= 0 ? `+${comp.diffPct}%` : `${comp.diffPct}%`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
