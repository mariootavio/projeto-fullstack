// src/features/reservations/hooks/useResetRentalOnTypeChange.ts
import { useEffect } from "react";
import { UseFormSetValue, UseFormClearErrors } from "react-hook-form";
import { ReservationFormData } from "../validation/reservationSchema";

export function useResetRentalOnTypeChange(
  rentalTypeKey: string,
  setValue: UseFormSetValue<ReservationFormData>,
  clearErrors: UseFormClearErrors<ReservationFormData>
) {
  useEffect(() => {
    setValue("rentalId", 0);
    clearErrors("rentalId");
  }, [rentalTypeKey, setValue, clearErrors]);
}
