var express = require("express");
var app = express();
var path = require("path");

// APP CONFIG
// ----------------------------------------------------

app.set("port", process.env.PORT || 3000);

// EJS
var viewsPath = path.join(__dirname, "views");
app.set("view engine", "ejs");
app.set("views", viewsPath);

// ROUTES
// ----------------------------------------------------

app.get("/", function (req, res) {
    var userAgent = req.headers["user-agent"] || "none";

    if (req.accepts("html")) {
        res.render("index", { userAgent: userAgent });
    } else {
        res.type("text");
        res.send(userAgent);
    }
});

// START
// ----------------------------------------------------

app.listen(app.get("port"), function () {
    console.log("App started on port " + app.get("port"));
});

module.exports = app;