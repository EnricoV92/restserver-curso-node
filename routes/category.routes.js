

const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria,
    actualizarCategoria,
    borrarCategoria,
    obtenerCategoria,
    obtenerCategorias
} = require('../controllers/category.controller');
const { existeCategoriaPorID } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    esRolAdmin,
    tieneRol
} = require('../middlewares');

const router = Router();

router.get('/', obtenerCategorias); // Publico
// router.get('/', [
//     validarJWT,
// ], obtenerCategorias);

router.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], obtenerCategoria);

router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id', [
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    check('name','El nombre de la categoria es requerido').not().isEmpty(),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esRolAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], borrarCategoria);




module.exports = router;