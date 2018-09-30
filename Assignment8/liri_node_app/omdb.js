var request = require("request");
var fs = require("fs");

function omdb(movie) {
  var divider = "\n------------------------------------------------------------";
  var queryURL = "https://www.omdbapi.com/?i=tt3896198&t=" + movie + "&y=&plot=full&apikey=d07256e8";

  request(queryURL, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("\nMovie search:\n");
      var find = (JSON.parse(body));

      // Create array of information
      var omdb = [
        "Title: " + find.Title,
        "Release year: " + find.Year,
        "Rated: " + find.Rated,
        find.Ratings[1].Source + " rating: " + find.Ratings[1].Value,
        "Country: " + find.Country,
        "Plot: " + find.Plot,
        "Actors: " + find.Actors
      ].join("\n");

      // Display info to user
      console.log(omdb);

      // Append results to the log file
      fs.appendFile("log.txt", "\n" + omdb + divider, function (err) {
        if (err) throw err;
      });

    } else {
      console.log("Something went wrong.");
    }
  });
}

module.exports = omdb;