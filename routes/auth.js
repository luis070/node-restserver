const {Router} = require('express');
const { check } = require('express-validator');
const {login,googleSign } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login' ,[
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'el password no es valido debe ser mas de 6 letras CCC').isLength(6),


        validarCampos,

], login );

router.post('/google' ,[
    check('id_token', 'token de google es necesario').not().isEmpty(),
        validarCampos,
], googleSign );


module.exports = router;

