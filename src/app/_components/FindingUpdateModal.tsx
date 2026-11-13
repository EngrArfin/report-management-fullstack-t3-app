"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";

export function FindingUpdateModal() {
  const { selectedReportForFinding, setSelectedReportForFinding, activeUser, showToast } =
    useApp();

  const [newSolved, setNewSolved] = useState<number>(0);
  const [newPending, setNewPending] = useState<number>(0);
  const [remark, setRemark] = useState<string>("");

  const utils = api.useUtils();

  const { data: report, isLoading } = api.report.getReportById.useQuery(
    { id: selectedReportForFinding! },
    { enabled: !!selectedReportForFinding }
  );

  useEffect(() => {
    if (report) {
      setNewSolved(report.solvedQty);
      setNewPending(report.pendingQty);
    }
  }, [report]);

  const updateMutation = api.report.updateFindingStatus.useMutation({
    onSuccess: () => {
      showToast("Finding status updated and audit logged successfully!", "success");
      setSelectedReportForFinding(null);
      void utils.report.getActivitySummary.invalidate();
      void utils.dashboard.getMetrics.invalidate();
      void utils.report.getSubmissionTracking.invalidate();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  if (!selectedReportForFinding) return null;

  const totalFinding = report?.marketVisitFindingQty ?? 0;
  const isBalanced = newSolved + newPending === totalFinding;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBalanced) {
      showToast(
        `Solved (${newSolved}) + Pending (${newPending}) must equal Total Finding (${totalFinding})`,
        "error"
      );
      return;
    }

    updateMutation.mutate({
      reportId: selectedReportForFinding,
      updatedById: activeUser.id,
      newSolved,
      newPending,
      remark,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl p-5 sm:p-6 text-white shadow-2xl border border-slate-700/80 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-white">
              Market Visit Finding Resolution Follow-up
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {report?.user.name} ({report?.user.staffId}) • {report?.monthYear} - Week {report?.week}
            </p>
          </div>
          <button
            onClick={() => setSelectedReportForFinding(null)}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="py-12 flex items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          </div>
        ) : !report ? (
          <div className="py-10 text-center text-xs text-slate-400">Report details not found.</div>
        ) : (
          <div className="space-y-4">
            {/* Overview Card */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5 text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Findings</span>
                <span className="text-xl font-extrabold text-amber-300">
                  {report.marketVisitFindingQty}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Solved</span>
                <span className="text-xl font-extrabold text-emerald-400">{report.solvedQty}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Pending</span>
                <span className="text-xl font-extrabold text-rose-400">{report.pendingQty}</span>
              </div>
            </div>

            {/* Update Form (Requirement #11) */}
            <form onSubmit={handleUpdate} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">New Solved Qty</label>
                  <input
                    type="number"
                    min="0"
                    max={totalFinding}
                    value={newSolved}
                    onChange={(e) => {
                      const s = Math.max(0, parseInt(e.target.value) || 0);
                      setNewSolved(s);
                      setNewPending(Math.max(0, totalFinding - s));
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2 text-sm font-extrabold text-emerald-400 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">New Pending Qty</label>
                  <input
                    type="number"
                    min="0"
                    max={totalFinding}
                    value={newPending}
                    onChange={(e) => setNewPending(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2 text-sm font-extrabold text-rose-400 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {!isBalanced && (
                <div className="text-rose-400 text-[11px] font-bold">
                  ⚠️ Solved ({newSolved}) + Pending ({newPending}) must equal Total Finding (
                  {totalFinding})
                </div>
              )}

              <div>
                <label className="block text-slate-300 mb-1 font-bold">
                  Resolution Notes / Follow-up Action
                </label>
                <input
                  type="text"
                  placeholder="e.g. Followed up with outlet manager; storage conditions rectified."
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedReportForFinding(null)}
                  className="rounded-xl px-4 py-2 border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending || !isBalanced}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2 font-bold text-white hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 transition shadow-md"
                >
                  {updateMutation.isPending ? "Updating..." : "Save Resolution Status"}
                </button>
              </div>
            </form>

            {/* Audit History Trail (Requirement #11) */}
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Historical Audit Trail
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-2 text-[11px] pr-1">
                {report.findingHistory?.length === 0 ? (
                  <p className="text-slate-500 italic">No prior status updates recorded.</p>
                ) : (
                  report.findingHistory?.map((h) => (
                    <div
                      key={h.id}
                      className="rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 text-slate-300 space-y-1"
                    >
                      <div className="flex justify-between text-slate-400">
                        <span>Updated By: <strong className="text-white">{h.updatedBy.name}</strong></span>
                        <span>{new Date(h.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Previous: Solved {h.previousSolved}, Pending {h.previousPending}</span>
                        <span>→</span>
                        <span className="font-bold text-emerald-400">New: Solved {h.newSolved}, Pending {h.newPending}</span>
                      </div>
                      {h.remark && <p className="text-slate-400 italic">&ldquo;{h.remark}&rdquo;</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
