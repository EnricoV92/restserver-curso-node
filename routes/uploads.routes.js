
const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, 
    actualizarImgCloudinary, 
    mostrarImg
} = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');




const router = Router();

// agregar middlewares
router.get('/:collection/:id', [
    check('id', 'No es un  ID válido').isMongoId(),
    check('collection').custom( (col) => coleccionesPermitidas(col, ['usuarios', 'productos'])),
    validarCampos
], mostrarImg)

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:collection/:id',[
    validarArchivoSubir,
    check('id', 'No es un  ID válido').isMongoId(),
    check('collection').custom( (col) => coleccionesPermitidas(col, ['usuarios', 'productos'])),
    validarCampos
], actualizarImgCloudinary);





module.exports = router;