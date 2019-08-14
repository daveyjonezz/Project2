var db = require("../models");
var weather = require("weather-js")

module.exports = function(app) {
    // Get all examples
    app.get("/api/examples", function(req, res) {
        db.Example.findAll({}).then(function(dbExamples) {
            res.json(dbExamples);
        });
    });

    // Create a new example
    app.post("/api/examples", function(req, res) {
        db.Example.create(req.body).then(function(dbExample) {
            res.json(dbExample);
        });
    });

    app.post("/api/users", function(req, res) {
        console.log(req.body)
        db.User.create(req.body).then(function(dbUser) {
            res.render("userPage" , dbUser.dataValues);
        });
    });

    app.get("/api/users/:email", function(req, res) {
        console.log("req.params: ", req.params)
        // db.User.findAll
        // (
        db.User.findOne({
        where: 
            {
                email: req.params.email
            }
        }).then(function (dbUser)
         {
// console.log(err)
            if (dbUser !== null) {
            console.log('=========================');
            console.log(dbUser.dataValues)
            console.log('=========================');
            res.render("userPage", dbUser.dataValues);
            }
            else {
                console.log("HEY",dbUser)
                res.send("404")
            }
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
            res.json(dbExample);
        });
    });

    app.get("/api/weather/:zipcode", function(req, res) {

        weather.find({ search: req.params.zipcode, degreeType: 'F' }, function(err, result) {
            if (err) console.log(err);


            res.json(result);
        });
    });
};