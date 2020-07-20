const mongoose = require('mongoose')
const Schema = mongoose.Schema

const actividadesSchema = new Schema({
    foto: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Actividades = mongoose.model("Actividades", actividadeschema)

module.exports = Actividades