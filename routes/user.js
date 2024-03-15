const {Router} = require('express');
const { check } = require('express-validator');

const {usuariosGet, 
  usuariosPut, 
  usuariosPost, 
  usuariosDelet} = require('../controllers/usuarios');
const {roleValido, 
  validarEmail,
  existeUsuarioId} = require('../helpers/db-validators')

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, 
// tieneRole } = require('../middlewares/validar-roles');

const {validarCampos,
validarJWT,
esAdminRole,
tieneRole} = require('../middlewares');

const Role = require('../models/role');


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
  router.put('/:id',[
    check('id', 'no es un id valido de mongo').isMongoId(),
    check('id').custom( existeUsuarioId),
    check('correo').custom( validarEmail),
    validarCampos
  ], usuariosPut)
  //en este caso se esta enviando un midlewere 
  router.post('/'  
  ,check('nombre', 'el nombre no es valido AAAAAAA').not().isEmpty()  
  ,check('password', 'el password no es valido debe ser mas de 6 letras CCC').isLength(6)
  ,check('correo', 'el correo no es valido BBBBBBBBBB').isEmail()    
  ,check('correo').custom( validarEmail)
  // ,check('rol', 'el rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE'])
  // ,check('rol').custom(async(rol = '') =>{
  //   const existeRol = await Role.findOne({rol});
  //   if (!existeRol) {
  //     throw new Error(`el rol ${rol} no existe porque no entra`);
  //   }
  // }) 

  ,check('rol').custom( (rol) => roleValido(rol))
  ,validarCampos
  ,usuariosPost)
  router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'no es un id valido de mongo').isMongoId(),
    check('id').custom( existeUsuarioId),
    validarCampos

  ], usuariosDelet )
  
  // ,check('rol', 'el rol no es valido').isIn('ADMIN_ROLE','USER_ROLE')
  // el custom recibe el valor a evaluar
  // ,check('rol').custom(async(rol = '') =>{
  //   const existeRol = await Role.findOne({correo});
  //   if (!existeRol) {
  //     throw new Error(`el rol ${rol} no existe `)      ;
  //   }
  // }) 

module.exports = router;