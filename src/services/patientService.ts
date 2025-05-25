import { getDB } from "@/lib/db";
import type { Patient } from "@/types/db/patient";
import { broadcastChange } from "@/lib/sync";

export async function addPatient(patient: Patient) {
  const db = await getDB();
  const result = await db.query(
    "INSERT INTO patients (name, age, gender, contact) VALUES ($1, $2, $3, $4) RETURNING *;",
    [patient.name, patient.age, patient.gender, patient.contact]
  );
  const insertedPatient = result.rows[0];
  broadcastChange({ type: "patient-added", payload: insertedPatient });
  return insertedPatient; // also return for any other use
}

export async function fetchPatients(): Promise<Patient[]> {
  const db = await getDB();
  const result = await db.query("SELECT * FROM patients");
  return result.rows as Patient[];
}
