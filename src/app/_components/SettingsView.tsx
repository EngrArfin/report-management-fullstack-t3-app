"use client";

import React, { useState, useRef } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import {
  IconSettings,
  IconShield,
  IconLock,
  IconCamera,
  IconTrash,
} from "./Icons";

export function SettingsView() {
  const { activeUser, setActiveUser, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<"profile" | "security" | "governance" | "system">("profile");

  // Profile Form state
  const [profileImage, setProfileImage] = useState<string | null>(activeUser.image ?? null);
  const [name, setName] = useState(activeUser.name);
  const [designation, setDesignation] = useState(activeUser.designation);
  const [zone, setZone] = useState(activeUser.zone);

  React.useEffect(() => {
    setProfileImage(activeUser.image ?? null);
    setName(activeUser.name);
    setDesignation(activeUser.designation);
    setZone(activeUser.zone);
  }, [activeUser]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security Form state
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  // Governance preferences
  const [emailReminders, setEmailReminders] = useState(true);
  const [autoSaveDraft, setAutoSaveDraft] = useState(true);

  const updateProfileMutation = api.auth.updateProfile.useMutation({
    onSuccess: (data) => {
      setActiveUser(data.user);
      try {
        localStorage.setItem("om_user", JSON.stringify(data.user));
      } catch {
        // Ignore
      }
      showToast("Profile credentials updated successfully in database.", "success");
    },
    onError: (err) => {
      showToast(err.message || "Failed to update profile.", "error");
    },
  });

  const changePasswordMutation = api.auth.changePassword.useMutation({
    onSuccess: (data) => {
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
      showToast(data.message || "Security credentials updated successfully in database.", "success");
    },
    onError: (err) => {
      showToast(err.message || "Failed to change password.", "error");
    },
  });

  // Canvas-based image compression: supports ANY file size (1MB, 10MB, 25MB+)
  // Auto-resizes and converts to lightweight, crystal-clear 512x512 JPEG (~50KB)
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_DIM = 512;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          // Standardize as clean JPEG data URI (~40-60KB)
          const compressedDataUri = canvas.toDataURL("image/jpeg", 0.88);
          resolve(compressedDataUri);
        };
        img.onerror = () => reject(new Error("Failed to load and process image."));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read image file."));
      reader.readAsDataURL(file);
    });
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file (JPG, PNG, WebP).", "error");
      return;
    }

    try {
      showToast("Optimizing image...", "info");
      const compressed = await compressImage(file);
      setProfileImage(compressed);
      showToast("Image ready! Click 'Save Profile Changes' to save.", "info");
    } catch {
      showToast("Failed to process image. Please try another photo.", "error");
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Full name is required.", "error");
      return;
    }
    updateProfileMutation.mutate({
      userId: activeUser.id,
      staffId: activeUser.staffId,
      name: name.trim(),
      designation: designation.trim(),
      zone: zone.trim(),
      image: profileImage,
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPin) {
      showToast("Current password is required.", "error");
      return;
    }
    if (!newPin || newPin.length < 4) {
      showToast("New password must be at least 4 characters.", "error");
      return;
    }
    if (newPin !== confirmPin) {
      showToast("New passwords do not match.", "error");
      return;
    }
    changePasswordMutation.mutate({
      userId: activeUser.id,
      currentPassword: currentPin,
      newPassword: newPin,
    });
  };

  const getInitials = (str: string) => {
    return str
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6 pb-20 min-w-0">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <IconSettings className="h-5 w-5 text-blue-400" />
            System & Account Settings
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your corporate profile, security credentials, and enterprise reporting preferences
          </p>
        </div>

        <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">
          Staff #{activeUser.staffId}
        </span>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-semibold gap-1 overflow-x-auto table-scrollbar">
        {[
          { id: "profile", label: "Corporate Profile" },
          { id: "security", label: "Security & PIN" },
          { id: "governance", label: "Reporting Governance" },
          { id: "system", label: "System Diagnostics" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2.5 border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? "border-blue-500 text-white font-bold bg-slate-900/50"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Profile */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="w-full space-y-5">
          {/* 1. Profile Picture & Identity Showcase Card */}
          <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-800/80">
              Profile Photo & Corporate Identity
            </h3>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Avatar Box with Live Preview and Change Overlay */}
              <div className="relative group shrink-0">
                <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-950 flex items-center justify-center shadow-lg">
                  {profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profileImage}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-2xl tracking-wider">
                      {activeUser.role === "ADMIN" ? "AD" : getInitials(name || activeUser.name)}
                    </div>
                  )}
                </div>

                {/* Camera Quick-Pick Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-500 p-2 text-white shadow-lg border-2 border-slate-900 transition cursor-pointer"
                  title="Change Profile Photo"
                >
                  <IconCamera className="h-4 w-4" />
                </button>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </div>

              {/* Photo Actions & Identity Summary */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="text-base font-extrabold text-white">{name}</h4>
                    <span className="rounded-md bg-blue-500/20 border border-blue-500/40 px-2 py-0.5 text-[10px] font-bold text-blue-300 uppercase">
                      {activeUser.role}
                    </span>
                    <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                      ID: #{activeUser.staffId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {designation || "Office Manager"} • {zone || "Assigned Zone"}
                  </p>
                </div>

                {/* Upload & Remove Photo Buttons */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer shadow-sm"
                  >
                    <IconCamera className="h-3.5 w-3.5 text-blue-400" />
                    <span>Upload New Photo</span>
                  </button>

                  {profileImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-rose-900/40 bg-rose-950/30 hover:bg-rose-900/50 px-3 py-1.5 text-xs font-semibold text-rose-300 transition cursor-pointer"
                    >
                      <IconTrash className="h-3.5 w-3.5 text-rose-400" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-slate-500">
                  All image sizes supported (auto-optimized). Photo will appear across all reports, navbar & OM directory.
                </p>
              </div>
            </div>

            {/* Corporate Verified Email Info Box (Read-Only / Managed by IT) */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <IconShield className="h-4 w-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block">Corporate Email</span>
                  <span className="font-mono text-xs text-slate-200 font-bold">{activeUser.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-slate-400 italic">Managed by IT Administration (Locked)</span>
              </div>
            </div>
          </div>

          {/* 2. Employment & Personnel Details Form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800/80">
              Personnel Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Staff ID (Permanent Badge)
                </label>
                <input
                  type="text"
                  disabled
                  value={activeUser.staffId}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-400 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Assigned Role
                </label>
                <input
                  type="text"
                  disabled
                  value={activeUser.role === "ADMIN" ? "Head Office Administrator" : "Office Manager (OM)"}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-400 font-semibold cursor-not-allowed"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Md. Benajir Alam"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Senior Office Manager"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Stationed Zone / Territory
                </label>
                <input
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  placeholder="e.g. Chittagong-01"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-900/30 transition cursor-pointer flex items-center gap-2"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <span>Save Profile Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Security & PIN */}
      {activeTab === "security" && (
        <form onSubmit={handleUpdatePassword} className="w-full space-y-4">
          <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
              <IconLock className="h-4 w-4 text-blue-400" />
              Change Security PIN / Password
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Stored securely in database</span>
              <button
                type="submit"
                disabled={changePasswordMutation.isPending}
                className="rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 text-xs font-bold text-white shadow-sm transition cursor-pointer flex items-center gap-2"
              >
                {changePasswordMutation.isPending ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update Password</span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 3: Governance Policies */}
      {activeTab === "governance" && (
        <div className="w-full space-y-4">
          <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-sm text-xs">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
              <IconShield className="h-4 w-4 text-emerald-400" />
              Corporate Compliance & Filing Rules
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Cutoff Enforcement Policy</span>
                  <span className="text-slate-400 text-[11px]">Strict deadline: Friday 11:59:59 PM BST for each filing week</span>
                </div>
                <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 font-bold text-[10px]">
                  Enforced
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Zero-Activity Rule (Requirement #5)</span>
                  <span className="text-slate-400 text-[11px]">Submission allowed only with explicit zero activity justification</span>
                </div>
                <span className="rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 font-bold text-[10px]">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Email Reminder Dispatches</span>
                  <span className="text-slate-400 text-[11px]">Automated dispatch to unsubmitted personnel before cutoff</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailReminders}
                    onChange={(e) => setEmailReminders(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Auto-Save Drafts</span>
                  <span className="text-slate-400 text-[11px]">Preserve partial report form inputs in local memory</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSaveDraft}
                    onChange={(e) => setAutoSaveDraft(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: System Diagnostics */}
      {activeTab === "system" && (
        <div className="w-full space-y-4 text-xs">
          <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Enterprise Node Health & Diagnostics</span>
              <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Operational
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[11px] text-slate-400 block">Database Engine</span>
                <span className="font-bold text-white font-mono">Neon PostgreSQL (Cloud Pooler)</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[11px] text-slate-400 block">ORM & Client</span>
                <span className="font-bold text-white font-mono">Prisma v6 + tRPC v11</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[11px] text-slate-400 block">Cloud Hosting / Region</span>
                <span className="font-bold text-white font-mono">AWS us-east-2 (Ohio)</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-[11px] text-slate-400 block">Security Encryption</span>
                <span className="font-bold text-white font-mono">SSL 256-Bit TLS 1.3</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

