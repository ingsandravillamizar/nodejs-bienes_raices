const formLogin = (req,res)=>{
    res.render('auth/login',{
        autenticado : false
    });
}

//Aqui me permite exportar varios elementos
export {
    formLogin
}