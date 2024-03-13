
const Role = require('../models/role');
const Usuario = require('../models/usuario');
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

  module.exports = {
    roleValido,
    validarEmail,
    existeUsuarioId,

  }