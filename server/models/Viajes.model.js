const mongoose = require("mongoose")
const Schema = mongoose.Schema

const viajesSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    duracion: {
        type: Number
    },
    temporada: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
    imagenPrincipal: {
        type: String,
        required: true
    },
    paradas: {
        type: [String],
    },
    // informacion: { 
    //     titulo: {
    //         type: String,
    //         required: true
    //     },
    //     galeria: {
    //         type: String,
    //         default:'',
    //         required: true
    //     },
    //     precioIncluye: {
    //         type: String,
    //         required: true
    //     },
    //     descripcion: {
    //         type: String,
    //         required: true
    //     }
    // },
    tipoViaje: {
        type: String,
        enum: ['single', 'grupos', 'grupo-reducido']
    },
    actividadesDestacadas: {
        type:[String]
    },
    informacionPais: {
        type: String
    },
    destino: {
        type: String,
        enum: ['europa', 'asia', 'america']
    }

}, {
    timestamps: true
})

const Viajes = mongoose.model("Viaje", viajesSchema)

module.exports = Viajes