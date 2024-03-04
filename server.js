const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const fs = require("fs");

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

// Routes and middleware:
const auth = require("./routes/auth");
const authenticate = require("./middleware/authenticate");
app.use("/auth", auth);

// All application-level requests are here:
app.get("/test", function(req, res) {
    res.status(200).send("Hello World");
})

// For all not correct requests
app.use((req, res) => {
    res.status(404).send("File not found");
})

// For starting the server
app.listen(PORT, () => {
    console.log("Listening to port", PORT);
})