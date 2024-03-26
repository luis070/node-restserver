const {Router} = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
const { existeCategoriaID,
    existeProductoID } = require('../helpers/db-validators')

const {validarCampos,
    validarJWT,
    esAdminRole,
    } = require('../middlewares');

    const {crearProducto,
        obtenerProducto,
        obtenerProductos,
        actualizarProducto,
        borrarProducto, } = require('../controllers/productos');

const router = Router();

// obtener todas las categorias - publico 
router.get('/',
obtenerProductos
)

//obtener una categria por id - public
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos
]
,obtenerProducto
)

// crear categoria - privado - cualquier persona con un token valido 
router.post('/', 
[ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),    
    check('categoria').custom(existeCategoriaID),
    validarCampos
], 
crearProducto
// function (req, res) {
//     //     // res.send('Hello World')
//         res.json({
//             ok:true,
//             msg:'get get'
//         })
//       }
 );


// cualquiera con token valido
router.put('/:id',[
validarJWT,
check('nombre','el nombre des obligatorio').not().isEmpty(),
check('id').custom(existeProductoID),
validarCampos
], 
actualizarProducto
// function (req, res) {
//         res.json({
//             ok:true,
//             msg:'get get'
//         })
//       }
)

// borrar una categoria con admin 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom(existeProductoID),
    validarCampos],
    borrarProducto)

module.exports = router;

