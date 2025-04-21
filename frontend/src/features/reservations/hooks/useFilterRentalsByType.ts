import { useEffect, useState } from "react";
import { useRentalStore } from "../../rentals/store/rentalStore";

export const useFilterRentalsByType = (type: string) => {
  const { availableRentals } = useRentalStore();
  const [filteredRentals, setFilteredRentals] = useState(availableRentals);

  useEffect(() => {
    if (type) {
      setFilteredRentals(
        availableRentals.filter((rental) => rental.type === type)
      );
    } else {
      setFilteredRentals(availableRentals);
    }
  }, [type, availableRentals]);

  return filteredRentals;
};
