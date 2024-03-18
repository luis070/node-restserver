const { response } = require("express");
const { check } = require('express-validator');

const cryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

const {generarJWT} = require('../helpers/generar-jwt');
const { googleVerify } = require("../helpers/google-verify");

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

const googleSign = async (req, res= response)  => {
    const {id_token} = req.body;

    try {

        // const googleUser = await googleVerify(id_token);
        // console.log(googleUser);


        // res.json({
        //     msg:'todo bien',
        //     id_token
        // })

        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                // ERROR 400 BAS REQUEST, Tengo un problema con el fetch que me sale error (index):46 POST http://localhost:8080/api/auth/google 400 (Bad Request)
                // salia este error porque no asigne rol con un valor para que este atento
                rol:'USER_ROLE'
            };

            usuario = new Usuario( data );
            // await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        })
        
    }



}

module.exports = {
    login,
    googleSign
}