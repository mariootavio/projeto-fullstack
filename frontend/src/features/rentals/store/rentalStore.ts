import { create } from "zustand";
import { Rental, RentalFormData } from "../types/Rental";
import {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  getAvailableRentals,
} from "../services/rentalService";
import { toast } from "react-toastify";

interface RentalStore {
  rentals: Rental[];
  selectedRental: Rental | null;
  availableRentals: Rental[];
  fetchRentals: () => Promise<void>;
  fetchRentalById: (id: number) => Promise<void>;
  createNewRental: (data: RentalFormData) => Promise<void>;
  updateRentalById: (id: number, data: RentalFormData) => Promise<void>;
  deleteRentalById: (id: number) => Promise<void>;
  fetchAvailableRentals: (start: string, end: string) => Promise<void>;
  clearSelectedRental: () => void;
  getAllRentals: () => Promise<Rental[]>;
  set: (fn: (state: RentalStore) => Partial<RentalStore>) => void;
}

export const useRentalStore = create<RentalStore>((set, get) => ({
  rentals: [],
  selectedRental: null,
  availableRentals: [],

  fetchRentals: async () => {
    try {
      const data = await getAllRentals();
      set({ rentals: data });
    } catch {
      toast.error("Erro ao buscar locações.");
    }
  },

  fetchRentalById: async (id) => {
    try {
      const rental = await getRentalById(id);
      set({ selectedRental: rental });
    } catch {
      toast.error("Erro ao buscar locação.");
    }
  },

  createNewRental: async (data) => {
    try {
      await createRental(data);
      toast.success("Locação criada com sucesso!");
      await get().fetchRentals();
    } catch {
      toast.error("Erro ao criar locação.");
    }
  },

  updateRentalById: async (id, data) => {
    try {
      await updateRental(id, data);
      toast.success("Locação atualizada com sucesso!");
      await get().fetchRentals();
    } catch {
      toast.error("Erro ao atualizar locação.");
    }
  },

  deleteRentalById: async (id) => {
    try {
      await deleteRental(id);
      set({
        rentals: get().rentals.filter((r) => r.id !== id),
      });
      toast.success("Locação removida!");
    } catch (error: any) {
      if (error?.response?.status === 409) {
        toast.error(
          "Esta locação está associada a uma reserva e não pode ser removida."
        );
      } else {
        toast.error("Erro ao remover locação.");
      }
    }
  },

  fetchAvailableRentals: async (start, end) => {
    try {
      const data = await getAvailableRentals(start, end);
      set({ availableRentals: data });
    } catch {
      toast.error("Erro ao buscar locações disponíveis.");
    }
  },

  clearSelectedRental: () => set({ selectedRental: null }),

  getAllRentals: async () => {
    try {
      const data = await getAllRentals();
      return data;
    } catch {
      toast.error("Erro ao buscar todas as locações.");
      return [];
    }
  },

  set: (fn) => set((state) => fn(state)),
}));
