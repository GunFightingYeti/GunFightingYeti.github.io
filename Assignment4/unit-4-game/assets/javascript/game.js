//Character objects
var luke = {
    name: "Luke Skywalker",
    health: 175,
    attack: 20,
    power: 6,
    image: "assets/images/luke.png"
}
$("lattack").text(luke.attack);

var obiwan = {
    name: "Obiwan Kenobi",
    health: 200,
    attack: 15,
    power: 7,
    image: "assets/images/obiwan.jpg"
}
var yoda = {
    name: "Yoda",
    health: 150,
    attack: 25,
    power: 8,
    image: "assets/images/yoda.jpg"
}
var vader = {
    name: "Darth Vader",
    health: 175,
    attack: 20,
    power: 7,
    image: "assets/images/vader.jpg"
}
var maul = {
    name: "Darth Maul",
    health: 200,
    attack: 15,
    power: 6,
    image: "assets/images/maul.png"
}
var sidious = {
    name: "Darth Sidious",
    health: 125,
    attack: 25,
    power: 8,
    image: "assets/images/sidious.jpg"
}

//On ready - Open
$(document).ready(function () {

    //New game - Open
    function gamestart() {
        $("#choose").show();
        $("#lightside").hide();
        $("#lightsideOpp").hide();
        $("#darkside").hide();
        $("#darksideOpp").hide();
        $("#fight").hide();
        $("#lose").hide();
        $("#win").hide();
        $(".song").stop();
    }
    //Run gamestart program
    gamestart()

    //New game - Close


    //Navigation - Open
    //Choose to Hero
    // Show Lightside
    $(".btn-success").click(function () {
        $("#choose").hide();
        $("#lightside").show();
    });
    // Show Darkside
    $(".btn-danger").click(function () {
        $("#choose").hide();
        $("#darkside").show();
    });

    // Hero to Opponent
    // Show Dark Opponent
    $(".lighthero").click(function () {
        $("#lightside").hide();
        $("#darksideOpp").show();
    });
    // Show Dark Opponent
    $(".darkhero").click(function () {
        $("#darkside").hide();
        $("#lightsideOpp").show();
    });

    //Opponent to fight
    //Dark oppenent to fight
    $(".darkOpp").click(function () {
        $("#darksideOpp").hide();
        $("#fight").show();
    });
    //Light opponent to fight
    $(".lightOpp").click(function () {
        $("#lightsideOpp").hide();
        $("#fight").show();
    });

    //Fight to lose
    //New Opponent
     $(".newOpp").click(function () {
         $("#fight").hide();
         $("#lose").show();
     });

    //Fight to win
    //New Opponent
    $(".newOpp").click(function () {
        $("#fight").hide();
        $("#win").show();
    });

    //New Game
    //Restart
    $(".newgame").click(function () {
        gamestart();

    });
    //Navigation - Close

});
//On ready - Close