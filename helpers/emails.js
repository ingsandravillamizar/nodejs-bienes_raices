import nodemailer from 'nodemailer'

const emailRegister = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secureConnection: true,
        debug: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const {email, name, token} = data

    // Enviar el email
    await transport.sendMail({
        from: process.env.EMAIL_USERNAME,
        // from: 'Bienes Raices',
        to: email,
        subject: 'Confirma tu cuenta en Bienes Raices',
        text:'Confirma tu cuenta en Bienes Raices',
        html: `
            <p>Hola, ${name}, comprueba tu cuenta en Bienes Raices</p>

            <p>Solo debes confirmar dando click en el siguiente enlace: <a href='${process.env.URL_BACKEND}:${process.env.PORT}/auth/confirm-register/${token}'>Confirmar Cuenta</a></p>

            <p>Si tu no solicitaste Recuperacion de Password, has caso omiso al mensaje.</p>
        `
    })
}

const emailRecoverPassword = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const {email, name, token} = data

    // Enviar el email
    await transport.sendMail({
        from: 'Bienes Raices',
        to: email,
        subject: 'Reestablece tu Contraseña ',
        text:'Reestablece tu password en Bienes Raices',
        html: `
            <p>Hola, ${name}, Has solicitado reestablecer tu contraseña en Bienes Raices</p>

            <p>Lo puedes realizar dando click en el siguiente enlace: <a href='${process.env.URL_BACKEND}:${process.env.PORT}/auth/confirm-recover/${token}'>Reestablecer Password </a></p>

            <p>Si tu no creaste esta cuenta, has caso omiso al mensaje.</p>
        `
    })
}
export {
    emailRegister,
    emailRecoverPassword
}