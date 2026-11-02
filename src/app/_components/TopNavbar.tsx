"use client";

import React, { useState } from "react";
import { useApp, type ActiveUser } from "./AppContext";
import {
  IconMenu,
  IconForm,
  IconClock,
  IconLogout,
  IconFilter,
} from "./Icons";

interface TopNavbarProps {
  allUsers: ActiveUser[];
  allZones: { id: string; name: string }[];
}

export function TopNavbar({ allUsers, allZones }: TopNavbarProps) {
  const {
    activeUser,
    setActiveUser,
    activeTab,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedWeek,
    setSelectedWeek,
    selectedZone,
    setSelectedZone,
    setIsSubmitModalOpen,
    setIsMobileSidebarOpen,
    handleLogout,
  } = useApp();

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const months = [
    { name: "September 2026", year: 2026, month: 9 },
    { name: "August 2026", year: 2026, month: 8 },
    { name: "July 2026", year: 2026, month: 7 },
    { name: "June 2026", year: 2026, month: 6 },
    { name: "October 2026", year: 2026, month: 10 },
  ];

  const tabLabels: Record<string, { title: string; subtitle: string }> = {
    dashboard: {
      title: "Executive Operations Dashboard",
      subtitle: "Unified field performance, activity KPIs & target governance",
    },
    tracking: {
      title: "Submission Tracking Matrix",
      subtitle: "Week 1 to Week 4 submission compliance monitoring",
    },
    activity: {
      title: "Activity Summary Rollup",
      subtitle: "Multi-period aggregation across Market, LOC, Dress & Mess",
    },
    target: {
      title: "Target vs Achievement",
      subtitle: "Activity quota tracking, performance ranking & monthly comparisons",
    },
    export: {
      title: "Excel Export Center",
      subtitle: "Download official 18-column datasets formatted for Microsoft Excel",
    },
    oms: {
      title: "OM Personnel Directory",
      subtitle: "Field personnel management, zone allocation & active status",
    },
    notifications: {
      title: "Automated Email Alerts",
      subtitle: "Friday 11:59 PM deadline monitoring & Senior CC routing rules",
    },
  };

  const currentTabInfo = tabLabels[activeTab] ?? {
    title: "Operations Dashboard",
    subtitle: "Centralized weekly activity reporting",
  };

  const activeMonthName =
    months.find((m) => m.year === selectedYear && m.month === selectedMonth)?.name ??
    `Month ${selectedMonth}, ${selectedYear}`;

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      {/* Primary Top Bar */}
      <div className="flex h-16 w-full items-center justify-between px-3 sm:px-6 gap-2">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden transition"
            aria-label="Toggle Navigation Menu"
          >
            <IconMenu className="h-5 w-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-sm sm:text-base font-extrabold tracking-tight text-white">
                {currentTabInfo.title}
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="hidden lg:block truncate text-[11px] text-slate-400">
              {currentTabInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right Section: Desktop Filters, Deadline Pill, Action CTA, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Desktop Global Filters Group */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 p-1 text-xs shadow-inner">
            {/* Month Filter */}
            <div className="flex items-center gap-1 pl-1">
              <span className="text-[11px] text-slate-400 font-medium">Month:</span>
              <select
                value={`${selectedYear}-${selectedMonth}`}
                onChange={(e) => {
                  const [y, m] = e.target.value.split("-").map(Number);
                  if (y && m) {
                    setSelectedYear(y);
                    setSelectedMonth(m);
                  }
                }}
                className="rounded-lg bg-slate-800/90 py-1 px-2 text-xs font-semibold text-white outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {months.map((m) => (
                  <option key={`${m.year}-${m.month}`} value={`${m.year}-${m.month}`}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <span className="h-4 w-px bg-slate-800" />

            {/* Week Filter */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 font-medium">Week:</span>
              <select
                value={selectedWeek}
                onChange={(e) => {
                  const val = e.target.value === "all" ? "all" : Number(e.target.value);
                  setSelectedWeek(val);
                }}
                className="rounded-lg bg-slate-800/90 py-1 px-2 text-xs font-semibold text-white outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="all">All Weeks (Combined)</option>
                <option value={1}>Week 1</option>
                <option value={2}>Week 2</option>
                <option value={3}>Week 3</option>
                <option value={4}>Week 4</option>
              </select>
            </div>

            <span className="h-4 w-px bg-slate-800" />

            {/* Zone Filter */}
            <div className="flex items-center gap-1 pr-1">
              <span className="text-[11px] text-slate-400 font-medium">Zone:</span>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="rounded-lg bg-slate-800/90 py-1 px-2 text-xs font-semibold text-white outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
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

          {/* Mobile Filter Dropdown Toggle */}
          <button
            onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
            className="flex xl:hidden items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white"
            title="Filter Settings"
          >
            <IconFilter className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[11px] font-medium hidden sm:inline">Filters</span>
          </button>

          {/* Friday 11:59 PM Smart Deadline Pill (Requirement #6) */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-xl border border-indigo-900/40 bg-gradient-to-r from-indigo-950/40 to-slate-900/60 px-3 py-1.5 text-xs text-indigo-300">
            <IconClock className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[11px]">
              Deadline: <strong className="text-white">Friday 11:59 PM</strong>
            </span>
          </div>

          {/* Top Action CTA: Submit Weekly Report */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-500 px-3 sm:px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition"
          >
            <IconForm className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Submit Weekly Report</span>
            <span className="sm:hidden">Submit</span>
          </button>

          {/* Role / User Selector Dropdown */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 p-1 text-xs">
            <select
              value={activeUser.id}
              onChange={(e) => {
                const u = allUsers.find((user) => user.id === e.target.value);
                if (u) setActiveUser(u);
              }}
              className="rounded-lg bg-slate-800 py-1 px-2 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-indigo-500 max-w-[120px] sm:max-w-[180px] truncate cursor-pointer"
              title="Active User Profile"
            >
              <optgroup label="Head Office Admin">
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
              className={`hidden sm:inline-block rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                activeUser.role === "ADMIN"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              }`}
            >
              {activeUser.role}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition"
              title="Sign Out to Welcome Portal"
            >
              <IconLogout className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Filter Bar (Visible when toggled or on small screens) */}
      {isFilterDropdownOpen && (
        <div className="flex xl:hidden flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 bg-slate-900/95 px-4 py-2.5 text-xs animate-in slide-in-from-top-2">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Mobile Month */}
            <select
              value={`${selectedYear}-${selectedMonth}`}
              onChange={(e) => {
                const [y, m] = e.target.value.split("-").map(Number);
                if (y && m) {
                  setSelectedYear(y);
                  setSelectedMonth(m);
                }
              }}
              className="flex-1 sm:flex-none rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-xs text-white"
            >
              {months.map((m) => (
                <option key={`${m.year}-${m.month}`} value={`${m.year}-${m.month}`}>
                  {m.name}
                </option>
              ))}
            </select>

            {/* Mobile Week */}
            <select
              value={selectedWeek}
              onChange={(e) => {
                const val = e.target.value === "all" ? "all" : Number(e.target.value);
                setSelectedWeek(val);
              }}
              className="flex-1 sm:flex-none rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-xs text-white"
            >
              <option value="all">All Weeks</option>
              <option value={1}>Week 1</option>
              <option value={2}>Week 2</option>
              <option value={3}>Week 3</option>
              <option value={4}>Week 4</option>
            </select>

            {/* Mobile Zone */}
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="flex-1 sm:flex-none rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-xs text-white"
            >
              <option value="ALL">All Zones</option>
              {allZones.map((z) => (
                <option key={z.id} value={z.name}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-[11px] text-indigo-300 font-medium w-full sm:w-auto text-right">
            Active: <strong>{activeMonthName}</strong> • {selectedWeek === "all" ? "All Weeks" : `Week ${selectedWeek}`}
          </div>
        </div>
      )}
    </header>
  );
}
