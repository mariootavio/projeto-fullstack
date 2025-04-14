import { formatDateToBrazil } from '../util/formatDate';
import * as repository from './reservation.repository'

export const createReservationService = async (data: any) => {
  const reservation = await repository.createReservation(data)
  return {
      ...reservation,
      startDate: formatDateToBrazil(reservation.startDate),
      endDate: formatDateToBrazil(reservation.endDate),
      createdAt: formatDateToBrazil(reservation.createdAt),
  };
};

export const getAllReservationsService = async () => {
  const reservations = await repository.getAllReservations()

  const formatted = reservations.map(reservation => ({
    ...reservation,
    startDate: formatDateToBrazil(reservation.startDate),
    endDate: formatDateToBrazil(reservation.endDate),
    createdAt: formatDateToBrazil(reservation.createdAt),
    client: {
      ...reservation.client,
      createdAt: formatDateToBrazil(reservation.client.createdAt),
    },
    rental: {
      ...reservation.rental,
      createdAt: formatDateToBrazil(reservation.rental.createdAt),
    },
  }));

  return formatted;
};

export const getReservationByIdService = async (id: number) => {
  const reservation = await repository.getReservationById(id)
  if(!reservation) return reservation
  return {
    ...reservation,
    startDate: formatDateToBrazil(reservation.startDate),
    endDate: formatDateToBrazil(reservation.endDate),
    createdAt: formatDateToBrazil(reservation.createdAt),
    client: {
      ...reservation.client,
      createdAt: formatDateToBrazil(reservation.client.createdAt),
    },
    rental: {
      ...reservation.rental,
      createdAt: formatDateToBrazil(reservation.rental.createdAt),
    }
  };
};

export const updateReservationService = async (id: number, data: any) => {
  const reservation = await repository.updateReservation(id, data);
  return {
    ...reservation,
    startDate: formatDateToBrazil(reservation.startDate),
    endDate: formatDateToBrazil(reservation.endDate),
    createdAt: formatDateToBrazil(reservation.createdAt),
  };
}

export const deleteReservationService = (id: number) => repository.deleteReservation(id);
