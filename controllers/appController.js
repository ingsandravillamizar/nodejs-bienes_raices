
const home = async(req, res) =>{

    // res.send("Inicio")

    res.render('home', {
        // page: 'Mis propiedades',
        // csrfToken : req.csrfToken(),
        // properties,
        // paginacion: Math.ceil(total/limit),
        // paginaActual, offset, total, limit
    })
}

const categories = async(req, res) =>{

}

const nofFound = async(req, res) =>{


}

const search = async(req, res) =>{

}

export {
    home,
    categories,
    nofFound,
    search
}
