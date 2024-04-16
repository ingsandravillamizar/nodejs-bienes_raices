import express from 'express'
import {home, categories,  nofFound, search } from '../controllers/appController.js'



const router = express.Router()


//inicio
router.get('/', home)


//categorias
router.get('/categorias/:id', categories)


//404
router.get('/404', nofFound)



//buscador
router.post('/buscador', search)




export default router;
