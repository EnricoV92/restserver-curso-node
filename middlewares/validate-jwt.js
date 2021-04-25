
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validarJWT = async (req = request, res = response, next ) => {

    const token = req.header('my-token');
    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        userAuth = await User.findById(uid);
        
        // verificar si exist el user con el uid
        if(!userAuth){
            return res.status(401).json({
                msg: 'Token no valido - user no existe en la db'
            });
        }
        //verificar si el user state = true
        
        if(!userAuth.state){
            return res.status(401).json({
                msg: 'Token no valido - user state = false'
            });
        }

        req.userAuth = userAuth;
        

        next();
        
    } catch (error) {
        // script heroku logs -n 100 --tail ver los logs en backend de produccion
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }    
    

    
}

module.exports = {
    validarJWT
}