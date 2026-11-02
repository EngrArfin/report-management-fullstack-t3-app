"use client";

import React from "react";
import { useApp } from "./AppContext";
import { Navbar } from "./Navbar";
import { DashboardView } from "./DashboardView";
import { SubmissionTrackingView } from "./SubmissionTrackingView";
import { ActivitySummaryView } from "./ActivitySummaryView";
import { TargetManagementView } from "./TargetManagementView";
import { OmManagementView } from "./OmManagementView";
import { NotificationView } from "./NotificationView";
import { ExcelExportView } from "./ExcelExportView";
import { SubmitReportModal } from "./SubmitReportModal";
import { FindingUpdateModal } from "./FindingUpdateModal";
import type { ActiveUser } from "./AppContext";

interface MainAppProps {
  allUsers: ActiveUser[];
  allZones: { id: string; name: string }[];
}

export function MainApp({ allUsers, allZones }: MainAppProps) {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar allUsers={allUsers} allZones={allZones} />

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "tracking" && <SubmissionTrackingView />}
        {activeTab === "activity" && <ActivitySummaryView />}
        {activeTab === "target" && <TargetManagementView />}
        {activeTab === "export" && <ExcelExportView />}
        {activeTab === "oms" && <OmManagementView />}
        {activeTab === "notifications" && <NotificationView />}
      </main>

      {/* Global Interactive Modals */}
      <SubmitReportModal />
      <FindingUpdateModal />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Office Manager (OM) Weekly Report Management System • Enterprise Production Architecture • 2026
      </footer>
    </div>
  );
}

