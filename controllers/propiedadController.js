
import { validationResult } from 'express-validator';
import { Category, Price, Property, Message, User } from '../models/index.js'
import {unlink} from 'node:fs/promises'
import { isSeller, formateDate } from '../helpers/index.js'

const admin = async (req, res)=>{

    //PAGINACION
    //propiedad?page=1
    //leer query string
    console.log(req.query)
    
    //leer query string
    const {page:paginaActual, order } = req.query

    //expresion regular:  grupo de caracteres que se compara con un dato para ver si cumple con las reglas 
    const expresion  = /^[0-9]$/       //recibir solo numero  ^el inicio es con numero y $ el final es con numero
    //expresion.text(page)            // toma page y ve si cumple con la expresion regresa un booleano

    if( !expresion.test(paginaActual) ){
        return res.redirect('/mis-propiedades?page=1')
    }

    // if(!isNaN (page))    Esto pregunta si no es un numero ES OTRA forma de validar


    try {
        const { id } = req.user

        //Para paginar necesitamos dos variables el limit y el offset  1-10  11-20 21-30

        const limit  = 4
        const offset =(paginaActual*limit)- limit


        /**
         * si limit = 10
         * 1 * 10 = 10-10  = 0   offset inicial  sera 0
         * 2 * 10 = 20-10  = 10  offset 10
         * 3 * 10 = 30-10  = 20  offset 20
         */
        


        const [properties, total] = await Promise.all ([
            //PRIMER ELEMENTO DE LA PROMESA  properties
            Property.findAll({   //las consultas siempre deben llevar un await
                limit,                 // limit = limit
                offset: offset,        // o lo podemos dejar como offset  solo no necesariamente  offset:ofsset depende de como llamamos la constante
                where :{
                    userId : id
               
                },
                include: [  //Esto es como hacer un Join entre propiedades y categorias
                    { model: Category},
                    { model: Price},
                    { model: Message}
                ]
            }),

            //SEGUNDO  ELEMENTO DE LA PROMESA   total
            Property.count({    
                where :{
                    userId : id
                }
            })
        ]) 

        
        res.render('properties/admin', {
            page: 'Mis propiedades',
            csrfToken : req.csrfToken(),
            properties,
            paginacion: Math.ceil(total/limit),
            paginaActual, offset, total, limit
        })
        
    } catch (error) {
        console.log(error)
    }

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

    // property.category = property.categoryId;
    // property.price = property.priceId;

    res.render('properties/edit',{
        page: 'Editar propiedad - ' + property.title,
        prices,
        categories,
        csrfToken : req.csrfToken(),
        data: property,
    })
}

const actualizar = async(req,res) => {

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


    // Resultado de la validación
    let result = validationResult(req)
    if(!result.isEmpty()){
        const [prices, categories] = await Promise.all([
            Price.findAll(),
            Category.findAll()
        ])
        res.render('properties/edit', {
            page: 'Editar propiedad - ' + property.title,
            prices,
            categories,
            errors: result.array(),
            csrfToken : req.csrfToken(),
            data : req.body             // Envio el req.body que son los datos del formulario
        })
    }   


        //Actualizar los datos de la propiedad



        const {title,description, rooms, parking, wc , address, lat, lng , price:priceId, category:categoryId} = req.body;   //desestructuramos del body
    
        //console.log ("este es el usuario logeado. " , req.user)
        const { id:userId } = req.user;

        try {
            //creamos una constante, con un metodo await para crear la propiedad
            Property.set({
                title,
                description,
                rooms,
                parking,
                wc,
                address,
                lat,
                lng,
                priceId ,
                categoryId
            })
            await property.save()
            return res.redirect('/mis-propiedades');

            
        } catch (error) {
            console.log(error);
        }
    
}

const eliminar = async(req,res) => {
   // res.send("eliminando")
    const { id } = req.params

    //validar que la propiedad exista
    const property = await Property.findByPk(id)
    if(!property){
        return res.redirect('/mis-propiedades')
    }

     //validar que la propiedad sea del usuario
    if(property.userId.toString() !== req.user.id.toString()){
        return res.redirect('/mis-propiedades')
    }


    //Eliminar la imagen
    await unlink(`public/uploads/${property.image}`)
    console.log(`imagen eliminada ${property.image}`)


    //Eliminar el registro
    await property.destroy()
    return res.redirect('/mis-propiedades')


}



const actualizarPublicado = async(req,res) => {
    // res.send("eliminando")
    const { id } = req.params

     //validar que la propiedad exista
    const property = await Property.findByPk(id)
    if(!property){
        return res.redirect('/mis-propiedades')
    }

      //validar que la propiedad sea del usuario
    if(property.userId.toString() !== req.user.id.toString()){
        return res.redirect('/mis-propiedades')
    }

     //Actualizar published el registro
    const published = (property.published == 1) ? 0:1
    property.set({published})
    await property.save()
    return res.redirect('/mis-propiedades')
}

const verPropiedad = async(req,res) => {
    const { id } = req.params

    console.log("usuario:", req.user)

     //validar que la propiedad exista
    const property = await Property.findByPk(id,{
        include: [  //Esto es como hacer un Join entre propiedades y categorias
        { model: Category},
        { model: Price}
    ]
    })

    if(!property || !property.published ){
        //return res.render('/mis-propiedades')
        return res.redirect('/404')

    }

    res.render('properties/show', {
        property,
        page: property.title,
        csrfToken : req.csrfToken(),
        user: req.user,
        isSeller : isSeller(req.user?.id, property.userId) //true o false

    })
}

const sendMessage = async(req, res) => {
    const { id } = req.params
    //validar que la propiedad exista
    const property = await Property.findByPk(id, {
        include: [
            { model: Price },
            { model: Category }
        ]
    })
    if(!property){
        return res.redirect('/404')
    }

    //mostrar los errores
    let result = validationResult(req)
    if(!result.isEmpty()){
        return res.render('properties/show', {
            page: property.title,
            property,
            csrfToken : req.csrfToken(),
            user: req.user,
            isSeller : isSeller(req.user?.id, property.userId), //true o false
            errors: result.array(),
        })
    }

    const { message } = req.body
    const { id: propertyId } = req.params
    const { id: userId } = req.user
    //Almacenar el mensaje
    await Message.create({
        message ,
        propertyId,
        userId
    })

    res.redirect('/mis-propiedades')

    // res.render('properties/show', {
    //     page: property.title,
    //     property,
    //     csrfToken : req.csrfToken(),
    //     user: req.user,
    //     isSeller : isSeller(req.user?.id, property.userId), //true o false
    //     send: true
    // })
}


//leer los mensajes
const showMessages = async (req, res) =>{

    const { id } = req.params
    
    //validar que la propiedad exista

    /**
     *  propiedades -> mensajes -> usuario (Daniel)
     * 
     */
    const property = await Property.findByPk(id,{
        include: [
            { model: Message, 
                include: [
                    { model: User.scope('deletePassword') }
                ]
            },
        ]
    })
    if(!property){
        return res.redirect('/mis-propiedades')
    }

    //validar que la propiedad sea del usuario
    if(property.userId.toString() !== req.user.id.toString()){
        return res.redirect('/mis-propiedades')
    }

    res.render('properties/message',{
        page: 'Mensajes',
        messages: property.messages,
        formateDate
    })
}


export {
    admin,
    crear,
    guardar,
    agregarImagen,
    saveImage,
    editar,
    actualizar,
    eliminar,
    actualizarPublicado,
    verPropiedad,
    sendMessage,
    showMessages

}