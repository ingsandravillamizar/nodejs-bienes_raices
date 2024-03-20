import { exit } from 'node:process'
import db from "../config/db.js"

import { Category, Price, User} from '../models/index.js'
import categories from "./categories.js"
import prices from './prices.js'
import users from './users.js'

const importData = async () =>{
    try {
            //Autenticar
            await db.authenticate();

            //Crear las columnas
            await db.sync();

            //Poblar las tablas
            await Promise.all([
                Category.bulkCreate(categories),
                Price.bulkCreate(prices),
                User.bulkCreate(users)
            ])

            console.log("Datos importados de forma exitosa...")
            exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}


const deleteData = async () =>{
    try {
        // await Promise.all([
        //     Category.destroy({ where: {}, truncate: true}),
        //     Price.destroy({where: {}, truncate: true}) //truncate: true, reiniciar el contador del ID
        // ])

        await db.sync({force: true})   //otra manera de eliminar de forma forzada nuestros datos

        console.log("Datos eliminados...");
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}


if(process.argv[2] == "-i"){
    importData()
}

if(process.argv[2] == '-d'){
    deleteData()
}