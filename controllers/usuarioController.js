const formLogin = (req,res)=>{
    res.render('auth/login'),{
        page : 'Inicio de sesion' 
    };
}

const formRegister = (req,res)=>{
    res.render('auth/register'),{
        page: 'Crear Cuenta'
    };
}

const formForgotPassword = (req, res) =>{
    res.render('auth/forgot-password', {
        page : '¿Olvidaste tu contraseña?  Recuperala'
    })
}

//Aqui me permite exportar varios elementos
export {
    formLogin,
    formRegister,
    formForgotPassword
}