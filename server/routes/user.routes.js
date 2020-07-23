const express = require("express")
const router = express.Router()

const User = require("../models/User.model")


router.get('/account/:id', (req, res, next) => {

    User.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

//Borrar usuario
router.delete('/account/delete/:id', (req, res, next) => {

    User.findOneAndRemove(req.params.id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

//Editar usuario
router.put('/account/edit/:id', (req, res, next) => {

    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})



module.exports = router