"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ActiveUser {
  id: string;
  staffId: string;
  name: string;
  designation: string;
  zone: string;
  email: string;
  role: "ADMIN" | "OM";
}

interface AppContextType {
  activeUser: ActiveUser;
  setActiveUser: (user: ActiveUser) => void;
  // Auth & Portal state
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  showLanding: boolean;
  setShowLanding: (show: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  handleLogin: (user: ActiveUser) => void;
  handleLogout: () => void;
  // Navigation & Layout
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  // Global Filters
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedWeek: number | "all";
  setSelectedWeek: (week: number | "all") => void;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  // Modals
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;
  selectedReportForFinding: string | null;
  setSelectedReportForFinding: (reportId: string | null) => void;
  // Toast notifications
  toast: { message: string; type: "success" | "error" | "info" } | null;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

// Default initial user (Admin)
const defaultAdmin: ActiveUser = {
  id: "admin-seed-id",
  staffId: "ADMIN001",
  name: "Head Office Admin",
  designation: "Operations Head",
  zone: "Head Office",
  email: "admin@company.com",
  role: "ADMIN",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({
  children,
  initialUsers,
}: {
  children: React.ReactNode;
  initialUsers?: ActiveUser[];
}) {
  const [activeUser, setActiveUser] = useState<ActiveUser>(
    initialUsers?.[0] ?? defaultAdmin
  );

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLanding, setShowLanding] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Layout & Navigation Tab
  const [activeTab, setActiveTabState] = useState<string>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Global filters
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // September 2026
  const [selectedWeek, setSelectedWeek] = useState<number | "all">("all");
  const [selectedZone, setSelectedZone] = useState<string>("ALL");

  // Submissions & Findings Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [selectedReportForFinding, setSelectedReportForFinding] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Hydrate session & routing from localStorage / URL hash on mount
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("om_auth");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
        const storedUser = localStorage.getItem("om_user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser) as ActiveUser;
          if (parsed?.id && parsed?.staffId) {
            setActiveUser(parsed);
          }
        }
      }

      // Sync active tab from URL hash (e.g. #settings, #tracking) or localStorage
      const hash = window.location.hash.replace("#", "").trim();
      const validTabs = ["dashboard", "tracking", "activity", "target", "export", "oms", "notifications", "settings"];
      if (hash && validTabs.includes(hash)) {
        setActiveTabState(hash);
      } else {
        const storedTab = localStorage.getItem("om_tab");
        if (storedTab && validTabs.includes(storedTab)) {
          setActiveTabState(storedTab);
        }
      }
    } catch {
      // Ignore localStorage access errors in private browsing
    }
  }, []);

  // Set active tab with URL hash and storage persistence
  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    try {
      localStorage.setItem("om_tab", tab);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${tab}`);
      }
    } catch {
      // Ignore
    }
  };

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = (user: ActiveUser) => {
    setActiveUser(user);
    setIsAuthenticated(true);
    setShowLanding(false);
    setIsLoginModalOpen(false);
    try {
      localStorage.setItem("om_auth", "true");
      localStorage.setItem("om_user", JSON.stringify(user));
    } catch {
      // Ignore
    }
    showToast(`Welcome back, ${user.name}! (${user.role} - ${user.zone})`, "success");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLanding(false);
    try {
      localStorage.removeItem("om_auth");
      localStorage.removeItem("om_user");
      localStorage.removeItem("om_tab");
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch {
      // Ignore
    }
    showToast("You have been signed out successfully.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        activeUser,
        setActiveUser,
        isAuthenticated,
        setIsAuthenticated,
        showLanding,
        setShowLanding,
        isLoginModalOpen,
        setIsLoginModalOpen,
        handleLogin,
        handleLogout,
        activeTab,
        setActiveTab,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        selectedYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth,
        selectedWeek,
        setSelectedWeek,
        selectedZone,
        setSelectedZone,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        selectedReportForFinding,
        setSelectedReportForFinding,
        toast,
        showToast,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-slate-700/80 bg-slate-900/95 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              toast.type === "success"
                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                : toast.type === "error"
                ? "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]"
                : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
            }`}
          />
          <span className="font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-3 text-slate-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
