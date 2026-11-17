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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,58,138,0.18),rgba(2,6,23,0))] pointer-events-none" />

      {/* Main Sign-In Section (Clean 2-column layout) */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* Left Column: Clean & Simple Login Form */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-slate-900/90">
            {/* Circular Logo & Header */}
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-full bg-slate-950 border border-slate-700/80 p-1.5 shadow-md flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Report Portal Logo"
                  className="h-full w-full object-contain rounded-full"
                />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Office Operations Portal
                </h1>
                <p className="mt-1 text-xs text-slate-400">
                  Sign in with your Staff ID or Corporate Email
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Staff ID or Email
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. ADMIN001 or 572816"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-900/30 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <IconLock className="h-4 w-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>


          </div>

          {/* Right Column: Clean & Natural Photographic Showcase */}
          <div className="hidden lg:block relative overflow-hidden bg-slate-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/login-showcase.jpg"
              alt="Operations Review & Performance Reporting"
              className="h-full w-full object-cover"
            />
            {/* Gentle dark gradient overlay at bottom for smooth natural depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950/90 py-3 text-center text-[11px] text-slate-400">
        © 2026 Office Operations Management
      </footer>
    </div>
  );
}
