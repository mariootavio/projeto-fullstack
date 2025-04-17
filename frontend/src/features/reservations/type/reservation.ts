// src/types/reservation.ts
import { Rental } from "../../rentals/types/Rental";

export interface Reservation {
  id?: number;
  clientId: number;
  rentalId: number;
  startDate: string;
  endDate: string;
  finalPrice: number;
  status: string;
  createdAt?: string;
  rental?: Rental;
}
