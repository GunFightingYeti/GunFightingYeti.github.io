var request = require("request");


// Then run a request to the OMDB API with the movie specified
function omdb(movie) {

    var queryURL = "https://www.omdbapi.com/?i=tt3896198t=" + movie + "&y=&plot=full&apikey=d07256e8";

    request(queryURL, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

        // console.log(rating);

        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log(body);
            console.log(response);
            var omdb = {
                // title = response.imdbTitle,
                // rating = response.imdbRated,
                // year = response.imdbYear,
                // plot = response.imdbPlot,
                // time = response.imdbRuntime,
            }
            return omdb;
        }
    });
}
module.exports = {
    // omdb: omdb,
};

// console.log(omdb);