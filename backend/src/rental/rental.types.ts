import { z } from "zod";
import { updateRentalSchema } from "./rental.validation";

export type RentalEntity = {
  id: number;
  name: string;
  type: string;
  description: string | null;
  pricePerHour: number;
  minTime: number;
  maxTime: number;
  createdAt: Date;
};

export type RentalResponseDTO = {
  id: number;
  name: string;
  type: string;
  description: string | null;
  pricePerHour: number;
  minTime: number;
  maxTime: number;
  createdAt: string;
};

export type RentalCreateDTO = {
  name: string;
  type: string;
  description?: string;
  pricePerHour: number;
  minTime: number;
  maxTime: number;
};

export type RentalUpdateDTO = z.infer<typeof updateRentalSchema>;
