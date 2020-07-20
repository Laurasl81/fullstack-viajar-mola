const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservasSchema = new Schema({

    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    viaje: [{type: Schema.Types.ObjectId, ref:'Viajes'}]

}, {
    timestamps: true
})

const Reservas = mongoose.model('Reservas', reservasSchema);
module.exports = Reservas;