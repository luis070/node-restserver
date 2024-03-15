const {response, request} = require('express');
const cryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');


const usuariosGet = async (req= request, res= response) => {
    // res.send('Hello World')
    // const query = req.query;

    // const {q,nombre = 'No name', apiKey,page=1,limit} = req.query

    // res.json({
    //   msg: 'get API - controlador',
    //   q,
    //   nombre,
    //   apiKey,
    //   page,
    //   limit
    //     // ok:true,
    //     // msg:'get get',
    //     // query
    // });
    const {limit = 5 , desde = 0} = req.query
    //el chiste por qutiar ususario y total es porque tienen un await por lo que
    //indica que se tiene que esperar haste que terminen para ejecutar la siguiente linea
    //que eso era normal en lenguajes mas viejo pero apra este no funciona asi ya que trabaja 
    //de forma paralelo y no lineal y como son dos acciones cada uno tomara x tiempo para ejecutar 
    //pero al juntarlo en el promise hace que tan solo sea una accion 
    // const usuario = await Usuario.find({estado: true})
    // .skip (Number(desde))
    // .limit(Number(limit));

    // const total = await Usuario.countDocuments({estado: true});

  const resp1 = await  Promise.all([
    Usuario.countDocuments({estado: true}),
    Usuario.find({estado: true})
    .skip (Number(desde))
    .limit(Number(limit))
  ])

    res.json({
      resp1
    })
  }

 const usuariosPut = async (req = request, res = response) => {
    // res.send('Hello World')
    const id = req.params.id
    const {password, google, correo,...resto} = req.body;

    // validar contra base de datos
    if (password) {
    //aqui se crea una semilla para encriptar la contraseña
    const salt = cryptjs.genSaltSync(15);
    //encripta la contraseña
    resto.password = cryptjs.hashSync(password, salt) 
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto)

    res.status(400).json({
        ok:true,
        msg:' put',
        id,
        usuario
    })
  }
  // antes era un function pero lo emplazo con async y agregue => para delcrar que una funcion anonima
  const usuariosPost= async (req, res= response) => {
    // res.send('Hello World')
    // const body = req.body;
    // const usuario = new Usuario(body);

    //esta funcion la converti middlewares para ejecutarlo en el momento de validar los campos
    // const errors= validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json(errors)
    // }

    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol})

    //verifica si el correo existe 
    // const existeEmail = await Usuario.findOne({correo});
    // if(existeEmail){
    //   return res.status(400).json({
    //     msg:'ese correo ya esta registrado'
    //   })
    // }

    //aqui se crea una semilla para encriptar la contraseña
    const salt = cryptjs.genSaltSync(15);
    //encripta la contraseña
    usuario.password = cryptjs.hashSync(password, salt)

    //guardar en bd

    await usuario.save();

    res.json({
      // msg:'post API',
      usuario
    })

    // res.status(201).json({
    //     ok:true,
    //     msg:'post la prueba funciona '
    //     ,body
    // })
  }
  // const usuariosDelet = function (req, res= response) {
    
  const usuariosDelet = async (req, res= response) => {
    // res.send('Hello World')
    const {id} = req.params;
    // const uid = req.uid;
//este borra el usuario como tal en la base de datos
// const usuario = await Usuario.findByIdAndDelete( id );

    // const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    const usuarioAutenticado = req.usuario

    res.json({usuarioAutenticado
      // ,usuario
    })
  }


  module.exports= {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelet,
  }