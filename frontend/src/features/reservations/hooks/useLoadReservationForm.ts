import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useReservationStore } from "../store/reservationStore";
import { useRentalStore } from "../../rentals/store/rentalStore";
import { ReservationFormData } from "../validation/reservationSchema";

export const useLoadReservationForm = (
  reservationId: number | null,
  setValue: UseFormSetValue<ReservationFormData>,
  setFinalPrice: (value: number) => void
) => {
  const {
    fetchReservationById,
    selectedReservation,
    clearSelectedReservation,
  } = useReservationStore();

  const setRentalStore = useRentalStore.getState().set;

  useEffect(() => {
    if (reservationId) {
      fetchReservationById(reservationId);
    }
    return () => clearSelectedReservation();
  }, [reservationId]);

  useEffect(() => {
    if (selectedReservation && reservationId) {
      const {
        clientId,
        rentalId,
        startDate,
        endDate,
        status,
        finalPrice,
        rental,
      } = selectedReservation;

      setValue("clientId", clientId);
      setValue("startDate", startDate);
      setValue("endDate", endDate);
      setValue("status", status);
      setFinalPrice(finalPrice);

      // Adiciona a rental recebida diretamente (sem nova chamada)
      if (rental) {
        setRentalStore((state) => {
          const exists = state.availableRentals.some((r) => r.id === rentalId);
          if (!exists) {
            return {
              availableRentals: [...state.availableRentals, rental],
            };
          }
          return {};
        });
      }

      setValue("rentalId", rentalId);
    }
  }, [selectedReservation]);
};
