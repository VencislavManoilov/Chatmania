const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/test", function(req, res) {
    res.status(200).send("Hello World");
})

app.use((req, res) => {
    res.status(404).send("File not found");
})

app.listen(PORT, () => {
    console.log("Listening to port", PORT);
})