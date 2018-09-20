// Variables
// var songs = require("./spotify.js");
var movie = require("./omdb.js");
// var bands = require("./bands.js");

// Input capture
var media = process.argv[2]; //Conert, Movie or Song
var thing = process.argv[3]; //Bands, Movie title, Song title

// Determine which call is asked for
switch (media) {
    case "concert-this":
      bands(thing);
      console.log("Concert");
      break;
    
    case "spotify-this-song":
      spotify(thing);
      console.log("Spotify");
      break;
    
    case "movie-this":
      omdb(thing);
      console.log("OMDB");
      break;
    }