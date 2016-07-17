var express = require("express");

var app = express();

app.listen(5000, function () {
    console.log("Server iniciado")
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/www/index.html");
});