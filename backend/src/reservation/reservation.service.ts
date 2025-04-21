import {
  toReservationPrismaInput,
  toReservationResponseDTO,
} from "./reservation.mapper";
import * as repository from "./reservation.repository";
import {
  ReservationCreateDTO,
  ReservationResponseDTO,
  ReservationUpdateDTO,
} from "./reservation.types";

export const createReservationService = async (
  data: ReservationCreateDTO
): Promise<ReservationResponseDTO> => {
  const prismaInput = toReservationPrismaInput(data);
  const reservation = await repository.createReservationRepository(prismaInput);
  return toReservationResponseDTO(reservation);
};

export const getAllReservationsService = async (): Promise<
  ReservationResponseDTO[]
> => {
  const reservations = await repository.getAllReservationsRepository();
  return reservations.map(toReservationResponseDTO);
};

export const getReservationByIdService = async (
  id: number
): Promise<ReservationResponseDTO | null> => {
  const reservation = await repository.getReservationByIdRepository(id);
  return reservation ? toReservationResponseDTO(reservation) : null;
};

export const updateReservationService = async (
  id: number,
  data: ReservationUpdateDTO
): Promise<ReservationResponseDTO> => {
  const updated = await repository.updateReservationRepository(id, data);
  return toReservationResponseDTO(updated);
};

export const deleteReservationService = async (id: number): Promise<void> => {
  await repository.deleteReservationRepository(id);
};
