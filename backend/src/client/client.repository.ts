import prisma from "../prisma/prismaClient";

export const getClientAllRepository = async () => {
    return prisma.client.findMany();
};

export const findClientByIdRepository = (id: number) => {
    return prisma.client.findUnique({ where: { id } })
};

export const updateClientByIdRepository = (id: number, data: any) => {
    return prisma.client.update({
      where: { id },
      data,
    })
};
  
export const deleteClientByIdRepository = (id: number) => {
    return prisma.client.delete({ where: { id } })
};

export const createClientRepository = async (data:{
    name: string;
    email: string;
    phone: string;
    cpf: string;
}) => {
    return prisma.client.create({ data });
};