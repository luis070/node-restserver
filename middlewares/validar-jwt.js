
const { response, request} = require('express');
const jwt = require('jsonwebtoken')


const Usuario = require('../models/usuario');

const validarJWT =async (req = request, res = response, next) =>{

  const token = req.header('x-token');

  // console.log(token);
  if(!token){
    return res.status(401).json({
      msg:'no hay token en la peticion'
    })
  }

 try {
  const {uid} = jwt.verify( token, process.env.SECRETKEY );

  // leer el usuario que corresponde al uid
  const usuario = await Usuario.findById( uid );

  if( !usuario ) {
      return res.status(401).json({
          msg: 'Token no válido - usuario no existe DB'
      })
  }

  // Verificar si el uid tiene estado true
  if ( !usuario.estado ) {
      return res.status(401).json({
          msg: 'Token no válido - usuario con estado: false'
      })
  }
  
  
  // req.usuario = usuario;
  // console.log(uid);
  // req.uid = uid;
  req.usuario= usuario
  next();

 } catch (error) {
  console.log(error);
  res.status(401).json({
    msg:'token no valido'
  })
 }

}

module.exports = {
  validarJWT
}
 