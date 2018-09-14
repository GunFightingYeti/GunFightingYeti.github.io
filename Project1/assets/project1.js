// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwGHAx9Uz8wso0gY8znLb6nN6Xnzp0xtY",
    authDomain: "project1db-d2918.firebaseapp.com",
    databaseURL: "https://project1db-d2918.firebaseio.com",
    projectId: "project1db-d2918",
    storageBucket: "project1db-d2918.appspot.com",
    messagingSenderId: "234240171369"
};
firebase.initializeApp(config);
var database = firebase.database();

// Empty input fields
function inputClear() {
    $("#address").val('');
    $("#event").val('');
};

// Hide next/previous buttons on load
$(document).ready(function () {
    $("#previous").hide();
    $("#next").hide();
});

//global variable for keeping track of apiLoop iteration
var markers = [];
var map;


$(document).on("click", "#submit", function (event) {
    event.preventDefault();

    markers = [];

    $("#next").show();
    $("#previous").hide();

    //Input field values
    var search = $("#event").val().trim();
    var location = $("#address").val().trim();

    //Check to make sure input fields are not empty
    if (search === "" || location === "") {
        $("#noInput").modal();
    } else {
        //Call the AJAX function when submit button is pushed
        ajaxCall(search, location);
    };
    console.log("Event: " + search + "\n" + "Location: " + location);
});


//Function to make ajax call
function ajaxCall(search, location) {

    var loop = 0;

    //AJAX search URL
    var queryURL = "https://api.eventful.com/json/events/search?";

    //AJAX call
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        dataType: "jsonp",
        success: function (jsondata) {},
        data: {
            app_key: "8XVzBF2N2f5JHP8h",
            location: location,
            q: search,
        }
    }).then(function (response) {

        var results = response.events.event;
        console.log(results);

        $(".deck").empty();

        for (var i = 0; i < 9; i++) {

            // Create card
            var cardDiv = $("<div>");
            cardDiv.attr("class", "card m-3");
            cardDiv.attr("id", "card" + i);
            cardDiv.css("width", "21em");
            //Add link to card
            var link = $("<a>");
            link.attr("href", results[i].url);
            link.attr("target", "_blank");
            cardDiv.append(link);

            //Add image
            var img = $("<img>");
            //If there's no image add no_image.png
            if (results[i].image == null) {
                img.attr("src", "assets/images/no_image.png");
                img.attr("style", "width: 21em;");
                img.attr("style", "height: 15em;");
                img.attr("class", "ml-5");
            } else {
                // Add the event image
                img.attr("src", "https:" + results[i].image.medium.url);
                img.attr("style", "width: 21em;");
                img.attr("style", "height: 15em;");
                img.attr("class", "ml-5");
            }
            link.append(img);

            //Add card body
            var body = $("<div>");
            body.attr("class", "card-body");
            cardDiv.append(body);

            //Add event title
            var title = $("<h5>");
            title.attr("class", "card-title");
            title.text(results[i].title);
            body.append(title);

            //Add description
            var p1 = $("<p>");
            p1.attr("class", "card-text");
            p1.attr("style", "height: 6em;");
            p1.css("overflow", "auto");
            //If there's no description add "No description"
            if (results[i].description == null) {
                p1.text("No description available");
            } else {
                // Add the event description
                p1.text(results[i].description);
            }
            body.append(p1);

            //Add event time and date
            var p2 = $("<p>");
            p2.attr("class", "card-text");
            var small = $("<small>");
            small.attr("text-muted");
            var split1 = results[i].start_time.split(" ");
            var split2 = split1[1].split(":");
            var split3 = split1[0].split("-");
            var date = split3[1] + "/" + split3[2] + "/" + split3[0];
            var time = split2[0] + ":" + split2[1];
            small.text("Date: " + date)
            if (time == "00:00") {
                small.append("");
            } else {
                small.append(" | Time: " + time);
            }
            p2.append(small);
            body.append(p2);

            //Like/dislike buttons
            //Add row
            var row = $("<div>");
            row.attr("class", "row");
            body.append(row);

            //Add like button
            var div1 = $("<div>");
            div1.attr("class", "mx-auto accept");
            div1.attr("data-url", results[i].url);
            div1.attr("data-image", results[i].image);
            // div1.attr("data-medImage", results[i].image.medium.url);  <-- Commented out because it messes up the database right now
            div1.attr("data-title", results[i].title);
            div1.attr("data-description", results[i].description);
            div1.attr("data-latitude", results[i].latitude);
            div1.attr("data-longitude", results[i].longitude);
            // var div1 = $("<div>");
            // div1.attr("class", "mx-auto accept");
            var a1 = $("<button>");
            var like = ("<img src='assets/Images/accept-circular-button-outline.svg' id='like-btn" + i + "' style='height:70px; width:70px' alt='Dislike'>");
            a1.append(like);
            div1.append(a1);
            row.append(div1);
            //Add dislike button
            var div2 = $("<div>");
            div2.attr("class", "mx-auto cancel");
            var a2 = $("<button>");
            var dislike = ("<img src='assets/Images/cancel.svg' id='dislike-btn" + i + "' style='height:70px; width:70px' alt='Dislike'>");
            a2.append(dislike);
            div2.append(a2);
            row.append(div2);

            //Add completed card to the DOM
            $(".deck").append(cardDiv);
        }


        $("#card3").hide();
        $("#card4").hide();
        $("#card5").hide();
        $("#card6").hide();
        $("#card7").hide();
        $("#card8").hide();

        //  function to add marker to map
        function addMarker(latitude, longitude) {
            var marker = new google.maps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude,
                },
                map: map,
                animation: google.maps.Animation.DROP,
            });
            //  pushing markers to empty markers array
            markers.push(marker);
        }

        // function to add markers for each event
        for (var i = 0; i < 9; i++) {
            addMarker(Number(results[i].latitude), Number(results[i].longitude));
        }

        //  logic to display each set of events on map
        function eventMarkers() {
            if (loop == 0) {
                markers[0].setMap(map);
                markers[1].setMap(map);
                markers[2].setMap(map);
                markers[3].setMap(null);
                markers[4].setMap(null);
                markers[5].setMap(null);
                markers[6].setMap(null);
                markers[7].setMap(null);
                markers[8].setMap(null);
            } else if (loop == 3) {
                markers[0].setMap(null);
                markers[1].setMap(null);
                markers[2].setMap(null);
                markers[3].setMap(map);
                markers[4].setMap(map);
                markers[5].setMap(map);
                markers[6].setMap(null);
                markers[7].setMap(null);
                markers[8].setMap(null);
            } else if (loop == 6) {
                markers[0].setMap(null);
                markers[1].setMap(null);
                markers[2].setMap(null);
                markers[3].setMap(null);
                markers[4].setMap(null);
                markers[5].setMap(null);
                markers[6].setMap(map);
                markers[7].setMap(map);
                markers[8].setMap(map);
            }
        }

        eventMarkers();
        inputClear();

        function nextBtn() {
            if (loop == 0) {

                loop += 3;

                //hide
                $("#card0").hide();
                $("#card1").hide();
                $("#card2").hide();

                //then display
                $("#card3").show();
                $("#card4").show();
                $("#card5").show();

                //show previous button
                $("#previous").show();

            } else if (loop == 3) {

                loop += 3;

                //hide
                $("#card3").hide();
                $("#card4").hide();
                $("#card5").hide();

                //then display
                $("#card6").show();
                $("#card7").show();
                $("#card8").show();

                //  hide next button
                $("#next").hide();
            }

            eventMarkers();
        };


        //previous button
        function previousBtn() {

            if (loop == 6) {

                loop -= 3;

                //show
                $("#card3").show();
                $("#card4").show();
                $("#card5").show();

                //then hide
                $("#card6").hide();
                $("#card7").hide();
                $("#card8").hide();

                //  //show next button
                $("#next").show();

            } else if (loop == 3) {

                loop -= 3;

                //show
                $("#card0").show();
                $("#card1").show();
                $("#card2").show();

                //then hide
                $("#card3").hide();
                $("#card4").hide();
                $("#card5").hide();

                //hide Previous button
                $("#previous").hide();
            }
            eventMarkers();
        };

        // create function to loop through next three results from Eventful
        $(document).on("click", "#next", function (event) {
            event.preventDefault();

            nextBtn();
        });

        $(document).on("click", "#previous", function (event) {
            event.preventDefault();

            previousBtn();
        });

        $(document).on("click", ".accept", function () {
            //  database.ref().push({
            //      title: results[i].title,
            //      description: results[i].description,
            //      start_time: results[i].start_time,
            //  })
        });

        //if dislike button is selected
        $(document).on("click", ".cancel", function () {
            //change image to X or something
            //move array's info to firebase
        });
    });
}


// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {
            lat: 39.742043,
            lng: -104.991531
        }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });

}

// Geocode Location
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    if (address === "") {
        $("#noInput").modal();
    } else {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                // var marker = new google.maps.Marker({
                //   map: resultsMap,
                //   position: results[0].geometry.location
                // });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
};

// likes count
likesCount = 0;

//Logic to house like and dislike
$(document).on("click", ".accept", function () {

    //increment Likes count by 1
    likesCount++;

    document.getElementById("fav-counter").innerHTML = likesCount;

    // Creates local "temporary" object for holding event data
    var url = "";
    var image = "";
    var title = "";
    var description = "";
    var time = "";
    var mediumImage = "";
    var latitude = "";
    var longitude = "";
    var distance = "";

    var addEvent = {
        url: $(this).attr("data-url"),
        image: $(this).attr("data-image"),
        title: $(this).attr("data-title"),
        description: $(this).attr("data-description"),
        time: $(this).attr("data-time"),
        // mediumImage: $(this).attr("data-medImage"), <-- Commented out because it messes up the database for now
        latitude: $(this).attr("data-latitude"),
        longitude: $(this).attr("data-longitude"),
        distance: $(this).attr("data-card-txt")
    };

    //push necessary info to the DB to build likes later
    database.ref().push(addEvent);

    // Logs everything to console
    // console.log(addEvent.url);
    // console.log(addEvent.image);
    // console.log(addEvent.title);
    // console.log(addEvent.description);
    // console.log(addEvent.time);
    // console.log(addEvent.mediumImage);
    // console.log(addEvent.latitude);
    // console.log(addEvent.longitude);
    // console.log(addEvent.distance);

});

$(document).on("click", ".cancel", function () {
    cardDiv.remove();
});

//if dislike button is selected
$(document).on("click", "#dislike-btn", function () {
    //change image to X or something
    //move array's info to firebase
});

//Logic for Likes page
$(document).on("click", "#fav-btn", function () {
    for (var i = 0; i < 9; i++) {

        // Create card
        var cardDiv = $("<div>");
        cardDiv.attr("class", "card m-3");
        // cardDiv.attr("id", "card" + i);
        cardDiv.css("width", "21em");
        //Add link to card
        var link = $("<a>");
        link.attr("href", "url"); // <-- changed from results[i].url
        link.attr("target", "_blank");
        cardDiv.append(link);

        //Add image
        var img = $("<img>");
        //If there's no image add no_image.png
        if ("image" == null) { // <--changed from results[i].image
            img.attr("src", "assets/images/no_image.png");
            img.attr("style", "width: 21em;");
            img.attr("style", "height: 15em;");
        } else {
            // Add the event image
            // img.attr("src", "https:" + "mediumImage"); // <-- changed from results[i].image.medium.url
            img.attr("style", "width: 21em;");
            img.attr("style", "height: 15em;");
        }
        link.append(img);

        //Add card body
        var body = $("<div>");
        body.attr("class", "card-body");
        cardDiv.append(body);

        //Add event title
        var title = $("<h5>");
        title.attr("class", "card-title");
        title.text("title"); // <-- changed from results[i].title
        body.append("title");

        //Add description
        var p1 = $("<p>");
        p1.attr("class", "card-text");
        p1.attr("style", "height: 6em;");
        p1.css("overflow", "auto");
        //If there's no description add "No description"
        if ("description" == null) { // <-- changed from results[i].description
            p1.text("No description available");
        } else {
            // Add the event description
            p1.text("description"); // <-- changed from results[i].description
        }
        body.append(p1);

        //Add event time and date
        var p2 = $("<p>");
        p2.attr("class", "card-text");
        var small = $("<small>");
        small.attr("text-muted");
        console.log(time);
        var split1 = time.split(" ");
        var split2 = split1[1].split(":");
        var split3 = split1[0].split("-");
        var date = split3[1] + "/" + split3[2] + "/" + split3[0];
        var time = split2[0] + ":" + split2[1];
        small.text("Date: " + date)
        if (time == "00:00") {
            small.append("");
        } else {
            small.append(" | Time: " + time);
        }
        p2.append(small);
        body.append(p2);

        //Like/dislike buttons
        //Add row
        var row = $("<div>");
        row.attr("class", "row");
        body.append(row);
        //Add like button <--don't need this on the favorites page
        // var div1 = $("<div>");
        // div1.attr("class", "mx-auto accept");
        // var a1 = $("<button>");
        // var like = ("<img src='assets/Images/accept-circular-button-outline.svg' id='like-btn"+ i +"' style='height:65px; width:65px' alt='Like'>");
        // a1.append(like);
        // div1.append(a1);
        // row.append(div1);
        //Add dislike button
        var div2 = $("<div>");
        div2.attr("class", "mx-auto cancel");
        var a2 = $("<button>");
        var dislike = ("<img src='assets/Images/cancel.svg' style='height:70px; width:70px' alt='Dislike'>");
        a2.append(dislike);
        div2.append(a2);
        row.append(div2);
        //Add completed card to the DOM
        $(".deck").append(cardDiv);
    }
});