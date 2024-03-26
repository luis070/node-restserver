const cors = require('cors')
const express = require('express');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths={
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            buscar: '/api/buscar',
        }

        // this.usuariosPath = '/api/usuarios'
        // this.authPath= '/api/auth'


        //conecatar a la base de datos
        this.conectarDB();

        // middlewares 
        this.middlewares();

        // rutas de mi aplicacion
        this.routes();

        
    }

    
    async conectarDB(){
        await dbConnection();
    }
    
    middlewares(){
        // cors
        this.app.use(cors())

        // parse y elctura del body
        this.app.use(express.json());

            //directorio publico
        this.app.use(express.static('public'))
    }


    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.buscar,require('../routes/buscar'))
        

        // router.get('/api', function (req, res) {
        //     // res.send('Hello World')
        //     res.json({
        //         ok:true,
        //         msg:'get get'
        //     })})

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', process.env.PORT);
        })
    }
}

module.exports= Server;