const app = require("../app");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const cors = require('cors')

module.exports = app => {


    const whitelist = ['http://localhost:3000']
    const corsOptions = {
        origin: (origin, cb) => {
            const originIsWhitelisted = whitelist.includes(origin)
            cb(null, originIsWhitelisted)
        },
        credentials: true
    }

    // Middleware Setup

    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())


    app.use(cors(corsOptions))

}