
result = [];
answers = [];

// Submit form button
function submitAnswers() {
    console.log("it's working!");
    event.preventDefault();
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
    console.log(answers.scores);

    $('#surveyresults').modal('open');
}

function popModal() {
    $("#resultsimage").attr("src", results[0].image);
    $("#resultsname").html(reults[0].name);
    $("#resultsbio").html(results[0].bio);
}

function emptyArrays() {
    result = [];
    answers = [];
}

$("#submit").on("click", submitAnswers);