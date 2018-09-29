require("dotenv").config();
var fs = require("fs");
var omdb = require("./omdb.js");
var bands = require("./bands.js");
var spotify = require("./spotify.js");

// Input capture
var database = process.argv[2]; // Search database
var media = process.argv.slice(3).join(" "); // Search term

if (database === "do-what-it-says") {
  fs.readFile("random.txt", "utf-8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // console.log(data);
    data = data.split(",");
    database = data[0];
    media = data[1];
    switchFunc(database, media);
  });
}

// Determine which API is needed
function
switchFunc(database, media) {
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

      //------------------------------------------------------------//

      // Pulled from bands.js
    case "spotify-this-song":
    case "song":
      if (!media) {
        media = "The Sign";
        console.log("Defaulting to '" + media + "'");
      }
      spotify(media);
      break;

      //------------------------------------------------------------//

      // Pulled from omdb.js
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