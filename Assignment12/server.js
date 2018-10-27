var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
