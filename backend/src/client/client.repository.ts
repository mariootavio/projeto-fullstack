import prisma from "../prisma/prismaClient";
import { ClientCreateDTO, ClientEntity, UpdateClientDTO } from "./client.types";

export const getClientAllRepository = async (): Promise<ClientEntity[]> => {
  return prisma.client.findMany();
};

export const getClientByIdRepository = async (
  id: number
): Promise<ClientEntity | null> => {
  return prisma.client.findUnique({
    where: { id },
  });
};

export const updateClientRepository = async (
  id: number,
  data: UpdateClientDTO
) => {
  return prisma.client.update({
    where: { id },
    data,
  });
};

export const deleteClientByIdRepository = async (id: number): Promise<void> => {
  await prisma.client.delete({
    where: { id },
  });
};

export const createClientRepository = (data: ClientCreateDTO) => {
  return prisma.client.create({
    data,
  });
};
