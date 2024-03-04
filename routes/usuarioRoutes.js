import express from 'express';
import { forgot, formForgotPassword, formLogin, formRegister,  iniciarSesion,  register } from '../controllers/usuarioController.js'; 

const router = express.Router();

router.get('/login', formLogin);
router.post('/login', iniciarSesion);
router.get('/register', formRegister);
router.post('/register', register);
router.get('/forgot', formForgotPassword);
router.post('/forgot', forgot);



export default router;   //Exporta un elemento