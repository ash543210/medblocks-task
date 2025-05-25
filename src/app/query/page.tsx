"use client";

import { useState } from "react";
import { getDB } from "@/lib/db";
import {
  Button,
  TextareaAutosize,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Alert,
} from "@mui/material";

export default function QueryPage() {
  const [query, setQuery] = useState("SELECT * FROM patients;");
  const [results, setResults] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleQuery = async () => {
    setError("");
    try {
      const db = await getDB();
      const result = await db.query(query);

      const { rows, fields } = result;

      if (Array.isArray(rows) && rows.length > 0) {
        setColumns(fields.map((f: any) => f.name));
        setResults(rows);
      } else {
        setColumns([]);
        setResults([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to run query.");
      setResults(null);
      setColumns([]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Run SQL Query
      </Typography>

      <TextareaAutosize
        minRows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 text-gray-800 rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your SQL query here..."
      />

      <Button
        onClick={handleQuery}
        variant="contained"
        color="primary"
        className="self-start normal-case"
        style={{marginBottom: '1rem'}}>
        Run Query
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {results && results.length > 0 && (
        <TableContainer component={Paper} className="rounded-lg">
          <Table size="small">
            <TableHead>
              <TableRow className="bg-gray-100">
                {columns.map((col) => (
                  <TableCell
                    key={col}
                    className="font-semibold text-gray-800 capitalize">
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col + i} className="text-gray-700">
                      {String(row[col])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {results && results.length === 0 && (
        <Typography variant="body2" className="text-gray-600">
          No rows returned.
        </Typography>
      )}
    </div>
  );
}
