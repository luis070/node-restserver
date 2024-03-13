const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },    
    password: {
        type: String,
        required:[true, 'El nombre es obligatorio'],
    },
    img: {
        type: String
    },
    rol:{
        type: String,
        required: true,
        // emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,...usuario} = this.toObject();
    return usuario;
}


// mongoose al momento de ejecutarlo los nombre al final les pone una s como este caso seria Usuarios
//y sera el nombre de la tabla 
module.exports = model('Usuario', UsuarioSchema);