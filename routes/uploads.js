const {Router} = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
const { existeCategoriaID,
    existeProductoID } = require('../helpers/db-validators')

const {validarCampos,
    validarJWT,
    esAdminRole,
    } = require('../middlewares');

    const {buscar } = require('../controllers/buscar');

const router = Router();

// obtener todas las categorias - publico 
router.get('/:coleccion/:termino',
buscar
)


module.exports = router;

