// my-pglite-worker.ts
import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";

worker({
  async init() {
    // This creates a persistent DB using IndexedDB
    return new PGlite("idb://patients");
  },
});
