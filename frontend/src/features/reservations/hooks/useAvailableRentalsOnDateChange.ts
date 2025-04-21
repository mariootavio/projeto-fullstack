import { useEffect, useRef } from "react";
import { useRentalStore } from "../../rentals/store/rentalStore";

export const useAvailableRentalsOnDateChange = (
  startDate: string,
  endDate: string,
  isEditMode: boolean
) => {
  const { fetchAvailableRentals } = useRentalStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }
    if (isEditMode && !hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }
    fetchAvailableRentals(startDate, endDate);
  }, [startDate, endDate, isEditMode]);
};
