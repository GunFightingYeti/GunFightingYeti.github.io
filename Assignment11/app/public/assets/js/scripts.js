$(document).ready(function () {
    result = [];
    useranswers = [];

    function popModal() {
        $("#resultname").html(result[0].name);
        $("#resultimage").attr("src", result[0].image);
        $("#resultbio").html(result[0].bio);
    }

    function emptyArrays() {
        result = [];
        usersanswers = [];
        // console.log("Array's cleared");
    }

    // Submit form button
    $("#submit").submit(function (event) {
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
                $("#q10").val()
            ]
        };

        var currentURL = window.location.origin;
        $.post(currentURL + "/api/guardians", answers, function (data) {

            result.push(data);
            // useranswers.push(answers);

            popModal();
        });

        $('#surveyresults').modal('toggle');

        emptyArrays();

        // $.post("/api/users", answers, function (data) {
        // });
    })
});