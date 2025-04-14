import { Request, Response } from 'express';
import * as service from './rental.service';
import { createRentalSchema } from './rental.validation';
import { handlePrismaError } from '../validations/prismaValidation';

export const createRentalController = async (req: Request, res: Response) => {
  const validation = createRentalSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      error: 'Erro de validação',
      fields: validation.error.flatten().fieldErrors,
    });
    return
  }

  try {
    const newRental = await service.createRentalService(validation.data);
    res.status(201).json(newRental);
  } catch (error) {
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const getAllRentalsController = async (_: Request, res: Response) => {
  const rentals = await service.getAllRentalsService();
  res.json(rentals);
};

export const getRentalByIdController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const rental = await service.getRentalByIdService(id);
  if (!rental) {
    res.status(404).json({ error: 'Locação não encontrada' });
    return
  }
  res.json(rental);
};

export const updateRentalController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updated = await service.updateRentalService(id, req.body);
    res.json(updated);
  } catch (error) {
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const deleteRentalController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await service.deleteRentalService(id);
    res.status(204).send();
  } catch (error) {
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const getAvailableRentalsController = async (req: Request, res: Response) => {
  const { start, end } = req.query;

  if (!start || !end) {
    res.status(400).json({
      error: 'Parâmetros start e end são obrigatórios no formato YYYY-MM-DD',
    });
    return
  }

  try {
    const rentals = await service.getAvailableRentalsService(
      new Date(String(start)),
      new Date(String(end))
    );

    res.json(rentals);
  } catch (error) {
    console.error('Erro ao buscar locações disponíveis:', error);
    res.status(500).json({ error: 'Erro interno ao buscar locações disponíveis' });
  }
};

