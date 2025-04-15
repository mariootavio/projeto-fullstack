import { z } from "zod";
import { updateClientSchema } from "./client.validation";

export type ClientEntity = {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: Date;
};

export type ClientResponseDTO = {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: string;
};

export type ClientCreateDTO = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
};

export type UpdateClientDTO = z.infer<typeof updateClientSchema>;
