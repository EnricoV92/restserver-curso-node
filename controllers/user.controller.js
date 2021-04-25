
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user.model');


const usuariosGet = async (req = request, res = response) => {

    
    // Validar que limite y desde son numeros
    const {limit = 5, from = 0} = req.query;
    const query = {state: true};
    
    // const users = await User.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const usuariosPost = async (req, res = response) => {

    
    const { name, email, password, role } = req.body;
    const user = new User({
        name,
        email,
        password,
        role
    });

    // Encriptar la password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save user en db
    await user.save();

    res.json({
        user
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...data} = req.body;

    if(password) {
        // Encriptar la password
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data, {new: true});
    

    res.json({
        user
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    
    // Delete fisicamente
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {state: false});
    const userAuth = req.userAuth;
    res.status(200).json({
        user 
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador' 
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}