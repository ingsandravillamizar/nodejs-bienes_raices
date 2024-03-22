
import { validationResult } from 'express-validator';

import { Category, Price, Property } from '../models/index.js'


const admin = (req, res)=>{
    res.render('properties/admin', {
        page: 'Mis propiedades',
        // topbar: true
    })
}


const crear = async (req, res) =>{
    //const prices = Price.findAll();
    //const categories = Category.findAll();


    //Consultando precios y categorias dentro de un promise all  (promise all:  agrupar procesos await)
    const [prices, categories] = await Promise.all([
        Price.findAll(),
        Category.findAll()
    ]);


    res.render('properties/create',{
        page: 'Crear propiedad',
        // topbar: true,
        prices,
        categories,
        csrfToken : req.csrfToken(),
        data: {}
    })
}



const guardar = async (req, res)=>{
    // Resultado de la validación
    let result = validationResult(req)
    if(!result.isEmpty()){
        const [prices, categories] = await Promise.all([
            Price.findAll(),
            Category.findAll()
        ])
        res.render('properties/create', {
            page: 'Crear propiedad',
            // topbar: true,
            prices,
            categories,
            errors: result.array(),
            csrfToken : req.csrfToken(),
            data : req.body
        })
    }

    //console.log(req.body);
    //Crear registro

    const {title,description, rooms, parking, wc , address, lat, lng , price:priceId, category:categoryId} = req.body;   //desestructuramos del body
    
    //console.log ("este es el usuario logeado. " , req.user)
    const { id:userId } = req.user;

    try {
        //creamos una constante, con un metodo await para crear la propiedad
        const propiedad =  await Property.create({
            title,
            description,
            rooms,
            parking,
            wc,
            address,
            lat,
            lng,
            priceId ,
            categoryId,
            userId,
            image:''
        })
        const {id} = propiedad;
        return res.redirect(`/propiedad/agregar-imagen/${id}`);

        
    } catch (error) {
        console.log(error);
    }
}


const agregarImagen = async (req, res) =>{

    const {id} = req.params;

    res.render('properties/agregar-imagen', {
        page: 'Agregar imagen',
        // topbar: true,
        id,
        // errors: result.array(),
        csrfToken : req.csrfToken(),
        data : req.body
    })
}

 


export {
    admin,
    crear,
    guardar,
    agregarImagen
}