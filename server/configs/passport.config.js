const session = require("express-session")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const flash = require("connect-flash")

const User = require('../models/User.model')

module.exports = app => {

    app.use(session({
        secret: "viajar-mola",
        resave: true,
        saveUninitialized: true
    }))

    passport.serializeUser((user, next) => next(null, user._id))
    passport.deserializeUser((id, next) => {
        User.findById(id)
            .then(theUser => next(null, theUser))
            .catch(err => next(err))
    })



    app.use(flash())

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        (email, password, done) => {
            User.findOne({ email })
                .then(foundUser => {
                    if (!foundUser) {
                        done(null, false, { message: 'Correo electrónico incorrecto' });
                        return;
                    }
                    if (!bcrypt.compareSync(password, foundUser.password)) {
                        done(null, false, { message: 'Contraseña incorrecta' });
                        return;
                    }
                    done(null, foundUser);
                })
                .catch(err => done(err));
        }
    ));

    app.use(passport.initialize())
    app.use(passport.session())
}