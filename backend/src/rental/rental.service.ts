import * as repository from "./rental.repository";
import { differenceInHours } from "date-fns";
import {
  RentalCreateDTO,
  RentalResponseDTO,
  RentalUpdateDTO,
} from "./rental.types";
import { toRentalResponseDTO } from "./rental.mapper";

export const getAllRentalsService = async (): Promise<RentalResponseDTO[]> => {
  const rentals = await repository.getAllRentalsRepository();
  return rentals.map(toRentalResponseDTO);
};

export const getRentalByIdService = async (
  id: number
): Promise<RentalResponseDTO | null> => {
  const rental = await repository.getRentalByIdRepository(id);
  if (!rental) return null;
  return toRentalResponseDTO(rental);
};

export const createRentalService = async (
  data: RentalCreateDTO
): Promise<RentalResponseDTO> => {
  const rental = await repository.createRentalRepository(data);
  return toRentalResponseDTO(rental);
};

export const updateRentalService = async (
  id: number,
  data: RentalUpdateDTO
): Promise<RentalResponseDTO> => {
  const updated = await repository.updateRentalRepository(id, data);
  return toRentalResponseDTO(updated);
};

export const deleteRentalService = async (id: number): Promise<void> => {
  await repository.deleteRentalRepository(id);
};

export const getAvailableRentalsService = async (
  start: Date,
  end: Date
): Promise<RentalResponseDTO[]> => {
  const rentalDuration = differenceInHours(end, start);
  const rentals = await repository.getAvailableRentalsRepository(
    start,
    end,
    rentalDuration
  );
  return rentals.map(toRentalResponseDTO);
};
