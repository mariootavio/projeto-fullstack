import { create } from "zustand";
import { reservationService } from "../services/reservationService";
import { toast } from "react-toastify";
import { Reservation } from "../type/reservation";
import { Rental } from "../../rentals/types/Rental";

interface ReservationStore {
  reservations: Reservation[];
  selectedReservation: Reservation | null;
  availableRentals: Rental[];
  fetchReservations: () => Promise<void>;
  fetchReservationById: (id: number) => Promise<void>;
  createNewReservation: (data: Reservation) => Promise<void>;
  updateReservationById: (id: number, data: Reservation) => Promise<void>;
  deleteReservationById: (id: number) => Promise<void>;
  clearSelectedReservation: () => void;
}

export const useReservationStore = create<ReservationStore>((set) => ({
  reservations: [],
  selectedReservation: null,
  availableRentals: [],

  fetchReservations: async () => {
    try {
      const response = await reservationService.getAll();
      set({ reservations: response.data });
    } catch (error) {
      toast.error("Erro ao buscar reservas");
    }
  },

  fetchReservationById: async (id) => {
    try {
      const response = await reservationService.getById(id);
      set({ selectedReservation: response.data });
    } catch (error) {
      toast.error("Erro ao buscar reserva");
    }
  },

  createNewReservation: async (data) => {
    try {
      await reservationService.create(data);
      await useReservationStore.getState().fetchReservations();
      toast.success("Reserva criada com sucesso");
    } catch (error) {
      toast.error("Erro ao criar reserva");
    }
  },

  updateReservationById: async (id, data) => {
    try {
      await reservationService.update(id, data);
      await useReservationStore.getState().fetchReservations();
      toast.success("Reserva atualizada com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar reserva");
    }
  },

  deleteReservationById: async (id) => {
    try {
      await reservationService.delete(id);
      await useReservationStore.getState().fetchReservations();
      toast.success("Reserva removida com sucesso");
    } catch (error) {
      toast.error("Erro ao remover reserva");
    }
  },
  clearSelectedReservation: () => set({ selectedReservation: null }),
}));
