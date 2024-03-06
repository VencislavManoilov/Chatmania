const express = require("express");
const app = express();
const session = require('express-session');
const passport = require('passport');
const User = require('./Models/User');
const path = require("path");
const fs = require("fs");
const sessionStoreMiddleware = require('./sessionStore');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Important variables:
let profiles = JSON.parse(fs.readFileSync('profiles.json', 'utf8'));
let ids = JSON.parse(fs.readFileSync('ids.json', 'utf8'));
let loginChecks = JSON.parse(fs.readFileSync('loginChecks.json', 'utf8'));

// Middleware to pass variables to routes
app.use((req, res, next) => {
    req.profiles = profiles;
    req.ids = ids;
    req.loginChecks = loginChecks;
    next();
});

app.use(express.json());

app.use(session({
    secret: 'DfqXKcgIQKc9MWCx1sCOsLi5b1lVAdHt',
    resave: false,
    saveUninitialized: false,
    store: sessionStoreMiddleware(session)
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes and middleware:
const auth = require("./routes/auth");
app.use("/auth", auth);

// All application-level requests are here:
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.send('Dashboard');
});

app.get("/test", function(req, res) {
    res.status(200).send("Hello World");
});

// For all not correct requests
app.use((req, res) => {
    res.status(404).send("File not found");
});

// For starting the server
app.listen(PORT, () => {
    console.log("Listening to port", PORT);
});

// Functions
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}