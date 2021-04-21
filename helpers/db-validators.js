
const Role = require('../models/role.model');
const User = require('../models/usuario.model');


const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if(!existeRol) {
        throw new Error(`El rol ${role} no existe en la db`);
    }
}

const existeEmail = async (email = '') => {

    const existeEmail = await User.findOne({ email });
    if(existeEmail) {
        throw new Error(`El email: ${email}, ya está registrado en la db`);
    }
}

const existeUsuarioPorID = async (id) => {
    const existeUsuario = await User.findById(id);
    if(!existeUsuario) {
        throw new Error(`El usuario con id: ${id} no existe`)
    }

} 


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorID
}