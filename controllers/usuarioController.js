import { generatorId } from "../helpers/token.js";
import User from "../models/User.js";
import { check, validationResult } from 'express-validator';
import { emailRegister } from '../helpers/emails.js'


const formLogin = (req, res) => {
      //Validar
      
    res.render('auth/login', {   
        page: 'Inicio de sesion' 
    });
}

const formRegister = (req, res) => {
    res.render('auth/register', {   
        page: 'Crear Cuenta'
    });
}

const formForgotPassword = (req, res) => {
    res.render('auth/forgot-password', {
        page: '¿Olvidaste tu contraseña?  Recuperala'
    });
}

const register = async (req, res) => {
    // console.log("registrando...");
    //console.log(req.body);
     //Validar


    //extraer datos
    const { name, email,   password } = req.body;

    await check('name').notEmpty().withMessage('El Nombre es Obligatorio').run(req)
    await check('email').isEmail().withMessage('El No cumple con las características de un correo ').run(req)
    await check('password').isLength({min:6}).withMessage('La Contraseña debe ser de minimo 6 caracteres ').run(req)
    await check('repeat_password').equals(password).withMessage('Las contraseñas no son iguales ').run(req)

    let result = validationResult(req)
    //verificar que no hya errores
    if(!result.isEmpty()){
        return res.render('auth/register',{
            page: 'Crear Cuenta',
            errors:  result.array(),
            user: {
                name:  name,
                email: email
            }
        })
    }

    //verificar que el usuario no este duplicado
    const userExist = await User.findOne({ where: { email }})

    if(userExist){
        return res.render('auth/register',{
            page: 'Crear Cuenta',
            errors: [{msg: 'El correo electronico ya existe'}],
            user: {
                name: name,
                email: email
            }
        })
    }

    // res.json(result.array())
    // return

    //almacenar el usuario
    const user = await User.create({
        name,
        email,
        password,
        token: generatorId()
    })

    //Enviar email de confirmación
    emailRegister({
        name: user.name,
        email: user.email,
        token: user.token
    });

    // Mensaje de confirmación
    res.render('layout/mensaje', {
        page: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un correo de confirmación, presiona en el enlace'
    })
    //res.json(user);
}


const iniciarSesion = async (req, res) => {

    //Validar
    await check('email').isEmail().withMessage('El No cumple con las características de un correo ').run(req)
    await check('password').isLength({min:6}).withMessage('La Contraseña debe ser de minimo 6 caracteres ').run(req)

    let result = validationResult(req)

    //verificar que no hya errores
    if(!result.isEmpty()){
        return res.render('auth/login',{
            page: 'Inicio de sesion',
            errors:  result.array()
        })
    }

}


const forgot = async (req, res) => {

    //Validar
    await check('email').isEmail().withMessage('El No cumple con las características de un correo ').run(req)

    let result = validationResult(req)

    //verificar que no hya errores
    if(!result.isEmpty()){
        return res.render('auth/forgot-password',{
            page: '¿Olvidaste tu contraseña?  Recuperala',
            errors:  result.array()
        })
    }

}


const confirmarTokenRegistro = async (req, res, next) =>{
    const { token } = req.params
    console.log(token)
    //verificar si el token es valido
    const user = await User.findOne({where:{ token }})
    if(!user){ //si no encontro el token
        return res.render('auth/account-confirm',{
            page: 'Error al confirmar la cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intentalo nuevamente',
            error: true
        })
    }

    //Confirmar la cuenta
    user.token = null
    user.confirmed = true
    await user.save()

    return res.render('auth/account-confirm',{
        page: 'Cuenta confirmada',
        mensaje: 'La cuenta ha sido confirmada de forma satisfactoria',
        error: false
    })
    next();
}

export {
    formLogin,
    formRegister,
    formForgotPassword,
    register,
    iniciarSesion,
    forgot,
    confirmarTokenRegistro
}
