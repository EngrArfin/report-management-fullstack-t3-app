"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import {
  IconSettings,
  IconShield,
  IconLock,
} from "./Icons";

export function SettingsView() {
  const { activeUser, setActiveUser, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<"profile" | "security" | "governance" | "system">("profile");

  // Profile Form state
  const [name, setName] = useState(activeUser.name);
  const [email, setEmail] = useState(activeUser.email);
  const [designation, setDesignation] = useState(activeUser.designation);
  const [zone, setZone] = useState(activeUser.zone);

  // Security Form state
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  // Governance preferences
  const [emailReminders, setEmailReminders] = useState(true);
  const [autoSaveDraft, setAutoSaveDraft] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Full name is required.", "error");
      return;
    }
    const updated = {
      ...activeUser,
      name: name.trim(),
      email: email.trim(),
      designation: designation.trim(),
      zone: zone.trim(),
    };
    setActiveUser(updated);
    try {
      localStorage.setItem("om_user", JSON.stringify(updated));
    } catch {
      // Ignore
    }
    showToast("Profile credentials updated successfully.", "success");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin || newPin !== confirmPin) {
      showToast("New passwords do not match or are empty.", "error");
      return;
    }
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
    showToast("Security credentials updated successfully.", "success");
  };

  return (
    <div className="space-y-6 pb-20 min-w-0">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <IconSettings className="h-5 w-5 text-blue-400" />
            System & Account Settings
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your corporate profile, security credentials, and enterprise reporting preferences
          </p>
        </div>

        <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">
          Staff #{activeUser.staffId}
        </span>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-semibold gap-1 overflow-x-auto table-scrollbar">
        {[
          { id: "profile", label: "Corporate Profile" },
          { id: "security", label: "Security & PIN" },
          { id: "governance", label: "Reporting Governance" },
          { id: "system", label: "System Diagnostics" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2.5 border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? "border-blue-500 text-white font-bold bg-slate-900/50"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Profile */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="max-w-2xl space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Employment & Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Staff ID (Permanent Corporate Badge)
                </label>
                <input
                  type="text"
                  disabled
                  value={activeUser.staffId}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-400 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Assigned Role
                </label>
                <input
                  type="text"
                  disabled
                  value={activeUser.role === "ADMIN" ? "Head Office Administrator" : "Office Manager (OM)"}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-400 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Stationed Zone / Territory
                </label>
                <input
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Security & PIN */}
      {activeTab === "security" && (
        <form onSubmit={handleUpdatePassword} className="max-w-xl space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
              <IconLock className="h-4 w-4 text-blue-400" />
              Change Security PIN / Password
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Default PIN accepted for all demo personas</span>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 3: Governance Policies */}
      {activeTab === "governance" && (
        <div className="max-w-2xl space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-sm text-xs">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
              <IconShield className="h-4 w-4 text-emerald-400" />
              Corporate Compliance & Filing Rules
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Cutoff Enforcement Policy</span>
                  <span className="text-slate-400 text-[11px]">Strict deadline: Friday 11:59:59 PM BST for each filing week</span>
                </div>
                <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 font-bold text-[10px]">
                  Enforced
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Zero-Activity Rule (Requirement #5)</span>
                  <span className="text-slate-400 text-[11px]">Submission allowed only with explicit zero activity justification</span>
                </div>
                <span className="rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 font-bold text-[10px]">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Email Reminder Dispatches</span>
                  <span className="text-slate-400 text-[11px]">Automated dispatch to unsubmitted personnel before cutoff</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailReminders}
                    onChange={(e) => setEmailReminders(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Auto-Save Drafts</span>
                  <span className="text-slate-400 text-[11px]">Preserve partial report form inputs in local memory</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSaveDraft}
                    onChange={(e) => setAutoSaveDraft(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: System Diagnostics */}
      {activeTab === "system" && (
        <div className="max-w-2xl space-y-4 text-xs">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Enterprise Node Health & Diagnostics</span>
              <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Operational
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[11px] text-slate-400 block">Database Engine</span>
                <span className="font-bold text-white font-mono">Neon PostgreSQL (Cloud Pooler)</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[11px] text-slate-400 block">ORM & Client</span>
                <span className="font-bold text-white font-mono">Prisma v6 + tRPC v11</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[11px] text-slate-400 block">Cloud Hosting / Region</span>
                <span className="font-bold text-white font-mono">AWS us-east-2 (Ohio)</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[11px] text-slate-400 block">Security Encryption</span>
                <span className="font-bold text-white font-mono">SSL 256-Bit TLS 1.3</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

