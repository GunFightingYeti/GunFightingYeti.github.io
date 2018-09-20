var spotify = {
    artist: "Ace of Base",
    name: "The Sign",
    songlink: "link",
    album: "The Sign" 
}

function spotify(song) {

    var queryURL = "";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //Not correct yet, explore API response
        console.log(response);
        artist = response.artist;
        name = response.name;
        songlink = response.link;
        album = response.album;
    })
}

module.exports = {
    spotify: spotify,
};