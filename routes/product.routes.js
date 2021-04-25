

const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/product.controller');

const { existeProductoPorID, existeCategoriaPorID } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    esRolAdmin,
} = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos); // Publico
// router.get('/', [
//     validarJWT,
// ], obtenerCategorias);

router.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category','La categoria del producto es requerida').not().isEmpty(), 
    check('category', 'El id de categoria no es valido').isMongoId(),
    check('category').custom(existeCategoriaPorID),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id', 'El id de producto no es valido').isMongoId(),
    check('category', 'El id de categoria no es valido').optional().isMongoId(), 
    check('category').optional().custom(existeCategoriaPorID), 
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esRolAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], borrarProducto);




module.exports = router;