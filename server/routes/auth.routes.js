const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/User.model")
const bcrypt = require("bcrypt")



router.post('/signup', (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;


  if (!email || !password) {
    res.status(400).json({ message: 'Proporcionar correo electronico y contraseña' });
    return;
  }

  if (password.length < 2) {
    res.status(400).json({ message: 'Por favor por seguridad la contraseña tiene que ser mas larga.' });
    return;
  }

  User.findOne({ email }, (err, foundUser) => {

    if (err) {
      res.status(500).json({ message: "email incorrecto." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'Probar con otro email, ese ya esta cogido.' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      email: email,
      password: hashPass
    });

    aNewUser.save(err => {
      if (err) {
        res.status(400).json({ message: 'Error al guardar usuario.' });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(aNewUser, (err) => {

        if (err) {
          res.status(500).json({ message: 'Error al iniciar sesion despues de registrarse.' });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
      });
    });
  });
});



router.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Error al iniciar sesion' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Error al guardar sesion.' });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});



router.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Sesion cerrada con exito!' });
});


router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'No autorizado' });
});

module.exports = router
