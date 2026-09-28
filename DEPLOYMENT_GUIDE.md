# ANTRIKSH Frontend Complete Deployment Guide

## 📦 Files Summary

All files are ready in `/home/claude/`. Copy them to your project in the correct locations below.

---

## 🎯 Step-by-Step Installation

### 1. **Create Directories (if they don't exist)**

```cmd
cd C:\Users\KRISHNA\.gemini\antigravity\scratch\sashakt-frontend
mkdir components
mkdir lib
mkdir app\procedures\[id]
mkdir app\telemetry
mkdir app\settings
```

---

### 2. **Copy API Client**

**From:** `lib-api.ts`  
**To:** `lib/api.ts`

This file exports all API methods for communicating with your Render backend.

---

### 3. **Copy Components**

Copy these files to the `components/` folder:

| File | Destination |
|------|-------------|
| `components-Header.tsx` | `components/Header.tsx` |
| `components-Navigation.tsx` | `components/Navigation.tsx` |
| `components-StatusBadge.tsx` | `components/StatusBadge.tsx` |
| `components-StatsDashboard.tsx` | `components/StatsDashboard.tsx` |
| `components-ActivityFeed.tsx` | `components/ActivityFeed.tsx` |

---

### 4. **Replace Layout**

**From:** `layout-root.tsx`  
**To:** `app/layout.tsx`

This adds the Header and Navigation to all pages.

---

### 5. **Replace Dashboard Page**

**From:** `page-dashboard.tsx`  
**To:** `app/page.tsx`

This is your home dashboard with stats and activity feed.

---

### 6. **Create Procedures Pages**

**From:** `page-procedures.tsx`  
**To:** `app/procedures/page.tsx`

List of all procedures.

**From:** `page-procedure-detail.tsx`  
**To:** `app/procedures/[id]/page.tsx`

Individual procedure detail page.

---

### 7. **Create Telemetry Page**

**From:** `page-telemetry.tsx`  
**To:** `app/telemetry/page.tsx`

System performance metrics and charts.

---

### 8. **Create Settings Page**

**From:** `page-settings.tsx`  
**To:** `app/settings/page.tsx`

System configuration and info.

---

## 📁 Final Project Structure

```
sashakt-frontend/
├── app/
│   ├── page.tsx              ← REPLACE with page-dashboard.tsx
│   ├── layout.tsx            ← REPLACE with layout-root.tsx
│   ├── globals.css           (keep existing)
│   ├── procedures/
│   │   ├── page.tsx          ← NEW: page-procedures.tsx
│   │   └── [id]/
│   │       └── page.tsx      ← NEW: page-procedure-detail.tsx
│   ├── telemetry/
│   │   └── page.tsx          ← NEW: page-telemetry.tsx
│   └── settings/
│       └── page.tsx          ← NEW: page-settings.tsx
│
├── components/
│   ├── Header.tsx            ← NEW
│   ├── Navigation.tsx        ← NEW
│   ├── StatusBadge.tsx       ← NEW
│   ├── StatsDashboard.tsx    ← NEW
│   └── ActivityFeed.tsx      ← NEW
│
├── lib/
│   └── api.ts                ← NEW
│
├── public/
├── node_modules/
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── vercel.json
├── .vercelignore
└── .gitignore
```

---

## 🚀 Deployment Steps

### 1. **Copy All Files**

Download all files from Claude and copy them to their respective locations above.

### 2. **Test Locally**

```cmd
cd C:\Users\KRISHNA\.gemini\antigravity\scratch\sashakt-frontend
npm run dev
```

Visit `http://localhost:3000` and test all pages:
- ✅ Dashboard (`/`)
- ✅ Procedures (`/procedures`)
- ✅ Telemetry (`/telemetry`)
- ✅ Settings (`/settings`)

### 3. **Commit and Push**

```cmd
git add .
git commit -m "Add complete ANTRIKSH dashboard components"
git push origin main
```

### 4. **Vercel Auto-Deploy**

Vercel will automatically detect the changes and deploy to:
**https://antriksh-sashakt.vercel.app**

Check progress at: https://vercel.com/dashboard

---

## 🔗 API Integration

All pages automatically connect to:

**Backend URL:** `https://antriksh-sashakt-8.onrender.com`

### Endpoints Used:
- `GET /health` — System health check
- `GET /api/procedures` — List of procedures
- `GET /api/procedures/:id` — Procedure details
- `GET /api/stats` — Dashboard statistics
- `GET /api/activity-log` — Activity feed
- `GET /api/telemetry` — Telemetry data

---

## ✨ Features

| Page | Features |
|------|----------|
| **Dashboard** | Real-time stats, activity feed, system status |
| **Procedures** | List of active/completed procedures, progress bars |
| **Procedure Detail** | Full procedure metrics, step-by-step progress |
| **Telemetry** | FPS, latency, CPU/memory usage, live charts |
| **Settings** | Theme, notifications, alert thresholds, system info |

---

## 🐛 Troubleshooting

### "Module not found" errors
- Make sure `lib/` folder exists
- Check file paths in imports (case-sensitive on Linux)
- Run `npm install` to ensure all dependencies are installed

### Pages not loading
- Check browser console (F12) for errors
- Verify backend is running: https://antriksh-sashakt-8.onrender.com/health
- Check `NEXT_PUBLIC_API_URL` in `vercel.json`

### Build failing on Vercel
- Ensure `.vercelignore` excludes Python files
- Check `vercel.json` has correct settings
- Push latest changes to GitHub

---

## 📞 Support

Backend API Documentation:
- GET /health
- GET /api/procedures
- GET /api/stats
- GET /api/activity-log
- GET /api/telemetry

All endpoints return JSON and support CORS from Vercel frontend.

---

**Deployment Time:** ~2 minutes after push  
**Status:** Ready to deploy! 🚀
