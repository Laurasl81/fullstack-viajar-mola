const express = require('express')
const router = express.Router()

const Viaje = require('../models/Viajes.model')



// Endpoints

router.get('/getAllTravels', (req, res, next) => {

    Viaje.find()
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.get('/getOneTravel/:viaje_id', (req, res, next) => {

    Viaje.findById(req.params.viaje_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post('/newTravel', (req, res, next) => {
    Viaje.create(req.body)
    .then(response => res.json(response))
    .catch(err => next(err))

})









module.exports = router