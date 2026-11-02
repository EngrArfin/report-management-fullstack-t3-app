# API Documentation & Procedure Catalog
## Office Manager (OM) Weekly Report Management System

### 1. Overview
The backend exposes type-safe RPC procedures via **tRPC v11** along with specialized HTTP endpoints for file streaming and automated cron scheduling.

---

### 2. tRPC Router Directory (`src/server/api/routers/`)

#### A. `report` Router (`src/server/api/routers/report.ts`)
| Procedure | Type | Input Schema | Description |
| :--- | :--- | :--- | :--- |
| `submit` | Mutation | `{ userId, year, month, week, marketVisitQty, marketVisitFindingQty, solvedQty, pendingQty, locSubmittedQty, locFindingDayQty, dressCodeQty, dressCodeFindingQty, messVisitQty, messVisitFindingQty, notes? }` | Validates `solved + pending == finding` and saves the weekly report. Automatically assigns `SUBMITTED` or `LATE_SUBMITTED` based on Friday 11:59 PM deadline. |
| `updateFindingStatus` | Mutation | `{ reportId, updatedById, newSolved, newPending, remark? }` | Updates Solved and Pending quantities on an existing report and logs audit entry to `FindingHistory`. |
| `getSubmissionTracking` | Query | `{ year, month, zone? }` | Generates the Month x Week 1..4 matrix table with status badges (`SUBMITTED`, `LATE_SUBMITTED`, `PENDING`, `NOT_YET_DUE`). |
| `getActivitySummary` | Query | `{ year?, month?, week?, userId?, zone?, period?, fromDate?, toDate? }` | Multi-dimensional activity rollup with support for 1 Month, 3 Months, 6 Months, 1 Year, or Custom Date Ranges. |
| `getReportById` | Query | `{ id }` | Returns a single report with user metadata and finding status audit history. |
| `getReportsByOm` | Query | `{ userId, year?, month? }` | Returns reports submitted by a specific Office Manager. |

---

#### B. `target` Router (`src/server/api/routers/target.ts`)
| Procedure | Type | Input Schema | Description |
| :--- | :--- | :--- | :--- |
| `setTargets` | Mutation | `{ userIds: string[], year, month, locTarget, messVisitTarget, dressCodeTarget, isLocked? }` | Admin sets monthly quotas for a single OM or bulk applies to multiple OMs. |
| `getMonthlyAchievement` | Query | `{ year, month, zone? }` | Calculates Target vs Achievement percentages for LOC, Mess Visit, Dress Code, Overall %, and generates ranked leaderboard. |
| `compareMonths` | Query | `{ year1, month1, year2, month2, userId? }` | Compares target achievement between two months with Net Trend delta calculation ($\pm\%$). |
| `toggleLock` | Mutation | `{ targetId, isLocked }` | Locks or unlocks a monthly target to preserve historical integrity. |

---

#### C. `om` Router (`src/server/api/routers/om.ts`)
| Procedure | Type | Input Schema | Description |
| :--- | :--- | :--- | :--- |
| `getAll` | Query | `{ zone?, status? }?` | Retrieves list of Office Managers. |
| `getZones` | Query | `void` | Returns active zones list. |
| `create` | Mutation | `{ staffId, name, designation, zone, email, mobile? }` | Registers a new OM. |
| `update` | Mutation | `{ id, name, designation, zone, email, mobile?, status }` | Modifies OM details. |
| `toggleStatus` | Mutation | `{ id, status: "ACTIVE" \| "INACTIVE" }` | Activates or deactivates an OM. |
| `createZone` | Mutation | `{ name, code? }` | Adds a new operating zone. |

---

#### D. `dashboard` Router (`src/server/api/routers/dashboard.ts`)
| Procedure | Type | Input Schema | Description |
| :--- | :--- | :--- | :--- |
| `getMetrics` | Query | `{ year, month, week: number \| "all", zone?, period?, fromDate?, toDate? }` | Returns comprehensive Section 1 to 5 metrics: Submission KPIs, Activity Breakdown, Target Gauges, OM-wise performance, and Weekly Trends. |

---

#### E. `notification` Router (`src/server/api/routers/notification.ts`)
| Procedure | Type | Input Schema | Description |
| :--- | :--- | :--- | :--- |
| `getConfig` | Query | `void` | Retrieves email subject template, body template, and CC recipient lists. |
| `updateConfig` | Mutation | `{ subjectTemplate, bodyTemplate, ccRecipients, bccRecipients?, isActive }` | Updates notification rules. |
| `getLogs` | Query | `{ year?, month? }?` | Returns notification audit trail to verify sent emails. |
| `triggerDeadlineCheck` | Mutation | `{ year, month, week }` | Evaluates missed submissions for Friday 11:59 PM and dispatches notices without duplicates. |

---

#### F. `export` Router (`src/server/api/routers/export.ts`)
| Procedure | Type | Input Schema | Description |
| :--- | :--- | :--- | :--- |
| `getData` | Query | `{ year?, month?, week?, userId?, zone?, status?, fromDate?, toDate? }` | Prepares dataset with the exact 18 columns specified in Requirement #47. |
| `getCsv` | Query | (same as getData) | Formats dataset as standard RFC 4180 CSV string. |

---

### 3. HTTP Endpoints

#### 1. Excel File Download Endpoint
- **URL**: `GET /api/export/excel`
- **Query Parameters**:
  - `year`: e.g. `2026`
  - `month`: e.g. `9`
  - `week`: `all` or `1`, `2`, `3`, `4`
  - `zone`: e.g. `D.M-01/Mitford` or `ALL`
  - `status`: `SUBMITTED`, `LATE_SUBMITTED`, or `ALL`
- **Response**: Streams `text/csv; charset=utf-8` with header `Content-Disposition: attachment; filename="OM_Report_September_2026_AllWeeks.csv"`.
- **Excel Compatibility**: Native support in Microsoft Excel, Google Sheets, and LibreOffice.

#### 2. Automated Deadline Scheduler Webhook
- **URL**: `GET /api/cron/check-deadline?year=2026&month=9&week=1`
- **Response**: JSON report with number of missed OMs detected, notifications dispatched, and idempotency status.

