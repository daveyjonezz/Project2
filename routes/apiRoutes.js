var db = require("../models");
var weather = require("weather-js");
var twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = function (app) {
    // Get all examples
    app.get("/api/examples", function (req, res) {
        db.Example.findAll({}).then(function (dbExamples) {
            res.json(dbExamples);
        });
    });

    // Create a new example
    app.post("/api/examples", function (req, res) {
        db.Example.create(req.body).then(function (dbExample) {
            res.json(dbExample);
        });
    });

    app.post("/api/users", function (req, res) {
        console.log(req.body)
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/users/:email", function (req, res) {
        console.log("req.params: ", req.params)
        db.User.findOne({
            where: {
                email: req.params.email
            }
        }).then(function (dbUser) {
            console.log("dbUser: ", dbUser)
            res.json(dbUser);
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function (req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample);
        });
    });

    app.get("/api/weather/:zipcode", function (req, res) {

        weather.find({ search: req.params.zipcode, degreeType: 'F' }, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    });

    app.get("/send/:email", function (req, res) {
        console.log("req.params: ", req.params)
        // db.User.findOne({
        //     where: {
        //         email: req.params.email
        //     }
        // }).then(function (dbUser) {
        twilioClient.messages.create({
            to: process.env.YING_DEST_PHONE_NUMBER,
            from: process.env.TWILIO_NET_PHONE_NUMBER,
            body: 'Hello from Ying'
        }).then(message => {
            console.log(message.sid)
            res.json(message.sid)
        });
        //});
    });
};