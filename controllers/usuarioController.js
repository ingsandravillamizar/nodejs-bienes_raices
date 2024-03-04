import User from "../models/User.js";
import { check, validationResult } from 'express-validator';

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
     console.log(req.body);

    //Validar
    await check('name').notEmpty().withMessage('El Nombre es Obligatorio').run(req)
    await check('email').isEmail().withMessage('El No cumple con las características de un correo ').run(req)
    await check('password').isLength({min:6}).withMessage('La Contraseña debe ser de minimo 6 caracteres ').run(req)
    await check('repeat_password').equals('password').withMessage('Las contraseñas no son iguales ').run(req)

    let result = validationResult(req)

    //verificar que no hya errores
    if(!result.isEmpty()){
        return res.render('auth/register',{
            page: 'Crear Cuenta',
            errors:  result.array()
        })
    }

    // res.json(result.array())
    // return

    const user = await User.create(req.body);
    res.json(user);
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


 

export {
    formLogin,
    formRegister,
    formForgotPassword,
    register,
    iniciarSesion,
    forgot
}
