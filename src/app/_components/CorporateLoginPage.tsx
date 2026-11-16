"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconLock, IconShield } from "./Icons";

export function CorporateLoginPage() {
  const { handleLogin, showToast } = useApp();

  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginMutation = api.auth.login.useMutation({
    onSuccess: (data) => {
      handleLogin(data.user);
    },
    onError: (err) => {
      showToast(err.message || "Failed to authenticate. Please check your credentials.", "error");
    },
  });

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = identifier.trim();
    if (!clean) {
      showToast("Please enter your Staff ID or official corporate email.", "error");
      return;
    }
    if (!password) {
      showToast("Please enter your password.", "error");
      return;
    }

    loginMutation.mutate({
      identifier: clean,
      password,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative">
      {/* Formal Dark Background */}
      <div className="absolute inset-0 bg-radial-[circle_at_top_center] from-slate-900/60 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Main Centered Sign-In Area (NO NAVBAR) */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Main Corporate Authentication Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Corporate Brand Emblem */}
            <div className="text-center">
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

            {/* Real Authentication Form */}
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Staff ID or Corporate Email
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. ADMIN001 or 572816"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"
                />
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-900/30 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <IconLock className="h-4 w-4" />
                    <span>Sign In to Portal</span>
                  </>
                )}
              </button>
            </form>

            {/* Corporate System Notice */}
            <div className="pt-4 border-t border-slate-800 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <IconShield className="h-3.5 w-3.5 text-blue-400" />
                <span>Enterprise Authentication Node</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Restricted to authorized company personnel. All sign-in attempts are audited.
              </p>
            </div>
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
