import {
  ReservationCreateDTO,
  ReservationEntity,
  ReservationResponseDTO,
} from "./reservation.types";
import { formatDateToBrazil } from "../util/formatDate";

export const toReservationPrismaInput = (data: ReservationCreateDTO) => ({
  ...data,
  startDate: new Date(data.startDate),
  endDate: new Date(data.endDate),
});

export const toReservationResponseDTO = (
  reservation: ReservationEntity
): ReservationResponseDTO => ({
  id: reservation.id,
  clientId: reservation.clientId,
  rentalId: reservation.rentalId,
  startDate: formatDateToBrazil(reservation.startDate),
  endDate: formatDateToBrazil(reservation.endDate),
  finalPrice: reservation.finalPrice,
  status: reservation.status,
  createdAt: formatDateToBrazil(reservation.createdAt),
  client: {
    ...reservation.client,
    createdAt: formatDateToBrazil(reservation.client.createdAt),
  },
  rental: {
    ...reservation.rental,
    createdAt: formatDateToBrazil(reservation.rental.createdAt),
  },
});
