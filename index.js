

// 1.  Cargamos express     mediante //ECMA-Script Modules, En package.json y agregar   "type": "module",
import express from 'express';     
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadRoutes from './routes/propiedadRoutes.js';
import db from './config/db.js';
import cookieParser from 'cookie-parser';
import csurf from 'tiny-csrf';



// 2.  crear la variable app  para LEVANTAR EL SERVIDOR 
const app = express();

// 7. Conexion a la base de datos

try {
    await db.authenticate();
    console.info('Conexión exitosa a la base de datos');
    await db.sync();
    console.info('Sincronización completada');
 
} catch (error) {
    console.log(error);
}


//Habilitar lectura de datos
app.use(express.urlencoded({ extended: true }));

//Habilitar Cookie Parser
app.use(cookieParser("cookie-parser-secret"));

// Habilitar el CSRF
app.use(csurf("123456789iamasecret987654321look"));   //string de 32 caracteres


// 5.  Habilitar plantilla Pub:  configuramos
app.set('view engine', 'pug') //voy a utilizar un motor de plantillas llamado pug
app.set('views','./views')  // ruta donde estaran las vistas


// 6.  Carpeta Publica
app.use(express.static ('public'))

//4.  crear Routing
app.use('/auth', usuarioRoutes);  //vas a usar en la ruta principal usuarioRoutes 
app.use('/', propiedadRoutes);


//3.  Definir Puerto 
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
});