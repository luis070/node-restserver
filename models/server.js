const cors = require('cors')
const express = require('express')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios'

        // middlewares 
        this.middlewares();

        // rutas de mi aplicacion
        this.routes();
        
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
        this.app.use(this.usuariosPath, require('../routes/user'))
        

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
