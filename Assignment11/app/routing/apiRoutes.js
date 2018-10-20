var guardians = require("../data/characters.js")

module.exports = function (app) {

  app.get("/api/guardians", function (req, res) {
    res.json(guardians);
  });

  // app.post("/api/charcters", function(req, res) {
  //     if (err) {
  //       return res.status(500).end();
  //     }

  //     res.render();
  // });
}