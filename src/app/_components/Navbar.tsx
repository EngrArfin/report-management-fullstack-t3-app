"use client";

import React from "react";
import { useApp, type ActiveUser } from "./AppContext";
import {
  IconDashboard,
  IconForm,
  IconTracking,
  IconTable,
  IconTarget,
  IconUsers,
  IconMail,
  IconDownload,
} from "./Icons";

interface NavbarProps {
  allUsers: ActiveUser[];
  allZones: { id: string; name: string }[];
}

export function Navbar({ allUsers, allZones }: NavbarProps) {
  const {
    activeUser,
    setActiveUser,
    activeTab,
    setActiveTab,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedWeek,
    setSelectedWeek,
    selectedZone,
    setSelectedZone,
    setIsSubmitModalOpen,
  } = useApp();

  const months = [
    { name: "September 2026", year: 2026, month: 9 },
    { name: "August 2026", year: 2026, month: 8 },
    { name: "July 2026", year: 2026, month: 7 },
    { name: "June 2026", year: 2026, month: 6 },
    { name: "October 2026", year: 2026, month: 10 },
  ];

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: IconDashboard },
    { id: "tracking", label: "Submission Tracking", icon: IconTracking },
    { id: "activity", label: "Activity Summary", icon: IconTable },
    { id: "target", label: "Target vs Achievement", icon: IconTarget },
    { id: "export", label: "Excel Export", icon: IconDownload },
    { id: "oms", label: "OM Management", icon: IconUsers, adminOnly: true },
    { id: "notifications", label: "Email Notifications", icon: IconMail, adminOnly: true },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      {/* Top Banner */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
            OM
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white sm:text-lg">
              Office Manager (OM) Weekly Report System
            </h1>
            <p className="text-xs text-slate-400">
              Centralized Weekly Activity, Target Tracking & Monitoring
            </p>
          </div>
        </div>

        {/* User Role Switcher & Submit CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-95 sm:text-sm"
          >
            <IconForm className="h-4 w-4" />
            <span>Submit Weekly Report</span>
          </button>

          {/* Active Profile Pill / Switcher */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/90 p-1.5 text-xs text-slate-300">
            <span className="hidden text-slate-400 sm:inline pl-1">Role:</span>
            <select
              value={activeUser.id}
              onChange={(e) => {
                const found = allUsers.find((u) => u.id === e.target.value);
                if (found) setActiveUser(found);
              }}
              className="rounded bg-slate-800 px-2 py-1 font-medium text-white outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <optgroup label="Head Office / Admin">
                {allUsers
                  .filter((u) => u.role === "ADMIN")
                  .map((u) => (
                    <option key={u.id} value={u.id}>
                      👑 {u.name} (Admin)
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Office Managers (OM)">
                {allUsers
                  .filter((u) => u.role === "OM")
                  .map((u) => (
                    <option key={u.id} value={u.id}>
                      👤 {u.name} ({u.staffId} - {u.zone})
                    </option>
                  ))}
              </optgroup>
            </select>

            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                activeUser.role === "ADMIN"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              }`}
            >
              {activeUser.role}
            </span>
          </div>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="border-t border-slate-800/80 bg-slate-900/50 px-4 py-2 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs">
          {/* Navigation Tabs */}
          <nav className="flex flex-wrap items-center gap-1">
            {tabs.map((tab) => {
              if (tab.adminOnly && activeUser.role !== "ADMIN") return null;
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Selectors: Month, Week, Zone */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Month selector */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Month:</span>
              <select
                value={`${selectedYear}-${selectedMonth}`}
                onChange={(e) => {
                  const [y, m] = e.target.value.split("-").map(Number);
                  if (y && m) {
                    setSelectedYear(y);
                    setSelectedMonth(m);
                  }
                }}
                className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white outline-none focus:border-indigo-500"
              >
                {months.map((m) => (
                  <option key={`${m.year}-${m.month}`} value={`${m.year}-${m.month}`}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Week selector */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Week:</span>
              <select
                value={selectedWeek}
                onChange={(e) => {
                  const val = e.target.value === "all" ? "all" : Number(e.target.value);
                  setSelectedWeek(val);
                }}
                className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white outline-none focus:border-indigo-500"
              >
                <option value="all">All Weeks (Month Total)</option>
                <option value={1}>Week 1</option>
                <option value={2}>Week 2</option>
                <option value={3}>Week 3</option>
                <option value={4}>Week 4</option>
              </select>
            </div>

            {/* Zone filter */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Zone:</span>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white outline-none focus:border-indigo-500"
              >
                <option value="ALL">All Zones</option>
                {allZones.map((z) => (
                  <option key={z.id} value={z.name}>
                    {z.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

