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
    answer3: "Robot 'friends' trying to survive",
    answer4: "A very smart dog and a boy",
    correct: "Robot 'friends' trying to survive"
};

var q6 = {
    question: "Finish the phrase, 'Speedy thing goes in...'",
    answer1: "Now we're gonna win",
    answer2: "Speedy thing comes out",
    answer3: "Ouch!",
    answer4: "Time to slow it down",
    correct: "Speedy thing comes out"
};

var q7 = {
    question: "What is the purpose of the Aperture Science Material Emancipation Grill?",
    answer1: "Making your teeth sparkle",
    answer2: "Cooking delicious meats and veggies",
    answer3: "Free rights for all cooking equipment",
    answer4: "Vaporizing stuff you want to take with you",
    correct: "Vaporizing stuff you want to take with you"
};

var q8 = {
    question: "At the end of your second adventure, what sings a beautiful opera",
    answer1: "Turrets built for murder",
    answer2: "A field of toasters",
    answer3: "Doors with perfectly timed squeaks",
    answer4: "Computers connecting to a dialup connection",
    correct: "Turrets built for murder"
};

var q9 = {
    question: "There a three different gels, what are they?",
    answer1: "Hair, nail and shaving",
    answer2: "Chromium, aluminum and biopolymer", 
    answer3: "Propulsion, repulsion and conversion",
    answer4: "Ballistic, Aero and Jell-O",
    correct: "Propulsion, repulsion and conversion"
};

var q10 = {
    question: "What is the name of the Blue Intelligence Dampening Sphere?",
    answer1: "Carat",
    answer2: "Wheatley",
    answer3: "2.42",
    answer4: "Hope",
    correct: "Wheatley"
};

var trivia = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
var t = 0;

//20 second timer - open
var intervalId;
var timerRunning = false;
var timer = {

    time: 20,

    start: function () {
        if (!timerRunning) {
            intervalId = setInterval(timer.count, 1000);
            timerRunning = true;
        }
    },
    stop: function () {
        clearInterval(intervalId);
        timerRunning = false;
        timer.time = 20;
    },

    count: function () {
        timer.time--;
        var converted = timer.timeConverter(timer.time);
        $(".timer").text(converted);
        if (timer.time < 1) {
            timer.stop();
            timer.time = 20;
            $(".game").hide();
            $(".noanswer").show();
            $(".timer").text("00:10");
            minitimer.start();
            t++;
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
//20 second timer - close

//10second timer
var minitimer = {

    time: 10,

    start: function () {
        if (!timerRunning) {
            intervalId = setInterval(minitimer.count, 1000);
            timerRunning = true;
        }
    },
    stop: function () {
        clearInterval(intervalId);
        timerRunning = false;
        minitimer.time = 10;
    },

    count: function () {
        minitimer.time--;
        var converted = minitimer.timeConverter(minitimer.time);
        $(".timer").text(converted);
        if (minitimer.time < 1) {
            minitimer.stop();
            minitimer.time = 10;
            hideall();
            $(".game").show();
            $(".timer").show();
            $(".timer").text("00:20");
            timer.start();
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
//10 second timer - close

//Fill in the info for the question and answers
function fill(x) {
    $(".question").text(x.question);
    $(".a1").text(x.answer1);
    $(".a2").text(x.answer2);
    $(".a3").text(x.answer3);
    $(".a4").text(x.answer4);
};

//hide all divs
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
    $(".incorrect").text("0");
    $(".volts").text("0");
    $(".start").show();
    $(".timer").text("00:20");
};

//On ready
$(document).ready(function () {

    restart();

    //Game start on click
    $(".start").click(function () {
        hideall();
        $(".game").show();
        $(".timer").show();
        $(".timer").text("00:20");
        fill(q1);
        timer.start();
    });

    //Retry after time out
    $(".retry").click(function () {
        hideall();
        $(".game").show();
        $(".timer").show();
        minitimer.stop();
        $(".timer").text("00:20");
        timer.start();
    });

    var n = 0;
    var v = 0;
    var audio = new Audio("assets/audio/still_alive.mp3");

    // Check answer and log incorrect
    function checkanswer(a) {
        timer.stop();
        if ($(a).text() == trivia[n].correct) {
            $(".game").hide();
            $(".timer").show();
            $(".rightanswer").show();
            $(".timer").text("00:10");
            minitimer.start();
            n++;
            if (n > 9) {
                var volts = v * 15;
                hideall();
                $(".win").show();
                $(".timer").show();
                $(".incorrect").text(v);
                if (volts == 0) {
                    $(".volts").text(0);
                } else {
                    $(".volts").text(volts + ",000");
                }
                $(".notry").text(t);
                $(".retake").show();
                minitimer.stop();
                timer.stop();
                audio.play();
            } else {
                fill(trivia[n]);
            }
        } else {
            $(".game").hide();
            minitimer.start();
            $(".timer").show();
            $(".timer").text("00:10");
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

    //Next question button
    $(".next").click(function () {
        hideall();
        minitimer.stop();
        $(".game").show();
        $(".timer").show();
        $(".timer").text("00:20");
        timer.start();
    });

    //Restart the quiz
    $(".retake").click(function () {
        hideall();
        audio.pause();
        audio.currentTime = 0;
        $(".start").show();
        n = 0;
        v = 0;
        t = 0;
    });

});