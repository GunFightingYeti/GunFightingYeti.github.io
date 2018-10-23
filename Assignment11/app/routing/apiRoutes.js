var guardians = require("../data/guardians.js");
var users = require("../data/users.js");

module.exports = function (app) {

  app.get("/api/guardians", function (req, res) {
    res.json(guardians);
  });

  app.get("/api/users", function (req, res) {
    res.json(users);
    console.log("Users be activated matey!");
  });

  app.post("/api/guardians", function(req, res) {

    var match = {
      name: "",
      image: "",
      bio: "",
      matchScore: 51
    }

    var scores = req.body.scores;
    var totalDif = 0;

    for (var i = 0; i < guardians.length; i++) {
      totalDif = 0;

      for (var n = 0; n < guardians[i].scores.length; n++) {
        totalDif += Math.abs(parseInt(scores[n]) - parseInt(guardians[i].scores[n]));
      }

      if (totalDif <= match.matchScore) {
        match.name = guardians[i].name;
        match.image = guardians[i].image;
        match.bio = guardians[i].bio;
        match.matchScore = totalDif;
      }
    }

    res.json(match);
  });
}