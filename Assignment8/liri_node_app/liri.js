// Variables
var request = require("request");
// var songs = require("./spotify.js");
var omdb = require("./omdb.js");
// var bands = require("./bands.js");

// Input capture
var nodeArgs = process.argv;
var media = process.argv[2]; //Conert, Movie or Song
var thing = ''; //Bands, Movie title, Song title

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    thing = thing + "+" + nodeArgs[i];
  } else if (i == 3) {
    thing = nodeArgs[i];
  }
}
console.log(thing);


// function omdb(movie) {

//   var queryURL = "https://www.omdbapi.com/?i=tt3896198t=" + movie + "&y=&plot=full&apikey=d07256e8";

//   request(queryURL, function (error, response, body) {

//       // If the request is successful (i.e. if the response status code is 200)
//       // Parse the body of the site and recover just the imdbRating
//       // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

//       // console.log(rating);

//       // If the request is successful
//       if (!error && response.statusCode === 200) {
//           console.log(body);
//           console.log(response);
//           var omdb = {
//               // title = response.imdbTitle,
//               // rating = response.imdbRated,
//               // year = response.imdbYear,
//               // plot = response.imdbPlot,
//               // time = response.imdbRuntime,
//           }
//           return response;
//       }
//   });
// }

// // Determine which call is asked for
// switch (media) {
//     case "concert-this":
//       bands(thing);
//       console.log("Concert");
//       break;

//     case "spotify-this-song":
//       spotify(thing);
//       console.log("Spotify");
//       break;

//     case "movie-this":
//       omdb(thing);
//       console.log("OMDB");
//       break;
//     }