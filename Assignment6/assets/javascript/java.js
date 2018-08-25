$(document).ready(function () {

    // Initial array of topics
    var topics = ["Jake the Dog", "Finn the Human", "Princess Bubblegum", "Marceline", "The Ice King", "Beemo"];

    // Function to clear the input box
    function inputClear() {
        $("#input").val('');
    };

    //Function for displaying new buttons
    function makeButtons() {
        $("#buttons").empty();

        //Loop through the array and create a button for each item
        for (var i = 0; i < topics.length; i++) {
            var btnDiv = $("<button>");
            btnDiv.addClass("subject");
            btnDiv.addClass("button");
            btnDiv.attr("data-name", topics[i]);
            btnDiv.text(topics[i]);
            $("#buttons").append(btnDiv);
        }
    };

    //Used to call amount of gifs
    var amount = 10;
    var lasttopic = ["Adventure Time"];

    function ajaxCall(press) {

        //Empty any gifs that might be in the div
        $("#gifs").empty();

        //AJAX search URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?";
        //AJAX search term
        var search = $(press).attr("data-name");

        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                q: search,
                rating: "g",
                limit: amount,
                lang: "en",
                apikey: "TgrLk2W8P5SVKS4dfmvCAwhNGY7Gdbpb"
            }
        }).then(function (response) {

            //Make the return into a variable
            var results = response.data;

            //Display the return gif on the page
            for (var i = 0; i < results.length; i++) {

                var inputDiv = $("<div class='item'>");
                var p = $("<p>");
                p.text("Rating: " + results[i].rating.toUpperCase());
                var inputImage = $("<img>");
                inputImage.attr("src", results[i].images.fixed_height_still.url);
                inputImage.attr("data-still", results[i].images.fixed_height_still.url);
                inputImage.attr("data-animate", results[i].images.fixed_height.url);
                inputImage.attr("data-state", "still");
                inputImage.attr("class", "gif");
                inputDiv.prepend(p);
                inputDiv.prepend(inputImage);
                $("#gifs").prepend(inputDiv);
            }
        });

    }

    //Call the gif from pushing a button
    $(document).on("click", ".subject", function (event) {

        //Call the AJAX function when subject button is pushed
        ajaxCall(this);
    });

    //Submit button function
    $("#submit").on("click", function (event) {
        event.preventDefault();

        //If input field is empty then alert
        if ($("#input").val() === "") {
            alert("Input field cannot be empty - Please type something in the box");

            //Else, add input text to topics array
        } else {
            var name = $("#input").val().trim();
            topics.push(name);
            inputClear();
            makeButtons();
        };
    });

    $(document).on("click", ".gif", function (event) {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    //Run the makeButtons function to create the initial buttons 
    makeButtons();

});