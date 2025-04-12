import {create, findAll} from './client.repository';

export const getClientService = async () => {
    return findAll();
};

export const createClientService = async (data:{
    name: string;
    email: string;
    phone: string;
    cpf: string;
}) => {
    return create( data );
};

