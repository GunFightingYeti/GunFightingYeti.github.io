var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

function spotify(song) {
    var divider = "\n------------------------------------------------------------";
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret,
    });

    spotify.search({
        type: 'track',
        query: song,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\nSong search: " + song + "\n");

        // Loop through results and output info for each instance
        for (var i = 0; i < data.tracks.items.length; i++) {

            var find = data.tracks.items[i];

            // Create array of information
            var info = [
                "Artist(s): " + find.album.artists[0].name,
                "Song name: " + find.name,
                "Album: " + find.album.name,
                "Preview link: " + find.preview_url,
            ].join("\n");

            // Display info to user
            console.log("Song #" + (i + 1) + ":\n" + info + divider);

            // Append results to the log file
            fs.appendFile("log.txt", "\nSpotify search...\nSong #" + (i + 1) + ":\n" + info + divider, function (err) {
                if (err) throw err;
            });

        }
    });
}

module.exports = spotify;