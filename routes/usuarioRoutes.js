import express from 'express';
import { confirmarTokenRegistro, forgot, formForgotPassword, formLogin, formRegister,  iniciarSesion,  register } from '../controllers/usuarioController.js'; 

const router = express.Router();

router.get('/login', formLogin);
router.post('/login', iniciarSesion);
router.get('/register', formRegister);
router.post('/register', register);
router.get('/forgot', formForgotPassword);
router.post('/forgot', forgot);

//Ruta validacion token para confirmacion de correo en registro
router.get('/confirmar/:token',confirmarTokenRegistro)


export default router;   //Exporta un elemento