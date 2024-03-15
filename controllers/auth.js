const { response } = require("express");
const { check } = require('express-validator');

const cryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

const {generarJWT} = require('../helpers/generar-jwt');

const login = async(req, res = response ) => {

    const {correo, password } = req.body   

    try {
        
        //verificar si el correo existe

        
    const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'usuario o contraseña esta mal'
            })
            
        }
        //si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'usuario suspendido'
            })
            
        }
        //verificar la 
        
        const validarPas = cryptjs.compareSync( password, usuario.password);
        if (!validarPas) {
            return res.status(400).json({
                msg:'constraseña no valida'
            })
            
        }


        //generar el jwt
        const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    })
    } catch (error) {
      console.log(error);  
      return res.status(500).json({
        msg:'hable con el administrador'
      })
    }

}

module.exports = {
    login
}