import { create } from "zustand";
import { Rental, RentalFormData } from "../types/rental";
import {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  getAvailableRentals,
} from "../services/rentalService";
import { toast } from "react-toastify";

interface ReservationRental extends Partial<Rental> {
  id: number;
  name: string;
  pricePerHour: number;
}

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
