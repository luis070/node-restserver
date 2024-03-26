
const Role = require('../models/role');
const {Usuario,Categoria,Producto} = require('../models');
// const categoria = require('../models/categoria');
const roleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
      throw new Error(`el rol ${rol} no existe porque no entra`);
    }
  }

const validarEmail = async(correo = '') => {
   const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
      // return res.status(400).json({
      //   msg:'ese email ya esta registrado Pendejo'
      // })
      throw new Error(`el rol ${correo} email ya esta registrado Pendejo`);
    }
}

const existeUsuarioId = async (id) =>{
  const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario){
    throw new Error(`el id es valido pero no existe en la base de datos ${id}`);
  }
}

const existeCategoriaID = async(id) =>{
  const existeCat = await Categoria.findById(id);
  if(!existeCat){
    throw new Error(`el id no es de una categoria - ${id}`);
  }
}
const existeProductoID = async(id) =>{
  const existeCat = await Producto.findById(id);
  if(!existeCat){
    throw new Error(`el id no es de una categoria - ${id}`);
  }
}

  module.exports = {
    roleValido,
    validarEmail,
    existeUsuarioId,
    existeCategoriaID,
    existeProductoID
  }