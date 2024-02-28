

// 1.  Cargamos express     mediante //ECMA-Script Modules, En package.json y agregar   "type": "module",
import express from 'express';     



// 2.  crear la variable app  para LEVANTAR EL SERVIDOR 
const app = express();


//4. DEFINIR RUTAS crear routing
app.get('/', function(req,res){
    res.json({msg:'hola mundo desde express'});
});

app.get('/nosotros', function(req,res){
    res.send("Informacion de nuestra empresa");
});

//3.  Definir Puerto 
const port = 3000;
app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
});