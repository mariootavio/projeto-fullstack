import { useEffect, useRef } from "react";
import { useRentalStore } from "../../rentals/store/rentalStore";

export const useAvailableRentalsOnDateChange = (
  startDate: string,
  endDate: string
) => {
  const { fetchAvailableRentals } = useRentalStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!startDate || !endDate) return;

    if (!hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }

    fetchAvailableRentals(startDate, endDate);
  }, [startDate, endDate]);
};
