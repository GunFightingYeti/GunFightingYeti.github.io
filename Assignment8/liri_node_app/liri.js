// Variables
require("dotenv").config();
// require("keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');
// var songs = require("./spotify.js");
// var omdb = require("./omdb.js");
// var bands = require("./bands.js");

// Input capture
var nodeArgs = process.argv;
var database = process.argv[2]; //Conert, Movie or Song
var media = ''; //Bands, Movie title, Song title

// If argv[3] is more then one word then combine them.
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    media = media + "+" + nodeArgs[i];
  } else if (i == 3) {
    media = nodeArgs[i];
  }
}

// API calls
// OMDB API
function omdb(movie) {

  var queryURL = "https://www.omdbapi.com/?i=tt3896198&t=" + movie + "&y=&plot=short&apikey=d07256e8";

  request(queryURL, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log(body);
      // console.log(response);

      // var omdb = {
      //   title = body.Title,
      //   rating = body.Rated,
      //   year = body.Year,
      //   plot = body.Plot,
      //   time = body.Runtime,
      // }
      // console.log(omdb);
      // return omdb;
    }
  });
}

// function spotify(song) {
//   // Spotify API
// var spotify = new Spotify({
//   id: 1234656789,
//   secret: 123456789,
// });

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }

// console.log(data); 
// });
//   // search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
//   var queryURL = "https://www." + song + "";

//   request(queryURL, function (error, response, body) {

//       // If the request is successful
//     if (!error && response.statusCode === 200) {
//       console.log(body);
//       // console.log(response);

//       var songData = {

//       }
//       return songData;
//     }
//   });
// }


// Bands in Town API
function bands(band) {

  var queryURL = "https://www." + band + "";

  request(queryURL, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log(body);
      // console.log(response);

      var concert = {

      }
      return concert;
    }
  });
}

// Determine which API is needed
switch (database) {
  case "concert-this":
    bands(media);
    console.log("Your search database is 'Concert'");
    break;

  case "spotify-this-song":
    spotify(media);
    console.log("Your search database is 'Spotify'");
    break;

  case "movie-this":
    omdb(media);
    console.log("Your search database is 'OMDB'");
    break;

  case "do-what-it-says":
    spotify(media);
    console.log("Your search database is 'spotify'");
    break;
}

console.log("Your Search term is '" + media + "'");