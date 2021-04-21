const { response } = require('express');


const esRolAdmin = (req, res = response, next) => {

    if(!req.userAuth) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { role , name } = req.userAuth;
    
    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${name} no es administrdor - petición denegada`
        });
    } 

    next();
}

const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        
        if(!req.userAuth) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.userAuth.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}


module.exports = {
    esRolAdmin,
    tieneRol
}