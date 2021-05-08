const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err =>{
            if(err) {
                return next(err);
            }
            res.redirect('/movies')
        })
    } catch (e) {
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/movies');
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/movies')
})

module.exports = router;