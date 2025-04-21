import { create } from "zustand";
import { Client } from "../types/client";
import {
  getAllClients,
  deleteClient,
  createClient,
  updateClient,
  getClientById,
} from "../services/clientService";
import { toast } from "react-toastify";

interface ClientStore {
  clients: Client[];
  selectedClient: Client | null;
  fetchClients: () => Promise<void>;
  fetchClientById: (id: number) => Promise<void>;
  createNewClient: (client: Omit<Client, "id" | "createdAt">) => Promise<void>;
  updateClientById: (
    id: number,
    client: Omit<Client, "id" | "createdAt">
  ) => Promise<void>;
  deleteClientById: (id: number) => Promise<void>;
  clearSelectedClient: () => void;
}

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: [],
  selectedClient: null,

  fetchClients: async () => {
    try {
      const data = await getAllClients();
      set({ clients: data });
    } catch {
      toast.error("Erro ao buscar clientes.");
    }
  },

  fetchClientById: async (id) => {
    try {
      const client = await getClientById(id);
      set({ selectedClient: client });
    } catch {
      toast.error("Erro ao buscar cliente.");
    }
  },

  createNewClient: async (clientData) => {
    try {
      await createClient(clientData);
      toast.success("Cliente cadastrado com sucesso!");
      await get().fetchClients();
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.error("Já existe um cliente com este CPF.");
      } else {
        toast.error("Erro ao cadastrar cliente.");
      }
    }
  },

  updateClientById: async (id, clientData) => {
    try {
      await updateClient(id, clientData);
      toast.success("Cliente atualizado com sucesso!");
      await get().fetchClients();
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.error("Já existe um cliente com este CPF.");
      } else {
        toast.error("Erro ao atualizar cliente.");
      }
    }
  },

  deleteClientById: async (id) => {
    try {
      await deleteClient(id);
      const updated = get().clients.filter((c) => c.id !== id);
      set({ clients: updated });
      toast.success("Cliente deletado com sucesso!");
    } catch (error: any) {
      if (error?.response?.status === 409) {
        toast.error(
          "Este cliente possui reservas associadas e não pode ser removido."
        );
      } else {
        toast.error("Erro ao deletar cliente.");
      }
    }
  },

  clearSelectedClient: () => set({ selectedClient: null }),
}));
