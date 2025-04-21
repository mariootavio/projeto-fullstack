import { useEffect } from "react";
import { useClientStore } from "../../clients/store/clientStore";

export const useClientsLoader = () => {
  const { clients, fetchClients } = useClientStore();

  useEffect(() => {
    if (clients.length === 0) {
      fetchClients();
    }
  }, [clients.length, fetchClients]);
};
