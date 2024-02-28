
// 1.  Cargamos express     mediante //Common JS Modules
const express = require('express');

// 2.  crear la variable app  para LEVANTAR EL SERVIDOR 
const app = express();

//4. DEFINIR RUTAS crear routing
app.get('/', function(req,res){
    // res.json({msg:'hola mundo desde express'});
    res.send("Hola desde expresss")
});

app.get('/nosotros', function(req,res){
    res.send("Informacion de nuestra empresa");
});

//3.  Definir Puerto 
const port = 3000;
app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
});

