import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPatient, fetchPatients } from "@/services/patientService";
import type { Patient } from "@/types/db/patient";

export function usePatients() {
  return useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });
}

export function useAddPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}
