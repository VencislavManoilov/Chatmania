const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Routes and middleware:
const auth = require("./routes/auth");
const authenticate = require("./middleware/authenticate");

// Make the server use the routes:
app.use("/auth", auth);

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