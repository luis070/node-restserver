const {Router} = require('express');

const {usuariosGet, usuariosPut, usuariosPost, usuariosDelet} = require('../controllers/usuarios')

const router = Router();

router.get('/', usuariosGet
// function (req, res) {
//     // res.send('Hello World')
//     res.json({
//         ok:true,
//         msg:'get get'
//     })
//   }
  )
  router.put('/:id', usuariosPut)
  router.post('/',usuariosPost)
  router.delete('/', usuariosDelet )
  


module.exports = router;