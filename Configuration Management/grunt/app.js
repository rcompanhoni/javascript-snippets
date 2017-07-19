var express = require("express");
var path = require("path");
var app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "tmp/build")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index");
});

app.listen(5000, function () {
    console.log("App started on port 5000.");
});