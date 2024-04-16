import Sequelize from 'sequelize'
import { Category, Price, Property} from '../models/index.js'


const home = async(req, res) =>{

    const [categories, prices, houses, departments ] =await Promise.all([

        Category.findAll({ raw : true }),   // si lo enviamos asi Category.findAll(), Price.findAll(): raw : true lo envia exclusivamente los registros          
        Price.findAll({ raw : true }),

        //houses
        Property.findAll({
            limit: 3,  //solo tres
            where:{
                categoryId: 1
            },
            include:[
                { model:Price },
                { model:Category }
            ],
            order:[
                ['createdAt', 'DESC']
            ]
        }),
        
        //departments
        Property.findAll({
            limit: 3,   //solo tres
            where:{
                categoryId: 2
            },
            include:[
                { model:Price },
                { model:Category }
            ],
            order:[
                ['createdAt', 'DESC']
            ]
        })
    

    ])

    
    // res.send("Inicio")

    res.render('home', {
        page: 'Inicio',
        categories,
        prices,
        houses,
        departments,
        csrfToken : req.csrfToken(),
        // properties,
        // paginacion: Math.ceil(total/limit),
        // paginaActual, offset, total, limit
    })
}

const categories = async(req, res) =>{

    const { id } = req.params

    //Comprobar que la propiedad exista
    const category = await Category.findByPk(id)
    if(!category){
        return res.redirect('/404')
    }

    //listar propiedades
    const properties = await Property.findAll({
        where:{
            categoryId: id,
            published : 1
        },
        include:[
            { model: Price},
            { model: Category},
        ]
    })

    res.render('category',{
        page:`Categoria | ${category.name}s`,
        properties,
        csrfToken : req.csrfToken()
    })
}

const nofFound = async(req, res) =>{
    res.render('404',{
        page: 'Oops No encontrado',
        csrfToken : req.csrfToken()
    })

}

const search = async(req, res) =>{

    console.log ("entro")
    const { termino } = req.body

    //validar que no este vacio el termino
    if(!termino.trim()){
        return res.redirect('back')
    }

    //consultar propiedades
    const properties = await Property.findAll({
        where: {
            title:{
                [Sequelize.Op.like] : '%' + termino + '%'
            }
        },
        include:[
            { model: Price }
        ]
    })

    res.render('search',{
        page: 'Resultado de busqueda',
        properties,
        csrfToken : req.csrfToken()
    })
}



export {
    home,
    categories,
    nofFound,
    search
}
