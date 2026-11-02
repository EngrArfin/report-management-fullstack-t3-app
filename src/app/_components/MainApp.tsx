"use client";

import React from "react";
import { useApp } from "./AppContext";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { LandingPage } from "./LandingPage";
import { LoginModal } from "./LoginModal";
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
  const { isAuthenticated, showLanding, activeTab, isSidebarCollapsed } = useApp();

  // If not authenticated or showing landing page, render executive landing experience!
  if (!isAuthenticated || showLanding) {
    return (
      <>
        <LandingPage allUsers={allUsers} />
        <LoginModal allUsers={allUsers} />
      </>
    );
  }

  // Once authenticated, render full Enterprise Portal with Sidebar + Top Navbar!
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. Left Enterprise Collapsible Sidebar */}
      <Sidebar />

      {/* 2. Main Portal Container (offset by sidebar width) */}
      <div
        className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Top Navbar with quick actions, filters, search & persona switcher */}
        <TopNavbar allUsers={allUsers} allZones={allZones} />

        {/* Dynamic Operational Content View */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "tracking" && <SubmissionTrackingView />}
          {activeTab === "activity" && <ActivitySummaryView />}
          {activeTab === "target" && <TargetManagementView />}
          {activeTab === "export" && <ExcelExportView />}
          {activeTab === "oms" && <OmManagementView />}
          {activeTab === "notifications" && <NotificationView />}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
          Office Manager (OM) Weekly Report Management System • Enterprise Architecture • 2026
        </footer>
      </div>

      {/* Global Interactive Modals */}
      <SubmitReportModal />
      <FindingUpdateModal />
      <LoginModal allUsers={allUsers} />
    </div>
  );
}
