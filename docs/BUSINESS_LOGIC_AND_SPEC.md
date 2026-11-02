# Business Logic & Specification Mapping
## Comprehensive 59-Point Requirements Implementation Guide

This document specifies how each of the 59 business requirements is implemented in the codebase.

---

### Part 1: Users, Structure & Timing

#### 1. Project Overview & 2. Main Objective
- **Implementation**: The application implements the full pipeline:
  `OM Enter Once` → `ReportService.submitReport` → `DB Persisted` → `Calculated Summaries` → `Dashboard KPIs` → `Target Achievement` → `18-Column Excel` → `Notification Engine`.

#### 3. User Types & Permissions
- **OM (Office Manager)**: Can log in with Staff ID, submit their weekly reports, view past reports, update finding status, view summaries and all reports in read-only mode. Restricted from editing or deleting other OMs' reports.
- **Admin / Head Office**: Full system oversight, target setting, user management, email configuration, export, and status overrides.
- **Implementation**: Handled in `src/server/auth/config.ts` and `src/app/_components/Navbar.tsx` role switcher.

#### 4. OM Information
- **Fields**: `Staff ID`, `Name`, `Designation`, `Zone`, `Email`, `Mobile Number`, `Active / Inactive Status`.
- **Implementation**: Modeled in `prisma/schema.prisma` (`model User`), managed via `src/server/api/routers/om.ts` and `OmManagementView.tsx`.

#### 5. Monthly & Weekly Structure
- **Structure**: Each month consists of 4 weekly reports (`Week 1`, `Week 2`, `Week 3`, `Week 4`).
- **Database Model**: Each week's submission is stored as an independent record in `model WeeklyReport` with a composite unique constraint `@@unique([userId, year, month, week])`.

#### 6. Report Submission Deadline
- **Policy**: OMs can submit on any day of the week. The final deadline is **Friday 11:59:59 PM**.
- **Timing Logic**: Implemented in `src/server/services/deadlineService.ts`:
  - `getFridayDeadline(year, month, week)` dynamically calculates the exact Friday 23:59:59 for each week.
  - Submissions after Friday 11:59:59 PM are automatically marked as `LATE_SUBMITTED`.
  - Unsubmitted reports after Friday 11:59:59 PM are identified as `PENDING / OVERDUE`.

---

### Part 2: Core Activities & Data Rules

#### 9 & 10. Market Visit
- **Fields**:
  - `Market Visit Qty` (integer)
  - `Market Visit Finding Qty` (integer)
  - `Solved Qty` (integer)
  - `Pending / Not Solved Qty` (integer)
- **Validation Rule**:
  $$\text{Solved Qty} + \text{Pending Qty} = \text{Market Visit Finding Qty}$$
- **Implementation**: Enforced both on the client form in `SubmitReportModal.tsx` and on the server in `ReportService.validateReportInput()`.

#### 11. Market Visit Finding Status Update & Audit Trail
- **Feature**: As findings get resolved, OMs/Admin can update Solved and Pending quantities without changing the initial finding total unless authorized.
- **Audit Logging**: Recorded in `model FindingHistory` with:
  - `previousSolved`, `newSolved`, `previousPending`, `newPending`
  - `updatedById`, `updatedAt`, `remark`
- **Implementation**: Managed by `ReportService.updateFindingStatus()` and `FindingUpdateModal.tsx`.

#### 12. Location Tracking (LOC)
- **Fields**:
  - `LOC Submitted Qty` (integer)
  - `LOC Finding Day Qty` (float, supports decimal values such as 3.5 days, 0 days, 2 days)
- **Strict Rule**: **Strictly NO `LOC Visit Qty` field exists in the system.**
- **Implementation**: `WeeklyReport` model and form only expose `locSubmittedQty` and `locFindingDayQty`.

#### 13. Dress Code
- **Fields**: `Dress Code Qty`, `Dress Code Finding Qty`.
- **Implementation**: Captured in `WeeklyReport` model.

#### 14. Mess Visit
- **Fields**: `Mess Visit Qty`, `Mess Visit Finding Qty`.
- **Implementation**: Captured in `WeeklyReport` model.

#### 15. Zero Activity Rule
- **Rule**: If an OM had 0 activity in any category in a week, they can enter 0. No fake numbers required.
- **Implementation**: Form and backend validation accept 0 for any activity without error.

---

### Part 3: Aggregation, Tracking & Reporting

#### 17. Week-wise Summary Calculation
- **Rule**: Actual entered data from Week 1 to Week 4 is automatically added by the database query without requiring manual compilation.
- **Implementation**: `ReportService.getActivitySummary()` executes SQL aggregation via Prisma.

#### 18. Submission Tracking Table
- **Columns**: `Staff ID | Name | Zone | Week 1 | Week 2 | Week 3 | Week 4 | Total Submitted`
- **Status Badges**:
  - `Submitted` (Green badge)
  - `Late Submitted` (Amber badge)
  - `Pending` (Red/Orange badge)
  - `Upcoming` (Gray badge)
- **Implementation**: `ReportService.getSubmissionTracking()` and `SubmissionTrackingView.tsx`.

#### 19. Activity Summary Table
- **Columns**: `Staff ID | Name | Designation | Zone | Market Visit Qty | Market Finding | Solved | Pending | LOC Submitted Qty | LOC Finding Days | Dress Code Qty | Dress Finding | Mess Visit Qty | Mess Finding`.
- **Implementation**: `ActivitySummaryView.tsx` with dynamic period rollups.

#### 20 - 25. Period Summaries & Historical Preservation
- **Periods**: Current Week, All Weeks (Month), 3 Months, 6 Months, 1 Year, Custom Date Range (`From Date` - `To Date`).
- **Rule**: Historical data is never deleted and is permanently queryable.

---

### Part 4: Target Management & Achievement

#### 31 - 36. Target Configuration & Formulas
- **Target Activities**: LOC Submitted Target, Mess Visit Target, Dress Code Target.
- **Distribution**: Admin can set targets for a single OM or bulk apply to all active OMs.
- **Formula**:
  $$\text{Achievement \%} = \left( \frac{\text{Achieved Qty}}{\text{Target Qty}} \right) \times 100$$
- **Overall Achievement**: Average of LOC %, Mess %, and Dress Code %.
- **Preservation Rule (#39)**: `isLocked` flag locks approved monthly targets so subsequent edits do not unintentionally alter historical ratings.
- **Implementation**: `TargetService` in `src/server/services/targetService.ts` and `TargetManagementView.tsx`.

#### 37. Month-wise Achievement Comparison
- **Feature**: Compares performance between two months (e.g. August 2026 vs September 2026) with Net Trend delta ($\pm\%$).

#### 38. OM Performance Ranking
- **Feature**: Automatic leaderboard ranking (Rank 1, Rank 2, Rank 3...) sorted by Overall Achievement % descending.

---

### Part 5: Automatic Email Notification Engine

#### 40. Deadline Monitoring
- **Trigger**: Every Friday 11:59 PM.
- **Detection**: Queries all active OMs who do not have a report recorded for that week.

#### 41. Recipient Logic
- **To**: Responsible OM official email (automatically populated from `User.email`).
- **CC**: Senior Reporting Boss / Management (Admin-configured list).

#### 42 - 43. Admin Configuration & Template Engine
- **Fields**: Subject Template, HTML Body Template with tokens:
  `{OM_NAME}`, `{STAFF_ID}`, `{ZONE}`, `{MONTH_YEAR}`, `{WEEK}`, `{DEADLINE}`.
- **Switches**: Master Active/Inactive switch.

#### 44. Notification History & Anti-Duplicate Rule
- **Idempotency**: Before dispatching, system checks `model EmailNotificationLog` with unique constraint `@@unique([userId, year, month, week, emailType])`.
- If an alert was already logged for that missed week, it skips dispatch to prevent spamming.

---

### Part 6: Excel Export & Dashboard

#### 46 - 47. Excel Export
- **Export Format**: Standard 18 columns:
  1. Staff ID
  2. Name
  3. Designation
  4. Zone
  5. Month
  6. Week
  7. Market Visit Qty
  8. Market Finding
  9. Solved
  10. Pending
  11. LOC Submitted Qty
  12. LOC Finding Days
  13. Dress Code Qty
  14. Dress Code Finding
  15. Mess Visit Qty
  16. Mess Finding
  17. Submission Date
  18. Status
- **Endpoint**: `/api/export/excel` streams standard formatted CSV directly to the user's browser for instant opening in Microsoft Excel.

#### 48. Single Source of Truth
- Dashboard metrics and Excel export query the exact same Prisma database tables to ensure 100% data consistency.

