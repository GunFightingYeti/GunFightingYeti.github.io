// var omdb = {
//     name: name,
//     rating: rating,
//     year: year,
//     plot: plot,
//     time: time,
// }

function omdb(movie) {

    var queryURL = "https://www.omdbapi.com/?i=tt3896198t=" + movie + "&y=&plot=full&apikey=d07256e8";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // var omdb = {
        // name = response.Title,
        // rating = response.Rated,
        // vear = response.Year,
        // plot = response.Plot,
        // time = response.Runtime,
        // }
        // return omdb;
    })
}

omdb("Serenity");
// module.exports = {
//     omdb: omdb,
// };

// console.log(omdb);