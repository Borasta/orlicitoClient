var express = require("express");

var app = express();

app.use(express.static(__dirname + "/www/"));

app.listen(7000, function () {
    console.log("Server iniciado")
});
