const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");
const mongoose = require('mongoose')


module.exports = app => {
app.use(session({
    secret: 'viajar-mola',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);
}