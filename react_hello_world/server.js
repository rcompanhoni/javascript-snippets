const express = require('express');
const path = require("path");

const app = express();
app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index");
});

app.listen(3000, function () {
    console.log('App started on port 3000');
});