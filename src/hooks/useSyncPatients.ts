import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { listenToChanges } from "@/lib/sync";
import type { Patient } from "@/types/db/patient";

export function useSyncPatients() {
  const queryClient = useQueryClient();

  useEffect(() => {
    listenToChanges((message) => {
      if (message.type === "patient-added" && message.payload) {
        const newPatient = message.payload as Patient;
        console.log(newPatient);
        // queryClient.setQueryData<Patient[]>(["patients"], (oldData = []) => {
        //   // Append new patient if not exists to avoid duplicates
        //   if (!oldData.find((p) => p.id === newPatient.id)) {
        //     console.log(newPatient);
        //     return [...oldData, newPatient];
        //   }
        //   return oldData;
        // });
        queryClient.invalidateQueries({ queryKey: ["patients"], refetchType: "active" });
      }
    });
  }, [queryClient]);
}
