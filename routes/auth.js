const {Router} = require('express');
const { check } = require('express-validator');
const {login} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login' ,[
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'el password no es valido debe ser mas de 6 letras CCC').isLength(6),


        validarCampos,

], login );










module.exports = router;