import prisma from "../prisma/prismaClient";
import { RentalCreateDTO, RentalEntity, RentalUpdateDTO } from "./rental.types";

export const getAllRentalsRepository = (): Promise<RentalEntity[]> => {
  return prisma.rental.findMany();
};

export const getRentalByIdRepository = (
  id: number
): Promise<RentalEntity | null> => {
  return prisma.rental.findUnique({
    where: { id },
  });
};

export const createRentalRepository = (
  data: RentalCreateDTO
): Promise<RentalEntity> => {
  return prisma.rental.create({
    data,
  });
};

export const updateRentalRepository = (
  id: number,
  data: RentalUpdateDTO
): Promise<RentalEntity> => {
  return prisma.rental.update({
    where: { id },
    data,
  });
};

export const deleteRentalRepository = (id: number): Promise<void> => {
  return prisma.rental
    .delete({
      where: { id },
    })
    .then(() => {});
};

export const getAvailableRentalsRepository = (
  start: Date,
  end: Date,
  rentalDuration: number
): Promise<RentalEntity[]> => {
  return prisma.rental.findMany({
    where: {
      minTime: { lte: rentalDuration },
      maxTime: { gte: rentalDuration },
      reservations: {
        none: {
          AND: [{ startDate: { lte: end } }, { endDate: { gte: start } }],
        },
      },
    },
  });
};
