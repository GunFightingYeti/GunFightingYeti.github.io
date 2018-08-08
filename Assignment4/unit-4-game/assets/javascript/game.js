$(document).ready(function () {

    //New game
    function gamestart() {
        $("#choose").show();
        $("#lightside").hide();
        $("#lightsideOpp").hide();
        $("#darkside").hide();
        $("#darksideOpp").hide();
        $("#fight").hide();
        $("#win").hide();

        //Character Stat arrays
        // var attackArray = [10, 15, 20, 25, 30];
        // var healthArray = [125, 150, 175, 200, 225];
        // var powerArray = [5, 6, 7, 8, 9];

        //Stat randomizer
        // for (var s = 0; s < 5; s++) {
        //Attack
        // var attack = $(".attack");
        // attackval = attackArray[Math.floor(Math.random() * attackArray.length)];
        // console.log("Attack: " + attackval)
        // attack.html(attackval)

        //Health
        // var health = $(".health");
        // healthval = healthArray[Math.floor(Math.random() * healthArray.length)];
        // console.log("Health: " + healthval)
        // health.html(healthval)

        //Power
        // var power = $("");
        // powerval = powerArray[Math.floor(Math.random() * powerArray.length)];
        // console.log("Power: " + powerval)
        // power.html(powerval)
        // }
    }

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
    gamestart()

});

//         // Check if we've already run a calculation, if so... we'll just.
//         if (isCalculated) {
//             return false;
//         }

//         // If operator is chosen, we should be writing the secondNumber, otherwise, the firstNumber
//         if (isOperatorChosen) {
//             secondNumber += $(this).val();
//             $("#second-number").text(secondNumber);

//         } else {
//             firstNumber += $(this).val();
//             $("#first-number").text(firstNumber);
//         }

//     });
//     $(".operator").on("click", function () {

//         // Check if a first number has already been selected
//         // Or we've already run a calculation, if so we just exit.
//         if (!firstNumber || isCalculated) {
//             return false;
//         }

//         // Set isOperatorChosen to true so we start writing to secondNumber
//         isOperatorChosen = true;

//         // Store off the operator
//         operator = $(this).val();

//         // Set the HTML of the #operator to the text of what was clicked
//         $("#operator").text($(this).text());

//     });
//     $(".equal").on("click", function () {

//         // If we already clicked equal, don't do the calculation again
//         if (isCalculated) {
//             return false;
//         }

//         // Set isCalculated to true so that we don't get in a weird UI state by clicking buttons again
//         isCalculated = true;

//         // Use parseInt to convert our string representation of numbers into actual integers
//         firstNumber = parseInt(firstNumber);
//         secondNumber = parseInt(secondNumber);

//         // Based on the operator that was chosen.
//         // Then run the operation and set the HTML of the result of that operation
//         if (operator === "plus") {
//             result = firstNumber + secondNumber;
//         } else if (operator === "minus") {
//             result = firstNumber - secondNumber;
//         } else if (operator === "times") {
//             result = firstNumber * secondNumber;
//         } else if (operator === "divide") {
//             result = firstNumber / secondNumber;
//         } else if (operator === "power") {
//             result = Math.pow(firstNumber, secondNumber);
//         }

//         $("#result").text(result);

//     });
//     $(".clear").on("click", function () {

//         // Call initializeCalculater so we can reset the state of our app
//         initializeCalculator();

//     });

//     // Call initializeCalculater so we can set the state of our app
//     initializeCalculator();
// });