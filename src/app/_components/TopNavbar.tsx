"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp, type ActiveUser } from "./AppContext";
import {
  IconMenu,
  IconForm,
  IconClock,
  IconLogout,
  IconFilter,
  IconChevronDown,
  IconCheck,
  IconShield,
  IconUsers,
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
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFilterDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const months = [
    { name: "September 2026", short: "Sep 2026", year: 2026, month: 9 },
    { name: "August 2026", short: "Aug 2026", year: 2026, month: 8 },
    { name: "July 2026", short: "Jul 2026", year: 2026, month: 7 },
    { name: "June 2026", short: "Jun 2026", year: 2026, month: 6 },
    { name: "October 2026", short: "Oct 2026", year: 2026, month: 10 },
  ];

  const tabLabels: Record<string, { title: string; category: string }> = {
    dashboard: {
      title: "Executive Dashboard",
      category: "Core Operations",
    },
    tracking: {
      title: "Submission Tracking",
      category: "Compliance Matrix",
    },
    activity: {
      title: "Activity Summary",
      category: "Analytics Rollup",
    },
    target: {
      title: "Target vs Achievement",
      category: "Performance Governance",
    },
    export: {
      title: "Excel Export Center",
      category: "Official Datasets",
    },
    oms: {
      title: "OM Personnel Directory",
      category: "Administration",
    },
    notifications: {
      title: "Automated Email Alerts",
      category: "Rules & Deadlines",
    },
  };

  const currentTabInfo = tabLabels[activeTab] ?? {
    title: "Operations Dashboard",
    category: "Report Portal",
  };

  const activeMonthObj =
    months.find((m) => m.year === selectedYear && m.month === selectedMonth) ?? {
      name: `Month ${selectedMonth}, ${selectedYear}`,
      short: `${selectedMonth}/${selectedYear}`,
    };

  // Get user initials
  const getInitials = (name: string) => {
    return name
      .replace(/Md\.\s*/i, "")
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      {/* Primary Top Bar */}
      <div className="flex h-16 w-full items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden transition active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            <IconMenu className="h-5 w-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider text-indigo-400/90">
                {currentTabInfo.category} /
              </span>
              <h1 className="truncate text-sm sm:text-base font-extrabold tracking-tight text-white">
                {currentTabInfo.title}
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Unified Filter Dropdown, Deadline Pill, Action CTA, User Profile Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* ================================================================= */}
          {/* UNIFIED GLOBAL FILTERS DROPDOWN (Month, Week, Zone in ONE dropdown) */}
          {/* ================================================================= */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-2 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all duration-200 outline-none ${
                isFilterDropdownOpen
                  ? "border-indigo-500 bg-slate-800 text-white shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20"
                  : "border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
              }`}
              title="Open Global Period & Zone Filters"
            >
              <IconFilter className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              
              {/* Filter Label Summary */}
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-bold text-white whitespace-nowrap">
                  {activeMonthObj.short}
                </span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-slate-300 whitespace-nowrap hidden sm:inline">
                  {selectedWeek === "all" ? "All Weeks" : `Week ${selectedWeek}`}
                </span>
                {selectedZone !== "ALL" && (
                  <>
                    <span className="text-slate-500 hidden md:inline">•</span>
                    <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[10px] font-bold text-indigo-300 border border-indigo-500/30 hidden md:inline">
                      {selectedZone}
                    </span>
                  </>
                )}
              </div>

              <IconChevronDown
                className={`h-3 w-3 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isFilterDropdownOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {/* FLOATING FILTER POPOVER PANEL */}
            {isFilterDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                      <IconFilter className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-white">Global Reporting Filters</h4>
                      <p className="text-[10px] text-slate-400">Controls Month, Week & Zone across all views</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedYear(2026);
                      setSelectedMonth(9);
                      setSelectedWeek("all");
                      setSelectedZone("ALL");
                    }}
                    className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Reset All
                  </button>
                </div>

                {/* Field 1: Reporting Month */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>1. Reporting Month</span>
                    <span className="text-[10px] text-indigo-400 font-semibold">{selectedYear} Cycle</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {months.map((m) => {
                      const isSelected = selectedYear === m.year && selectedMonth === m.month;
                      return (
                        <button
                          key={`${m.year}-${m.month}`}
                          onClick={() => {
                            setSelectedYear(m.year);
                            setSelectedMonth(m.month);
                          }}
                          className={`rounded-xl px-2.5 py-1.5 text-xs text-left font-medium transition ${
                            isSelected
                              ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30"
                              : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {m.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 2: Filing Week */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    2. Filing Week
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(
                      [
                        { val: "all", label: "All Weeks" },
                        { val: 1, label: "Week 1" },
                        { val: 2, label: "Week 2" },
                        { val: 3, label: "Week 3" },
                        { val: 4, label: "Week 4" },
                      ] as const
                    ).map((item) => {
                      const isSelected = selectedWeek === item.val;
                      return (
                        <button
                          key={String(item.val)}
                          onClick={() => setSelectedWeek(item.val)}
                          className={`rounded-xl py-1.5 text-xs text-center font-bold transition ${
                            isSelected
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                              : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 3: Regional Zone */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    3. Regional Zone
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="ALL">All Zones (Nationwide Roster)</option>
                    {allZones.map((z) => (
                      <option key={z.id} value={z.name}>
                        {z.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Active Filter Summary Chip & Done Button */}
                <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 truncate max-w-[200px]">
                    Active: <strong className="text-white">{activeMonthObj.name}</strong> • {selectedWeek === "all" ? "All Weeks" : `Week ${selectedWeek}`}
                  </span>
                  <button
                    onClick={() => setIsFilterDropdownOpen(false)}
                    className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition active:scale-95"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Friday 11:59 PM Smart Deadline Pill */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-xl border border-indigo-900/40 bg-gradient-to-r from-indigo-950/40 to-slate-900/60 px-3 py-1.5 text-xs text-indigo-300">
            <IconClock className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[11px]">
              Cutoff: <strong className="text-white">Friday 11:59 PM</strong>
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

          {/* ================================================================= */}
          {/* USER PROFILE AVATAR & MODERN DROPDOWN */}
          {/* ================================================================= */}
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setIsUserDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-2 rounded-xl border p-1 sm:pr-2.5 transition-all duration-200 outline-none ${
                isUserDropdownOpen
                  ? "border-indigo-500/80 bg-slate-800/90 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20"
                  : "border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:bg-slate-800/80"
              }`}
              title="Open User Profile & Account Menu"
            >
              {/* Avatar Icon */}
              <div
                className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black shadow-md ${
                  activeUser.role === "ADMIN"
                    ? "bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/20"
                    : "bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-indigo-500/20"
                }`}
              >
                {activeUser.role === "ADMIN" ? (
                  "👑"
                ) : (
                  <span>{getInitials(activeUser.name)}</span>
                )}
                {/* Active status pulse dot */}
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
              </div>

              {/* User Name & Role (Visible on sm+ screens) */}
              <div className="hidden sm:flex flex-col text-left leading-tight min-w-0 max-w-[110px] md:max-w-[140px]">
                <span className="truncate text-xs font-bold text-white">
                  {activeUser.name}
                </span>
                <span className="truncate text-[10px] text-slate-400">
                  {activeUser.role === "ADMIN" ? "Head Office Admin" : activeUser.zone}
                </span>
              </div>

              {/* Role Badge Chip */}
              <span
                className={`hidden md:inline-block rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                  activeUser.role === "ADMIN"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                }`}
              >
                {activeUser.role}
              </span>

              {/* Dropdown Chevron */}
              <IconChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isUserDropdownOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu Panel */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 rounded-2xl border border-slate-800 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* User Header Profile Card */}
                <div className="rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-3.5 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black shadow-lg ${
                        activeUser.role === "ADMIN"
                          ? "bg-gradient-to-tr from-amber-600 to-yellow-400 text-slate-950 shadow-amber-500/25 ring-2 ring-amber-400/30"
                          : "bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white shadow-indigo-500/25 ring-2 ring-indigo-400/30"
                      }`}
                    >
                      {activeUser.role === "ADMIN" ? "👑" : getInitials(activeUser.name)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-extrabold text-white">
                          {activeUser.name}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.2 text-[9px] font-black uppercase ${
                            activeUser.role === "ADMIN"
                              ? "bg-amber-500/25 text-amber-300"
                              : "bg-cyan-500/25 text-cyan-300"
                          }`}
                        >
                          {activeUser.role}
                        </span>
                      </div>
                      <span className="truncate text-xs text-slate-400 font-medium">
                        {activeUser.designation}
                      </span>
                      <span className="truncate text-[11px] text-slate-500 font-mono">
                        {activeUser.email}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px]">
                    <span className="text-slate-400">
                      Staff ID: <strong className="font-mono text-indigo-300">{activeUser.staffId}</strong>
                    </span>
                    <span className="rounded-md bg-slate-800 px-2 py-0.5 text-slate-300 font-semibold">
                      Zone: {activeUser.zone}
                    </span>
                  </div>
                </div>

                {/* Quick Persona / User Switcher */}
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <IconUsers className="h-3 w-3 text-indigo-400" />
                      Switch Account / Persona
                    </span>
                    <span className="text-[10px] text-indigo-400 font-semibold">1-Click Demo</span>
                  </div>

                  <div className="max-h-52 overflow-y-auto space-y-1 pr-1 table-scrollbar">
                    {allUsers.map((u) => {
                      const isCurrent = u.id === activeUser.id;
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            setActiveUser(u);
                            setIsUserDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-left transition-all ${
                            isCurrent
                              ? "bg-indigo-600/20 border border-indigo-500/40 text-white"
                              : "border border-transparent hover:bg-slate-900 hover:border-slate-800 text-slate-300 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                                u.role === "ADMIN"
                                  ? "bg-amber-500/20 text-amber-300"
                                  : "bg-slate-800 text-indigo-300"
                              }`}
                            >
                              {u.role === "ADMIN" ? "👑" : getInitials(u.name)}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="truncate text-xs font-semibold">
                                {u.name}
                              </span>
                              <span className="truncate text-[10px] text-slate-400">
                                {u.staffId} • {u.zone}
                              </span>
                            </div>
                          </div>

                          {isCurrent && (
                            <IconCheck className="h-4 w-4 text-indigo-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Helpful Actions */}
                <div className="mt-3 border-t border-slate-800/80 pt-2 space-y-1">
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      setIsSubmitModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:text-white transition"
                  >
                    <IconForm className="h-4 w-4 text-indigo-400" />
                    <span>Create Weekly Report</span>
                  </button>

                  <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-400">
                    <IconShield className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>Cutoff: Friday 11:59 PM</span>
                  </div>

                  {/* Sign Out */}
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 border border-transparent transition"
                  >
                    <div className="flex items-center gap-2">
                      <IconLogout className="h-4 w-4 text-rose-400" />
                      <span>Sign Out to Welcome Portal</span>
                    </div>
                    <span className="text-[10px] opacity-70">ESC</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}