import { Router } from 'express';
import {
  createRentalController,
  getAllRentalsController,
  getRentalByIdController,
  updateRentalController,
  deleteRentalController,
  getAvailableRentalsController
} from './rental.controller';

const router = Router();

router.get('/available', getAvailableRentalsController);
router.post('/', createRentalController);
router.get('/', getAllRentalsController);
router.get('/:id', getRentalByIdController);
router.put('/:id', updateRentalController);
router.delete('/:id', deleteRentalController);

export default router;
