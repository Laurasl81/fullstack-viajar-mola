
module.exports = app => {

  // Base URLS
  app.use('/api/auth', require('./auth.routes'))
  app.use('/api/trips', require('./trips.routes'))
  app.use('/api/user', require('./user.routes'))
  app.use('/api/files', require('./files.routes'))
  app.use('/api/booking', require('./booking.routes'))


  //database


  app.use((req, res) => { res.sendFile(__dirname + "/public/index.html") })

}
