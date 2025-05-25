"use client";

import { PGlite } from "@electric-sql/pglite";

let db: PGlite | null = null;

export async function getDB(): Promise<PGlite> {
  if (!db) {
    // Use IndexedDB for persistence in the browser
    db = new PGlite("idb://patients");

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
