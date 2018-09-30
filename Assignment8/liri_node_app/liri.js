require("dotenv").config();
var fs = require("fs");
var omdb = require("./omdb.js");
var bands = require("./bands.js");
var spotify = require("./spotify.js");

// Input capture
var database = process.argv[2]; // Search database
var media = process.argv.slice(3).join(" "); // Search term

// do-what-it-says command, info pulled from random.txt
if (database === "do-what-it-says") {
  fs.readFile("random.txt", "utf-8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.split(",");
    database = data[0];
    media = data[1];
    switchFunc(database, media);
  });
}

// How to handle a blank call
if (!database && !media) {
  console.log("\nPlease type a database to search using the commands...\n\n~ movie-this for IMDB search\n~ concert-this to search for bands playing soon\n~ spotify-this-song to look up a favorite (or new favorite) song.\n\nWhile you're thinking, check out this great movie.");
  database = "movie-this";
  media = "John Wick";
}

// Determine which call is needed
function
switchFunc(database, media) {
  switch (database) {
    // BandsInTown get function, pulled from bands.js
    case "concert-this":
    case "concert":
      if (!media) {
        media = "Ok Go";
        console.log("Defaulting to '" + media + "'");
      }
      bands(media);
      break;

      //------------------------------------------------------------//

      // Spotify get function, pulled from spotify.js
    case "spotify-this-song":
    case "spotify":
      if (!media) {
        media = "The Sign";
        console.log("Defaulting to '" + media + "'");
      }
      spotify(media);
      break;

      //------------------------------------------------------------//

      // OMDB get function, pulled from omdb.js
    case "movie-this":
    case "movie":
      if (!media) {
        media = "Mr Nobody";
        console.log("Defaulting to '" + media + "'");
      }
      omdb(media);
      break;
  }
}

// Run switch function with userInput
switchFunc(database, media);