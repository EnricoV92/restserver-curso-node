
const { Router } = require('express');
const { check } = require('express-validator');


const { usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch 
} = require('../controllers/user.controller');

const { esRoleValido, existeEmail, existeUsuarioPorID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validate-fields');


const router = Router();

router.get('/',  usuariosGet );

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La password es requerida').not().isEmpty(),
    check('password', 'La password debe ser de 6 letras o más').isLength({ min: 6 }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(existeEmail),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
],  usuariosPost );

router.put('/:id', [
    check('id', 'No es un  ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('role').optional().custom(esRoleValido),
    validarCampos
],  usuariosPut );

router.delete('/:id', [
    check('id', 'No es un  ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
],  usuariosDelete );

router.patch('/',  usuariosPatch );



module.exports = router;