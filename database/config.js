const mongoose = require('mongoose');



const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGOdb, {
            //sale un error por poner los siguentes comando antes eran necesarios 
            //pero ahora ya no lo son porque ya vienen en la configuracion base y si lo pone sale muchos errores
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
    
        console.log('Base de datos online si funciona que es lo demas que me aparece ?');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}



module.exports = {
    dbConnection
}
