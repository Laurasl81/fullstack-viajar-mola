
module.exports = app => {

  // Base URLS
  app.use('/api/auth', require('./auth.routes'))
  app.use('/api/trips', require('./trips.routes'))
  app.use('/api/user', require('./user.routes'))
  app.use('/api/files', require('./files.routes'))
  app.use('/api/booking', require('./booking.routes'))

  // app.use('/movies', require('./movies.routes'))
  // app.use('/movies/details/:id', require('./movies.routes.js'))
  // app.use('/profile', require('./user.routes'))
  //database


  app.use((req, res) => { res.sendFile(__dirname + "/public/index.html") })

}
