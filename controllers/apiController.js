
import {Property, Category, Price} from '../models/index.js'

const propiedades = async(req, res) =>{

    
    //Cargamos las propiedades
    const propiedades = await Property.findAll({
        include: [
            {model: Price},
            {model: Category}
        ]
    })



    //Enviamos un Json
    // res.json( {
    //     propiedades
    // })

    res.json(propiedades)
}


export {
    propiedades
}
