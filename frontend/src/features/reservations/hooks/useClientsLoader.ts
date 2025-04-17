import { useEffect } from "react";
import { useReservationStore } from "../store/reservationStore";

export const useClientsLoader = () => {
  const { clients, fetchClients } = useReservationStore();

  useEffect(() => {
    if (clients.length === 0) {
      fetchClients();
    }
  }, [clients.length, fetchClients]);
};
