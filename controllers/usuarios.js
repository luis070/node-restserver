const {response, request} = require('express');

const usuariosGet = function (req= request, res= response) {
    // res.send('Hello World')
    const query = req.query;

    res.json({
        ok:true,
        msg:'get get',
        query
    })
  }

 const usuariosPut = function (req = request, res = response) {
    // res.send('Hello World')

    const id = req.params.id

    res.status(400).json({
        ok:true,
        msg:' put',
        id
    })
  }
  const usuariosPost= function (req, res= response) {
    // res.send('Hello World')
    const body = req.body;


    res.status(201).json({
        ok:true,
        msg:' post'
        ,body
    })
  }
  const usuariosDelet = function (req, res= response) {
    // res.send('Hello World')
    res.json({
        ok:true,
        msg:' delete'
    })
  }


  module.exports= {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelet,
  }