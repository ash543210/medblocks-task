"use client";

import { useState } from "react";
import type { Patient } from "@/types/db/patient";
import { useAddPatient } from "@/hooks/usePatients";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function PatientForm() {
  const [formData, setFormData] = useState<Patient>({
    name: "",
    age: 0,
    gender: "Male",
    contact: "",
  });

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const { mutate: registerPatient, isPending } = useAddPatient();

  const handleSuccess = () => {
    setSnackbar({
      open: true,
      message: "✅ Patient registered successfully!",
      severity: "success",
    });
    setFormData({ name: "", age: 0, gender: "Male", contact: "" });
  };

  const handleError = () => {
    setSnackbar({
      open: true,
      message: "❌ Failed to register patient.",
      severity: "error",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerPatient(formData, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
    registerPatient(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          Register Patient
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          required
          className="w-full p-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter age"
          required
          className="w-full p-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Enter contact details"
          required
          className="w-full p-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
