// app/lib/db.ts
"use client";

import { PGliteWorker } from "@electric-sql/pglite/worker";

let db: PGliteWorker | null = null;

export async function getDB(): Promise<PGliteWorker> {
  if (!db) {
    db = new PGliteWorker(
      new Worker(new URL("./my-pglite-worker", import.meta.url), {
        type: "module",
      })
    );

    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
        contact TEXT NOT NULL
      );
    `);
  }

  return db;
}
