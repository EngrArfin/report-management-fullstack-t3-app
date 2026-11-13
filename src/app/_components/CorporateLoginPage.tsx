"use client";

import React, { useState } from "react";
import { useApp, type ActiveUser } from "./AppContext";
import { IconLock, IconUsers } from "./Icons";

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
          `No employee found for "${identifier}". Use Staff ID "572816" or "ADMIN001".`,
          "error"
        );
      }
    }, 250);
  };

  const filteredPersonas = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(personaSearch.toLowerCase()) ||
      u.staffId.toLowerCase().includes(personaSearch.toLowerCase()) ||
      u.zone.toLowerCase().includes(personaSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(personaSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative">
      {/* Subtle Formal Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_top_center] from-slate-900/60 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Main Centered Sign-In Area (NO NAVBAR) */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Main Corporate Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
            {/* Corporate Brand Emblem */}
            <div className="text-center mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-base shadow-lg shadow-blue-900/30 mb-3.5">
                OM
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Office Operations Portal
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Weekly Report Management & Performance Governance
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex rounded-xl border border-slate-800 bg-slate-950/80 p-1 mb-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMode("credentials")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                  authMode === "credentials"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <IconLock className="h-3.5 w-3.5" />
                Staff Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("persona")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                  authMode === "persona"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <IconUsers className="h-3.5 w-3.5" />
                Demo Personas ({allUsers.length})
              </button>
            </div>

            {/* Mode 1: Standard Credentials Form */}
            {authMode === "credentials" ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Staff ID or Official Corporate Email
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 572816 or ADMIN001"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Use your 6-digit Staff ID (e.g. <span className="text-blue-400 font-mono">572816</span>) or Admin ID (<span className="text-blue-400 font-mono">ADMIN001</span>).
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
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-900/30 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Authenticating...</span>
                  ) : (
                    <span>Sign In to Portal →</span>
                  )}
                </button>

                {/* Quick Hint Links */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <span>Demo Admin: <button type="button" onClick={() => setIdentifier("ADMIN001")} className="text-blue-400 hover:underline font-mono cursor-pointer">ADMIN001</button></span>
                  <span>Demo OM: <button type="button" onClick={() => setIdentifier("572816")} className="text-blue-400 hover:underline font-mono cursor-pointer">572816</button></span>
                  <button type="button" onClick={() => setAuthMode("persona")} className="text-slate-300 hover:text-white cursor-pointer">
                    All Personas ▾
                  </button>
                </div>
              </form>
            ) : (
              /* Mode 2: Quick Persona Switcher for Evaluation */
              <div className="space-y-3">
                <input
                  type="text"
                  value={personaSearch}
                  onChange={(e) => setPersonaSearch(e.target.value)}
                  placeholder="Search staff, ID, zone, or role..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                />

                <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 table-scrollbar">
                  {filteredPersonas.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleLogin(user)}
                      className="w-full text-left rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-800 hover:border-slate-700 p-2.5 transition flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                            user.role === "ADMIN"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {user.role === "ADMIN" ? "AD" : "OM"}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate text-xs font-bold text-white group-hover:text-blue-400 transition">
                              {user.name}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              #{user.staffId}
                            </span>
                          </div>
                          <div className="truncate text-[10px] text-slate-400">
                            {user.designation} • {user.zone}
                          </div>
                        </div>
                      </div>

                      <span className="text-slate-500 group-hover:text-blue-400 text-xs shrink-0">
                        Select →
                      </span>
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
        </div>
      </main>

      {/* Formal Minimalist Footer */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950/90 py-3 text-center text-[11px] text-slate-400">
        © 2026 Office Operations Management • 256-Bit SSL Encrypted Enterprise Access
      </footer>
    </div>
  );
}
