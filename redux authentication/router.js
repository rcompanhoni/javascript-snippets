module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.send(["TEST1", "TEST2", "TEST3"]);
    });
}