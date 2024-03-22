
import  jwt  from "jsonwebtoken";
import { User } from "../models/index.js";
 

const protectRoute = async (req, res, next)=>{
   //VERIFICAR QUE EXISTA UN TOKEN
   // cuando el usuario se logea se genera un token 
   // y se guarda en una cookie
   // esa cookie viene en el req,  de esta manera puedo saber si existe un token
   //console.log('Cookie:', req.cookies._token);
    const { _token}  = req.cookies;   //Desestructuramos para tener el token
    if (!_token){
        return res.redirect('auth/login');
    }

   //COMPROBAR LA VALIDEZ DEL TOKEN
    try {
        const decoded = jwt.verify(_token,  process.env.JWT_SECRET)   // console.log(decoded)
        const user = await User.scope('deletePassword').findByPk(decoded.id)    
        console.log(user)
        
        if (user){
            req.user  = user
        }else{
            return res.redirect('auth/login');
        }
        return next()
    } catch (error) {
        // console.log(error);  //jwt malformed
        return res.clearCookie('_token').redirect('auth/login');
    
    }

    next();
}

export default protectRoute;