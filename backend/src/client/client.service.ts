import { formatDateToBrazil } from '../util/formatDate';
import * as repository from  './client.repository';

export const getClientAllService = async () => {
    const clients = await repository.getClientAllRepository();
    const response = clients.map((client: any) => ({
        ...client,
        createdAt: formatDateToBrazil(client.createdAt),
      }));
    return response  
};

export const getClientByIdService = async (id: number) => {
    let client = await repository.findClientByIdRepository(id)
    if (!client) return client
    return {
        ...client,
        createdAt: formatDateToBrazil(client.createdAt),
    };
};

export const updateClientByIdService = async (id: number, data: any) => {
    const client = await repository.updateClientByIdRepository(id, data)
    return {
        ...client,
        createdAt: formatDateToBrazil(client.createdAt),
    };
};
  
export const deleteClientByIdService = (id: number) => {
    return repository.deleteClientByIdRepository(id)
};

export const createClientService = async (data:{
    name: string;
    email: string;
    phone: string;
    cpf: string;
}) => {
    const newClient = await repository.createClientRepository( data );
    return {
        ...newClient,
        createdAt: formatDateToBrazil(newClient.createdAt)
    }
};

