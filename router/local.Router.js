import { Router } from 'express';
import bodyParser from 'body-parser';
import { localController } from '../controllers/localController.js';
import  verifyToken  from '../middlewares/token.middleware.js';

const router = Router();

router.post('/createTareas',verifyToken,(req, res) => localController.local_create(req, res));

router.put('/updateTareas',(req, res) => localController.local_update(req, res));

router.put('/deleteTareas',(req, res) => localController.local_delete(req, res));

router.get('/viewAll', (req, res) => localController.local_viewAll(req, res));

router.get('/viewItem', (req, res) => localController.local_viewById(req, res));

export default router;