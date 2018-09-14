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

//Function to make ajax call
function ajaxCall(search, location) {

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
                img.attr("class", "image");
                img.attr("style", "width: 21em;");
                img.attr("style", "height: 15em;");
            } else {
                // Add the event image
                img.attr("src", "https:" + results[i].image.medium.url);
                img.attr("class", "medImage");
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
            div1.attr("data-title", results[i].title);
            var a1 = $("<button>");
            var like = ("<img src='assets/Images/accept-circular-button-outline.svg' id='like-btn" + i + "' style='height:65px; width:65px' alt='Like'>");
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

        function markers() {
            var event1 = {
                lat: Number(results[0].latitude),
                lng: Number(results[0].longitude)
            };
            var event2 = {
                lat: Number(results[1].latitude),
                lng: Number(results[1].longitude)
            };
            var event3 = {
                lat: Number(results[2].latitude),
                lng: Number(results[2].longitude)
            };

            var marker = new google.maps.Marker({
                position: event1,
                map: map
            });
            var marker = new google.maps.Marker({
                position: event2,
                map: map
            });
            var marker = new google.maps.Marker({
                position: event3,
                map: map
            });
        }

        markers();

        //hide all but the first 3 cards created
        $("#card3").hide();
        $("#card4").hide();
        $("#card5").hide();
        $("#card6").hide();
        $("#card7").hide();
        $("#card8").hide();
    });

    inputClear();
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
}

//global variable for keeping track of apiLoop iteration
var loop = 0;

$(document).on("click", "#submit", function (event) {
    event.preventDefault();

    //reset loop
    loop = 0;
    $("#next").show();
    $("#previous").hide();

    var search = $("#event").val().trim();
    var location = $("#address").val().trim();

    if (search === "" || location === "") {
        $("#noInput").modal();
    } else {
        //Call the AJAX function when submit button is pushed
        ajaxCall(search, location);
    };
});

// create function to loop through next three results from Eventful
$(document).on("click", "#next", function (event) {
    event.preventDefault();
    nextBtn()
});

function nextBtn() {

var group1 = [$("#card0"), $("#card1"), $("#card2")];
console.log(group1)

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

    } else if (loop == 6) {
        //hide Next button
        $("#next").hide();
    };
};

//previous button
function previousBtn() {
    if (loop == 6) {
        //show
        $("#card3").show();
        $("#card4").show();
        $("#card5").show();

        //then hide
        $("#card6").hide();
        $("#card7").hide();
        $("#card8").hide();
        loop -= 3;
        //show next button
        $("#next").show();
    } else if (loop == 3) {
        //show
        $("#card0").show();
        $("#card1").show();
        $("#card2").show();

        //then hide
        $("#card3").hide();
        $("#card4").hide();
        $("#card5").hide();
        loop -= 3;
        //hide Previous button
        $("#previous").hide();
    }
};

$(document).on("click", "#previous", function (event) {
    event.preventDefault();

    previousBtn()
});

//likes counter
likesCount = 0;
//Logic to house like and dislike
$(document).on("click", ".accept", function () {
    console.log(this);
    //increment Likes count by 1
    likesCount++;
    console.log("check for like increment", likesCount);
    document.getElementById("fav-counter").innerHTML = likesCount;
    // Creates local "temporary" object for holding event data
    var title = "";
    console.log($(this).attr("data-title"));
    var addEvent = {
        url: $(this).attr("url"),
        image: $(this).attr("image"),
        title: $(this).attr("data-title"),
        description: $(this).attr("card-text"),
        //time: results[i].start_time, <-- time not displayed on screen
        //mediumImage: this.medImage,
        //latitude: results[i].latitude,
        //longitude: results[i].longitude
        //distance: this.card-txt
    };

    //push necessary info to the DB to build likes later
    database.ref().push(addEvent);

    // Logs everything to console
    //console.log(addEvent.url);
    //console.log(addEvent.image);
    console.log(addEvent.title);
    //console.log(addEvent.description);
    //console.log(addEvent.time);
    //console.log(addEvent.mediumImage);
    //console.log(addEvent.latitude);
    //console.log(addEvent.longitude);
    //console.log(addEvent.distance);

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

//If Likes button is pressed
//hide search boxes
//execute display_likes function  <-- this will display all events from likes DB.

//code for identifying users logged in
// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections"); //<--need to change this to likes

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});