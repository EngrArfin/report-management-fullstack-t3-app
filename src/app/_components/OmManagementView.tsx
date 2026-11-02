"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { api } from "~/trpc/react";
import { IconRefresh, IconSearch } from "./Icons";

export function OmManagementView() {
  const { showToast } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
      showToast("Office Manager registered successfully!", "success");
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

  const filteredOms =
    oms?.filter(
      (om) =>
        om.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        om.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        om.zone.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  return (
    <div className="space-y-5 pb-16">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
            Office Manager Personnel Directory & Access Control
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage regional field staff, zone allocation, official notification emails & active rosters
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <IconRefresh className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition"
          >
            <span>+ Register New OM</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 text-xs">
        <div className="relative w-full sm:w-72">
          <IconSearch className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by Staff ID, Name, or Zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
          />
        </div>

        <span className="text-xs font-bold text-slate-400">
          Total Personnel: <strong className="text-white">{filteredOms.length}</strong>
        </span>
      </div>

      {/* OM Table (Requirement #4) */}
      <div className="glass-panel overflow-hidden rounded-2xl shadow-xl border border-slate-800">
        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/95 text-slate-400">
                <th className="py-3.5 px-4 font-bold text-slate-300">Staff ID</th>
                <th className="py-3.5 px-4 font-bold text-slate-300">Office Manager</th>
                <th className="py-3.5 px-3 font-bold text-slate-300">Designation</th>
                <th className="py-3.5 px-4 font-bold text-slate-300">Zone</th>
                <th className="py-3.5 px-4 font-bold text-slate-300">Official Email</th>
                <th className="py-3.5 px-4 font-bold text-slate-300">Mobile Contact</th>
                <th className="py-3.5 px-4 font-bold text-center text-slate-300">Status</th>
                <th className="py-3.5 px-4 font-bold text-right text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    Loading personnel records...
                  </td>
                </tr>
              ) : filteredOms.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No Office Managers match the criteria.
                  </td>
                </tr>
              ) : (
                filteredOms.map((om) => (
                  <tr key={om.id} className="hover:bg-indigo-950/15 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">{om.staffId}</td>
                    <td className="py-3.5 px-4 text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-indigo-300">
                          {om.name.charAt(0)}
                        </div>
                        <span>{om.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">{om.designation}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">{om.zone}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{om.email}</td>
                    <td className="py-3.5 px-4 text-slate-400">{om.mobile ?? "N/A"}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          om.status === "ACTIVE"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {om.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() =>
                          toggleStatusMutation.mutate({
                            id: om.id,
                            status: om.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
                          })
                        }
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-semibold text-indigo-400 hover:text-white hover:bg-indigo-600 transition"
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

      {/* Add OM Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-base">Register Office Manager</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOm} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Official Staff ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 592811"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohammad Tariqul Islam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TE, Jex"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Zone</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white"
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
                <label className="block text-slate-300 font-medium mb-1">Official Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="tariqul@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Mobile Contact</label>
                <input
                  type="text"
                  placeholder="+8801700000000"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl px-4 py-2 border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createOmMutation.isPending}
                  className="rounded-xl bg-indigo-600 px-5 py-2 font-bold text-white hover:bg-indigo-500 shadow-md transition"
                >
                  {createOmMutation.isPending ? "Registering..." : "Confirm OM Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
