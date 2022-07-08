const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/userController");
const passport = require('passport');
const path = require('path');
const multer = require('multer');

// Multer implementation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productImages/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

userRouter.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/user/failedUser',
    successRedirect: '/api/user/session',
    failureFlash: true
}));
userRouter.post('/register', upload.any('file'), passport.authenticate('register', {
    failureRedirect: '/api/user/failedUser',
    successRedirect: '/api/user/session',
    failureFlash: true
}));
userRouter.get('/session', userController.verifySession);
userRouter.get('/failedUser', userController.failedUser);
userRouter.post('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = userRouter;