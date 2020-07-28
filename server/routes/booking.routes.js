const express = require("express")
const router = express.Router()

const Booking = require ('./../models/Booking.model')


router.post('/newBooking', (req, res, next) => {
    Booking.create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))

})



module.exports = router