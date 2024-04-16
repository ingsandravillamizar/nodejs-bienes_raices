

import Property from './Property.js'
import Category from './Category.js'
import Price    from './Price.js'
import User     from './User.js'
import Message from './Message.js'


Property.belongsTo(Price)
Property.belongsTo(Category)
Property.belongsTo(User)

Property.hasMany(Message, {foreignKey :'propertyId'})  //una propiedad puede tener muchos mensajes para poder llamar el modelo mensajes al cosultar las propiedades
User.hasMany(Property)

Message.belongsTo(Property, {foreignKey :'propertyId'})
Message.belongsTo(User, {foreignKey :'userId'})


export{
    Property,
    Category,
    Price,
    User,
    Message
}