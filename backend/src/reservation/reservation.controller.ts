import { Request, Response } from "express";
import * as service from "./reservation.service";
import {
  createReservationSchema,
  updateReservationSchema,
} from "./reservation.validation";
import { handlePrismaError } from "../validations/prisma.validation";
import { ReservationResponseDTO } from "./reservation.types";

export const createReservationController = async (
  req: Request,
  res: Response
) => {
  const validation = createReservationSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      error: "Erro de validação",
      fields: validation.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const reservation = await service.createReservationService(validation.data);
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Erro createReservationController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const getAllReservationsController = async (
  _: Request,
  res: Response
) => {
  try {
    const reservations: ReservationResponseDTO[] =
      await service.getAllReservationsService();
    res.json(reservations);
  } catch (error) {
    console.error("Erro getAllReservationsController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const getReservationByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const reservation: ReservationResponseDTO | null =
      await service.getReservationByIdService(id);

    if (!reservation) {
      res.status(404).json({ error: "Reserva não encontrada" });
      return;
    }

    res.json(reservation);
  } catch (error) {
    console.error("Erro getReservationByIdController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const updateReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const validation = updateReservationSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        error: "Erro de validação",
        fields: validation.error.flatten().fieldErrors,
      });
      return;
    }

    const updated: ReservationResponseDTO =
      await service.updateReservationService(id, validation.data);
    res.json(updated);
  } catch (error) {
    console.error("Erro updateReservationController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};

export const deleteReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    await service.deleteReservationService(id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro deleteReservationController:", error);
    const { status, error: message, fields } = handlePrismaError(error);
    res.status(status).json({ error: message, fields });
  }
};
