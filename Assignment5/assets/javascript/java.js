// Trivia question objects
var q1 = {
    question: "What is your name?",
    answer1: "Katniss",
    answer2: "Chell",
    answer3: "Arwen",
    answer4: "Leeloo",
    correct: "Chell"
};

var q2 = {
    question: "What food item was used to keep you motivated that may or may not be a lie?",
    answer1: "The goose",
    answer2: "The cheese",
    answer3: "The pickle",
    answer4: "The cake",
    correct: "The cake"
};

var q3 = {
    question: "What is the name of the artificial intelligence that is breifly housed in a potato?",
    answer1: "Phillis",
    answer2: "ArGon",
    answer3: "GLaDOS",
    answer4: "Atlas",
    correct: "GLaDOS"
};

var q4 = {
    question: "The gun you were testing used which two colors to differenciate between portals?",
    answer1: "Orange & Blue",
    answer2: "Purple & Orange",
    answer3: "Blue & Yellow",
    answer4: "Green & Red",
    correct: "Orange & Blue"
};

var q5 = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correct: ""
};

var trivia = [q1, q2, q3, q4, q5];

//30 second timer - open
var intervalId;
var timerRunning = false;
var timer = {

    time: 5,

    start: function () {
        if (!timerRunning) {
            intervalId = setInterval(timer.count, 1000);
            timerRunning = true;
        }
    },
    stop: function () {
        clearInterval(intervalId);
        timerRunning = false;
    },

    count: function () {
        timer.time--;
        var converted = timer.timeConverter(timer.time);
        $(".timer").text(converted);
        if (timer.time < 1) {
            timer.stop();
            $(".game").hide();
            $(".wronganswer").show();
        }
    },

    timeConverter: function (t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
};
//30 second timer - close

//Fill in the info for the question and answers
function fill(x) {
    $(".question").text(x.question);
    $(".a1").text(x.answer1);
    $(".a2").text(x.answer2);
    $(".a3").text(x.answer3);
    $(".a4").text(x.answer4);
};

// function correct() {
//     //correct answer holding area
// }

//On ready
$(document).ready(function () {

    //Show landing page
    $(".game").hide();
    $(".rightanswer").hide();
    $(".wronganswer").hide();


    //Game start or restart
    $(".start").click(function () {
        $(".start").hide();
        $(".game").show();
        $(".timer").text("00:30")
         fill(q1);
        timer.start();
    });

    $(".restart").click(function () {
        $(".start").hide();
        $(".game").show();
        $(".timer").text("00:30")
         fill(q1);
        timer.start();
    });

    // $(".button").click(function () {
    //     if ($("") == ) {
    //     //Check if answer is correct
    //     };
    //     });


    // fill(q2);

});