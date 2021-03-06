const express = require('express')
const router = express.Router()

const Trips = require('../models/Trips.model')



// Endpoints

router.get('/getAllTrips', (req, res, next) => {

    Trips.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

//Destinos filtrados por continente

router.get('/getDestination/:destination', (req, res, next) => {

    Trips.find({ "destination": req.params.destination })
        .then(response => res.json(response))
        .catch(err => next(err))
})


// Pagina detalles Trips
router.get('/getOneTrip/:trips_id', (req, res, next) => {

    Trips.findById(req.params.trips_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


//Crea nuevo Trips
router.post('/newTrip', (req, res, next) => {
    Trips.create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))

})

//Borrar Trips
router.delete('/delete/:id', (req, res, next) => {

    Trips.findByIdAndDelete(req.params.id)
        .then(() => res.json({message: "Viaje borrado"}))
        .catch(err => next(err))
})

//Editar Trips
router.put('/edit/:id', (req, res, next) => {

    Trips.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})








module.exports = router