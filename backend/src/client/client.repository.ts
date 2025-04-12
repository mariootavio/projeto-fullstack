import prisma from "../prisma/prismaClient";

export const findAll = async () => {
    return prisma.client.findMany();
};

export const create = async (data:{
    name: string;
    email: string;
    phone: string;
    cpf: string;
}) => {
    return prisma.client.create({ data });
};