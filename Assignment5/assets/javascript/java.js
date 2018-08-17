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
    question: "What is hidden in the basement of this facility?",
    answer1: "The Holy Hand Grenade",
    answer2: "The one ring",
    answer3: "The goblet of fire",
    answer4: "The cake",
    correct: "The cake"
};

var q3 = {
    question: "The gun you were testing used which two colors to differenciate between portals?",
    answer1: "Orange & Blue",
    answer2: "Red & Blue",
    answer3: "Black & Yellow",
    answer4: "Green & Red",
    correct: "Orange & Blue"
};

var q4 = {
    question: "What is the name of the artificial intelligence that is breifly housed in a potato?",
    answer1: "Hal 9000",
    answer2: "Sonny",
    answer3: "GLaDOS",
    answer4: "WOPR",
    correct: "GLaDOS"
};

var q5 = {
    question: "Who are Atlas and Peabody?",
    answer1: "A drunk pirate and a blacksmith",
    answer2: "Two mice trying to take over the world",
    answer3: "Robot 'friends' trying to live",
    answer4: "A very smart dog and a boy",
    correct: "Robot 'friends' trying to live"
};

var trivia = [q1, q2, q3, q4, q5];

//25 second timer - open
var intervalId;
var timerRunning = false;
var timer = {

    time: 25,

    start: function () {
        if (!timerRunning) {
            intervalId = setInterval(timer.count, 1000);
            timerRunning = true;
        }
    },
    stop: function () {
        clearInterval(intervalId);
        timerRunning = false;
        timer.time = 25;
    },

    count: function () {
        timer.time--;
        var converted = timer.timeConverter(timer.time);
        $(".timer").text(converted);
        if (timer.time < 1) {
            timer.stop();
            timer.time = 25;
            $(".game").hide();
            $(".noanswer").show();
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
//25 second timer - close

//Fill in the info for the question and answers
function fill(x) {
    $(".question").text(x.question);
    $(".a1").text(x.answer1);
    $(".a2").text(x.answer2);
    $(".a3").text(x.answer3);
    $(".a4").text(x.answer4);
};

function hideall() {
    $(".start").hide();
    $(".game").hide();
    $(".rightanswer").hide();
    $(".wronganswer").hide();
    $(".noanswer").hide();
    $(".win").hide();
}

//Show landing page
function restart() {
    hideall();
    $(".start").show();
    $(".timer").text("00:25");
};

//On ready
$(document).ready(function () {

    restart();

    //Game start on click
    $(".start").click(function () {
        hideall();
        $(".game").show();
        $(".timer").show();
        $(".timer").text("00:25");
        fill(q1);
        timer.start();
    });

    //Retry after time out
    $(".restart").click(function () {
        hideall();
        $(".game").show();
        $(".timer").show();
        $(".timer").text("00:25");
        timer.start();
    });

    var n = 0;
    var v = 0;

    // Check answer and log incorrect
    function checkanswer(a) {
        timer.stop();
        if ($(a).text() == trivia[n].correct) {
            $(".game").hide();
            $(".timer").hide();
            $(".rightanswer").show();
            n++;
            if (n > 4) {
                var volts = v * 15;
                hideall();
                $(".win").show();
                $(".incorrect").text(v);
                $(".volts").text(volts);
                $(".retake").show();
            } else {
                fill(trivia[n]);
            }
        } else {
            $(".game").hide();
            $(".timer").hide();
            $(".wronganswer").show();
            v++;
        };

    };

    //Answer options
    $(".button1").click(function () {
        checkanswer(".a1");
    });
    $(".button2").click(function () {
        checkanswer(".a2");
    });
    $(".button3").click(function () {
        checkanswer(".a3");
    });
    $(".button4").click(function () {
        checkanswer(".a4");
    });

    $(".next").click(function () {
        hideall();
        $(".game").show();
        $(".timer").show();
        $(".timer").text("00:25");
        timer.start();
    });

    $(".retake").click(function () {
        hideall();
        $(".start").show();
        n = 0;
    });

});