import { formatDateToBrazil } from '../util/formatDate';
import * as repository from './rental.repository';
import { differenceInHours } from 'date-fns';

export const getAllRentalsService = async () => {
  const rentals = await repository.getAllRentals()

  const formattedRentals = rentals.map(rental => ({
    ...rental,
    createdAt: formatDateToBrazil(rental.createdAt),
  }));

  return formattedRentals;
};

export const getRentalByIdService =async (id: number) => {
  const rental = await repository.getRentalById(id)
  if(!rental) return rental
  return {
    ...rental,
    createdAt: formatDateToBrazil(rental.createdAt)
  }
};

export const createRentalService = async (data: any) => {
  const newRental = await repository.createRental(data)
  return {
    ...newRental,
    createdAt: formatDateToBrazil(newRental.createdAt)
  }
};

export const updateRentalService = async (id: number, data: any) => {
  const rental = await repository.updateRental(id, data)
  return {
    ...rental,
    createdAt: formatDateToBrazil(rental.createdAt)
  }
};

export const deleteRentalService = (id: number) => repository.deleteRental(id);

export const getAvailableRentalsService = async (start: Date, end: Date) => {
  const rentalDuration = differenceInHours(end, start);
  const rentals = await repository.getAvailableRentalsRepository(start, end, rentalDuration);

  const formattedRentals = rentals.map(rental => ({
    ...rental,
    createdAt: formatDateToBrazil(rental.createdAt),
  }));

  return formattedRentals;
};
  
