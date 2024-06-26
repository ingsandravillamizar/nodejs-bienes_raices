import express from 'express'
import { body } from 'express-validator'
import protectRoute from '../middleware/protectRoute.js'
import upload from '../middleware/uploadFile.js'
//import { upload } from '../middleware/uploadFile.js';
import identifyUser from '../middleware/identifyUser.js'
import { admin, agregarImagen, crear, guardar, saveImage, editar, actualizar, eliminar,  actualizarPublicado, verPropiedad, sendMessage, showMessages} from '../controllers/propiedadController.js'


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

router.get('/propiedades/agregar-imagen/:id', protectRoute, agregarImagen)


router.get('/propiedad/agregar-imagen/:id', protectRoute, agregarImagen)

router.post('/propiedad/agregar-imagen/:id',
    protectRoute,             //es un middleware
    upload.single('image'),  //funciona como un middleware
    saveImage
)

router.get('/propiedad/editar/:id', protectRoute, editar)

router.post('/propiedad/editar/:id', protectRoute, 
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
    actualizar
)

router.post('/propiedad/eliminar/:id', protectRoute, eliminar)
router.post('/propiedad/actualizar/estado/:id', protectRoute, actualizarPublicado)


router.get('/mensajes/:id',
    protectRoute,
    showMessages
)




//Rutas para area pública
router.get('/propiedad/:id',
    identifyUser,
    verPropiedad
)

//Guardar los mensajes
router.post('/propiedad/:id', 
    identifyUser,
    body('message').isLength({ min:10 }).withMessage('El mensaje es demasiado breve o esta vacio'),
    sendMessage
)




export default router