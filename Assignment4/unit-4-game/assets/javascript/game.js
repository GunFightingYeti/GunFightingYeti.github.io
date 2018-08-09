//Character objects
var luke = {
    name: "Luke Skywalker",
    health: 175,
    attack: 20,
    power: 6
}

var ben = {
    name: "Obiwan Kenobi",
    health: 200,
    attack: 15,
    power: 7
}

var yoda = {
    name: "Yoda",
    health: 150,
    attack: 25,
    power: 8
}

var vader = {
    name: "Darth Vader",
    health: 175,
    attack: 20,
    power: 7
}

var maul = {
    name: "Darth Maul",
    health: 200,
    attack: 15,
    power: 6
}

var sidious = {
    name: "Darth Sidious",
    health: 125,
    attack: 25,
    power: 8
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

    //Run game start program
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
        if ($(".heroluke")) {
            $("#lightside").hide();
            $("#darksideOpp").show();
        }

    });
    // Show Dark Opponent
    $(".darkhero").click(function () {
        $("#darkside").hide();
        $("#lightsideOpp").show();
    });

    //Opponent to fight
    //Fight
    $(".darkOpp").click(function () {
        $("#darksideOpp").hide();
        $("#fight").show();
    });
    //Fight
    $(".lightOpp").click(function () {
        $("#lightsideOpp").hide();
        $("#fight").show();
    });

    //Fight to win
    //New Opponent
    $(".newOpp").click(function () {
        $("#fight").hide();
        $("#win").show();
    });

    //New Game
    //Restart
    $("#newgame").click(function () {
        gamestart();

    });
    //Navigation - Close

});
//On ready - Close