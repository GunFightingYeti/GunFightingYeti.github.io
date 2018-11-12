// Creates an array that lists out all of the possible fictional characters.
var characters = ["mr meeseeks", "finn and jake", "rick and morty", "malcom reynolds", "michael scott", "barney stinson", "hobart washburn", "obiwan kenobi", "sterling archer", "jack o neill", "peter griffin", "benjamin hawkeye pierce", "john dorian", "shawn spencer", "truman burbank", "jeeves and wooster", "bruce wayne", "steve rogers", "tony stark", "stephen strange", "woody and buzz", "wesley and buttercup", "scott pilgrim", 'han solo', "wade wilson", "peter quill"];

// Array to check if key pressed is a letter
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

// Randomly chooses an item from the array which becomes the word(s) to guess.
var word = document.getElementById("word");
var mysteryWord = characters[Math.floor(Math.random() * characters.length)];

// Create array from mysteryWord
var mwSplit = mysteryWord.split("");

// Show word(s) without commas
var mwArray = mwSplit.join("");
word.innerHTML = mwArray;

//Show underscores instead of mwArray
var usArray = [];
var _ = '_';
for (var u = 0; u < mwArray.length; u++) {
    var letter = mwArray[u];
    var index = mwArray.indexOf(u);
    if (letter.search(/[^a-zA-Z]+/) === -1) {
        usArray.push(_);
    } else {
        usArray.push("&nbsp;");
    }
}

// Display underscores in place of mystery word
word.innerHTML = usArray.join(" ");

// Guessed letter variables
var guessedArray = [];
var guessed = document.getElementById("guessed");
var t = 0;

// When the user presses a key the game starts
document.onkeyup = function (event) {
    var userInput = event.key;

    // Only allow letters
    if (alphabet.indexOf(userInput) == -1) {
        alert("Please press a letter of the alphabet.");

        // Show already guessed letters on the page
    } else {
        userInput = event.key.toLowerCase();
        guessedArray.push(" " + userInput.toUpperCase());
        guessed.innerHTML = (guessedArray);

        // Check to see if the userInput is in the mystery word
        if (mwArray.indexOf(userInput) == -1) {
            var incorrect = [];
            incorrect.push(userInput);

            // Update how many tries the user has remaining.
            var countDown = ["6 tries", "5 tries", "4 tries", "3 tries", "2 tries", "1 try", "0 tries"];
            var triesLeft = document.getElementById("triesLeft");
            triesLeft.innerHTML = countDown[t];

            // Change hangman image
            var hangman = document.getElementById("hangman");
            var imageArray = ["assets/images/Hangman/2-Hangman-Head.png", "assets/images/Hangman/3-Hangman-BackBone.png", "assets/images/Hangman/4-Hangman-LeftArm.png", "assets/images/Hangman/5-Hangman-RightArm.png", "assets/images/Hangman/6-Hangman-LeftLeg.png", "assets/images/Hangman/7-Hangman-RightLeg.png", "assets/images/Hangman/8-Hangman-GameOver.png"];
            hangman.src = imageArray[t];
            t++;

            // If the number of tries reaches max then alert and reload
            if (t == 7) {

                // Show word after loss
                word.innerHTML = mwArray;
                alert("Oh man, you were so close!");

            }
            if (t == 8) {
                // Restart game after loss
                alert("I'm sorry, you are out of guesses.  Maybe you will have better luck with this next word!");
                restart();
            }

            // Add to correct guess array
        } else {
            var correct = [];
            correct.push(userInput);

            // Replace underscore with correct letter
            for (i = 0; i < mwArray.length; i++) {
                if (mwSplit[i] == userInput) {
                    usArray[i] = userInput;
                    word.innerHTML = usArray.join(" ");
                }
            }

            // Win Condition
            if (usArray.indexOf("_") == -1) {
                word.innerHTML = mwArray;
                alert('You won!  Click the "New Game" button to play again.');
            }
        }
    }
}

// New Game button
function restart() {
    mysteryWord = characters[Math.floor(Math.random() * characters.length)];

    // Create array from mysteryWord
    mwSplit = mysteryWord.split("");

    // Show word(s) without commas
    mwArray = mwSplit.join("");
    word.innerHTML = mwArray;

    // Show underscores instead of mwArray
    usArray = [];
    _ = '_';
    for (var u = 0; u < mwArray.length; u++) {
        letter = mwArray[u];
        index = mwArray.indexOf(u);
        if (letter.search(/[^a-zA-Z]+/) === -1) {
            usArray.push(_);
        } else {
            usArray.push("&nbsp;");
        }
    }

    // Display underscores in place of mystery word
    word.innerHTML = usArray.join(" ");

    // Clear progress
    // Tries remaining.
    triesLeft.innerHTML = "a limited number of tries";
    t = 0

    // Hangman image
    hangman.src = "assets/images/Hangman/1-Hangman-Gallows.png";

    // Letter arrays
    guessedArray = [];
    correct = [];
    incorrect = [];

    // Guessed letters
    guessed.innerHTML = "";
}

// document.addEventListener("DOMContentLoaded", function(event) { 
//     document.getElementsByTagName("body").trigger("tap");
//   });