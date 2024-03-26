const {Router} = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
const { existeCategoriaID } = require('../helpers/db-validators')

const {validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole} = require('../middlewares');

    const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');

const router = Router();

// obtener todas las categorias - publico 
router.get('/',
obtenerCategorias
)

//obtener una categria por id - public
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCampos
]
,obtenerCategoria
)

// crear categoria - privado - cualquier persona con un token valido 
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );


// cualquiera con token valido
router.put('/:id',[
validarJWT,
check('nombre','el nombre des obligatorio').not().isEmpty(),
check('id').custom(existeCategoriaID),
validarCampos
], actualizarCategoria)

// borrar una categoria con admin 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom(existeCategoriaID),
    validarCampos],
    borrarCategoria)

module.exports = router;

