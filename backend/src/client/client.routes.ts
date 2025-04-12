import { Router } from 'express';
import { getAllClients, createClient } from './client.controller';

const router = Router();

router.get('/', getAllClients);
router.post('/', createClient);

export default router;