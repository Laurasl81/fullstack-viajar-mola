const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingsSchema = new Schema({

    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    trip: [{type: Schema.Types.ObjectId, ref:'Viaje'}]

}, {
    timestamps: true
})

const Reservas = mongoose.model('Reservas', bookingsSchema);
module.exports = Reservas;