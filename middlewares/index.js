

const validaCampos  = require('../middlewares/validate-fields');
const validaJWT = require('../middlewares/validate-jwt');
const validaRoles= require('../middlewares/validate-role');
const validaArchivos= require('../middlewares/validate-file');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validaArchivos
}