
const { Router } = require('express');
const { check } = require('express-validator');


const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validate-fields');


const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn );



module.exports = router;