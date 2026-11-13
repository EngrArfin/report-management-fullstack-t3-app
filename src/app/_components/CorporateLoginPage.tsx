"use client";

import React, { useState } from "react";
import { useApp, type ActiveUser } from "./AppContext";
import { IconLock, IconUsers, IconDashboard, IconTracking, IconTable } from "./Icons";

interface CorporateLoginPageProps {
  allUsers: ActiveUser[];
}

export function CorporateLoginPage({ allUsers }: CorporateLoginPageProps) {
  const { handleLogin, showToast } = useApp();

  const [authMode, setAuthMode] = useState<"credentials" | "persona">("credentials");
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [personaSearch, setPersonaSearch] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = identifier.trim().toLowerCase();
    if (!clean) {
      showToast("Please enter your Staff ID or official email address.", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const matched = allUsers.find(
        (u) =>
          u.staffId.toLowerCase() === clean ||
          u.email.toLowerCase() === clean ||
          u.name.toLowerCase().includes(clean)
      );

      setIsSubmitting(false);

      if (matched) {
        handleLogin(matched);
      } else {
        showToast(
          `No registered employee found for "${identifier}". Try Staff ID "572816" or "ADMIN001".`,
          "error"
        );
      }
    }, 300);
  };

  const filteredPersonas = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(personaSearch.toLowerCase()) ||
      u.staffId.toLowerCase().includes(personaSearch.toLowerCase()) ||
      u.zone.toLowerCase().includes(personaSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(personaSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Corporate Header */}
      <header className="relative z-10 w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-black text-lg shadow-lg shadow-indigo-500/25">
            OM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">Report Portal</span>
              <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                Enterprise
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Head Office Operations & Performance Governance</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2.5 text-xs text-slate-400">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-slate-300">Production Node: Active</span>
          <span className="text-slate-600">•</span>
          <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/60">
            SSL 256-Bit
          </span>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl">
          {/* Main Card Container */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/85 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
            {/* Card Header */}
            <div className="text-center mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-3 shadow-inner">
                <IconLock className="h-6 w-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Employee & Admin Sign In
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Enter your official Staff ID or corporate email to access the weekly report management dashboard.
              </p>
            </div>

            {/* Mode Switcher Pills */}
            <div className="flex rounded-xl border border-slate-800 bg-slate-950/80 p-1 mb-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMode("credentials")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg cursor-pointer transition-all ${
                  authMode === "credentials"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <IconLock className="h-3.5 w-3.5" />
                Staff ID Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("persona")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg cursor-pointer transition-all ${
                  authMode === "persona"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <IconUsers className="h-3.5 w-3.5" />
                Quick Persona Switcher ({allUsers.length})
              </button>
            </div>

            {/* Mode 1: Standard Credentials Form */}
            {authMode === "credentials" ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Staff ID or Corporate Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. 572816 or admin@company.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Use your official 6-digit Staff ID (e.g. <span className="text-indigo-300 font-mono">572816</span>) or Admin ID (<span className="text-indigo-300 font-mono">ADMIN001</span>).
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Password / Security PIN
                    </label>
                    <span className="text-[11px] text-slate-400">Default: any PIN</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Authenticating Credentials...</span>
                  ) : (
                    <>
                      <span>Sign In to Operations Portal</span>
                      <span>→</span>
                    </>
                  )}
                </button>

                {/* Quick Hint Links */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <span>Demo Admin: <button type="button" onClick={() => setIdentifier("ADMIN001")} className="text-indigo-400 hover:underline font-mono cursor-pointer">ADMIN001</button></span>
                  <span>Demo OM: <button type="button" onClick={() => setIdentifier("572816")} className="text-indigo-400 hover:underline font-mono cursor-pointer">572816</button></span>
                  <button type="button" onClick={() => setAuthMode("persona")} className="text-slate-300 hover:text-white cursor-pointer">
                    View All Accounts ▾
                  </button>
                </div>
              </form>
            ) : (
              /* Mode 2: Quick Persona Switcher for Evaluation */
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    value={personaSearch}
                    onChange={(e) => setPersonaSearch(e.target.value)}
                    placeholder="Search by name, Staff ID, zone, or role..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition"
                  />
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 pr-1 table-scrollbar">
                  {filteredPersonas.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleLogin(user)}
                      className="w-full text-left rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-indigo-950/30 hover:border-indigo-500/50 p-3 transition flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                            user.role === "ADMIN"
                              ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                              : "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30"
                          }`}
                        >
                          {user.role === "ADMIN" ? "AD" : "OM"}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                              {user.name}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              #{user.staffId}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {user.designation} • {user.zone}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            user.role === "ADMIN"
                              ? "bg-purple-950/60 text-purple-300 border-purple-700/50"
                              : "bg-blue-950/60 text-blue-300 border-blue-700/50"
                          }`}
                        >
                          {user.role}
                        </span>
                        <span className="text-slate-500 group-hover:text-indigo-400 text-xs">
                          Login →
                        </span>
                      </div>
                    </button>
                  ))}

                  {filteredPersonas.length === 0 && (
                    <div className="text-center py-6 text-xs text-slate-400">
                      No matching employee found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Pillars under Login Card */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-slate-400">
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-2.5">
              <IconDashboard className="h-4 w-4 mx-auto text-indigo-400 mb-1" />
              <div className="text-[11px] font-medium text-slate-200">Executive KPIs</div>
              <div className="text-[10px] text-slate-400">Consolidated analytics</div>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-2.5">
              <IconTracking className="h-4 w-4 mx-auto text-emerald-400 mb-1" />
              <div className="text-[11px] font-medium text-slate-200">Weekly Tracking</div>
              <div className="text-[10px] text-slate-400">Friday 11:59 PM cutoff</div>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-2.5">
              <IconTable className="h-4 w-4 mx-auto text-blue-400 mb-1" />
              <div className="text-[11px] font-medium text-slate-200">18-Col Excel</div>
              <div className="text-[10px] text-slate-400">One-click export</div>
            </div>
          </div>
        </div>
      </main>

      {/* Corporate Footer */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-slate-900/60 px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <div>
          © 2026 Office Manager Weekly Report Management System. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Enterprise Edition v2.4.0</span>
          <span>•</span>
          <span className="text-slate-400">Restricted Corporate Portal</span>
        </div>
      </footer>
    </div>
  );
}

