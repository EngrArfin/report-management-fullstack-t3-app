"use client";

import React from "react";
import { useApp } from "./AppContext";
import {
  IconDashboard,
  IconTracking,
  IconTable,
  IconTarget,
  IconDownload,
  IconUsers,
  IconMail,
  IconChevronLeft,
  IconChevronRight,
  IconLogout,
} from "./Icons";

interface NavItem {
  id: string;
  label: string;
  icon: (props: { className?: string }) => React.JSX.Element;
  badge?: string;
}

interface NavGroup {
  group: string;
  adminOnly?: boolean;
  items: NavItem[];
}

export function Sidebar() {
  const {
    activeUser,
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    handleLogout,
  } = useApp();

  const navigationGroups: NavGroup[] = [
    {
      group: "Core Operations",
      items: [
        { id: "dashboard", label: "Executive Dashboard", icon: IconDashboard },
        { id: "tracking", label: "Submission Tracking", icon: IconTracking, badge: "Week 1-4" },
      ],
    },
    {
      group: "Analytics & Performance",
      items: [
        { id: "activity", label: "Activity Summary", icon: IconTable },
        { id: "target", label: "Target vs Achievement", icon: IconTarget, badge: "Leaderboard" },
        { id: "export", label: "Excel Export Center", icon: IconDownload },
      ],
    },
    {
      group: "Administration & Rules",
      adminOnly: true,
      items: [
        { id: "oms", label: "OM Directory & Roster", icon: IconUsers },
        { id: "notifications", label: "Automated Email Alerts", icon: IconMail },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in cursor-pointer"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-slate-800/80 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div
          className={`flex h-16 items-center border-b border-slate-800/80 px-4 ${
            isSidebarCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 text-white font-extrabold shadow-lg shadow-indigo-500/20">
              OM
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-extrabold tracking-tight text-white">
                  Report Portal
                </span>
                <span className="text-[10px] font-medium text-indigo-400">
                  Head Office Operations
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          {!isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              className="hidden rounded-xl border border-slate-800 bg-slate-900/90 p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:flex transition shadow-sm cursor-pointer"
              title="Collapse Sidebar"
            >
              <IconChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* If collapsed, show expand button below logo */}
        {isSidebarCollapsed && (
          <div className="hidden lg:flex justify-center py-2 border-b border-slate-800/60">
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="rounded-xl border border-slate-800 bg-slate-900/90 p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition shadow-sm cursor-pointer"
              title="Expand Sidebar"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navigationGroups.map((grp) => {
            if (grp.adminOnly && activeUser.role !== "ADMIN") return null;
            return (
              <div key={grp.group} className="space-y-1">
                {!isSidebarCollapsed && (
                  <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {grp.group}
                  </div>
                )}
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? "bg-indigo-600/15 text-indigo-300 font-bold border border-indigo-500/30 shadow-sm"
                          : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                      }`}
                      title={item.label}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Icon
                          className={`h-4 w-4 shrink-0 transition ${
                            isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"
                          }`}
                        />
                        {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!isSidebarCollapsed && item.badge && (
                        <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[9px] font-bold text-indigo-400 border border-indigo-500/20">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* User Card & Logout Footer */}
        <div className="border-t border-slate-800/80 p-3 bg-slate-950/80">
          <div
            className={`flex items-center justify-between rounded-xl bg-slate-900/80 p-2.5 border border-slate-800/60 ${
              isSidebarCollapsed ? "flex-col gap-2" : ""
            }`}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-xs font-bold text-indigo-300">
                {activeUser.name.charAt(0)}
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-col overflow-hidden text-left">
                  <span className="truncate text-xs font-bold text-white">{activeUser.name}</span>
                  <span className="truncate text-[10px] text-slate-400">
                    {activeUser.role} • {activeUser.zone}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition cursor-pointer"
              title="Sign Out / Change User"
            >
              <IconLogout className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
