import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from 'bcrypt'
 


const User = db.define('users',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
},
{
    hooks: {
        //Antes de insertar con brcypt generar un salt y unirlo con el password para que al guardar quede encriptado en la base de datos
        beforeCreate: async function(user){
            const salt    = await bcrypt.genSalt(10)   
            user.password = await bcrypt.hash(user.password, salt)
        }
    },
    //Para consultas
    scopes:{
        deletePassword:{
            attributes:{
                exclude: ['password', 'token', 'createdAt', 'updatedAt', 'confirmed']
            }
        }
    }
})




//Metodo personalizado
User.prototype.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}
export default User