const { response } = require('express')

const esAdminRole = ( req, res = response, next )=> {

    if (!req.usuario) {
        return res.status(500).json({
            msg:'token no valido - usuario con estado: false'
        })
    }

    const {rol, nombre} = req.usuario;

    if (rol!='ADMIN_ROLE') {
        return res.status(401).json({
            msg:`${nombre} no es administrador - No puede hacer esto`
        })
    }

    next();
}

const tieneRole = (...restoArgumentos ) => {
    return (req, res = response, next) => {


        if (!req.usuario) {
            return res.status(500).json({
                msg:'token no valido - usuario con estado: false'
            })
        }
        console.log( req.usuario.rol);
        if (!restoArgumentos.includes(req.usuario.rol )) {
            return res.status(401).json({
                msg:`rol no valido, los roles son ${restoArgumentos}`
            })            
        }
        // if ( !restoArgumentos.includes( req.usuario.rol ) ) {
        //     return res.status(401).json({
        //         msg: `El servicio requiere uno de estos roles ${ restoArgumentos }`
        //     });
        // }

        // console.log(restoArgumentos);

        next();
    }

}

module.exports={
    esAdminRole,
    tieneRole
}