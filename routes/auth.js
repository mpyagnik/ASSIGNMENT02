
//Trial 3

const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth with Google
router.get('/google', passport.authenticate('google', { scope: ['profile']}));

// Google auth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), 
(req, res) => {
    res.redirect('/')
});

// Redirect the user to GitHub for authentication
router.get('/github', passport.authenticate('github'));

// GitHub will redirect the user to this URL after authentication
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home or dashboard.
    res.redirect('/');
  });


// Logout User
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    });
});

module.exports = router;
