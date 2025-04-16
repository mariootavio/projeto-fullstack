import { create } from "zustand";
import { Rental, RentalFormData } from "../types/rental";
import {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
} from "../services/rentalService";
import { toast } from "react-toastify";

interface RentalStore {
  rentals: Rental[];
  selectedRental: Rental | null;
  fetchRentals: () => Promise<void>;
  fetchRentalById: (id: number) => Promise<void>;
  createNewRental: (data: RentalFormData) => Promise<void>;
  updateRentalById: (id: number, data: RentalFormData) => Promise<void>;
  deleteRentalById: (id: number) => Promise<void>;
  clearSelectedRental: () => void;
}

export const useRentalStore = create<RentalStore>((set, get) => ({
  rentals: [],
  selectedRental: null,

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
    await createRental(data);
    toast.success("Locação criada com sucesso!");
    get().fetchRentals();
  },

  updateRentalById: async (id, data) => {
    await updateRental(id, data);
    toast.success("Locação atualizada com sucesso!");
    get().fetchRentals();
  },

  deleteRentalById: async (id) => {
    await deleteRental(id);
    set({
      rentals: get().rentals.filter((r) => r.id !== id),
    });
    toast.success("Locação removida!");
  },

  clearSelectedRental: () => set({ selectedRental: null }),
}));
