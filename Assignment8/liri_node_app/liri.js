require("dotenv").config();
var keys = require("./keys.js");
var omdb = require("./omdb.js")
var bands = require("./bands.js")
var Spotify = require("node-spotify-api");

// Input capture
var database = process.argv[2]; //Concert, Movie or Song
var media = process.argv.slice(3).join(" ");

// Spotify API
function spotify(song) {
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
  });

  spotify.search({
    type: 'track',
    query: song,
  }, function (err, body) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var find = body.tracks.items;
    // console.log(find[0]);
    // console.log(find[0].artists);
    for (var i = 0; i < body.length; i++) {
      var info = [
        "Artist(s): " + find.name,
        // "Song name: " + name,
        // "Preview link: " + link,
        // "Album: " + album,
      ].join("\n");
      console.log("Spotify search...\nSong #" + (i + 1) + ":\n" + info);
    }
  });
}

// Determine which API is needed
switch (database) {
  // Pulled from bands.js
  case "concert-this":
    if (!media) {
      media = "Ok Go";
      console.log("Defaulting to '" + media + "'");
    }
    bands(media);
    break;

  case "spotify-this-song":
    if (!media) {
      media = "The Sign";
      console.log("Defaulting to '" + media + "'");
    }
    spotify(media);
    break;

    // Pulled from omdb.js
  case "movie-this":
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