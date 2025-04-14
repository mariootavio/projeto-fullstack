import {Request,Response} from 'express';

import * as service from './client.service';
import { createClientSchema, deleteClientSchema } from '../validations/clientValidation'
import { handlePrismaError } from '../validations/prismaValidation'


export const getClientAllController = async (_:Request, res:Response) => {
    const clients = await service.getClientAllService();
    res.json(clients);
};

export const getClientByIdController = async (req:Request, res:Response) => {

    try {
        const client = await service.getClientByIdService(Number(req.params.id))

        if(!client) {
            res.status(404).json({ error: "Cliente não encontrado"});
            return
        }

        res.json(client)
    } catch (ex) {
        console.error("getClientByIdController error: ", ex)  
        res.status(500).json({ error: "Erro interno no servidor"});
    } 
  
};

export const updateClientController = async (req:Request, res:Response) => {
    const validation = createClientSchema.safeParse(req.body)
  
    if (!validation.success) {
        res.status(400).json({
            error: 'Erro de validação',
            fields: validation.error.flatten().fieldErrors,
        })
        return
    }

    try {
        const client = await service.updateClientByIdService(Number(req.params.id), req.body)
        res.json(client)
    } catch (ex) {
        console.error("updateClientController error: ", ex)  
        const { status, error, fields } = handlePrismaError(ex);
        res.status(status).json({ error, fields});
    }
  
};

export const deleteClientController = async (req:Request, res:Response) => {
    const validation = deleteClientSchema.safeParse({ id: req.params.id })
  
    if (!validation.success) {
        res.status(400).json({
            error: 'Erro de validação',
            fields: validation.error.flatten().fieldErrors,
        })
        return
    }

    try {
        await service.deleteClientByIdService(Number(req.params.id))
        res.status(204).send()
    } catch (ex) {
        console.error("deleteClientController error: ", ex)  
        res.status(404).json({ error: "Cliente não encontrado"});
    }
  
};

export const createClientController = async (req: Request, res: Response): Promise<void> => {
    const validation = createClientSchema.safeParse(req.body)
  
    if (!validation.success) {
        res.status(400).json({
            error: 'Erro de validação',
            fields: validation.error.flatten().fieldErrors,
        })
        return
    }
  
    try {
      const { name, email, phone, cpf } = validation.data
      const newClient = await service.createClientService({ name, email, phone, cpf })
  
      res.status(201).json(newClient)
  
    } catch (ex) {
      console.error("createClientController error: ", ex)  
      const { status, error, fields } = handlePrismaError(ex);
      res.status(status).json({ error, fields});
    }
  }

