"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePatients } from "@/hooks/usePatients";
import { CircularProgress } from "@mui/material";

export default function PatientsPage() {
  const { data, isLoading, isError } = usePatients();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "contact", headerName: "Contact", flex: 1 },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load patients.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        All Patients
      </h2>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={data || []}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
        />
      </div>
    </div>
  );
}
