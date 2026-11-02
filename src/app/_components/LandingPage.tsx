"use client";

import React from "react";
import { useApp, type ActiveUser } from "./AppContext";
import {
  IconShield,
  IconSparkles,
} from "./Icons";

interface LandingPageProps {
  allUsers: ActiveUser[];
}

export function LandingPage({ allUsers }: LandingPageProps) {
  const { handleLogin, setIsLoginModalOpen } = useApp();

  const adminUser = allUsers.find((u) => u.role === "ADMIN") ?? allUsers[0];
  const omUsers = allUsers.filter((u) => u.role === "OM");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-indigo-500/25">
              OM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">OM Report System</span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                  Enterprise v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Office Manager Weekly Reporting & Performance Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {adminUser && (
              <button
                onClick={() => handleLogin(adminUser)}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
              >
                <span>Demo Admin Login</span>
              </button>
            )}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-95 transition"
            >
              <IconShield className="h-4 w-4" />
              <span>Portal Sign In</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Ambient glow backgrounds */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-medium text-indigo-300 backdrop-blur-md mb-6">
            <IconSparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Centralized Field Intelligence & Automated Target Governance</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Office Manager (OM) <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Weekly Report Management System
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Eliminate manual report preparation with our automated reporting architecture.
            Office Managers enter weekly data once — system automatically generates Executive Dashboards,
            Submission Tracking Matrices, Target vs Achievement Leaderboards, Friday 11:59 PM Missed Deadline Alerts,
            and 18-Column Standard Formatted Excel reports.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition"
            >
              <span>Sign In with Staff ID / Email</span>
              <span>→</span>
            </button>

            {adminUser && (
              <button
                onClick={() => handleLogin(adminUser)}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition"
              >
                <IconShield className="h-4 w-4 text-amber-400" />
                <span>One-Click Head Office Admin Access</span>
              </button>
            )}
          </div>

          {/* Live System Capabilities Badges */}
          <div className="mt-12 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                Core Engine
              </span>
              <div className="mt-1 text-base font-bold text-white">Enter Once, Auto-Calculate</div>
              <p className="mt-1 text-xs text-slate-400">Zero duplicate calculation effort</p>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                Smart Deadline
              </span>
              <div className="mt-1 text-base font-bold text-white">Friday 11:59 PM Rule</div>
              <p className="mt-1 text-xs text-slate-400">Auto Late & Pending classification</p>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Target vs Actual
              </span>
              <div className="mt-1 text-base font-bold text-white">Achievement Leaderboard</div>
              <p className="mt-1 text-xs text-slate-400">LOC, Mess, Dress Code rankings</p>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                Export & Alerts
              </span>
              <div className="mt-1 text-base font-bold text-white">18-Column Excel & Email</div>
              <p className="mt-1 text-xs text-slate-400">Senior CCs without duplicate spam</p>
            </div>
          </div>
        </div>
      </section>

      {/* System Operational Workflow Section */}
      <section className="border-t border-slate-900 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              The 6-Step Automated Workflow
            </h2>
            <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              From Weekly Field Entry to Executive Governance
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 text-xs">
            {/* Step 1 */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold">
                1
              </div>
              <h3 className="font-bold text-white">OM Sign In</h3>
              <p className="text-slate-400">Login with official Staff ID or Email & Zone verification.</p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold">
                2
              </div>
              <h3 className="font-bold text-white">Select Month & Week</h3>
              <p className="text-slate-400">e.g. September 2026 → Week 1, 2, 3, or 4.</p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold">
                3
              </div>
              <h3 className="font-bold text-white">4 Core Activities</h3>
              <p className="text-slate-400">Market Visit, LOC, Dress Code, Mess Visit (0 allowed).</p>
            </div>

            {/* Step 4 */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold">
                4
              </div>
              <h3 className="font-bold text-white">Live Validation</h3>
              <p className="text-slate-400">Strict check: Solved + Pending = Market Findings.</p>
            </div>

            {/* Step 5 */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold">
                5
              </div>
              <h3 className="font-bold text-white">Auto Aggregations</h3>
              <p className="text-slate-400">Weekly, Monthly, 3M, 6M, 1Y, and Target calculations update.</p>
            </div>

            {/* Step 6 */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold">
                6
              </div>
              <h3 className="font-bold text-white">Excel & Alerts</h3>
              <p className="text-slate-400">Instant 18-col Excel download and Friday deadline notices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Persona Access Box (Requirement #3, #4) */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Quick Persona Switcher (Instant Demo Sign In)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click on any real employee profile below to immediately launch the application portal under their persona
                </p>
              </div>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Enter custom credentials instead →
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Head Office Admin */}
              {adminUser && (
                <button
                  onClick={() => handleLogin(adminUser)}
                  className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left transition hover:bg-amber-500/20 hover:border-amber-500/50"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400">👑</span>
                      <span className="font-bold text-white text-sm">{adminUser.name}</span>
                    </div>
                    <span className="text-xs text-amber-300 font-medium">{adminUser.designation} • Head Office</span>
                    <span className="block text-[11px] text-slate-400 font-mono mt-0.5">Staff ID: {adminUser.staffId}</span>
                  </div>
                  <span className="rounded bg-amber-400/20 px-2 py-1 text-[10px] font-bold text-amber-300 uppercase">
                    Admin
                  </span>
                </button>
              )}

              {/* Real OMs */}
              {omUsers.map((om) => (
                <button
                  key={om.id}
                  onClick={() => handleLogin(om)}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 p-4 text-left transition hover:bg-slate-800 hover:border-indigo-500/50"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-indigo-400">👤</span>
                      <span className="font-bold text-white text-sm">{om.name}</span>
                    </div>
                    <span className="text-xs text-slate-300">{om.designation} • Zone: {om.zone}</span>
                    <span className="block text-[11px] text-indigo-300 font-mono mt-0.5">Staff ID: {om.staffId}</span>
                  </div>
                  <span className="rounded bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-300 uppercase">
                    OM View
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Office Manager (OM) Weekly Report Management System • Enterprise Governance & Field Analytics • 2026</p>
      </footer>
    </div>
  );
}
