
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const { generarJWT } = require('../helpers/generator-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        //Verificar si el email existe
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                msg: 'El email no existe'
            });
        }

        //si el usuario esta activo
        if(!user.state) {
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        }

        //verificar contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/ Passord no correctos - password no valid'
            });
        }
        //generar el JWT
        const token = await generarJWT (user.id);

        res.status(200).json({
            user,
            token
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;
    
    try {
    
        const { name, email, img } = await googleVerify(id_token);
        let user = await User.findOne({email});

        if(!user) {
            //crear user
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            }

            user = new User(data);
            await user.save();
        }

        if(!user.state){
            return res.status(401).json({
                msg: 'Hable con el admin, usuario bloqueado'
            });
        }

        //generar el JWT
        const token = await generarJWT (user.id);
    
        res.status(200).json({
            msg:'Google Sign Ok!',
            user,
            token
        });      
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        });
    }


}

module.exports = {
    login,
    googleSignIn
}