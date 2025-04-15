import prisma from "../prisma/prismaClient";
import {
  ReservationEntity,
  ReservationPrismaInput,
  ReservationUpdateDTO,
} from "./reservation.types";

export const createReservationRepository = async (
  data: ReservationPrismaInput
): Promise<ReservationEntity> => {
  return prisma.reservation.create({
    data,
    include: {
      client: true,
      rental: true,
    },
  });
};

export const getAllReservationsRepository = async () => {
  return prisma.reservation.findMany({
    include: {
      client: true,
      rental: true,
    },
    orderBy: { id: "desc" },
  });
};

export const getReservationByIdRepository = async (
  id: number
): Promise<ReservationEntity | null> => {
  return prisma.reservation.findUnique({
    where: { id },
    include: {
      client: true,
      rental: true,
    },
  });
};

export const updateReservationRepository = async (
  id: number,
  data: ReservationUpdateDTO
): Promise<ReservationEntity> => {
  return prisma.reservation.update({
    where: { id },
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    },
    include: {
      client: true,
      rental: true,
    },
  });
};

export const deleteReservationRepository = async (
  id: number
): Promise<void> => {
  await prisma.reservation.delete({
    where: { id },
  });
};
