

// 1.  Cargamos express     mediante //ECMA-Script Modules, En package.json y agregar   "type": "module",
import express from 'express';     
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';

// 2.  crear la variable app  para LEVANTAR EL SERVIDOR 
const app = express();

// 7. Conexion a la base de datos

try {
    await db.authenticate();
    db.sync();
    console.info('Conexion exitosa a la base de datos');
} catch (error) {
    console.log(error);
}


//Habilitar lectura de datos
app.use(express.urlencoded({ extended: true }));

// 5.  Habilitar plantilla Pub:  configuramos
app.set('view engine', 'pug') //voy a utilizar un motor de plantillas llamado pug
app.set('views','./views')  // ruta donde estaran las vistas


// 6.  Carpeta Publica
app.use(express.static ('public'))

//4.  crear Routing
app.use('/auth', usuarioRoutes);  //vas a usar en la ruta principal usuarioRoutes 
app.use('/propiedades', usuarioRoutes);


//3.  Definir Puerto 
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
});