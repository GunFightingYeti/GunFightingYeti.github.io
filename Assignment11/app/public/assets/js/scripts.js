$(document).ready(function () {

	$('.modal').modal();

console.log("Scripts Loaded!")
    result = [];
    answers = [];

    // Submit form button

    $("#submit").click(function (event) {
        event.preventDefault();
        console.log("It's working!");
        // Capture user input
        var answers = {
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
        }
        var question = answers.scores;
        for (var i = 0; i < question.length; i++) {
            result.push(question[i]);
        }
        console.log(result)
        popModal();
        $('#surveyresults').modal('open');

        emptyArrays();
    })

    function popModal() {
        $("#resultsimage").attr("src", result[0].image);
        $("#resultsname").html(result[0].name);
        $("#resultsbio").html(result[0].bio);
    }

    function emptyArrays() {
        result = [];
        answers = [];
    }
});

// $("#submit").on("click", submitAnswers());