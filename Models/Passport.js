const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        // Implement your authentication logic here
        // Check if the username and password are valid
        // For example, you can compare them with values stored in your JSON files
        if (username === 'valid_username' && password === 'valid_password') {
            // If authentication succeeds, call done() with the user object
            return done(null, { username: username });
        } else {
            // If authentication fails, call done() with false
            return done(null, false, { message: 'Incorrect username or password.' });
        }
    }
));