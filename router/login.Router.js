import { Router } from 'express';
import bodyParser from 'body-parser';
import { loginController } from '../controllers/loginController.js';

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })
 
router.post('/login', (req, res) =>loginController.user_login(req, res));

router.post('/create', (req, res) => loginController.user_create(req, res));

export default router;