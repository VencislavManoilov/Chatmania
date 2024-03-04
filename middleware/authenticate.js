const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    // Verify it is you

    res.status(200).send("Smash");
}

module.exports = authenticate;