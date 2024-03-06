const express = require('express');
const fs = require('fs');
const router = express.Router();
const validator = require("email-validator");
const passport = require('passport');
const User = require('../Models/User');

// Signin route
router.post('/signin', (req, res) => {
    if (!req.query || !req.query.id || !req.query.email || !req.query.age || !req.query.password) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const { id, email, age, password } = req.query;
    let profiles = req.profiles;
    let idsArray = req.ids;
    let loginChecks = req.loginChecks;
    
    // Check if the id is already taken
    if(idsArray.includes(id)) {
        return res.status(400).json({ error: 'ID is already taken' });
    }

    // Check if the email is valid
    if(!validator.validate(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    // Check if the age is believable
    if(isNaN(age) || age < 14 || age > 120) {
        return res.status(400).json({ error: 'Invalid age' });
    }

    // Check if the password is a string
    if(typeof password !== 'string') {
        return res.status(400).json({ error: 'Password must be a string' });
    }

    // Check if password meets security requirements
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least 8 characters, including at least one number, one uppercase letter, one lowercase letter, and one special character.' });
    }

    User.register(new User({ id, email, age }), password, (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/register');
        }
        // Automatically authenticate the user after registration
        passport.authenticate('local')(req, res, () => {
            res.redirect('/dashboard');
        });
    });

    res.status(200).send("This is the signin request");
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/dashboard');
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function save(fileName, data) {
    fs.writeFile(fileName, JSON.stringify(data), (err) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ error: 'Error saving data' });
        }
    });
}

module.exports = router;