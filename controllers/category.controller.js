const { response } = require('express');
const { Category } = require('../models');


const obtenerCategorias = async (req, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const query = {state: true};
    
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate('user', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });
}


const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;
    const cat = await Category.findById(id).populate('user', 'name');

    res.status(200).json({
        cat
    });
}



const crearCategoria = async (req, res = response) => {

    const name = req.body.name.toUpperCase();
    const cat = await Category.findOne({name});

    if(cat) {
        return res.status(400).json({
            msg: `La categoría ${cat}, ya existe`
        });
    }

    const data = {
        name,
        user: req.userAuth._id
    }

    const newCat = new Category(data);
    await newCat.save();
    res.status(201).json(newCat);

}

const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.userAuth._id;

    const cat = await Category.findByIdAndUpdate(id, data, {new: true});
    
    res.status(200).json({
        cat
    });
}

const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const data = {
        state: false,
        user: req.userAuth._id
    }


    const cat = await Category.findByIdAndUpdate(id, data);
    res.status(200).json({
        cat
    });
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}