# Database Schema & Entity Relationship Documentation
## Office Manager (OM) Weekly Report Management System

### 1. Entity-Relationship Overview

```mermaid
erDiagram
    User ||--o{ WeeklyReport : "submits"
    User ||--o{ MonthlyTarget : "receives"
    User ||--o{ FindingHistory : "audits"
    User ||--o{ EmailNotificationLog : "receives alerts"
    WeeklyReport ||--o{ FindingHistory : "tracks status changes"

    User {
        String id PK
        String staffId UK
        String name
        String designation
        String zone
        String email UK
        String mobile
        String role
        String status
        DateTime createdAt
        DateTime updatedAt
    }

    Zone {
        String id PK
        String name UK
        String code
        Boolean isActive
        DateTime createdAt
    }

    WeeklyReport {
        String id PK
        String userId FK
        String monthYear
        Int year
        Int month
        Int week
        Int marketVisitQty
        Int marketVisitFindingQty
        Int solvedQty
        Int pendingQty
        Int locSubmittedQty
        Float locFindingDayQty
        Int dressCodeQty
        Int dressCodeFindingQty
        Int messVisitQty
        Int messVisitFindingQty
        String status
        DateTime deadline
        DateTime submittedAt
        DateTime updatedAt
        String notes
    }

    FindingHistory {
        String id PK
        String reportId FK
        String updatedById FK
        Int previousSolved
        Int newSolved
        Int previousPending
        Int newPending
        String remark
        DateTime createdAt
    }

    MonthlyTarget {
        String id PK
        String userId FK
        Int year
        Int month
        String monthYear
        Int locTarget
        Int messVisitTarget
        Int dressCodeTarget
        Boolean isLocked
        DateTime createdAt
        DateTime updatedAt
    }

    EmailNotificationConfig {
        String id PK
        String code UK
        String name
        String description
        String subjectTemplate
        String bodyTemplate
        String ccRecipients
        String bccRecipients
        Boolean isActive
        DateTime updatedAt
    }

    EmailNotificationLog {
        String id PK
        String userId FK
        Int year
        Int month
        Int week
        String emailType
        String toEmail
        String ccEmails
        String subject
        String status
        DateTime sentAt
        String errorMessage
    }
```

---

### 2. Table Specifications & Indexes

#### 1. `User`
- **Purpose**: Personnel directory for Office Managers (OM) and Head Office Administrators.
- **Constraints & Indexes**:
  - `staffId`: `@unique`
  - `email`: `@unique`
  - `@@index([zone])`
  - `@@index([status])`
  - `@@index([role])`

#### 2. `WeeklyReport`
- **Purpose**: Stores weekly activity report submissions.
- **Key Composite Constraint**:
  - `@@unique([userId, year, month, week])` — Guarantees that each OM has exactly one report record per week.
- **Indexes**:
  - `@@index([year, month, week])` — Optimized for monthly matrix and dashboard rollup queries.
  - `@@index([userId])` — Fast lookups for OM personal report views.
  - `@@index([status])` — Fast filtering of `SUBMITTED`, `LATE_SUBMITTED`, `PENDING`.

#### 3. `FindingHistory`
- **Purpose**: Audit trail for Market Visit Finding status resolution follow-ups.
- **Relations**:
  - References `WeeklyReport(id)` with `onDelete: Cascade`.
  - References `User(id)` as `updatedBy`.

#### 4. `MonthlyTarget`
- **Purpose**: Monthly quotas set by Admin for LOC, Mess Visit, and Dress Code.
- **Key Composite Constraint**:
  - `@@unique([userId, year, month])` — Exactly one target profile per OM per month.
- **Flag**: `isLocked: Boolean` protects historical monthly ratings against unauthorized retrospective modification.

#### 5. `EmailNotificationLog`
- **Purpose**: Prevents duplicate email notifications when the Friday 11:59 PM deadline scheduler runs.
- **Key Composite Constraint**:
  - `@@unique([userId, year, month, week, emailType])` — Strict idempotency guarantee.

---

### 3. Database Switch: SQLite (Local) vs PostgreSQL (Production)
The Prisma configuration is 100% standard SQL and can switch between SQLite and PostgreSQL simply by toggling the provider:

```prisma
// For SQLite (Zero config, local development):
datasource db {
    provider = "sqlite"
    url      = env("DATABASE_URL") // "file:./dev.db"
}

// For PostgreSQL (Production):
// datasource db {
//     provider = "postgresql"
//     url      = env("DATABASE_URL") // "postgresql://user:pass@host:5432/dbname"
// }
```

