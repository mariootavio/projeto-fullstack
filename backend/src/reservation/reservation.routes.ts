import { Router } from 'express'
import {
  createReservationController,
  deleteReservationController,
  getAllReservationsController,
  getReservationByIdController,
  updateReservationController,
} from './reservation.controller'

const router = Router()

router.post('/', createReservationController)
router.get('/', getAllReservationsController)
router.get('/:id', getReservationByIdController)
router.put('/:id', updateReservationController)
router.delete('/:id', deleteReservationController)

export default router
