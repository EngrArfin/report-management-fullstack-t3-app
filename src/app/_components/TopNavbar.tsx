"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp, type ActiveUser } from "./AppContext";
import {
  IconMenu,
  IconLogout,
  IconChevronDown,
  IconCheck,
  IconShield,
  IconUsers,
  IconFilter,
  IconRefresh,
} from "./Icons";

interface TopNavbarProps {
  allUsers: ActiveUser[];
  allZones: { id: string; name: string }[];
}

export function TopNavbar({ allUsers, allZones }: TopNavbarProps) {
  const {
    activeUser,
    setActiveUser,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedWeek,
    setSelectedWeek,
    selectedZone,
    setSelectedZone,
    setIsMobileSidebarOpen,
    handleLogout,
  } = useApp();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [zoneSearch, setZoneSearch] = useState("");
  const [personaSearch, setPersonaSearch] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (filterRef.current && !filterRef.current.contains(target)) {
        setIsFilterOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
        setIsUserMenuOpen(false);
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

  const weeks = [
    { value: "all", label: "All Weeks", short: "All" },
    { value: 1, label: "Week 1", short: "W1" },
    { value: 2, label: "Week 2", short: "W2" },
    { value: 3, label: "Week 3", short: "W3" },
    { value: 4, label: "Week 4", short: "W4" },
  ] as const;

  const isFiltered =
    selectedYear !== 2026 ||
    selectedMonth !== 9 ||
    selectedWeek !== "all" ||
    selectedZone !== "ALL";

  const handleResetFilters = () => {
    setSelectedYear(2026);
    setSelectedMonth(9);
    setSelectedWeek("all");
    setSelectedZone("ALL");
    setZoneSearch("");
  };

  // User initials
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

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(personaSearch.toLowerCase()) ||
      u.staffId.toLowerCase().includes(personaSearch.toLowerCase()) ||
      u.zone.toLowerCase().includes(personaSearch.toLowerCase())
  );

  const filteredZones = allZones.filter((z) =>
    z.name.toLowerCase().includes(zoneSearch.toLowerCase())
  );

  const activeMonthObj =
    months.find((m) => m.year === selectedYear && m.month === selectedMonth) ?? months[0];

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/85 px-4 sm:px-6 backdrop-blur-2xl transition-all">
      {/* Left: Mobile Navigation Button only */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden transition active:scale-95 cursor-pointer shadow-sm"
          aria-label="Toggle Navigation Menu"
        >
          <IconMenu className="h-5 w-5" />
        </button>
      </div>

      {/* Right: Unified Minimal Filter Dropdown & Sleek User Logo/Avatar */}
      <div className="flex items-center gap-2.5">
        {/* ================================================================= */}
        {/* 1. SINGLE COMPACT FILTER BUTTON & POPOVER */}
        {/* ================================================================= */}
        <div className="relative" ref={filterRef}>
          <button
            type="button"
            onClick={() => {
              setIsFilterOpen((prev) => !prev);
              setIsUserMenuOpen(false);
            }}
            className={`h-8.5 px-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm ${
              isFilterOpen
                ? "border-indigo-500 bg-indigo-950/40 text-white ring-2 ring-indigo-500/20"
                : isFiltered
                ? "border-indigo-500/60 bg-indigo-950/30 text-indigo-300"
                : "border-slate-800 bg-slate-900/90 text-slate-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            }`}
            title="Filter by Month, Week, or Zone"
          >
            <IconFilter className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <span className="font-bold">{activeMonthObj?.short ?? "Filters"}</span>
            {selectedWeek !== "all" && (
              <span className="text-[10px] text-indigo-300 bg-indigo-500/20 px-1.5 py-0.2 rounded font-mono">
                W{selectedWeek}
              </span>
            )}
            {selectedZone !== "ALL" && (
              <span className="max-w-[70px] truncate text-[10px] text-cyan-300 bg-cyan-500/20 px-1.5 py-0.2 rounded font-semibold hidden sm:inline">
                {selectedZone}
              </span>
            )}
            <IconChevronDown
              className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                isFilterOpen ? "rotate-180 text-indigo-400" : ""
              }`}
            />
          </button>

          {/* Unified Filter Menu Panel */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-800 bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3.5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <span className="text-xs font-extrabold text-white">Filters</span>
                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[11px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition cursor-pointer"
                  >
                    <IconRefresh className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* 1. Month */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Month
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {months.map((m) => {
                    const isSelected = selectedYear === m.year && selectedMonth === m.month;
                    return (
                      <button
                        key={`${m.year}-${m.month}`}
                        type="button"
                        onClick={() => {
                          setSelectedYear(m.year);
                          setSelectedMonth(m.month);
                        }}
                        className={`rounded-xl px-2.5 py-1.5 text-xs text-left font-medium transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30"
                            : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{m.name}</span>
                        {isSelected && <IconCheck className="h-3 w-3 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Week */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Week
                </span>
                <div className="grid grid-cols-5 gap-1">
                  {weeks.map((w) => {
                    const isSelected = selectedWeek === w.value;
                    return (
                      <button
                        key={String(w.value)}
                        type="button"
                        onClick={() => setSelectedWeek(w.value)}
                        className={`rounded-xl py-1.5 text-xs text-center font-bold transition cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {w.short}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Zone */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Zone
                  </span>
                  <span className="text-[10px] text-slate-400">{allZones.length} Zones</span>
                </div>

                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={zoneSearch}
                    onChange={(e) => setZoneSearch(e.target.value)}
                    placeholder="Search zone..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                  />

                  <div className="max-h-36 overflow-y-auto space-y-1 pr-1 table-scrollbar">
                    <button
                      type="button"
                      onClick={() => setSelectedZone("ALL")}
                      className={`w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                        selectedZone === "ALL"
                          ? "bg-indigo-600 text-white font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <span>All Zones</span>
                      {selectedZone === "ALL" && <IconCheck className="h-3.5 w-3.5 text-white" />}
                    </button>

                    {filteredZones.map((z) => {
                      const isSelected = selectedZone === z.name;
                      return (
                        <button
                          key={z.id}
                          type="button"
                          onClick={() => setSelectedZone(z.name)}
                          className={`w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                            isSelected
                              ? "bg-indigo-600 text-white font-bold"
                              : "text-slate-300 hover:bg-slate-900 hover:text-white"
                          }`}
                        >
                          <span className="truncate">{z.name}</span>
                          {isSelected && <IconCheck className="h-3.5 w-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Done button */}
              <div className="pt-2 border-t border-slate-800/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-xl bg-indigo-600 px-3.5 py-1 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* 2. RIGHT SIDE: JUST LOGO / AVATAR & DROPDOWN */}
        {/* ================================================================= */}
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => {
              setIsUserMenuOpen((prev) => !prev);
              setIsFilterOpen(false);
            }}
            className={`relative flex h-8.5 w-8.5 items-center justify-center rounded-xl border transition-all duration-200 outline-none cursor-pointer shadow-sm ${
              isUserMenuOpen
                ? "border-indigo-500 bg-slate-800 ring-2 ring-indigo-500/20"
                : "border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:bg-slate-800"
            }`}
            title="User Profile Menu"
          >
            <div
              className={`flex h-6.5 w-6.5 items-center justify-center rounded-lg text-xs font-black shadow-md ${
                activeUser.role === "ADMIN"
                  ? "bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/20"
                  : "bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-indigo-500/20"
              }`}
            >
              {activeUser.role === "ADMIN" ? "👑" : getInitials(activeUser.name)}
            </div>
            {/* Active online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-slate-950 bg-emerald-400" />
          </button>

          {/* User Menu Panel */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2.5 w-80 rounded-2xl border border-slate-800 bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
              {/* Profile Card */}
              <div className="rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-900 to-slate-950 p-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black shadow-lg ${
                      activeUser.role === "ADMIN"
                        ? "bg-gradient-to-tr from-amber-600 to-yellow-400 text-slate-950 ring-2 ring-amber-400/30"
                        : "bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white ring-2 ring-indigo-400/30"
                    }`}
                  >
                    {activeUser.role === "ADMIN" ? "👑" : getInitials(activeUser.name)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-xs font-extrabold text-white">
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
                    <span className="truncate text-[11px] text-slate-400">
                      {activeUser.designation}
                    </span>
                    <span className="truncate text-[10px] text-slate-400 font-mono">
                      {activeUser.email}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px]">
                  <span className="text-slate-400">
                    Staff ID: <strong className="font-mono text-indigo-300">{activeUser.staffId}</strong>
                  </span>
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-slate-300 font-semibold">
                    Zone: {activeUser.zone}
                  </span>
                </div>
              </div>

              {/* Persona Switcher */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <IconUsers className="h-3 w-3 text-indigo-400" />
                    Switch Account
                  </span>
                  <span className="text-[10px] text-indigo-400 font-semibold">Demo</span>
                </div>

                <input
                  type="text"
                  value={personaSearch}
                  onChange={(e) => setPersonaSearch(e.target.value)}
                  placeholder="Search staff or zone..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                />

                <div className="max-h-40 overflow-y-auto space-y-1 pr-1 table-scrollbar">
                  {filteredUsers.map((u) => {
                    const isCurrent = u.id === activeUser.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          setActiveUser(u);
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-left transition cursor-pointer ${
                          isCurrent
                            ? "bg-indigo-600/20 border border-indigo-500/40 text-white"
                            : "hover:bg-slate-900 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="truncate text-xs font-semibold">{u.name}</span>
                          <span className="text-[10px] text-slate-400">#{u.staffId}</span>
                        </div>
                        {isCurrent && <IconCheck className="h-3.5 w-3.5 text-indigo-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Helpful Cutoff & Sign Out */}
              <div className="border-t border-slate-800/80 pt-2 space-y-1">
                <div className="flex items-center gap-2 px-2 py-1 text-[11px] text-slate-400">
                  <IconShield className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                  <span>Cutoff: Friday 11:59 PM BST</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <IconLogout className="h-4 w-4" />
                    <span>Sign Out</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
