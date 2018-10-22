$( document ).ready(function() {

    result = [];
    useranswers = [];

    function popModal() {
        $("#resultsimage").attr("src", result[0].image);
        $("#resultsname").html(result[0].name);
        $("#resultsbio").html(result[0].bio);
    }

    function emptyArrays() {
        result = [];
        usersanswers = [];
    }

    // Submit form button
    $("#submit").click(function (event) {
        event.preventDefault();

        // Capture user input
        var answers = {
            username: $("#username").val().trim(),
            userimage: $("#userimage").val().trim(),
            scores: [
                $("#q1").val(),
                $("#q2").val(),
                $("#q3").val(),
                $("#q4").val(),
                $("#q5").val(),
                $("#q6").val(),
                $("#q7").val(),
                $("#q8").val(),
                $("#q9").val(),
                $("#q10").val(),
            ]
        };

        console.log(answers);
        var currentURL = window.location.origin;
        $.post( currentURL + "/api/guardians", answers).done(function (data) {

            console.log("Script.js Post is working")

            console.log("match: " + data.name);
            console.log(data.bio);

            result.push(data);
            useranswers.push(answers.scores);

            popModal();
        });

        $('#surveyresults').modal('toggle');

        // emptyArrays();

        // $.post("/api/users", answers, function (data) {
        //     console.log("Answer pushed to array");
        // });
    })
});