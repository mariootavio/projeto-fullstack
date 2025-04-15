import { ClientEntity, ClientResponseDTO } from "../client/client.types";
import { RentalEntity, RentalResponseDTO } from "../rental/rental.types";

export interface ReservationEntity {
  id: number;
  clientId: number;
  rentalId: number;
  startDate: Date;
  endDate: Date;
  finalPrice: number;
  status: string;
  createdAt: Date;
  client: ClientEntity;
  rental: RentalEntity;
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
  client: ClientResponseDTO;
  rental: RentalResponseDTO;
}

export interface ReservationCreateDTO {
  clientId: number;
  rentalId: number;
  startDate: string;
  endDate: string;
  finalPrice: number;
  status: string;
}

export interface ReservationUpdateDTO {
  clientId?: number;
  rentalId?: number;
  startDate?: string;
  endDate?: string;
  finalPrice?: number;
  status?: string;
}

export interface ReservationPrismaInput {
  clientId: number;
  rentalId: number;
  startDate: Date;
  endDate: Date;
  finalPrice: number;
  status: string;
}
