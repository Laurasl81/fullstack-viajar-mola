require('dotenv').config();

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

//App
const express = require('express')
const app = express()

// Configs
require('./configs/preformater.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.config')(app)
require('./configs/local.config')(app)


// Hbs setup
require('./configs/hbs.config')

// Routes index
require('./routes')(app)


// const index = require('./routes/index');
// app.use('/', index);

// const authRoutes = require('./routes/auth.routes');
// app.use('/auth', authRoutes);


module.exports = app;
