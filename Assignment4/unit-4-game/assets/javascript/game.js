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
    var which = [] //Variable to determine if user picked light or dark.  0=light & 1=dark
    // Light side choice
    // Hero = Obiwan
    $(".heroben").click(function () {
        herostats.push(obiwan.attack, obiwan.health, obiwan.power, obiwan.name);
        $(".heroname").text(obiwan.name);
        $(".heroattack").text(obiwan.attack);
        $(".herohealth").text(obiwan.health);
        $(".heroimage").attr("src", obiwan.image);
        which = 0
        //Change page
        $("#lightside").hide();
        $("#darksideOpp").show();
    });
    // Hero = Luke
    $(".heroluke").click(function () {
        herostats.push(luke.attack, luke.health, luke.power, luke.name);
        $(".heroname").text(luke.name);
        $(".heroattack").text(luke.attack);
        $(".herohealth").text(luke.health);
        $(".heroimage").attr("src", luke.image);
        which = 0
        //Change page
        $("#lightside").hide();
        $("#darksideOpp").show();
    });
    // Hero = Yoda
    $(".heroyoda").click(function () {
        herostats.push(yoda.attack, yoda.health, yoda.power, yoda.name);
        $(".heroname").text(yoda.name);
        $(".heroattack").text(yoda.attack);
        $(".herohealth").text(yoda.health);
        $(".heroimage").attr("src", yoda.image);
        which = 0
        //Change page
        $("#lightside").hide();
        $("#darksideOpp").show();
    });

    // Dark side choice
    // Hero = Vader
    $(".herovader").click(function () {
        herostats.push(vader.attack, vader.health, vader.power, vader.name);
        $(".heroname").text(vader.name);
        $(".heroattack").text(vader.attack);
        $(".herohealth").text(vader.health);
        $(".heroimage").attr("src", vader.image);
        which = 1
        //Change page
        $("#darkside").hide();
        $("#lightsideOpp").show();
    });
    // Hero = Maul
    $(".heromaul").click(function () {
        herostats.push(maul.attack, maul.health, maul.power, maul.name);
        $(".heroname").text(maul.name);
        $(".heroattack").text(maul.attack);
        $(".herohealth").text(maul.health);
        $(".heroimage").attr("src", maul.image);
        which = 1
        //Change page
        $("#darkside").hide();
        $("#lightsideOpp").show();
    });
    // Hero = Sidious
    $(".herosidious").click(function () {
        herostats.push(sidious.attack, sidious.health, sidious.power, sidious.name);
        $(".heroname").text(sidious.name);
        $(".heroattack").text(sidious.attack);
        $(".herohealth").text(sidious.health);
        $(".heroimage").attr("src", sidious.image);
        which = 1
        //Change page
        $("#darkside").hide();
        $("#lightsideOpp").show();
    });
    // Hero to Opponent - Close


    //Opponent to fight - Open
    //Light side opponent
    //Opponent = Obiwan
    $(".oppben").click(function () {
        oppstats.push(obiwan.attack, obiwan.health, obiwan.name);
        $(".oppname").text(obiwan.name);
        $(".oppattack").text(obiwan.attack);
        $(".opphealth").text(obiwan.health);
        $(".oppimage").attr("src", obiwan.image);
        $(".oppben").empty()
        //Change page
        $("#lightsideOpp").hide();
        $("#fight").show();
    });
    //Opponent = Luke
    $(".oppluke").click(function () {
        oppstats.push(luke.attack, luke.health, luke.name);
        $(".oppname").text(luke.name);
        $(".oppattack").text(luke.attack);
        $(".opphealth").text(luke.health);
        $(".oppimage").attr("src", luke.image);
        $(".oppluke").empty()
        //Change page
        $("#lightsideOpp").hide();
        $("#fight").show();
    });
    //Opponent = Yoda
    $(".oppyoda").click(function () {
        oppstats.push(yoda.attack, yoda.health, yoda.name);
        $(".oppname").text(yoda.name);
        $(".oppattack").text(yoda.attack);
        $(".opphealth").text(yoda.health);
        $(".oppimage").attr("src", yoda.image);
        $(".oppyoda").empty()
        //Change page
        $("#lightsideOpp").hide();
        $("#fight").show();
    });

    //Dark side opponent
    //Opponent = Vader
    $(".oppvader").click(function () {
        oppstats.push(vader.attack, vader.health, vader.name);
        $(".oppname").text(vader.name);
        $(".oppattack").text(vader.attack);
        $(".opphealth").text(vader.health);
        $(".oppimage").attr("src", vader.image);
        $(".oppvader").empty()
        //Change page
        $("#darksideOpp").hide();
        $("#fight").show();
    });
    //Opponent = Maul
    $(".oppmaul").click(function () {
        oppstats.push(maul.attack, maul.health, maul.name);
        $(".oppname").text(maul.name);
        $(".oppattack").text(maul.attack);
        $(".opphealth").text(maul.health);
        $(".oppimage").attr("src", maul.image);
        $(".oppmaul").empty()
        //Change page
        $("#darksideOpp").hide();
        $("#fight").show();
    });
    //Opponent = Sidious
    $(".oppsidious").click(function () {
        oppstats.push(sidious.attack, sidious.health, sidious.name);
        $(".oppname").text(sidious.name);
        $(".oppattack").text(sidious.attack);
        $(".opphealth").text(sidious.health);
        $(".oppimage").attr("src", sidious.image);
        $(".oppsidious").empty()
        //Change page
        $("#darksideOpp").hide();
        $("#fight").show();
    });
    //Opponent to fight - Close

    //Battle variables
    var herostats = []; //Attack = 0 | Health = 1 | Power = 2 | Name = 3
    var oppstats = []; //Attack = 0 | Health = 1 | Name = 2

    //Fight Button
    $(".fight").click(function () {

        //Change opponent's health
        oppstats[1] = oppstats[1] - herostats[0];

        //Change hero's health
        herostats[1] = herostats[1] - oppstats[0];

        //Update battle cards
        $(".heroattack").text(herostats[0]);
        $(".herohealth").text(herostats[1]);
        $(".opphealth").text(oppstats[1]);

        //Update battle details
        $("#info").html(herostats[3] + " does " + herostats[0] + " damage.  " + oppstats[2] + " does " + oppstats[0] + " damage back.");
        //Update playing card

        //Hero's Power increase
        herostats[0] = herostats[0] + herostats[2];

        // If you're dead then you lose 
        if (herostats[1] <= 0) {
            $("#fight").hide();
            $("#lose").show();
        }

        //If the oppenent is dead then choose another opponent
        if (oppstats[1] <= 0) {
            if (which == 0) {
                $("#fight").hide();
                $("#darksideOpp").show();
            } else {
                $("#fight").hide();
                $("#lightsideOpp").show();
            }
        }

        //Fight button - Close
    });

    $(".newopp").click(function () {
        var t = 0;
        t++;
        console.log(t);

        if (t == 2); {
            $("#fight").hide();
            $("#win").show();
        };
    });

    //New Game
    //Restart
    $(".newgame").click(function () {
        location.reload();
        //gamestart();


        //Navigation - Close
    });

    //On ready - Close
});