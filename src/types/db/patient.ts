export interface Patient {
  id?: number;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  contact: string;
}
