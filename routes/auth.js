const express = require('express');
const router = express.Router();

// Sign-in route
router.post('/signin', (req, res) => {
    // Handle sign-in logic
    res.status(200).send("This is the signin request");
});

// Log-in route
router.post('/login', (req, res) => {
    // Handle log-in logic
    res.status(200).send("This is the login request");
});

module.exports = router;