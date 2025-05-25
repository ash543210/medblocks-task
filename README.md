# 🩺 Patient Management App

A Next.js 14 application for managing patients using a local **PGlite** (SQLite in the browser) database with support for **multi-tab synchronization**, **React Query** for data caching, and **MUI DataGrid** for tabular UI.

---

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PGlite](https://electric-sql.com/docs/pglite) for in-browser persistent SQLite
- [React Query](https://tanstack.com/query/latest) for client-side data management
- [MUI DataGrid](https://mui.com/x/react-data-grid/) for advanced table features
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/patient-management-app.git
cd patient-management-app
```

## Install dependencies

pnpm install

# or

npm install

# or

yarn install

## Start the development server

pnpm dev

# or

npm run dev

# or

yarn dev

## Project Structure

src/
│
├── app/ # Next.js app routes
│ └── page.tsx # Home route
│
├── components/ # Shared components
│
├── lib/
│ ├── db.ts # PGlite database setup
│ ├── sync.ts # BroadcastChannel sync logic
│ └── workers/ # Web Worker file for PGlite
│
├── hooks/
│ └── useSyncPatients.ts # Hook for syncing patients
│
├── types/
│ └── db/ # Type declarations
│ └── patient.ts
│
└── styles/ # Global styles
