const userSchema = require('../schemas/userSchema');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('../services/logger');

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    let user = userSchema.findOne({
        email: email
    });
    done(null, user);
});

passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, userName, password, done) {
        userSchema.findOne({
                email: userName
            },
            (err, user) => {
                if (err) {
                    message = "Login error " + err
                    logger.error(message)
                    req.flash('Login error: ', err)
                    return done(err);
                }
                if (!user) {
                    message = `User not found with email: ${userName}`;
                    logger.warn(message)
                    req.flash('User not found with email: ', userName);
                    return done(null, false, req.flash('User not found!'))
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    message = 'Invalid Password';
                    logger.warn(message)
                    return done(null, false, req.flash('Invalid Password'))
                }
                message = "Logged in!"
                logger.info(message)
                return done(null, user);
            }
        )
    }
));

passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        userSchema.findOne({
                email: email
            },
            (err, user) => {
                if (err) {
                    logger.error('Register error: ', err)
                    req.flash('Register error: ', err);
                    return done(err);
                }
                if (user) {
                    message = 'User already exists!'
                    logger.warn(message)
                    return done(null, false, req.flash('User already exists'));
                } else if (password === req.body.passwordCheck) {
                    let encrytedPassword = bcrypt.hashSync(password, 10);
                    let user = new User();
                    user = {
                        ...req.body,
                        password: encrytedPassword,
                        avatar: `/userAvatars/${req.files[0].filename}`
                    }
                    userSchema.create(user)
                    return done(null, user);
                } else {
                    message = 'Passwords do not match!'
                    logger.warn(message)
                    return done(null, false, req.flash('Passwords do not match!'))
                }
            }
        )
    }
));


const userController = {
    verifySession: (req, res) => {
        res.send(req.session)
    },
    failedUser: (req, res) => {
        logger.error(message)
        res.send(message)
    },
    logout: (req, res) => {
        logger.info(`${req.session.passport} logged out.`);
        req.session.destroy();
        res.cookie("connect.sid", null, {
            maxAge: 1
        });
        res.cookie("userCart", null, {
            maxAge: 1
        });
        res.send('Logged out.')
    }
}

module.exports = userController