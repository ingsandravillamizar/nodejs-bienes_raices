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
        departments
        // csrfToken : req.csrfToken(),
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
            categoryId: id
        },
        include:[
            { model: Price},
            { model: Category},
        ]
    })

    res.render('category',{
        page:`Categoria | ${category.name}s`,
        properties
    })
}

const nofFound = async(req, res) =>{
    res.render('404',{
        page: 'Oops No encontrado'
    })

}

const search = async(req, res) =>{

}

export {
    home,
    categories,
    nofFound,
    search
}
