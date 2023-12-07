var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User'); // Make sure this path is correct

// GET users listing
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET Register Page
router.get('/register', function(req, res) {
  res.render('register'); // Ensure you have a 'register.hbs' view
});

// POST Register Handle
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    let errors = [];

    // Check required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if (password !== confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if (password.length < 8) {
        errors.push({ msg: 'Password should be at least 8 characters' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, firstName, lastName, email });
    } else {
        try {
            let user = await User.findOne({ email: email });
            if (user) {
                errors.push({ msg: 'Email is already registered' });
                res.render('register', { errors, firstName, lastName, email });
            } else {
                user = new User({ firstName, lastName, email, password });
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                await user.save();
                res.redirect('/users/login');
            }
        } catch (err) {
            console.error(err);
            res.render('error/500');
        }
    }
});

// GET Login Page
router.get('/login', function(req, res) {
  res.render('login'); // Ensure you have a 'login.hbs' view
});

// POST Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
