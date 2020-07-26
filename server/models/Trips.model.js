const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tripsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    season: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    steps: {
        type: [String],
    },

    informationTitle: {
        type: String,
        required: true
    },
    informationGallery: {
        type: String,
    },
    informationPriceIncludes: {
        type: String,
        required: true
    },
    informationDescription: {
        type: String,
        required: true
    },


    tripType: {
        type: String,
        enum: ['single', 'grupos', 'grupo-reducido']
    },
    activities: {
        type: [{
            photo: { type: String }, title: { type: String }, description: { type: String }
        }],

    },
   
    destination: {
        type: String,
        enum: ['europa', 'asia', 'america']
    }

}, {
    timestamps: true
})

const Trips = mongoose.model("Viaje", tripsSchema)

module.exports = Trips