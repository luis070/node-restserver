
const {Schema, model} = require('mongoose')

const ProdutcoSchema = Schema({

    nombre:{
        type: String,
        require:[true,'El nombre es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        require: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true,
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descruipcion:{
        type: String
    },
    disponible:{
        type: Number,
        default: true
    }
});

ProdutcoSchema.methods.toJSON = function(){
    const {__v, estado,...data} = this.toObject();
    
    return data;
}


module.exports = model('Producto', ProdutcoSchema);