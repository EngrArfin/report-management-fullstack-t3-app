"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconRefresh } from "./Icons";

export function NotificationView() {
  const { selectedYear, selectedMonth, showToast } = useApp();

  const [subjectTemplate, setSubjectTemplate] = useState<string>("");
  const [bodyTemplate, setBodyTemplate] = useState<string>("");
  const [ccRecipients, setCcRecipients] = useState<string>("");
  const [bccRecipients, setBccRecipients] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  const [triggerWeek, setTriggerWeek] = useState<number>(1);

  const utils = api.useUtils();

  const { data: config } = api.notification.getConfig.useQuery();
  const { data: logs, isLoading: isLogsLoading, refetch: refetchLogs } =
    api.notification.getLogs.useQuery({
      year: selectedYear,
      month: selectedMonth,
    });

  useEffect(() => {
    if (config) {
      setSubjectTemplate(config.subjectTemplate);
      setBodyTemplate(config.bodyTemplate);
      setCcRecipients(config.ccRecipients);
      setBccRecipients(config.bccRecipients ?? "");
      setIsActive(config.isActive);
    }
  }, [config]);

  const updateConfigMutation = api.notification.updateConfig.useMutation({
    onSuccess: () => {
      showToast("Notification configuration updated successfully!", "success");
      void utils.notification.getConfig.invalidate();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  const triggerCheckMutation = api.notification.triggerDeadlineCheck.useMutation({
    onSuccess: (res) => {
      showToast(res.message, "success");
      void refetchLogs();
      void utils.dashboard.getMetrics.invalidate();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfigMutation.mutate({
      subjectTemplate,
      bodyTemplate,
      ccRecipients,
      bccRecipients,
      isActive,
    });
  };

  const handleRunDeadlineCheck = () => {
    triggerCheckMutation.mutate({
      year: selectedYear,
      month: selectedMonth,
      week: triggerWeek,
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Automated Deadline Notification & Senior Routing Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automatic Friday 11:59 PM missed report detection, senior management CC rules & anti-duplicate dispatch audit
          </p>
        </div>

        <button
          onClick={() => refetchLogs()}
          className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          <IconRefresh className="h-3.5 w-3.5" />
          <span>Refresh History</span>
        </button>
      </div>

      {/* Friday 11:59 PM Scheduler Mission Control Card */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 border border-indigo-500/30">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Automated Friday 11:59 PM Deadline Verification Scheduler
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl">
            When the Friday 11:59:59 PM deadline elapses, system automatically identifies all active OMs who missed submission,
            formats dynamic notices with To: OM and CC: Senior Bosses, and logs dispatch to prevent duplicate emails.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={triggerWeek}
            onChange={(e) => setTriggerWeek(Number(e.target.value))}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-white outline-none"
          >
            <option value={1}>Week 1 Deadline Check</option>
            <option value={2}>Week 2 Deadline Check</option>
            <option value={3}>Week 3 Deadline Check</option>
            <option value={4}>Week 4 Deadline Check</option>
          </select>

          <button
            onClick={handleRunDeadlineCheck}
            disabled={triggerCheckMutation.isPending}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition disabled:opacity-50"
          >
            {triggerCheckMutation.isPending ? "Executing Verification..." : "Run Deadline Scan Now"}
          </button>
        </div>
      </div>

      {/* Configuration Form (Requirement #42) */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="font-extrabold text-white text-sm sm:text-base">
            Notification Rules, CC Recipients & Template Setup
          </h3>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="text-indigo-600 rounded"
            />
            <span className={isActive ? "text-emerald-400" : "text-slate-400"}>
              {isActive ? "Engine Active (Auto-Dispatch Enabled)" : "Engine Suspended"}
            </span>
          </label>
        </div>

        <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Senior Management CC Recipients (Comma-separated)
              </label>
              <input
                type="text"
                value={ccRecipients}
                onChange={(e) => setCcRecipients(e.target.value)}
                placeholder="senior.reporting@company.com, head.operations@company.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Responsible OM is automatically in &apos;To&apos;. Seniors configured here are automatically CC&apos;d.
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                BCC Audit Log Recipients (Optional)
              </label>
              <input
                type="text"
                value={bccRecipients}
                onChange={(e) => setBccRecipients(e.target.value)}
                placeholder="audit.reporting@company.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">
              Email Subject Line Template
            </label>
            <input
              type="text"
              value={subjectTemplate}
              onChange={(e) => setSubjectTemplate(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Dynamic tokens: &#123;OM_NAME&#125;, &#123;STAFF_ID&#125;, &#123;ZONE&#125;, &#123;MONTH_YEAR&#125;, &#123;WEEK&#125;
            </span>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">
              Email HTML / Body Template
            </label>
            <textarea
              rows={4}
              value={bodyTemplate}
              onChange={(e) => setBodyTemplate(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white font-mono text-xs"
            />
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-800">
            <button
              type="submit"
              disabled={updateConfigMutation.isPending}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-2 font-bold text-white shadow-md shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition disabled:opacity-50"
            >
              {updateConfigMutation.isPending ? "Saving..." : "Save Notification Configuration"}
            </button>
          </div>
        </form>
      </div>

      {/* DISPATCH HISTORY LOG (Requirement #44: Prevent duplicate notifications) */}
      <section className="glass-panel rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Notification Dispatch History & Audit Log
            </h3>
            <p className="text-[11px] text-slate-400">
              Guarantees zero duplicate emails are sent for any missed submission
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70">
          <div className="overflow-x-auto table-scrollbar">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-400">
                  <th className="py-3.5 px-4 font-bold text-slate-300">Sent Timestamp</th>
                  <th className="py-3.5 px-4 font-bold text-slate-300">Recipient (To)</th>
                  <th className="py-3.5 px-4 font-bold text-slate-300">Office Manager</th>
                  <th className="py-3.5 px-3 font-bold text-slate-300">Reporting Week</th>
                  <th className="py-3.5 px-4 font-bold text-slate-300">CC Recipients</th>
                  <th className="py-3.5 px-4 font-bold text-center text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {isLogsLoading ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      Loading notification logs...
                    </td>
                  </tr>
                ) : logs?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      No notification logs found for current period.
                    </td>
                  </tr>
                ) : (
                  logs?.map((log) => (
                    <tr key={log.id} className="hover:bg-indigo-950/15 transition">
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(log.sentAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-bold text-indigo-400">{log.toEmail}</td>
                      <td className="py-3 px-4 text-white font-semibold">
                        {log.user.name} ({log.user.staffId})
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        Month {log.month} • Week {log.week}
                      </td>
                      <td className="py-3 px-4 text-slate-400 truncate max-w-xs">{log.ccEmails}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
