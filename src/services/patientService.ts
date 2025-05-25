import { getDB } from "@/lib/db";
import type { Patient } from "@/types/db/patient";

export async function addPatient(patient: Patient) {
  const db = await getDB();
  await db.query(
    "INSERT INTO patients (name, age, gender, contact) VALUES ($1, $2, $3, $4);",
    [patient.name, patient.age, patient.gender, patient.contact]
  );
}

export async function fetchPatients(): Promise<Patient[]> {
  const db = await getDB();
  const result = await db.query("SELECT * FROM patients");
  return result.rows as Patient[];
}
