import { Router } from 'express';
import * as ctrl from '../controllers/parts.controller';

const router = Router();

// CRUD
router.post('/parts', ctrl.create);
router.get('/parts', ctrl.list);
router.get('/parts/:id', ctrl.getById);
router.put('/parts/:id', ctrl.update);
router.delete('/parts/:id', ctrl.remove);

export default router;
