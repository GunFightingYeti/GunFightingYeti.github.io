$(document).ready(function () {

    // Initial array of subjects
    var subjects = ["Portal 2", "Firefly", "Star Wars", "Jackie Chan", "Adventure Time"];

    // Function for displaying new buttons
    function makeButtons() {
        $("#buttons").empty();

        for (var i = 0; i < subjects.length; i++) {
            var btnDiv = $("<button>");
            btnDiv.addClass("subject button");
            btnDiv.attr("data-name", subjects[i]);
            btnDiv.text(subjects[i]);
            $("#buttons").append(btnDiv);
        }
    };

    makeButtons();

    // Function to clear the input box after pressing enter
    function inputClear() {
        $("#input").val('');
    };

    $("#submit").on("click", function (event) {

        if ($("#input").val() === "") {
            alert("Input field cannot be empty - Please type something in the box");
        } else {
            event.preventDefault();
            var name = $("#input").val().trim();
            subjects.push(name);
            makeButtons();
            inputClear();
        };
    });

    //Call the gif from pushing a button
    $(".subject").on("click", function () {
        var queryURL = "https://api.giphy.com/v1/gifs/random?";
        var search = $(this).attr("data-name");

        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                q: search,
                limit: 10,
                apikey: "TgrLk2W8P5SVKS4dfmvCAwhNGY7Gdbpb"
            }
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var inputDiv = $("<div class='item'>");
                var p = $("<p>");
                p.text("Rating: " + results[i].rating.toUpperCase());
                var inputImage = $("<img>");
                inputImage.attr("src", results[i].images.fixed_height.url);
                inputDiv.prepend(p);
                inputDiv.prepend(inputImage);
                $("#gifs").prepend(inputDiv);
            }
            console.log(response);
        });

    });

});