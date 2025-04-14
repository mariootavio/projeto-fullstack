import prisma from '../prisma/prismaClient';

export const getAllRentals = () => prisma.rental.findMany();

export const getRentalById = (id: number) => prisma.rental.findUnique({ where: { id } });

export const createRental = (data: {
  name: string;
  type: string;
  description?: string;
  pricePerHour: number;
  minTime: number;
  maxTime: number;
}) => prisma.rental.create({ data });

export const updateRental = (id: number, data: any) =>
  prisma.rental.update({ where: { id }, data });

export const deleteRental = (id: number) => prisma.rental.delete({ where: { id } });

export const getAvailableRentalsRepository = async (start: Date, end: Date, duration: number) => {
  return prisma.rental.findMany({
    where: {
      minTime: { lte: duration },
      maxTime: { gte: duration },
      reservations: {
        none: {
          AND: [
            { startDate: { lte: end } },
            { endDate: { gte: start } },
          ],
        },
      },
    },
  });
};




