"use client";

import React, { useState } from "react";
import { useApp, type ActiveUser } from "./AppContext";
import { IconLock } from "./Icons";

interface LoginModalProps {
  allUsers: ActiveUser[];
}

export function LoginModal({ allUsers }: LoginModalProps) {
  const { isLoginModalOpen, setIsLoginModalOpen, handleLogin, showToast } = useApp();

  const [loginMode, setLoginMode] = useState<"credentials" | "persona">("credentials");
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (!isLoginModalOpen) return null;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = identifier.trim().toLowerCase();
    if (!clean) {
      showToast("Please enter your Staff ID or official email address.", "error");
      return;
    }

    const matched = allUsers.find(
      (u) =>
        u.staffId.toLowerCase() === clean ||
        u.email.toLowerCase() === clean ||
        u.name.toLowerCase().includes(clean)
    );

    if (matched) {
      handleLogin(matched);
    } else {
      showToast(`No registered employee found for "${identifier}". Please try Staff ID e.g. 572816 or admin@company.com`, "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/30">
              <IconLock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Employee & Admin Portal Sign In</h3>
              <p className="text-xs text-slate-400">Office Manager Weekly Reporting Authentication</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Tab switch: Credentials vs Persona */}
        <div className="mt-4 flex rounded-lg border border-slate-800 bg-slate-950 p-1 text-xs">
          <button
            onClick={() => setLoginMode("credentials")}
            className={`flex-1 rounded-md py-1.5 font-semibold transition ${
              loginMode === "credentials"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Staff ID / Email Login
          </button>
          <button
            onClick={() => setLoginMode("persona")}
            className={`flex-1 rounded-md py-1.5 font-semibold transition ${
              loginMode === "persona"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            One-Click Persona Demo
          </button>
        </div>

        {/* Credentials Form */}
        {loginMode === "credentials" ? (
          <form onSubmit={handleCredentialsSubmit} className="mt-5 space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Official Staff ID or Corporate Email
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 572816 or admin@company.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                * Quick sample IDs: <code>ADMIN001</code> (Admin), <code>572816</code> (Benajir - Mitford), <code>451467</code> (Jashim - Comilla)
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Password or Security PIN (Optional for Demo)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Secure AES-256 RBAC Session</span>
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-5 py-2 font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition"
              >
                Sign In to Portal →
              </button>
            </div>
          </form>
        ) : (
          /* One-Click Persona Cards */
          <div className="mt-4 max-h-72 overflow-y-auto space-y-2 pr-1 text-xs">
            <p className="text-[11px] text-slate-400 mb-2">
              Select an account to instantly authenticate and evaluate their role-based view:
            </p>
            {allUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/60 p-3 text-left transition hover:bg-indigo-950/40 hover:border-indigo-500/50"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <span>{user.role === "ADMIN" ? "👑" : "👤"}</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {user.designation} • Zone: <strong className="text-slate-300">{user.zone}</strong>
                  </div>
                  <div className="text-[10px] text-indigo-300 font-mono mt-0.5">
                    Staff ID: {user.staffId}
                  </div>
                </div>

                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    user.role === "ADMIN"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  }`}
                >
                  {user.role}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
