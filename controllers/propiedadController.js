const admin = (req, res)=>{
    res.render('properties/admin', {
        page: 'Mis propiedades',
        topbar: true
    })
}

const crear = (req, res) =>{
    res.render('properties/create',{
        page: 'Crear propiedad',
        topbar: true
    })
}

export {
    admin,
    crear
}