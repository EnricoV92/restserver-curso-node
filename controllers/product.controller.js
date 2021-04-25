const { response } = require('express');
const { Product } = require('../models');


const obtenerProductos = async (req, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const query = {state: true};
    
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name') 
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        products
    });
}


const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;
    const prod = await Product.findById(id)
                                .populate('user', 'name')
                                .populate('category', 'name');
    res.status(200).json({
        prod
    });
}



const crearProducto = async (req, res = response) => {

    const { state, user, name, ...body} = req.body;
    
    let queryName =  name.toUpperCase()

    const prod = await Product.findOne({name: queryName});

    if(prod) {
        return res.status(400).json({
            msg: `El producto ${prod.name}, ya existe`
        });
    }   

    const data = {
        name: name.toUpperCase(),
        user: req.userAuth._id,
        ...body
    }

    const newProd = new Product(data);
    await newProd.save();
    res.status(201).json(newProd);

}

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if(data.nombre) data.name = data.name.toUpperCase();
    data.user = req.userAuth._id;

    const prod = await Product.findByIdAndUpdate(id, data, {new: true});
    
    res.status(200).json({
        prod
    });
}

const borrarProducto = async (req, res = response) => {

    const { id } = req.params;
    const data = {
        state: false,
        user: req.userAuth._id
    }


    const prod = await Product.findByIdAndUpdate(id, data);
    res.status(200).json({
        prod
    });
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}