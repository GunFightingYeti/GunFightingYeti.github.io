var request = require("request");
var fs = require("fs");

function bands(band) {
    var divider = "\n------------------------------------------------------------";

    var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
  
    request(queryURL, function (error, response, body) {
  
      // If the request is successful
      if (!error && response.statusCode === 200) {
        console.log("\nBand search: " + band);
        var body = JSON.parse(body);
  
        for (var i = 0; i < body.length; i++) {

          var find = body[i].venue;

          var bands = [
            "Venue: " + find.name,
            "Location: " + find.city + ", " + find.region,
            "Date: " + find.datetime, //(use moment to format this as "MM/DD/YYYY")
          ].join("\n");
          console.log("\nEvent " + (i + 1) + ": " + "\nVenue: " + bands);

          fs.appendFile("log.txt", "\nConcert search\nBand: " + band + "\nEvent " + (i + 1) + ": " + "\nVenue: " + bands + divider, function(err) {
            if (err) throw err;
          });

        }
  
        // Write the object to the command line
      } else {
        console.log("Something went wrong.");
      }
    });
  }

module.exports = bands;