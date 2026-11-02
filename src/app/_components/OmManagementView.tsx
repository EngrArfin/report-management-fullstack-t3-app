"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconRefresh } from "./Icons";

export function OmManagementView() {
  const { showToast } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [staffId, setStaffId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("TE");
  const [zone, setZone] = useState<string>("D.M-01/Mitford");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");

  const utils = api.useUtils();

  const { data: oms, isLoading, refetch, isFetching } = api.om.getAll.useQuery();
  const { data: zones } = api.om.getZones.useQuery();

  const createOmMutation = api.om.create.useMutation({
    onSuccess: () => {
      showToast("Office Manager created successfully!", "success");
      setIsAddModalOpen(false);
      setStaffId("");
      setName("");
      setEmail("");
      setMobile("");
      void utils.om.getAll.invalidate();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  const toggleStatusMutation = api.om.toggleStatus.useMutation({
    onSuccess: () => {
      showToast("OM status updated successfully!", "success");
      void utils.om.getAll.invalidate();
      void utils.dashboard.getMetrics.invalidate();
    },
  });

  const handleCreateOm = (e: React.FormEvent) => {
    e.preventDefault();
    createOmMutation.mutate({
      staffId,
      name,
      designation,
      zone,
      email,
      mobile,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Office Manager (OM) Directory & Access Control
          </h2>
          <p className="text-xs text-slate-400">
            Manage field staff, zone assignments, official notification emails, and active rosters
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
          >
            <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md transition"
          >
            <span>+ Add New OM</span>
          </button>
        </div>
      </div>

      {/* OM Table (Requirement #4) */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/60 text-slate-400">
                <th className="py-3 px-4 font-semibold">Staff ID</th>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Designation</th>
                <th className="py-3 px-4 font-semibold">Zone</th>
                <th className="py-3 px-4 font-semibold">Official Email</th>
                <th className="py-3 px-4 font-semibold">Mobile Number</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    Loading personnel records...
                  </td>
                </tr>
              ) : (
                oms?.map((om) => (
                  <tr key={om.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 font-mono font-medium text-indigo-300">{om.staffId}</td>
                    <td className="py-3 px-4 font-medium text-white">{om.name}</td>
                    <td className="py-3 px-4 text-slate-400">{om.designation}</td>
                    <td className="py-3 px-4 text-slate-300">{om.zone}</td>
                    <td className="py-3 px-4 text-slate-400">{om.email}</td>
                    <td className="py-3 px-4 text-slate-400">{om.mobile ?? "N/A"}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          om.status === "ACTIVE"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-700/50 text-slate-400 border border-slate-600"
                        }`}
                      >
                        {om.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() =>
                          toggleStatusMutation.mutate({
                            id: om.id,
                            status: om.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
                          })
                        }
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                      >
                        {om.status === "ACTIVE" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add OM Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Register New Office Manager</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOm} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Staff ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 592811"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohammad Tariqul Islam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TE, Jex"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Assigned Zone</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                  >
                    {zones?.map((z) => (
                      <option key={z.id} value={z.name}>
                        {z.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Official Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="tariqul@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Mobile Contact</label>
                <input
                  type="text"
                  placeholder="+8801700000000"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded px-3 py-1.5 border border-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createOmMutation.isPending}
                  className="rounded bg-indigo-600 px-4 py-1.5 font-semibold text-white hover:bg-indigo-500"
                >
                  {createOmMutation.isPending ? "Creating..." : "Register OM"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
