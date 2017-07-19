var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

var weather = new ForecastIo("e5d0665b2d3cf38a9a4efadd14e7dc38");

var app = express();
app.use(express.static(path.resolve(__dirname, "public"))); // serves static files out of public

// uses EJS as the view engine, and serves the views out of a views folder
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// renders the index view if you hit the homepage
app.get("/", function (req, res) {
    res.render("index");
});

// grabs location data with the ZIP Code
app.get(/^\/(\d{5})$/, function (req, res, next) {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);

    if (!location.zipcode) {
        next();
        return;
    }

    var latitude = location.latitude;
    var longitude = location.longitude;

    weather.forecast(latitude, longitude, function (err, data) {
        if (err) {
            next();
            return;
        }

        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
    });
});

// shows a 404 error if no other routes are matched
app.use(function (req, res) {
    res.status(404).render("404");
});

app.listen(3000);
console.log("listening at port 3000");