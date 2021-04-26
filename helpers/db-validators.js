
const { User, Category, Product } = require('../models');
const Role = require('../models/role.model');



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

const existeCategoriaPorID = async (id) => {
    
    const existeCategoria = await Category.findById(id);
    if(!existeCategoria) {
        throw new Error(`La categoria con id: ${id} no existe`)
    }
}

const existeProductoPorID = async (id) => {
    
    const existeProducto = await Product.findById(id);
    if(!existeProducto) {
        throw new Error(`El producto con id: ${id} no existe`)
    }
}

const coleccionesPermitidas = ( col = '', colecciones = [] ) => {
    
    const c = colecciones.includes(col);
    if (!c) {
        throw new Error(`La coleccion ${col} no es permitida, ${colecciones}`)
    }
    return true;
}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID,
    coleccionesPermitidas
}