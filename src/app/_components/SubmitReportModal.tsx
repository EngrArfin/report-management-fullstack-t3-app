"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";

export function SubmitReportModal() {
  const {
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    activeUser,
    selectedYear,
    selectedMonth,
    showToast,
  } = useApp();

  const [year, setYear] = useState<number>(selectedYear);
  const [month, setMonth] = useState<number>(selectedMonth);
  const [week, setWeek] = useState<number>(1);
  const [targetUserId, setTargetUserId] = useState<string>(activeUser.id);

  // Form Fields
  // 1. Market Visit
  const [marketVisitQty, setMarketVisitQty] = useState<number>(0);
  const [marketVisitFindingQty, setMarketVisitFindingQty] = useState<number>(0);
  const [solvedQty, setSolvedQty] = useState<number>(0);
  const [pendingQty, setPendingQty] = useState<number>(0);

  // 2. LOC
  const [locSubmittedQty, setLocSubmittedQty] = useState<number>(0);
  const [locFindingDayQty, setLocFindingDayQty] = useState<number>(0);

  // 3. Dress Code
  const [dressCodeQty, setDressCodeQty] = useState<number>(0);
  const [dressCodeFindingQty, setDressCodeFindingQty] = useState<number>(0);

  // 4. Mess Visit
  const [messVisitQty, setMessVisitQty] = useState<number>(0);
  const [messVisitFindingQty, setMessVisitFindingQty] = useState<number>(0);

  const [notes, setNotes] = useState<string>("");

  // Sync user if activeUser changes
  useEffect(() => {
    setTargetUserId(activeUser.id);
  }, [activeUser.id]);

  const utils = api.useUtils();
  const submitMutation = api.report.submit.useMutation({
    onSuccess: () => {
      showToast("Weekly report submitted successfully!", "success");
      setIsSubmitModalOpen(false);
      void utils.dashboard.getMetrics.invalidate();
      void utils.report.getSubmissionTracking.invalidate();
      void utils.report.getActivitySummary.invalidate();
      void utils.target.getMonthlyAchievement.invalidate();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  // Fetch all OMs if Admin is logged in
  const { data: allOms } = api.om.getAll.useQuery(undefined, {
    enabled: isSubmitModalOpen && activeUser.role === "ADMIN",
  });

  if (!isSubmitModalOpen) return null;

  // Validation Rule #10: Solved + Pending === Market Finding
  const isFindingBalanced = solvedQty + pendingQty === marketVisitFindingQty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFindingBalanced) {
      showToast(
        `Validation Failed: Solved Qty (${solvedQty}) + Pending Qty (${pendingQty}) must equal Finding Qty (${marketVisitFindingQty}).`,
        "error"
      );
      return;
    }

    submitMutation.mutate({
      userId: targetUserId,
      year,
      month,
      week,
      marketVisitQty,
      marketVisitFindingQty,
      solvedQty,
      pendingQty,
      locSubmittedQty,
      locFindingDayQty,
      dressCodeQty,
      dressCodeFindingQty,
      messVisitQty,
      messVisitFindingQty,
      notes,
    });
  };

  const handleResetZero = () => {
    setMarketVisitQty(0);
    setMarketVisitFindingQty(0);
    setSolvedQty(0);
    setPendingQty(0);
    setLocSubmittedQty(0);
    setLocFindingDayQty(0);
    setDressCodeQty(0);
    setDressCodeFindingQty(0);
    setMessVisitQty(0);
    setMessVisitFindingQty(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-5 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel relative max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-3xl p-5 sm:p-7 text-white shadow-2xl border border-slate-700/80 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                ✍️
              </span>
              <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                Weekly Activity Report Submission
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Enter Data Once → Automatically calculates Summaries, Dashboard, Target Achievement & Excel
            </p>
          </div>
          <button
            onClick={() => setIsSubmitModalOpen(false)}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Target User & Period Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            {/* If Admin, can select OM */}
            {activeUser.role === "ADMIN" ? (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Select Office Manager (OM)
                </label>
                <select
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs font-medium text-white outline-none focus:border-indigo-500"
                >
                  {allOms?.map((om) => (
                    <option key={om.id} value={om.id}>
                      {om.name} ({om.staffId} - {om.zone})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Reporting OM
                </label>
                <div className="rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-2 text-xs font-bold text-indigo-300">
                  {activeUser.name} ({activeUser.staffId} - {activeUser.zone})
                </div>
              </div>
            )}

            {/* Month Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Reporting Month</label>
              <select
                value={`${year}-${month}`}
                onChange={(e) => {
                  const [y, m] = e.target.value.split("-").map(Number);
                  if (y && m) {
                    setYear(y);
                    setMonth(m);
                  }
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs font-medium text-white outline-none focus:border-indigo-500"
              >
                <option value="2026-9">September 2026</option>
                <option value="2026-8">August 2026</option>
                <option value="2026-7">July 2026</option>
                <option value="2026-6">June 2026</option>
                <option value="2026-10">October 2026</option>
              </select>
            </div>

            {/* Week Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Reporting Week</label>
              <select
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs font-medium text-white outline-none focus:border-indigo-500"
              >
                <option value={1}>Week 1</option>
                <option value={2}>Week 2</option>
                <option value={3}>Week 3</option>
                <option value={4}>Week 4</option>
              </select>
            </div>
          </div>

          {/* Deadline notice banner (Requirement #6) & Zero Activity helper */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/30 to-slate-900/60 px-4 py-2.5 text-xs text-indigo-300">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official Final Deadline: <strong>Friday 11:59 PM</strong></span>
            </div>
            <button
              type="button"
              onClick={handleResetZero}
              className="text-[11px] font-bold text-indigo-400 hover:text-indigo-200 underline"
            >
              Zero Activity Week? Set All to 0
            </button>
          </div>

          {/* ACTIVITY 1: Market Visit (Requirement #10) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-white">1. Market Visit</h4>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isFindingBalanced
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                }`}
              >
                {isFindingBalanced
                  ? `✓ Solved (${solvedQty}) + Pending (${pendingQty}) = Finding (${marketVisitFindingQty})`
                  : `⚠️ Balance Error: Solved + Pending (${solvedQty + pendingQty}) ≠ Finding (${marketVisitFindingQty})`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                  Market Visit Qty
                </label>
                <input
                  type="number"
                  min="0"
                  value={marketVisitQty}
                  onChange={(e) => setMarketVisitQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-bold text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                  Market Finding Qty
                </label>
                <input
                  type="number"
                  min="0"
                  value={marketVisitFindingQty}
                  onChange={(e) => {
                    const f = Math.max(0, parseInt(e.target.value) || 0);
                    setMarketVisitFindingQty(f);
                    if (solvedQty + pendingQty !== f) {
                      setPendingQty(f - solvedQty >= 0 ? f - solvedQty : 0);
                    }
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-extrabold text-amber-300 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                  Solved Qty
                </label>
                <input
                  type="number"
                  min="0"
                  value={solvedQty}
                  onChange={(e) => {
                    const s = Math.max(0, parseInt(e.target.value) || 0);
                    setSolvedQty(s);
                    setPendingQty(Math.max(0, marketVisitFindingQty - s));
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-extrabold text-emerald-400 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                  Pending Qty
                </label>
                <input
                  type="number"
                  min="0"
                  value={pendingQty}
                  onChange={(e) => setPendingQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-extrabold text-rose-400 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* ACTIVITY 2: Location Tracking (LOC) - STRICTLY NO "LOC Visit Qty" (Requirement #12) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-white">2. Location Tracking (LOC)</h4>
              <span className="text-[11px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                LOC Visit Qty is strictly excluded
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                  LOC Submitted Qty
                </label>
                <input
                  type="number"
                  min="0"
                  value={locSubmittedQty}
                  onChange={(e) => setLocSubmittedQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-bold text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                  LOC Finding Day Qty (Supports decimal e.g. 3.5 days)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={locFindingDayQty}
                  onChange={(e) => setLocFindingDayQty(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-extrabold text-purple-300 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* ACTIVITY 3 & 4: Dress Code and Mess Visit (Requirement #13, #14) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dress Code */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-3">
              <h4 className="text-sm font-bold text-white">3. Dress Code</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                    Dress Code Qty
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={dressCodeQty}
                    onChange={(e) => setDressCodeQty(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-bold text-white outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                    Dress Finding Qty
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={dressCodeFindingQty}
                    onChange={(e) =>
                      setDressCodeFindingQty(Math.max(0, parseFloat(e.target.value) || 0))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-bold text-amber-300 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Mess Visit */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-3">
              <h4 className="text-sm font-bold text-white">4. Mess Visit</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                    Mess Visit Qty
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={messVisitQty}
                    onChange={(e) => setMessVisitQty(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-bold text-white outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                    Mess Finding Qty
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={messVisitFindingQty}
                    onChange={(e) =>
                      setMessVisitFindingQty(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm font-bold text-amber-300 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Field Remarks / Operational Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Conducted intensive inspections across regional pharmacies. Pending findings prioritized."
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitMutation.isPending || !isFindingBalanced}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 active:scale-95 transition"
            >
              {submitMutation.isPending ? "Submitting to System..." : "Confirm Weekly Submission"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
