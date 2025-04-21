import { Request, Response } from "express";

import * as service from "./client.service";
import { createClientSchema, updateClientSchema } from "./client.validation";
import { handlePrismaError } from "../validations/prisma.validation";
import { ClientResponseDTO } from "./client.types";

export const getClientAllController = async (_: Request, res: Response) => {
  try {
    const clients: ClientResponseDTO[] = await service.getClientAllService();
    res.json(clients);
  } catch (error) {
    console.error("Erro getClientAllController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const getClientByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const client: ClientResponseDTO | null = await service.getClientByIdService(
      id
    );

    if (!client) {
      res.status(404).json({ error: "Cliente não encontrado" });
      return;
    }

    res.json(client);
  } catch (error) {
    console.error("Erro getClientByIdController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const updateClientController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const validation = updateClientSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        error: "Erro de validação",
        fields: validation.error.flatten().fieldErrors,
      });
      return;
    }

    const updated = await service.updateClientService(id, validation.data);
    res.json(updated);
  } catch (error) {
    console.error("Erro updateClientController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const deleteClientController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    await service.deleteClientByIdService(id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro deleteClientController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const createClientController = async (req: Request, res: Response) => {
  try {
    const validation = createClientSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        error: "Erro de validação",
        fields: validation.error.flatten().fieldErrors,
      });
      return;
    }

    const newClient: ClientResponseDTO = await service.createClientService(
      validation.data
    );
    res.status(201).json(newClient);
  } catch (error) {
    console.error("Erro createClientController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};
