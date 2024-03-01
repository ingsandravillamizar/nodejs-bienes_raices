import express from 'express';
import { formForgotPassword, formLogin, formRegister } from '../controllers/usuarioController.js'; 

const router = express.Router();

router.get('/login', formLogin);
router.get('/register', formRegister);
router.get('/forgot', formForgotPassword);

export default router;   //Exporta un elemento