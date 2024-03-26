const {response} = require('express');
const {ObjectId } = require('mongoose').Types;

const {Usuario, Categoria, Producto }= require('../models')

const coleccinesPermitidas = [
    'usuario',
    'categoria',
    'productos',
    'roles'
]


const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        results: categorias
    });

}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const productos = await Producto.find({ nombre: regex, estado: true })
                            .populate('categoria','nombre')

    res.json({
        results: productos
    });

}
  

// const buscarUsario = async(termino='',res=response) =>{
//     const esMongoID = ObjectId.isValid(termino);

//     if (esMongoID) {
//         const usuario = await Usuario.findById(termino);
//         return res.json({
//             results: (usuario) ? [usuario] : []
//         })
//     }

//     //busca no importa may o min
//     const regex = new RegExp(termino,'i');

//     //esto es para buscar por el nombre y no por el id 
//     const usuarios = await Usuario.find({nombre:regex});

//     res.json({
//         results: usuarios
//     })
// }

const buscar =(req,res = response) => {
      
    const {coleccion, termino} = req.params;



    if (!coleccinesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg:`la coleccioes permitidas son las siguietes ${coleccinesPermitidas}`
        })
        
    }
 

    switch (coleccion) {
        case 'usuario':
            buscarUsuarios(termino,res);
            break;

        case 'categoria':
            buscarCategorias(termino,res);
            break;
        case 'productos':
            buscarProductos(termino,res);         
            break;    
    
        default:
            res.status(500).json({
                msg:'se le ovldo hacer esta busqueda'
            })
            break;
    }
    // res.json({
    //     // msg:'buscar'
    //     coleccion, termino
    // })
}

module.exports={
    buscar
}