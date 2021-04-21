

const validaCampos  = require('../middlewares/validate-fields');
const validaJWT = require('../middlewares/validate-jwt');
const validaRoles= require('../middlewares/validate-role');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}