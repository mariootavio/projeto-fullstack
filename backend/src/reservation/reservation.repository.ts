import prisma from '../prisma/prismaClient'

export const createReservation = (data: any) => prisma.reservation.create({ data });

export const getAllReservations = () => prisma.reservation.findMany({
  include: { client: true, rental: true }
});

export const getReservationById = (id: number) =>
  prisma.reservation.findUnique({ where: { id }, include: { client: true, rental: true } });

export const updateReservation = (id: number, data: any) =>
  prisma.reservation.update({ where: { id }, data });

export const deleteReservation = (id: number) =>
  prisma.reservation.delete({ where: { id } });
