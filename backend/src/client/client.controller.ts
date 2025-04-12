import {Request,Response} from 'express';
import {getClientService, createClientService} from './client.service';

export const getAllClients = async (_:Request, res:Response) => {
    const clients = await getClientService();
    res.json(clients);
};

export const createClient = async (req:Request, res:Response) => {
    const { name, email, phone, cpf } = req.body;
    const newClient = await createClientService({ name, email, phone, cpf })
    res.status(201).json(newClient);
};

