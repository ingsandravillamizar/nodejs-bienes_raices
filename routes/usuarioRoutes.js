import express from 'express';
import { formLogin } from '../controllers/usuarioController.js'; 

const router = express.Router();

router.get('/login', formLogin);


export default router;   //Exporta un elemento