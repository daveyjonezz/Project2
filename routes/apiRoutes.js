var db = require("../models");

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
      res.json(dbUser);
    });
  });

  app.get("/api/users/:email", function(req, res) {
    console.log("req.params: ", req.params)
    db.User.findOne({
      where:{
        email: req.params.email
      }
    }).then(function(dbUser) {
      console.log("dbUser: ", dbUser)
      res.json(dbUser);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
