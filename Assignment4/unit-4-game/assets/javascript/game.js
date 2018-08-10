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


    //Character objects - Start
    //Luke
    var luke = {
        name: "Luke Skywalker",
        health: 175,
        attack: 20,
        power: 6,
        image: "assets/images/luke.png"
    };
    $(".lattack").text(luke.attack);
    $(".lhealth").text(luke.health);

    //Obiwan
    var obiwan = {
        name: "Obiwan Kenobi",
        health: 200,
        attack: 15,
        power: 7,
        image: "assets/images/obiwan.jpg"
    };
    $(".oattack").text(obiwan.attack);
    $(".ohealth").text(obiwan.health);

    //Yoda
    var yoda = {
        name: "Yoda",
        health: 150,
        attack: 25,
        power: 8,
        image: "assets/images/yoda.jpg"
    };
    $(".yattack").text(yoda.attack);
    $(".yhealth").text(yoda.health);

    //Darth Vader
    var vader = {
        name: "Darth Vader",
        health: 175,
        attack: 20,
        power: 7,
        image: "assets/images/vader.jpg"
    };
    $(".vattack").text(vader.attack);
    $(".vhealth").text(vader.health);

    //Darth Maul
    var maul = {
        name: "Darth Maul",
        health: 200,
        attack: 15,
        power: 6,
        image: "assets/images/maul.png"
    };
    $(".mattack").text(maul.attack);
    $(".mhealth").text(maul.health);

    //Darth Sidious
    var sidious = {
        name: "Darth Sidious",
        health: 125,
        attack: 25,
        power: 8,
        image: "assets/images/sidious.jpg"
    };
    $(".sattack").text(sidious.attack);
    $(".shealth").text(sidious.health);
    //Character objects - Close

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


    // Hero to Opponent - Open
    // Light side choice
    // Hero = Obiwan
    $(".heroben").click(function () {
        $(this).appendTo("#hero");
        $("#lightside").hide();
        $("#darksideOpp").show();
    });
    // Hero = Luke
    $(".heroluke").click(function () {
        $(this).appendTo("#hero");
        $("#lightside").hide();
        $("#darksideOpp").show();
    });
    // Hero = Yoda
    $(".heroyoda").click(function () {
        $(this).appendTo("#hero");
        $("#lightside").hide();
        $("#darksideOpp").show();
    });

    // Dark side choice
    // Hero = Vader
    $(".herovader").click(function () {
        $(this).appendTo("#hero");
        $("#darkside").hide();
        $("#lightsideOpp").show();
    });
    // Hero = Maul
    $(".heromaul").click(function () {
        $(this).appendTo("#hero");
        $("#darkside").hide();
        $("#lightsideOpp").show();
    });
    // Hero = Sidious
    $(".herosidious").click(function () {
        $(this).appendTo("#hero");
        $("#darkside").hide();
        $("#lightsideOpp").show();
    });
    // Hero to Opponent - Close


    //Opponent to fight - Open
    //Light side opponent
    //Opponent = Obiwan
    $(".oppben").click(function () {
        $(this).appendTo("#opponent");
        $("#lightsideOpp").hide();
        $("#fight").show();
    });
    //Opponent = Luke
    $(".oppluke").click(function () {
        $(this).appendTo("#opponent");
        $("#lightsideOpp").hide();
        $("#fight").show();
    });
    //Opponent = Yoda
    $(".oppyoda").click(function () {
        $(this).appendTo("#opponent");
        $("#lightsideOpp").hide();
        $("#fight").show();
    });

    //Dark side opponent
    //Opponent = Vader
    $(".oppvader").click(function () {
        $(this).appendTo("#opponent");
        $("#darksideOpp").hide();
        $("#fight").show();
    });
    //Opponent = Maul
    $(".oppmaul").click(function () {
        $(this).appendTo("#opponent");
        $("#darksideOpp").hide();
        $("#fight").show();
    });
    //Opponent = Sidious
    $(".oppsidious").click(function () {
        $(this).appendTo("#opponent");
        $("#darksideOpp").hide();
        $("#fight").show();
    });
    //Opponent to fight - Close


    //Fight Button
    var battle =
        $(".fight").click(function () {
            $("#info").append(battle)
        });

    // If dead then you lose, else you are alive and then yay! 
    if (hero.health <= 0) {
        //Fight to lose
        //New Opponent
        $(".newOpp").click(function () {
            $("#fight").hide();
            $("#lose").show();
        });
    } else {

        //Fight to win
        //New Opponent
        $(".newOpp").click(function () {
            $("#fight").hide();
            $("#win").show();
        });
    }

    //New Game
    //Restart
    $(".newgame").click(function () {
        gamestart();
    });
    //Navigation - Close

});
//On ready - Close