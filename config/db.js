import { Sequelize } from "sequelize";
import dotenv from "dotenv";  //importar modulo dotenv 

dotenv.config({ path: '.env' });

const db = new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.DB_SERVER,
    dialect:'mysql',
    port: 3306,
    define: {timestamps:true},
    pool:{max:5, min:0, acquire:30000,idle:10000}
    

    // port: 3306,
})

export default db