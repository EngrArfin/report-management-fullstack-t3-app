# Office Manager (OM) Weekly Report Management System

An automated, centralized weekly activity reporting, monitoring, summary, target achievement, and email notification web platform built with **Next.js 15 (App Router)**, **TypeScript**, **tRPC v11**, **Prisma ORM**, **Tailwind CSS v4**, and **SQLite / PostgreSQL**.

---

## 🚀 Key Highlights & Capabilities

1. **Enter Once, Auto-Calculate Everything**:
   - Office Managers (OM) input weekly numbers once.
   - Summaries, KPIs, target achievement percentages, and Excel export files are computed automatically in real time.
2. **4 Core Weekly Activities**:
   - **Market Visit**: Visits, Findings, Solved, Pending (Enforces $\text{Solved} + \text{Pending} = \text{Finding}$).
   - **Location Tracking (LOC)**: Submitted Qty & Finding Day Qty (Supports decimal e.g. 3.5 days; strictly NO LOC Visit field).
   - **Dress Code**: Qty & Findings.
   - **Mess Visit**: Qty & Findings.
   - **Zero Activity Rule**: Submitting 0 for any activity is completely valid.
3. **Submission Tracking Matrix**:
   - Week 1 to Week 4 status tracking (`Submitted`, `Late Submitted`, `Pending`, `Upcoming`).
   - Friday 11:59 PM deadline enforcement.
4. **Target vs Achievement Module**:
   - Admin sets monthly targets (LOC, Mess Visit, Dress Code).
   - Automatically computes achievement percentages and ranks OMs on a leaderboard.
   - Month-over-month performance comparison (e.g. August vs September).
5. **Finding Status Follow-up & Audit Trail**:
   - Allows status updates (Solved/Pending) as issues are addressed in the field.
   - Preserves complete historical audit trail with previous vs new numbers, updater ID, timestamp, and notes.
6. **Automatic Email Notification Engine**:
   - Evaluates missed reports after Friday 11:59 PM.
   - Sends email directly to responsible OM (`To`), while copying senior reporting managers (`CC`).
   - Prevents duplicate email dispatches via dedicated notification logging.
7. **18-Column Formatted Excel Export**:
   - Pre-filtered 1-click download of all reporting records directly in Excel-compatible CSV format.

---

## 📁 System Architecture & Documentation

All technical documentation is stored in the [`docs/`](./docs) folder:
- 📖 [**Architecture & Design Blueprint**](./docs/ARCHITECTURE_AND_DESIGN.md)
- 📋 [**59-Point Business Logic Mapping**](./docs/BUSINESS_LOGIC_AND_SPEC.md)
- 🗄️ [**Database Schema & ERD**](./docs/DATABASE_SCHEMA.md)
- 🔌 [**API & tRPC Documentation**](./docs/API_DOCUMENTATION.md)
- 🚢 [**Deployment Guide**](./docs/DEPLOYMENT_GUIDE.md)

---

## ⚡ Quick Start

```bash
# 1. Push database schema to local SQLite database
npm run db:push

# 2. Seed database with real OMs, zones, targets, and September 2026 reports
node prisma/seed.js

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live dashboard and use the top-right **Role Switcher** to test both **Head Office Admin** and **Office Manager** user roles.
