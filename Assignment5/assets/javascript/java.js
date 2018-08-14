// Trivia question objects
var q1 = {
    question: "What is the name of the artificial intelligence that is breifly housed in a potato?",
    answer1: "Phillis",
    answer2: "ArGon",
    answer3: "GLaDOS",
    answer4: "Atlas"
};

var q2 = {
    question: "In the basement of the Aperature Science testing facility there is a lie, what is that lie?",
    answer1: "The goose",
    answer2: "The cheese",
    answer3: "The pickle",
    answer4: "The cake"
};

var q3 = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: ""
};

var q4 = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: ""
};

var q5 = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: ""
};

var trivia = [q1, q2, q3, q4, q5];
var timer = [];

function timer() {
    $("#timer").text();
    setTimeout(function () {
        alert("Time's up!");
    }, 1000 * 30);
};

function fill(x) {
    $(".question").text(x.question);
    $(".a1").text(x.answer1);
    $(".a2").text(x.answer2);
    $(".a3").text(x.answer3);
    $(".a4").text(x.answer4);
};

$(document).ready(function () {


            $(".game").hide();
            $(".solution").hide();


            //Game start
            $(".start").click(function () {
                $(".start").hide();
                $(".game").show();
                $(".timer").text("00:30")
                fill(q1);
            });

            $(".button").click(function () {
                    fill(q2);
                })


                // fill(q2);

            });