const express = require('express')
const router = express.Router()

const Viaje = require('../models/Viajes.model')



// Endpoints

router.get('/getAllTravels', (req, res, next) => {

    Viaje.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

//Destinos filtrados por continente

router.get('/getDestination/:destino', (req, res, next) => {

    Viaje.find({"destino": req.params.destino})
    .then(response => res.json(response))
    .catch(err => next(err))
})


// Pagina detalles viajes 
router.get('/getOneTravel/:viaje_id', (req, res, next) => {

    Viaje.findById(req.params.viaje_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


//Crea nuevo viaje
router.post('/newTravel', (req, res, next) => {
    Viaje.create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))

})

//Borrar viaje
router.delete('/delete/:id', (req, res, next) => {

    Viaje.findOneAndRemove(req.params.id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

//Editar viaje
router.put('/edit/:id', (req, res, next) => {

    Viaje.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})








module.exports = router