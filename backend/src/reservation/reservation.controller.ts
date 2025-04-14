import { Request, Response } from 'express'
import * as service from './reservation.service'
import { createReservationSchema } from './reservation.validation'
import { handlePrismaError } from '../validations/prismaValidation'

export const createReservationController = async (req: Request, res: Response) => {
  const validation = createReservationSchema.safeParse(req.body)

  if (!validation.success) {
    res.status(400).json({
      error: 'Erro de validação',
      fields: validation.error.flatten().fieldErrors,
    })
    return
  }

  try {
    const reservation = await service.createReservationService(validation.data)
    res.status(201).json(reservation)
  } catch (error) {
    const { status, error: message, fields } = handlePrismaError(error)
    res.status(status).json({ error: message, fields })
  }
}

export const getAllReservationsController = async (_: Request, res: Response) => {
  const list = await service.getAllReservationsService()
  res.json(list)
}

export const getReservationByIdController = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const item = await service.getReservationByIdService(id)
  if (!item) res.status(404).json({ error: 'Reserva não encontrada' })
  res.json(item)
}

export const updateReservationController = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const updated = await service.updateReservationService(id, req.body)
    res.json(updated)
  } catch (error) {
    const { status, error: message, fields } = handlePrismaError(error)
    res.status(status).json({ error: message, fields })
  }
}

export const deleteReservationController = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    await service.deleteReservationService(id)
    res.status(204).send()
  } catch (error) {
    const { status, error: message, fields } = handlePrismaError(error)
    res.status(status).json({ error: message, fields })
  }
}
