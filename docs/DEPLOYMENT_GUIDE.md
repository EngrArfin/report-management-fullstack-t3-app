# Deployment & Operations Guide
## Office Manager (OM) Weekly Report Management System

### 1. Prerequisites
- Node.js 20+ (Node 22 or 24 recommended)
- npm 10+ (or pnpm / yarn)
- SQLite (built-in, default) or PostgreSQL 14+ (for production)

---

### 2. Quick Local Start (Zero Config)

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Push Prisma database schema to local SQLite database
npm run db:push

# 3. Seed database with real OM users, targets, and September 2026 reports
node prisma/seed.js

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 3. Demo Roles & Instant Testing
Use the top-right **Role Switcher** in the navigation bar to immediately test:
- 👑 **Head Office Admin**: Full access to Target Console, OM Directory, Notification Engine, and Excel Export.
- 👤 **Md. Benajir Alam** (Staff ID: 572816 - Zone: D.M-01/Mitford)
- 👤 **Md. Jashim Uddin** (Staff ID: 451467 - Zone: Comilla)
- 👤 **Anath Chandra Pal** (Staff ID: 362578 - Zone: Cox's Bazar)

---

### 4. Production Deployment with PostgreSQL

#### Step A: Configure Environment
In your `.env` or cloud environment settings (e.g. Vercel, Railway, Render, VPS):
```env
DATABASE_URL="postgresql://username:password@db-host:5432/om_reporting_db?schema=public"
AUTH_SECRET="your-secure-random-32-byte-hex-secret"
NODE_ENV="production"
```

#### Step B: Update `prisma/schema.prisma`
Change provider to `postgresql`:
```prisma
datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}
```

#### Step C: Deploy Schema & Seed
```bash
npx prisma db push
node prisma/seed.js
```

#### Step D: Build & Start
```bash
npm run build
npm run start
```

---

### 5. Automated Friday 11:59 PM Scheduler Setup

To trigger the automatic missed-report notification check every week after Friday 11:59 PM:

#### Option A: Vercel Cron (`vercel.json`)
```json
{
  "crons": [
    {
      "path": "/api/cron/check-deadline",
      "schedule": "5 0 * * 6"
    }
  ]
}
```
*(Runs every Saturday at 00:05 AM UTC, right after Friday 11:59 PM).*

#### Option B: Linux Crontab / Windows Task Scheduler
```bash
# Run every Saturday at 00:05 AM
5 0 * * 6 curl -s "https://your-domain.com/api/cron/check-deadline" > /dev/null
```

