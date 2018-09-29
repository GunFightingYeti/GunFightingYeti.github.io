require("dotenv").config();
var omdb = require("./omdb.js")
var bands = require("./bands.js")
var spotify = require("./spotify.js")

// Input capture
var database = process.argv[2]; //Concert, Movie or Song
var media = process.argv.slice(3).join(" ");

// Determine which API is needed
switch (database) {
  // Pulled from bands.js
  case "concert-this":
  case "concert":
    if (!media) {
      media = "Ok Go";
      console.log("Defaulting to '" + media + "'");
    }
    bands(media);
    break;

  // Pulled from bands.js
  case "spotify-this-song":
  case "song":
    if (!media) {
      media = "The Sign";
      console.log("Defaulting to '" + media + "'");
    }
    spotify(media);
    break;

    // Pulled from omdb.js
  case "movie-this":
  case "movie":
    if (!media) {
      media = "Mr Nobody";
      console.log("Defaulting to '" + media + "'");
    }
    omdb(media);
    break;

  case "do-what-it-says":
    spotify(media);
    console.log("\nYour search database is 'spotify'");
    break;
}