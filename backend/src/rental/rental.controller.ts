import { Request, Response } from "express";
import * as service from "./rental.service";
import { createRentalSchema, updateRentalSchema } from "./rental.validation";
import { handlePrismaError } from "../validations/prisma.validation";
import { RentalCreateDTO, RentalResponseDTO } from "./rental.types";

export const createRentalController = async (req: Request, res: Response) => {
  try {
    const validation = createRentalSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        error: "Erro de validação",
        fields: validation.error.flatten().fieldErrors,
      });
      return;
    }

    const data: RentalCreateDTO = validation.data;
    const rental: RentalResponseDTO = await service.createRentalService(data);

    res.status(201).json(rental);
  } catch (error) {
    console.error("Erro createRentalController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const getAllRentalsController = async (_: Request, res: Response) => {
  try {
    const rentals: RentalResponseDTO[] = await service.getAllRentalsService();
    res.json(rentals);
  } catch (error) {
    console.error("Erro getAllRentalsController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const getRentalByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const rental: RentalResponseDTO | null = await service.getRentalByIdService(
      id
    );

    if (!rental) {
      res.status(404).json({ error: "Locação não encontrada" });
      return;
    }

    res.json(rental);
  } catch (error) {
    console.error("Erro getRentalByIdController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const updateRentalController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const validation = updateRentalSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        error: "Erro de validação",
        fields: validation.error.flatten().fieldErrors,
      });
      return;
    }

    const rental: RentalResponseDTO = await service.updateRentalService(
      id,
      validation.data
    );
    res.json(rental);
  } catch (error) {
    console.error("Erro updateRentalController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const deleteRentalController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    await service.deleteRentalService(id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro deleteRentalController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const getAvailableRentalsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { start, end } = req.query;

    if (
      !start ||
      !end ||
      typeof start !== "string" ||
      typeof end !== "string"
    ) {
      res.status(400).json({ error: "Parâmetros de data inválidos" });
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      res.status(400).json({ error: "Datas inválidas" });
      return;
    }

    const rentals: RentalResponseDTO[] =
      await service.getAvailableRentalsService(startDate, endDate);
    res.json(rentals);
  } catch (error) {
    console.error("Erro getAvailableRentalsController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};
