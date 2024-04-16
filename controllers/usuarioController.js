import { generatorJWT, generatorId } from "../helpers/token.js";
import User from "../models/User.js";
import { check, validationResult } from 'express-validator';
import { emailRecoverPassword, emailRegister } from '../helpers/emails.js'
import bcrypt from 'bcrypt'


const loginForm = (req, res) => {
      //Validar
    res.render('auth/login', {   
        page: 'Inicio de sesion',
        csrfToken : req.csrfToken() 
    });
}

const auth = async (req, res) => {

    //Validar
    await check('email').isEmail().withMessage('El correo electronico es obligatorio').run(req)
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

    let result = validationResult(req)

    //verificar que no hya errores
    if(!result.isEmpty()){
        return res.render('auth/login',{
            page: 'Inicio de sesion',
            csrfToken : req.csrfToken(),
            errors:  result.array()
        })
    }

    const { email, password} = req.body

    //validar si el usuario existe
    const user = await User.findOne({where: {email}})
    if(!user){
        return res.render('auth/login',{
            page: 'Inicio de sesión',
            csrfToken : req.csrfToken(),
            errors: [{msg: 'El Correo y/o contraseña es incorrecto'}]
        })
    }


    // comprobar si la cuenta ya esta confirmada
    if(!user.confirmed){
        return res.render('auth/login',{
            page: 'Inicio de sesión',
            csrfToken : req.csrfToken(),
            errors: [{msg: 'La cuenta no esta confirmada'}]
        })
    }

    // comprobar la contraseña
    if(!user.verifyPassword(password)){
        return res.render('auth/login',{
            page: 'Inicio de sesión',
            csrfToken : req.csrfToken(),
            errors: [{msg: 'El Correo y/o contraseña es incorrecto'}]
        })
    }

    //autenticar al usuario
    const token = generatorJWT({id: user.id, name: user.name, email: user.email})

    // almacenar token
    console.log(token)

    return res.cookie('_token', token,{
        httpOnly: true,
        // secure: true
    }).redirect('/mis-propiedades')
}


const registerForm = (req, res) => {
    res.render('auth/register', {   
        page: 'Crear Cuenta',
        csrfToken : req.csrfToken()
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
    //verificar que no hay errores
    if(!result.isEmpty()){
        return res.render('auth/register',{
            page: 'Crear Cuenta',
            csrfToken : req.csrfToken(),
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
            csrfToken : req.csrfToken(),
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
    res.render('layout/message', {
        page: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un correo de confirmación, presiona en el enlace'
    })
    //res.json(user);
}

const registerTokenConfirm = async (req, res, next) =>{
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





const forgotPasswordForm = (req, res) => {
    res.render('auth/forgot-password', {
        page: '¿Olvidaste tu contraseña?  Recuperala'
    });
}

const recoverPassword = async(req, res) => {

    console.log(req);
    //extraer datos o desestructurar 
    const { name, email,   password } = req.body;

        //Validar
        await check('email').isEmail().withMessage('No cumple con las características de un correo ').run(req)
        let result = validationResult(req)
    
        //verificar que no hay errores
        if(!result.isEmpty()){
            return res.render('auth/forgot-password',{
                page: '¿Olvidaste tu contraseña?  Recuperala',
                csrfToken : req.csrfToken(),
                errors:  result.array()
            })
        }

        //Si el formato del correo es correo Validar que exista en la base de datos
        const user = await User.findOne({ where: { email }})

        if(!user){
            return res.render('auth/forgot-password',{
                page: '¿Olvidaste tu contraseña?  Recuperala',
                csrfToken : req.csrfToken(),
                errors: [{msg: 'El correo electronico No esta registrado'}],
                user: {
                    email: email
                }
            })
        }

        //Generar Nuevo token y enviar correo
        user.token= generatorId();
        await user.save();
    
        //Enviar email de confirmación
        emailRecoverPassword({
            name: user.name,
            email: user.email,
            token: user.token
        });

        return res.render('layout/message',{
            page: 'Reestablece Password',
            mensaje: 'Hemos enviado un correo con las instrucciones para recuperar password',
            error: false
        })
        next();

}

const recoverTokenConfirm = async (req, res, next) =>{
    const { token } = req.params
    console.log(token)
    //verificar si el token es valido
    const user = await User.findOne({where:{ token }})
    if(!user){ //si no encontro el token
        return res.render('auth/account-confirm',{
            page: 'Reestablece tu contraseña',
            mensaje: 'Hubo un error al validar tu informacion, intentalo nuevamente',
            error: true
        })
    }

    return res.render('auth/account-recover',{
        page: 'Recuperando password',
        token
        // mensaje: 'La cuenta ha sido confirmada de forma satisfactoria',
       

    })
    next();
}

const recover  = async(req,res) => {

    console.log  (req.body);

 //extraer datos
    const {  password , token} = req.body;

    //Validar
    await check('password').isLength({min:6}).withMessage('La Contraseña debe ser de minimo 6 caracteres ').run(req)
    await check('repeat_password').equals(password).withMessage('Las contraseñas no son iguales ').run(req)    

    let result = validationResult(req)
    if(!result.isEmpty()){
        return res.render('auth/account-recover',{
            page: 'Recuperando Password',
            csrfToken : req.csrfToken(),
            errors:  result.array(),
            // user: {
            //     name:  name,
            //     email: email
            //}
        })
    }

    //Identificar el Usuario
    const user = await User.findOne({where:{ token }})
    if(!user){ //si no encontro el token
        res.render('layout/message', {
            page: 'Proceso Fallido o Intento de suplantacion',
            mensaje: '.......Error 404 .........'
        })
    }

    //Hashear la nueva contraseña y guardar

 
    const salt    = await bcrypt.genSalt(10)   
    user.password = await bcrypt.hash(password, salt)
    user.token = null
    user.save();


    return res.render('auth/account-confirm',{
            page: 'Password Reestablecido',
            mensaje: 'Tu nueva contraseña se ha almacenado correctmanete',
        error: false
    })

}

const logout = async(req, res) =>{
    //res.send('saliendo')
    return res.clearCookie('_token').status(200).redirect('/auth/login')
    
}


export {
    loginForm,
    auth,
    registerForm,
    register,
    registerTokenConfirm,
    forgotPasswordForm,
    recoverPassword,
    recoverTokenConfirm,
    recover,
    logout
}
