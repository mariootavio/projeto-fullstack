import { toClientResponseDTO } from "./client.mapper";
import * as repository from "./client.repository";
import {
  ClientCreateDTO,
  ClientResponseDTO,
  ClientUpdateDTO,
} from "./client.types";

export const getClientAllService = async (): Promise<ClientResponseDTO[]> => {
  const clients = await repository.getClientAllRepository();
  return clients.map(toClientResponseDTO);
};

export const getClientByIdService = async (
  id: number
): Promise<ClientResponseDTO | null> => {
  const client = await repository.getClientByIdRepository(id);
  if (!client) return null;
  return toClientResponseDTO(client);
};

export const updateClientService = async (
  id: number,
  data: ClientUpdateDTO
): Promise<ClientResponseDTO> => {
  const updated = await repository.updateClientRepository(id, data);
  return toClientResponseDTO(updated);
};

export const deleteClientByIdService = async (id: number): Promise<void> => {
  await repository.deleteClientByIdRepository(id);
};

export const createClientService = async (
  data: ClientCreateDTO
): Promise<ClientResponseDTO> => {
  const client = await repository.createClientRepository(data);
  return toClientResponseDTO(client);
};
