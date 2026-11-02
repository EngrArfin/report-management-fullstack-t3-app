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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Automated Email Notification Engine
          </h2>
          <p className="text-xs text-slate-400">
            Configure deadline reminder triggers, Senior Manager CC routing, templates, and dispatch history
          </p>
        </div>

        <button
          onClick={() => refetchLogs()}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
        >
          <IconRefresh className="h-3.5 w-3.5" />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Manual / Scheduled Trigger Box (Requirement #40, #41) */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-sm font-bold text-white">
              Friday 11:59 PM Deadline Verification Scheduler
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Scans all active OMs who have not submitted for the specified week and sends automated notices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={triggerWeek}
            onChange={(e) => setTriggerWeek(Number(e.target.value))}
            className="rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white"
          >
            <option value={1}>Week 1 Deadline</option>
            <option value={2}>Week 2 Deadline</option>
            <option value={3}>Week 3 Deadline</option>
            <option value={4}>Week 4 Deadline</option>
          </select>

          <button
            onClick={handleRunDeadlineCheck}
            disabled={triggerCheckMutation.isPending}
            className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md transition disabled:opacity-50"
          >
            {triggerCheckMutation.isPending ? "Evaluating..." : "Run Deadline Check Now"}
          </button>
        </div>
      </div>

      {/* Configuration Form (Requirement #42) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-base">
            Notification Rules & Routing Configuration
          </h3>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="text-indigo-600 rounded"
            />
            <span className={isActive ? "text-emerald-400 font-bold" : "text-slate-400"}>
              {isActive ? "Engine Active" : "Engine Inactive"}
            </span>
          </label>
        </div>

        <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-slate-400 font-medium mb-1">
                Senior Management CC Recipients (Comma-separated)
              </label>
              <input
                type="text"
                value={ccRecipients}
                onChange={(e) => setCcRecipients(e.target.value)}
                placeholder="senior.reporting@company.com, head.operations@company.com"
                className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
              />
              <span className="text-[10px] text-slate-500">
                Responsible OM is automatically in &apos;To&apos;. Seniors configured here are automatically CC&apos;d.
              </span>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">
                BCC Audit Recipients (Optional)
              </label>
              <input
                type="text"
                value={bccRecipients}
                onChange={(e) => setBccRecipients(e.target.value)}
                placeholder="audit.reporting@company.com"
                className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">
              Email Subject Line Template
            </label>
            <input
              type="text"
              value={subjectTemplate}
              onChange={(e) => setSubjectTemplate(e.target.value)}
              className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
            />
            <span className="text-[10px] text-slate-500">
              Supported tokens: &#123;OM_NAME&#125;, &#123;STAFF_ID&#125;, &#123;ZONE&#125;, &#123;MONTH_YEAR&#125;, &#123;WEEK&#125;
            </span>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">
              Email HTML / Body Template
            </label>
            <textarea
              rows={5}
              value={bodyTemplate}
              onChange={(e) => setBodyTemplate(e.target.value)}
              className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white font-mono text-xs"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={updateConfigMutation.isPending}
              className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-500 shadow-md transition disabled:opacity-50"
            >
              {updateConfigMutation.isPending ? "Saving..." : "Save Configuration"}
            </button>
          </div>
        </form>
      </div>

      {/* DISPATCH HISTORY LOG (Requirement #44: Prevent duplicate notifications) */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Notification Audit History</h3>
            <p className="text-xs text-slate-400">
              Complete dispatch log to ensure zero duplicate notifications are sent for any missed report
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/60 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Sent Timestamp</th>
                <th className="py-2.5 px-3 font-semibold">Recipient (To)</th>
                <th className="py-2.5 px-3 font-semibold">Office Manager</th>
                <th className="py-2.5 px-3 font-semibold">Reporting Week</th>
                <th className="py-2.5 px-3 font-semibold">CC Recipients</th>
                <th className="py-2.5 px-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLogsLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Loading notification logs...
                  </td>
                </tr>
              ) : logs?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No email notification logs found for current filter.
                  </td>
                </tr>
              ) : (
                logs?.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 text-slate-400">
                      {new Date(log.sentAt).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-indigo-300">{log.toEmail}</td>
                    <td className="py-2.5 px-3 text-white">
                      {log.user.name} ({log.user.staffId})
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      Month {log.month} • Week {log.week}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 truncate max-w-xs">{log.ccEmails}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
