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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-base text-white">Market Visit Finding Status Follow-up</h3>
            <p className="text-xs text-slate-400">
              {report?.user.name} ({report?.user.staffId}) • {report?.monthYear} - Week {report?.week}
            </p>
          </div>
          <button
            onClick={() => setSelectedReportForFinding(null)}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading report findings...</div>
        ) : !report ? (
          <div className="py-8 text-center text-xs text-slate-400">Report details not found.</div>
        ) : (
          <div className="space-y-4">
            {/* Overview Card */}
            <div className="grid grid-cols-3 gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-3 text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Total Findings</span>
                <span className="text-lg font-bold text-amber-300">
                  {report.marketVisitFindingQty}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Current Solved</span>
                <span className="text-lg font-bold text-emerald-400">{report.solvedQty}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Current Pending</span>
                <span className="text-lg font-bold text-rose-400">{report.pendingQty}</span>
              </div>
            </div>

            {/* Update Form (Requirement #11) */}
            <form onSubmit={handleUpdate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">New Solved Qty</label>
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
                    className="w-full rounded border border-slate-700 bg-slate-800 p-2 font-bold text-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">New Pending Qty</label>
                  <input
                    type="number"
                    min="0"
                    max={totalFinding}
                    value={newPending}
                    onChange={(e) => setNewPending(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded border border-slate-700 bg-slate-800 p-2 font-bold text-rose-400"
                  />
                </div>
              </div>

              {!isBalanced && (
                <div className="text-rose-400 text-[11px]">
                  ⚠️ Solved ({newSolved}) + Pending ({newPending}) must equal Total Finding (
                  {totalFinding})
                </div>
              )}

              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  Follow-up Resolution Remarks / Audit Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Visited retailer again; merchant rectified the signage issue."
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedReportForFinding(null)}
                  className="rounded px-3 py-1.5 border border-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending || !isBalanced}
                  className="rounded bg-indigo-600 px-4 py-1.5 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Updating..." : "Confirm Status Update"}
                </button>
              </div>
            </form>

            {/* Audit History (Requirement #11: Previous Status, New Status, Updated By, DateTime) */}
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Status Update Audit Trail
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-2 text-[11px]">
                {report.findingHistory?.length === 0 ? (
                  <p className="text-slate-500 italic">No previous status updates recorded.</p>
                ) : (
                  report.findingHistory?.map((h) => (
                    <div
                      key={h.id}
                      className="rounded border border-slate-800 bg-slate-800/40 p-2 text-slate-300"
                    >
                      <div className="flex justify-between text-slate-400">
                        <span>Updated By: <strong className="text-white">{h.updatedBy.name}</strong></span>
                        <span>{new Date(h.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-slate-400">Previous: Solved {h.previousSolved}, Pending {h.previousPending}</span>
                        <span>→</span>
                        <span className="font-semibold text-emerald-400">New: Solved {h.newSolved}, Pending {h.newPending}</span>
                      </div>
                      {h.remark && <p className="mt-1 text-slate-400 italic">&ldquo;{h.remark}&rdquo;</p>}
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
