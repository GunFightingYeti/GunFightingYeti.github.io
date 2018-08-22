$(document).ready(function () {

    // Initial array of subjects
    var subjects = ["Adventure Time", "Finn the Human", "Jake the Dog", "Princess Bubblegum", "The Ice King"];

    // Function to clear the input box
    function inputClear() {
        $("#input").val('');
    };

    // Function for displaying new buttons
    function makeButtons() {
        $("#buttons").empty();

        //Loop through the array and create a button for each item
        for (var i = 0; i < subjects.length; i++) {
            var btnDiv = $("<button>");
            btnDiv.addClass("subject button");
            btnDiv.attr("data-name", subjects[i]);
            btnDiv.text(subjects[i]);
            $("#buttons").append(btnDiv);
        }
    };

    //Submit button function
    $("#submit").on("click", function (event) {
        event.preventDefault();

        //If input field is empty then alert
        if ($("#input").val() === "") {
            alert("Input field cannot be empty - Please type something in the box");

            //Else, add input text to subjects array
        } else {
            var name = $("#input").val().trim();
            subjects.push(name);
            makeButtons();
            inputClear();
        };
    });

    //Run the makeButtons function to create the initial buttons 
    makeButtons();

    //Call the gif from pushing a button
    $(".subject").on("click", function () {
        var queryURL = "https://api.giphy.com/v1/gifs/search?";
        var search = $(this).attr("data-name");
        $("#gifs").empty();

        //AJAX query
        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                q: search,
                rating: "g",
                limit: 10,
                lang: "en",
                apikey: "TgrLk2W8P5SVKS4dfmvCAwhNGY7Gdbpb"
            }
        }).then(function (response) {
            console.log(response.data);
            //Make the return into a variable
            var results = response.data;

            //Display the return gif on the page
            for (var i = 0; i < results.length; i++) {

                var inputDiv = $("<div class='item'>");
                var p = $("<p>");
                p.text("Rating: " + results[i].rating.toUpperCase());
                var inputImage = $("<img>");
                inputImage.attr("src", results[i].images.fixed_height.url);
                inputImage.attr("data-still", results[i].images.fixed_height_still.url);
                inputImage.attr("data-animate", results[i].images.fixed_height.url);
                inputImage.attr("data-state", "still");
                inputImage.attr("class", "gif");
                inputDiv.prepend(p);
                inputDiv.prepend(inputImage);
                $("#gifs").prepend(inputDiv);
            }

            //console.log(response);
        });

    });

    $(".gif").on("click", function () {
        console.log("It's been clicked!");
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

    });

});