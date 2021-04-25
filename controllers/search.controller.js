const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async( term = '', res = response ) => {

    const esMongoID = ObjectId.isValid( term ); // TRUE 

    if ( esMongoID ) {
        const user = await User.findById(term);
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const users = await User.find({
        $or: [{ name: regex }, { correo: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: users
    });

}

const buscarCategorias = async( term = '', res = response ) => {

    const esMongoID = ObjectId.isValid( term ); // TRUE 

    if ( esMongoID ) {
        const category = await Category.findById(term);
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const categories = await Category.find({ name: regex, state: true });

    res.json({
        results: categories
    });

}

const buscarProductos = async( term = '', res = response ) => {

    const esMongoID = ObjectId.isValid( term ); // TRUE 

    if ( esMongoID ) {
        const product = await Product.findById(term)
                            .populate('category','name');
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const products = await Product.find({ name: regex, state: true })
                            .populate('category','name')

    res.json({
        results: products
    });

}


const search = ( req, res = response ) => {
    
    const { collection, term  } = req.params;

    if ( !coleccionesPermitidas.includes( collection ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (collection) {
        case 'users':
            buscarUsuarios(term, res);
        break;
        case 'categories':
            buscarCategorias(term, res);
        break;
        case 'products':
            buscarProductos(term, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }

}



module.exports = {
    search
}