var path = require("path");
var express = require("express");

module.exports = function(app) {

	app.use(express.static(__dirname + "/../public"));

	app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"))
	});

	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/index.html"))
	});
};