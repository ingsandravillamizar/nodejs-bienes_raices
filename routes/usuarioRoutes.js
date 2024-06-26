import express from 'express';
import {   forgotPasswordForm, loginForm, registerForm, register,  registerTokenConfirm, auth,  recoverPassword,  recoverTokenConfirm, recover, logout, profileForm, profile   } from '../controllers/usuarioController.js'; 
import identifyUser from '../middleware/identifyUser.js';

const router = express.Router();

router.get('/login',     loginForm);
router.post('/login',    auth);


router.get('/profile', identifyUser, profileForm);
router.post('/profile',     profile);


//Ruta validacion token para confirmacion de correo en registro
router.get('/register',  registerForm);                    // Vista de registro  
router.post('/register', register);                        // Metodo registrar 
router.get('/confirm-register/:token',registerTokenConfirm)     //Ruta validacion token para confirmacion de correo en registro

//Ruta Recuperacion de acceso
router.get('/forgot',    forgotPasswordForm);     //el acceso a la vista de olvide password
router.post('/recover-password', recoverPassword);  //el acceso al metodo de recuperacion de password
router.get('/confirm-recover/:token',recoverTokenConfirm);     //Ruta validacion token para confirmacion de correo en registro
router.post('/recover', recover);  //Nuevo Password

//Cerrar sesion
router.post('/logout', logout)


export default router;   //Exporta un elemento