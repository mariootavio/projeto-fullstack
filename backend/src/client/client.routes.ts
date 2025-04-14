import { Router } from 'express';
import * as controller from  './client.controller';

const router = Router();

router.get('/', controller.getClientAllController);
router.post('/', controller.createClientController);
router.get('/:id', controller.getClientByIdController)
router.put('/:id', controller.updateClientController)
router.delete('/:id', controller.deleteClientController)

export default router;