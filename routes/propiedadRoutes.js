import express from 'express'
import { body } from 'express-validator'
import protectRoute from '../middleware/protectRoute.js'


import { admin, agregarImagen, crear, guardar } from '../controllers/propiedadController.js'


const router = express.Router()


router.get('/mis-propiedades', protectRoute, admin)
router.get('/propiedad/crear', protectRoute, crear)



router.post('/propiedad/guardar', protectRoute, 
    body('title').notEmpty().withMessage('El titulo de la propiedad es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({min:10}).withMessage('La descripción es muy corta')
        .isLength({max:100}).withMessage('La descripción es muy larga'),
    body('category').isNumeric().withMessage('Selecciona la categoria'),
    body('price').isNumeric().withMessage('Selecciona el rango de precio'),
    body('rooms').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('parking').isNumeric().withMessage('Selecciona el numero de estacionamiento'),
    body('wc').isNumeric().withMessage('Selecciona el numero de baños'),
    body('lat').notEmpty().withMessage('Indica la ubicación en el mapa'),
    guardar
)

router.get('/propiedad/agregar-imagen/:id', protectRoute, agregarImagen)

export default router