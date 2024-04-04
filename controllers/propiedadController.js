
import { validationResult } from 'express-validator';

import { Category, Price, Property } from '../models/index.js'


const admin = async (req, res)=>{

    const { id } = req.user

    const properties = await Property.findAll({
        where :{
            userId : id
        },
        include: [  //Esto es como hacer un Join entre propiedades y categorias
            { model: Category},
            { model: Price}
        ]
    })

    res.render('properties/admin', {
        page: 'Mis propiedades',
        properties
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


    const {id} = req.params

    // validar que  la propiedad existe..
    const property = await Property.findByPk(id) 

    if (!property) {
        return res.redirect('/mis-propiedades')
    }

    // validar que no este publicada
    if (property.published) {
        return res.redirect('/mis-propiedades')
    }

    //validar que  la propiedad pertenece al usuario que se logeo
    if(property.userId.toString() !== req.user.id.toString()){
        return res.redirect('/mis-propiedades')
    }

    // console.log("this is token:", req.csrfToken());

    res.render('properties/agregar-imagen', {
        page: 'Agregar imagen | ' + property.title,
        csrfToken : req.csrfToken(),
        property,
        // data : req.body
    })

  
}

const saveImage = async(req, res, next) =>{
    const {id } = req.params
    try {
        const property = await Property.findByPk(id)
        console.log(req.file)
        //Almacenar la imagen y publicar la propiedad
        property.image = req.file.filename
        property.published = 1
        await property.save()
        next()
    } catch (error) {
        console.log(error)
    }
}


const editar = async(req, res)=>{

    const { id } = req.params
    console.log(id)
    //validar que la propiedad exista
    const property = await Property.findByPk(id)


    if(!property){
        return res.redirect('/mis-propiedades')
    }

    //validar que la propiedad sea del usuario
    if(property.userId.toString() !== req.user.id.toString()){
        return res.redirect('/mis-propiedades')
    }

    // Consultando Precios y Categorias
    const [prices, categories] = await Promise.all([
        Price.findAll(),
        Category.findAll()
    ])

    property.category = property.categoryId;
    property.price = property.priceId;
    res.render('properties/edit',{
        page: 'Editar propiedad - ' + property.title,
        prices,
        categories,
        csrfToken : req.csrfToken(),
        data: property,
    })
}



export {
    admin,
    crear,
    guardar,
    agregarImagen,
    saveImage,
    editar
}