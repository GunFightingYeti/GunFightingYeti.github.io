var info = {
    venue: name,
    location: location,
    date: date, //(use moment to format this as "MM/DD/YYYY")
}

function bands(band) {

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //Not correct yet, explore API response
        console.log(response);
        venue = response.name;
        location = response.location;
        date = response.date; //(use moment to format this as "MM/DD/YYYY")
    })
}

module.exports = {
    info: info,
};