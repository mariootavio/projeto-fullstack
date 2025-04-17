import { useEffect } from "react";
import { useRentalStore } from "../../rentals/store/rentalStore";

export const useFinalPriceCalculator = (
  rentalId: number | string,
  startDate: string,
  endDate: string,
  setFinalPrice: (value: number) => void
) => {
  const { availableRentals } = useRentalStore();

  useEffect(() => {
    if (!rentalId || !startDate || !endDate) {
      setFinalPrice(0);
      return;
    }

    const rental = availableRentals.find((r) => r.id === Number(rentalId));
    if (!rental) {
      setFinalPrice(0);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      setFinalPrice(0);
      return;
    }

    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const price = rental.pricePerHour * hours;

    setFinalPrice(price);
  }, [rentalId, startDate, endDate, availableRentals]);
};
