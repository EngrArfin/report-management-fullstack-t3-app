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

  // Fetch all OMs if Admin is logged in (Admin can submit on behalf of an OM if needed)
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Weekly Activity Report Submission
            </h3>
            <p className="text-xs text-slate-400">
              Enter once → Automatically updates Summaries, Dashboard, Target Achievement & Excel
            </p>
          </div>
          <button
            onClick={() => setIsSubmitModalOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          {/* Target User & Period Selection */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-800 bg-slate-800/40 p-4 sm:grid-cols-3">
            {/* If Admin, can select OM */}
            {activeUser.role === "ADMIN" ? (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Select Office Manager (OM)
                </label>
                <select
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-white"
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
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Reporting OM
                </label>
                <div className="rounded-lg border border-slate-700/60 bg-slate-800/80 p-2 text-xs font-semibold text-indigo-300">
                  {activeUser.name} ({activeUser.staffId} - {activeUser.zone})
                </div>
              </div>
            )}

            {/* Month */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Select Month</label>
              <select
                value={`${year}-${month}`}
                onChange={(e) => {
                  const [y, m] = e.target.value.split("-").map(Number);
                  if (y && m) {
                    setYear(y);
                    setMonth(m);
                  }
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-white"
              >
                <option value="2026-9">September 2026</option>
                <option value="2026-8">August 2026</option>
                <option value="2026-7">July 2026</option>
                <option value="2026-6">June 2026</option>
                <option value="2026-10">October 2026</option>
              </select>
            </div>

            {/* Week */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Select Week</label>
              <select
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-white"
              >
                <option value={1}>Week 1</option>
                <option value={2}>Week 2</option>
                <option value={3}>Week 3</option>
                <option value={4}>Week 4</option>
              </select>
            </div>
          </div>

          {/* Deadline notice banner (Requirement #6) */}
          <div className="flex items-center justify-between rounded-lg border border-indigo-900/40 bg-indigo-950/20 px-4 py-2.5 text-xs text-indigo-300">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official Submission Deadline: <strong>Friday 11:59 PM</strong> of the week</span>
            </div>
            <span className="text-[11px] text-slate-400">Zero activities permitted (Enter 0)</span>
          </div>

          {/* ACTIVITY 1: Market Visit (Requirement #10) */}
          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">1. Market Visit</h4>
              <span
                className={`text-xs font-medium ${
                  isFindingBalanced ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {isFindingBalanced
                  ? `✓ Balanced: Solved (${solvedQty}) + Pending (${pendingQty}) = Finding (${marketVisitFindingQty})`
                  : `⚠️ Balance Error: Solved + Pending (${solvedQty + pendingQty}) ≠ Finding (${marketVisitFindingQty})`}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Market Visit Qty</label>
                <input
                  type="number"
                  min="0"
                  value={marketVisitQty}
                  onChange={(e) => setMarketVisitQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Market Finding Qty</label>
                <input
                  type="number"
                  min="0"
                  value={marketVisitFindingQty}
                  onChange={(e) => {
                    const f = Math.max(0, parseInt(e.target.value) || 0);
                    setMarketVisitFindingQty(f);
                    // auto balance initially if zero
                    if (solvedQty + pendingQty !== f) {
                      setPendingQty(f - solvedQty >= 0 ? f - solvedQty : 0);
                    }
                  }}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-amber-300 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Solved Qty</label>
                <input
                  type="number"
                  min="0"
                  value={solvedQty}
                  onChange={(e) => {
                    const s = Math.max(0, parseInt(e.target.value) || 0);
                    setSolvedQty(s);
                    setPendingQty(Math.max(0, marketVisitFindingQty - s));
                  }}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-emerald-400 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Pending Qty</label>
                <input
                  type="number"
                  min="0"
                  value={pendingQty}
                  onChange={(e) => setPendingQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-rose-400 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* ACTIVITY 2: Location Tracking (LOC) - STRICTLY NO "LOC Visit Qty" (Requirement #12) */}
          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">2. Location Tracking (LOC)</h4>
              <span className="text-[11px] text-slate-500 font-medium">
                * Note: LOC Visit Qty is excluded per business policy
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">LOC Submitted Qty</label>
                <input
                  type="number"
                  min="0"
                  value={locSubmittedQty}
                  onChange={(e) => setLocSubmittedQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  LOC Finding Day Qty (Decimal allowed, e.g. 3.5 days)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={locFindingDayQty}
                  onChange={(e) => setLocFindingDayQty(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-purple-300 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* ACTIVITY 3 & 4: Dress Code and Mess Visit (Requirement #13, #14) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Dress Code */}
            <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-white">3. Dress Code</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Dress Code Qty</label>
                  <input
                    type="number"
                    min="0"
                    value={dressCodeQty}
                    onChange={(e) => setDressCodeQty(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Dress Finding Qty</label>
                  <input
                    type="number"
                    min="0"
                    value={dressCodeFindingQty}
                    onChange={(e) =>
                      setDressCodeFindingQty(Math.max(0, parseFloat(e.target.value) || 0))
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-amber-300 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Mess Visit */}
            <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-white">4. Mess Visit</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Mess Visit Qty</label>
                  <input
                    type="number"
                    min="0"
                    value={messVisitQty}
                    onChange={(e) => setMessVisitQty(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Mess Finding Qty</label>
                  <input
                    type="number"
                    min="0"
                    value={messVisitFindingQty}
                    onChange={(e) =>
                      setMessVisitFindingQty(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-sm text-amber-300 font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Remarks / Field Observation Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Conducted inspections across Mitford medical stores. All critical issues resolved on-site."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-white placeholder-slate-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitMutation.isPending || !isFindingBalanced}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 disabled:opacity-50"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Weekly Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
