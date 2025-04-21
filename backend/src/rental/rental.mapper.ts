import { Rental } from "@prisma/client";
import { RentalResponseDTO } from "./rental.types";
import { formatDateToBrazil } from "../util/formatDate";

export const toRentalResponseDTO = (rental: Rental): RentalResponseDTO => ({
  id: rental.id,
  name: rental.name,
  type: rental.type,
  description: rental.description,
  pricePerHour: rental.pricePerHour,
  minTime: rental.minTime,
  maxTime: rental.maxTime,
  createdAt: formatDateToBrazil(rental.createdAt),
});
