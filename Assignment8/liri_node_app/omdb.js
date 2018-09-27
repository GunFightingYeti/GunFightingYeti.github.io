var request = require("request");


function omdb(movie) {

    var queryURL = "https://www.omdbapi.com/?i=tt3896198&t=" + movie + "&y=&plot=full&apikey=d07256e8";
  
    request(queryURL, function (error, response, body) {
  
      // If the request is successful
      if (!error && response.statusCode === 200) {
        // console.log("This is the body: " + body);
  
        var find = (JSON.parse(body));
  
        var omdb = {
          title: find.Title,
          year: find.Year,
          rating: find.Rated,
          tomatoes: find.Ratings[1].Source,
          tomatoes1: find.Ratings[1].Value,
          country: find.Country,
          plot: find.Plot,
          actors: find.Actors
        }
  
        // Write the object to the command line
        console.log("\n" + "Title : " + omdb.title + "\n" + "Release year : " + omdb.year + "\n" + "Rated : " + omdb.rating + "\n" + omdb.tomatoes + " rating: " + omdb.tomatoes1 + "\n" + "Country of origin: " + omdb.country + "\n" + "Plot: " + omdb.plot + "\n" + "Actors : " + omdb.actors);
  
      } else {
        console.log("Something went wrong. Try doing better.");
      }
    });
  }

module.exports = omdb
