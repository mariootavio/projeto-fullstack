import { z } from "zod";
import {
  createReservationSchema,
  updateReservationSchema,
} from "./reservation.validation";

export type ReservationCreateDTO = z.infer<typeof createReservationSchema>;

export type ReservationUpdateDTO = z.infer<typeof updateReservationSchema>;

export interface ReservationEntity {
  id: number;
  clientId: number;
  rentalId: number;
  startDate: Date;
  endDate: Date;
  finalPrice: number;
  status: string;
  createdAt: Date;
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    createdAt: Date;
  };
  rental: {
    id: number;
    name: string;
    type: string;
    description: string | null;
    pricePerHour: number;
    minTime: number;
    maxTime: number;
    createdAt: Date;
  };
}

export interface ReservationResponseDTO {
  id: number;
  clientId: number;
  rentalId: number;
  startDate: string;
  endDate: string;
  finalPrice: number;
  status: string;
  createdAt: string;
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    createdAt: string;
  };
  rental: {
    id: number;
    name: string;
    type: string;
    description: string | null;
    pricePerHour: number;
    minTime: number;
    maxTime: number;
    createdAt: string;
  };
}

export type ReservationPrismaInput = {
  clientId: number;
  rentalId: number;
  startDate: Date;
  endDate: Date;
  finalPrice: number;
  status: string;
};
