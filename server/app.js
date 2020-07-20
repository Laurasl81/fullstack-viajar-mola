require('dotenv').config();

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

//App
const express = require('express')
const app = express()

// Configs
require('./configs/preformater.configs')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/local.configs')(app)

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


module.exports = app;
